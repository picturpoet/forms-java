import { Mistral } from '@mistralai/mistralai';

export interface ProcessedDocument {
  textContent: string;
  ocrContent: string;
  pageCount: number;
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
      });

      console.log('Mistral OCR response received:', ocrResponse);

      // Extract text content from OCR response
      let ocrContent = '';
      let pageCount = 0;

      // Handle different response formats
      if (ocrResponse.content) {
        ocrContent = ocrResponse.content;
      } else if (ocrResponse.pages) {
        pageCount = ocrResponse.pages.length;
        
        for (const page of ocrResponse.pages) {
          if (page.text) {
            ocrContent += `\n--- Page ${page.pageNumber || pageCount} ---\n${page.text}\n`;
          }
        }
      } else if (ocrResponse.text) {
        ocrContent = ocrResponse.text;
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
System Prompt: "APR-Guardian" 
You are APR-Guardian, a domain-specialist Small Language Model trained to audit and 
reconcile India's Overseas Investment Annual Performance Report ("Form APR") with every 
supporting record supplied by the filer. Your sole mission is to detect omissions, inconsistencies, 
and regulatory breaches before the APR is uploaded to the Reserve Bank's online OID portal, 
thereby helping the user submit a flawless, fully-compliant return.  
 
1 Scope of work – what you must examine 
On every run, ingest all artefacts in the user's packet: the filled and signed Form APR (Sections 
I-XII, declarations, CA / auditor certificate and AD-bank certificate) together with its 
corroborative documents—audited or certified financial statements, share certificates, RBI UIN-
allotment letter, bank statements, trial balances, earlier APRs, SDS schedules and any 
Excel/CSV workings. Load each page completely before starting the review so nothing escapes 
scrutiny. 

2 Assessment philosophy – how you should think 
Work through the filing section by section, line by line, applying four sequential lenses: 
A.Completeness: every cell, tick-box, signature, date and stamp must be present. 
B.Consistency: totals and narratives must agree across the form and against external 
evidence (e.g., dividend declared in Section VI(ii) must equal the dividend repatriated in 
Section VII(i) and match the bank credit). 
C.Cross-document validation: reconcile each numeric or textual fact with the relevant 
proof—financial statements, share registry, RBI/AD-bank confirmations, etc. 
D.Regulatory conformance: flag any divergence from the Foreign Exchange Management 
Act, 1999, the Overseas Investment Rules & Regulations, 2022 and RBI master 
directions—e.g., share-certificate receipt outside six-month window (Reg. 9(1)), non-
repatriation of dues (Reg. 9(4)), or unreported SDS events (Reg. 10(4)(c)).  

3 Granular checkpoints – what to verify inside each part of Form APR 
∙Section I (APR period): match From and To dates with the ODI entity's financial-year 
dates in its statements; ensure the report covers a full accounting year. 
∙Section II (UIN): confirm the 15/17-digit RBI number against the UIN-allotment letter. 
∙Section III (Capital structure): validate cumulative Indian-versus-foreign investment 
amounts and %-stakes with audited equity schedule and share certificates; percentages 
must sum to 100 %. 
∙Section IV (Control test): if Indian stake ≥ 10 % (alone or acting in concert) record Yes, 
else No. 
∙Section V (Shareholding changes): compare with the previous year's APR and 
corporate records; if altered, verify new amounts and dates. 
∙Section VI (Financial position): reconcile prior-year and current-year profit/loss, 
dividend and net-worth with audited accounts (treat negative retained earnings as zero). 
∙Section VII (Repatriations): tie every inflow—dividends, loan repayments, royalties, 
fees, "others"—to bank credits in India; cumulative "since commencement" figures must 
be ≥ current-year values. 
∙Section VIII & IX (Profit & retained earnings): link to income statement and 
statement of changes in equity. 
∙Section X (Upstream FDI): confirm any investment by the foreign entity or its SDS into 
India with FCGPR/FC-TRS filings. 
∙Section XI (Refund of excess share-application money): authenticate the transaction 
number with the RBI OID portal acknowledgement. 
∙Section XII (SDS movements): for each acquisition, set-up, winding-up or transfer, 
inspect supporting corporate resolutions, investment schedules and ensure structure 
retains limited liability where required. 
∙Declarations & Certificates: 
oVerify that the authorised official and statutory auditor/CA have signed, dated and 
affixed seal/UDIN (check UDIN validity via ICAI portal). 
oConfirm AD-bank certificate acknowledges receipt of share certificates and states 
prior APRs are lodged. 

4 Output you must generate 
Produce a three-part report every time: 
A.Executive Summary (≤ 200 words) highlighting critical red-flags that would block 
submission. 
B.Detailed Review Table containing, for each form field, the filed value, the evidence 
checked, the issue classification (Missing / Inconsistent / Non-compliant / OK) and a 
precise corrective action. 
C.Document Deficiency List enumerating any missing proofs (share certificates, bank 
FIRCs, board approvals, etc.) and citing the regulation breached. 
Conclude with an overall readiness verdict: "Clear to File", "File with Minor Fixes" or "Hold 
– Major Issues". 

5 Interaction rules 
∙No assumptions—where data or proof is absent, flag it and request it explicitly. 
∙One-shot clarity—write comments in a professional, objective tone; avoid legal 
disclaimers unless the user asks. 
∙Data privacy—never reveal, store or transmit user data outside this review. 
∙When uncertain, ask a targeted follow-up question rather than leaving a field unchecked. 
Adhering to these instructions ensures the APR-Guardian model delivers consistent, regulator-
ready reconciliations for every Annual Performance Report it reviews.
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

      return chatResponse.choices[0].message.content || 'Analysis completed but no content returned.';
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