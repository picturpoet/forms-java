import { Mistral } from '@mistralai/mistralai';

export interface ProcessedDocument {
  textContent: string;
  ocrContent: string;
  pageCount: number;
}

interface OCRResult {
  text?: string;
  pages?: Array<{
    page_number?: number;
    content?: string;
  }>;
}

interface OCRResponse {
  result?: OCRResult;
  [key: string]: any;
}

export class MistralApiService {
  private client: Mistral;

  constructor(apiKey: string) {
    this.client = new Mistral({ apiKey });
  }

  async processDocumentWithOCR(file: File): Promise<ProcessedDocument> {
    try {
      console.log('Starting Mistral OCR processing for:', file.name);
      
      // Convert file to base64 for document processing
      const base64Data = await this.fileToBase64(file);
      
      // Use Mistral OCR API with document_url format (matching Python implementation)
      const ocrResponse = await this.client.ocr.process({
        model: "mistral-ocr-latest",
        document: {
          type: "document_url",
          documentUrl: `data:application/pdf;base64,${base64Data}`
        },
        includeImageBase64: true
      }) as OCRResponse;

      console.log('Mistral OCR response received:', ocrResponse);

      // Extract text content from OCR response
      let ocrContent = '';
      let pageCount = 0;

      // Handle different response formats - access through result property
      if (ocrResponse.result?.text) {
        ocrContent = ocrResponse.result.text;
      } else if (ocrResponse.result?.pages) {
        pageCount = ocrResponse.result.pages.length;
        
        for (const page of ocrResponse.result.pages) {
          if (page.content) {
            ocrContent += `\n--- Page ${page.page_number || pageCount} ---\n${page.content}\n`;
          }
        }
      } else {
        // Fallback: convert entire response to string
        ocrContent = typeof ocrResponse === 'string' ? ocrResponse : JSON.stringify(ocrResponse, null, 2);
      }

      console.log(`OCR processing complete. Content length: ${ocrContent.length}`);

      return {
        textContent: '',
        ocrContent: ocrContent.trim(),
        pageCount: pageCount || 1
      };
    } catch (error) {
      console.error('Mistral OCR processing failed:', error);
      throw new Error(`OCR processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async analyzeDocumentForCompliance(
    documentContent: ProcessedDocument,
    supportingContent: string = ''
  ): Promise<string> {
    try {
      console.log('Starting FEMA compliance analysis...');

      // Use the same review prompt as your Python version
      const reviewPrompt = `
You are APR-Guardian, an AI review engine.
Mission: audit the user’s Form APR packet (per Reg. 10(4), FEM (OI) Regulations 2022) from a banker’s viewpoint and list every omission, inconsistency or non-compliance. Output neutral, actionable findings only.

0 PRE-CHECKS (run in order)
Form type
If primary file ≠ “Form APR” → stop and return:
ERROR: Uploaded document is not Form APR. Upload the correct form.
No other output.

Mandatory documents
Financials (complete set), prior APR (if due), share certificates, IORs, RBI-UIN letter, Form FCs, SDS workings.
Missing item ⇒ add to Document Deficiency List and set verdict baseline to Hold – Major Issues.

Version choice
If duplicates exist pick: Audited > Final > Latest date.
Ambiguity ⇒ flag AMBIGUOUS DOCUMENT until user confirms; treat confirmed file as final on next run.

Language — non-English w/o certified translation ⇒ flag MISSING; review continues for other docs.

Scan integrity — flag AI_PROCESSING_ERROR for unreadable pages. Critical sections ⇒ severity ≥ High.

1 SCOPE
Load all text of Form APR (Sections I–XII + declarations) and every support file.
Financials must include BS, P&L, CF, and Notes.

2 REVIEW LOGIC
For each field apply, in order:

Lens	Key rules
Completeness	All required fields, ticks, signatures, dates, seals present.
Consistency	Internal totals tie; dates coherent (DD/MM/YYYY inside APR).
Cross-doc	Values match support docs; map synonyms transparently (“Net Profit” vs “PAT”)—state mapping in remarks.
Compliance	Follow this prompt, APR instructions, FEM(OI) Regulations.

No assumptions: if data unclear, flag MISSING/INCONSISTENT and ask.

3 GRANULAR CHECKS (high-density)
Basic rules: one currency inside APR; differing currency in support OK if conversion note present, else INCONSISTENT.

“Since commencement” = prior APR figure + current year (skip if first APR flagged).

Retained earnings: if negative, report 0 in APR; flag mismatch.

Critical items: UIN must match RBI letter; audited FS needed when Indian investor has control (unless explicit audit exemption applies); UDIN must be visible—low OCR ⇒ advisory only, cleared once user confirms.

(Other section-wise checks from original prompt remain but condensed.)

4 OUTPUT (when no fatal ERROR)
Executive Summary ≤ 200 words — list only Critical/High issues that block filing.

Detailed Review Table
| Field | APR Value | Evidence | Issue | Severity | Fix/Note |
Classifications: OK · MISSING · INCONSISTENT · NON-COMPLIANT (Logic/Procedural) · CALC ERROR · POTENTIAL DATA ENTRY · AMBIGUOUS DOCUMENT · AI_PROCESSING_ERROR.
Severity matrix unchanged (UIN discrepancy = Critical; remove duplicate High label).
Note mapping assumptions or low-OCR alerts here.

Document Deficiency List — missing, referenced, or implied files.

Overall Verdict: Clear · File w/ Minor Fixes · Hold – Major Issues.

If step 0.1 error fired, only the single-line error is returned; otherwise all four parts must appear—even if every check is “OK”.

5 BEHAVIOUR RULES
Never fetch external data.

Keep tone objective, no legal disclaimers.

In repeat runs, clear closed flags once user supplies proof.

Flag subtle errors, but list minor formatting issues as Low and keep them out of the Executive Summary.
`;

      const fullContent = `OCR EXTRACTED TEXT:
${documentContent.ocrContent}

SUPPORTING DOCUMENTS:
${supportingContent}`;

      // Use chat completions for analysis (matching Python approach)
      const chatResponse = await this.client.chat.complete({
        model: "mistral-medium-latest", // Using same model as Python version
        messages: [
          {
            role: "system",
            content: reviewPrompt
          },
          {
            role: "user",
            content: fullContent
          }
        ],
        temperature: 0.3, // Default temperature from Python version
        maxTokens: 4000
      });

      console.log('FEMA compliance analysis completed');

      if (!chatResponse.choices || chatResponse.choices.length === 0) {
        throw new Error('No response from Mistral API');
      }

      const content = chatResponse.choices[0].message.content;
      return typeof content === 'string' ? content : 'Analysis completed but no content returned.';
    } catch (error) {
      console.error('FEMA compliance analysis failed:', error);
      throw error;
    }
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remove the data URL prefix to get just the base64 data
        const base64Data = result.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async processSupportingDocuments(files: File[]): Promise<string> {
    let combinedContent = '';
    
    for (const file of files) {
      try {
        if (file.type === 'application/pdf') {
          console.log(`Processing supporting PDF: ${file.name}`);
          const processed = await this.processDocumentWithOCR(file);
          combinedContent += `\n--- ${file.name} ---\n${processed.ocrContent}`;
        } else if (file.type.includes('spreadsheet') || file.name.endsWith('.xlsx') || file.name.endsWith('.csv')) {
          // For spreadsheet files, we'll note their presence
          // In a production version, you'd want to parse these with a spreadsheet library
          combinedContent += `\n--- ${file.name} ---\n[Spreadsheet file - please ensure data matches Form APR entries]`;
        } else {
          combinedContent += `\n--- ${file.name} ---\n[File type not supported for OCR processing]`;
        }
      } catch (error) {
        console.error(`Failed to process ${file.name}:`, error);
        combinedContent += `\n--- ${file.name} ---\n[Error processing file: ${error instanceof Error ? error.message : 'Unknown error'}]`;
      }
    }
    
    return combinedContent;
  }
}
