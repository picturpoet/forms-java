import * as pdfjsLib from 'pdfjs-dist';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.js`;

export interface ProcessedPdfContent {
  textContent: string;
  images: string[];
  pageCount: number;
}

export class PdfProcessor {
  async processPdf(file: File): Promise<ProcessedPdfContent> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      let fullTextContent = '';
      const images: string[] = [];
      
      console.log(`Processing PDF with ${pdf.numPages} pages...`);

      // Process each page
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        
        // Extract text content
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        
        if (pageText.trim()) {
          fullTextContent += `\n--- Page ${pageNum} ---\n${pageText}\n`;
        }

        // Extract images for OCR
        try {
          const viewport = page.getViewport({ scale: 2.0 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d')!;
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };

          await page.render(renderContext).promise;
          
          // Convert canvas to base64 image
          const imageDataUrl = canvas.toDataURL('image/png');
          images.push(imageDataUrl);
          
          console.log(`Extracted image from page ${pageNum}`);
        } catch (imageError) {
          console.warn(`Failed to extract image from page ${pageNum}:`, imageError);
        }
      }

      console.log(`PDF processing complete. Text length: ${fullTextContent.length}, Images: ${images.length}`);

      return {
        textContent: fullTextContent.trim(),
        images,
        pageCount: pdf.numPages
      };
    } catch (error) {
      console.error('PDF processing failed:', error);
      throw new Error(`Failed to process PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async processMultipleFiles(files: File[]): Promise<string> {
    let combinedContent = '';
    
    for (const file of files) {
      try {
        if (file.type === 'application/pdf') {
          const pdfContent = await this.processPdf(file);
          combinedContent += `\n\n=== ${file.name} ===\n${pdfContent.textContent}`;
        } else if (file.type.includes('spreadsheet') || file.name.endsWith('.xlsx') || file.name.endsWith('.csv')) {
          // For spreadsheet files, we'll just note their presence
          // In a full implementation, you'd want to parse these too
          combinedContent += `\n\n=== ${file.name} ===\n[Spreadsheet file - content not extracted in this version]`;
        }
      } catch (error) {
        console.error(`Failed to process ${file.name}:`, error);
        combinedContent += `\n\n=== ${file.name} ===\n[Error processing file: ${error instanceof Error ? error.message : 'Unknown error'}]`;
      }
    }
    
    return combinedContent;
  }
}