import { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { ReviewOutput } from './components/ReviewOutput';
import { ApiKeySetup } from './components/ApiKeySetup';
import { MistralApiService } from './services/mistralApi';
import { PdfProcessor } from './services/pdfProcessor';
import { FileText, Upload } from 'lucide-react';

function App() {
  const [apiKey, setApiKey] = useState<string>('');
  const [formPdf, setFormPdf] = useState<File | null>(null);
  const [supportingFiles, setSupportingFiles] = useState<File[]>([]);
  const [reviewOutput, setReviewOutput] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState<string>('');

  const handleAnalyze = async () => {
    if (!formPdf || !apiKey) return;

    setIsAnalyzing(true);
    setReviewOutput('');
    
    try {
      const mistralService = new MistralApiService(apiKey);
      const pdfProcessor = new PdfProcessor();

      // Step 1: Process the main Form APR
      setAnalysisProgress('Processing Form APR document...');
      const mainPdfContent = await pdfProcessor.processPdf(formPdf);
      
      console.log('Main PDF processed:', {
        textLength: mainPdfContent.textContent.length,
        imageCount: mainPdfContent.images.length,
        pageCount: mainPdfContent.pageCount
      });

      // Step 2: Process supporting documents
      let supportingContent = '';
      if (supportingFiles.length > 0) {
        setAnalysisProgress('Processing supporting documents...');
        supportingContent = await pdfProcessor.processMultipleFiles(supportingFiles);
      }

      // Step 3: Perform OCR on images if needed
      let ocrContent = '';
      if (mainPdfContent.images.length > 0) {
        setAnalysisProgress('Performing OCR on document images...');
        try {
          ocrContent = await mistralService.performOCR(mainPdfContent.images);
          console.log('OCR completed, content length:', ocrContent.length);
        } catch (ocrError) {
          console.warn('OCR failed, continuing with text-only analysis:', ocrError);
        }
      }

      // Step 4: Combine all content
      const fullContent = `
MAIN FORM APR DOCUMENT:
${mainPdfContent.textContent}

${ocrContent ? `\nOCR EXTRACTED CONTENT:\n${ocrContent}` : ''}

${supportingContent ? `\nSUPPORTING DOCUMENTS:\n${supportingContent}` : ''}
      `.trim();

      console.log('Full content prepared for analysis, length:', fullContent.length);

      // Step 5: Analyze with Mistral
      setAnalysisProgress('Analyzing document for FEMA compliance...');
      const analysis = await mistralService.analyzeDocument(
        fullContent,
        [], // Images already processed via OCR
        'mistral-large-latest'
      );

      setReviewOutput(analysis);
      setAnalysisProgress('');
      
    } catch (error) {
      console.error('Analysis failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setReviewOutput(`# Analysis Failed\n\n**Error:** ${errorMessage}\n\nPlease check your API key and try again. If the problem persists, the document might be too large or corrupted.`);
      setAnalysisProgress('');
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!apiKey) {
    return <ApiKeySetup onApiKeySet={setApiKey} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Header Bar */}
      <header className="bg-primary-600 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            {/* Logo - Replace this div with your actual logo */}
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-primary-600 rounded"></div>
            </div>
            
            {/* Brand Name */}
            <h1 className="text-white text-2xl font-garamond font-medium">
              Regality AI
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Main Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-primary-600" />
            <h2 className="text-4xl font-bold text-text">
              Form APR Reconciler
            </h2>
          </div>
          <p className="text-lg text-text-light">
            AI-driven FEMA compliance review powered by Mistral OCR
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Upload Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-grey-200">
              <div className="flex items-center gap-2 mb-4">
                <Upload className="w-5 h-5 text-primary-600" />
                <h3 className="text-xl font-semibold text-text">
                  Upload Documents
                </h3>
              </div>
              <FileUpload
                formPdf={formPdf}
                supportingFiles={supportingFiles}
                onFormPdfChange={setFormPdf}
                onSupportingFilesChange={setSupportingFiles}
              />
            </div>

            {/* Analyze Button */}
            <button
              onClick={handleAnalyze}
              disabled={!formPdf || isAnalyzing}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-grey-400 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              {isAnalyzing ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {analysisProgress || 'Analyzing Documents...'}
                </div>
              ) : (
                'Start Analysis'
              )}
            </button>

            {/* Progress Info */}
            {isAnalyzing && analysisProgress && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800 font-medium">
                  {analysisProgress}
                </p>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-grey-200">
              <h3 className="text-2xl font-semibold text-text mb-6">
                Review Results
              </h3>
              <ReviewOutput output={reviewOutput} isAnalyzing={isAnalyzing} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;