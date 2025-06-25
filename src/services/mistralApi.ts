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
      
      // Use Mistral OCR API with correct document structure
      const ocrResponse = await this.client.ocr.process({
        model: "mistral-ocr-latest",
        document: {
          documentBase64: base64Data
        },
        includeImageBase64: true
      });

      console.log('Mistral OCR response received');

      // Extract text content from OCR response
      let ocrContent = '';
      let pageCount = 0;

      if (ocrResponse.pages) {
        pageCount = ocrResponse.pages.length;
        
        for (const page of ocrResponse.pages) {
          if (page.text) {
            ocrContent += `\n--- Page ${page.pageNumber || pageCount} ---\n${page.text}\n`;
          }
        }
      }

      // Also extract any direct text content if available
      let textContent = '';
      if (ocrResponse.text) {
        textContent = ocrResponse.text;
      }

      console.log(`OCR processing complete. Pages: ${pageCount}, OCR content length: ${ocrContent.length}`);

      return {
        textContent,
        ocrContent: ocrContent.trim(),
        pageCount
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

      const fullContent = `
MAIN FORM APR DOCUMENT (OCR EXTRACTED):
${documentContent.ocrContent}

${documentContent.textContent ? `\nDIRECT TEXT CONTENT:\n${documentContent.textContent}` : ''}

${supportingContent ? `\nSUPPORTING DOCUMENTS:\n${supportingContent}` : ''}
      `.trim();

      // Use chat completions for analysis
      const chatResponse = await this.client.chat.complete({
        model: "mistral-large-latest",
        messages: [
          {
            role: "system",
            content: `You are an expert FEMA compliance analyst specializing in Form APR (Annual Performance Report) reviews under India's Overseas Investment regulations (FEMA, 1999; OI Rules, 2022).

Your task is to:
1. Analyze the provided Form APR document thoroughly
2. Identify compliance issues, missing information, and inconsistencies
3. Check against FEMA regulations and RBI guidelines
4. Provide specific, actionable recommendations

Format your response as a detailed compliance report with:
- Executive Summary
- Section-by-section analysis with field names
- Compliance status for each critical field
- Missing documentation checklist
- Recommended actions before submission

Use these status indicators:
- ✅ OK - Compliant and complete
- ⚠️ Requires Verification - Needs attention or clarification
- ❌ Incomplete/Non-compliant - Must fix before submission

Be thorough, specific, and reference relevant FEMA rules where applicable. Focus on:
- UIN validation
- Capital structure accuracy
- Dividend/income reporting
- Supporting document requirements
- Regulatory compliance dates`
          },
          {
            role: "user",
            content: `Please analyze this Form APR document for FEMA compliance:

${fullContent}`
          }
        ],
        temperature: 0.3,
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
          combinedContent += `\n\n=== ${file.name} ===\n${processed.ocrContent || processed.textContent}`;
        } else if (file.type.includes('spreadsheet') || file.name.endsWith('.xlsx') || file.name.endsWith('.csv')) {
          // For spreadsheet files, we'll note their presence
          // In a production version, you'd want to parse these with a spreadsheet library
          combinedContent += `\n\n=== ${file.name} ===\n[Spreadsheet file - please ensure data matches Form APR entries]`;
        } else {
          combinedContent += `\n\n=== ${file.name} ===\n[File type not supported for OCR processing]`;
        }
      } catch (error) {
        console.error(`Failed to process ${file.name}:`, error);
        combinedContent += `\n\n=== ${file.name} ===\n[Error processing file: ${error instanceof Error ? error.message : 'Unknown error'}]`;
      }
    }
    
    return combinedContent;
  }
}