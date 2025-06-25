import { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { ReviewOutput } from './components/ReviewOutput';
import { ApiKeySetup } from './components/ApiKeySetup';
import { MistralApiService } from './services/mistralApi';
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

      // Step 1: Process the main Form APR with Mistral OCR
      setAnalysisProgress('Processing Form APR with Mistral OCR...');
      const mainDocument = await mistralService.processDocumentWithOCR(formPdf);
      
      console.log('Main document processed:', {
        ocrContentLength: mainDocument.ocrContent.length,
        textContentLength: mainDocument.textContent.length,
        pageCount: mainDocument.pageCount
      });

      // Step 2: Process supporting documents if any
      let supportingContent = '';
      if (supportingFiles.length > 0) {
        setAnalysisProgress('Processing supporting documents...');
        supportingContent = await mistralService.processSupportingDocuments(supportingFiles);
        console.log('Supporting documents processed, content length:', supportingContent.length);
      }

      // Step 3: Perform FEMA compliance analysis
      setAnalysisProgress('Analyzing document for FEMA compliance...');
      const analysis = await mistralService.analyzeDocumentForCompliance(
        mainDocument,
        supportingContent
      );

      setReviewOutput(analysis);
      setAnalysisProgress('');
      
    } catch (error) {
      console.error('Analysis failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      let errorReport = `# Analysis Failed\n\n**Error:** ${errorMessage}\n\n`;
      
      if (errorMessage.includes('401') || errorMessage.includes('unauthorized')) {
        errorReport += `**Possible causes:**
- Invalid API key
- API key doesn't have access to Mistral OCR
- API key has expired

**Solutions:**
- Verify your API key is correct
- Check if your Mistral account has OCR access enabled
- Try generating a new API key from the Mistral console`;
      } else if (errorMessage.includes('429') || errorMessage.includes('rate limit')) {
        errorReport += `**Rate limit exceeded**
- Please wait a few minutes before trying again
- Consider upgrading your Mistral plan for higher limits`;
      } else if (errorMessage.includes('413') || errorMessage.includes('too large')) {
        errorReport += `**Document too large**
- Try reducing the PDF file size
- Split large documents into smaller parts`;
      } else {
        errorReport += `**General troubleshooting:**
- Check your internet connection
- Ensure the PDF file is not corrupted
- Try with a smaller document first`;
      }
      
      setReviewOutput(errorReport);
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
                <p className="text-xs text-blue-600 mt-1">
                  Using official Mistral OCR API (mistral-ocr-latest)
                </p>
              </div>
            )}

            {/* API Info */}
            <div className="bg-accent-yellow-light border border-accent-yellow rounded-lg p-4">
              <h4 className="text-sm font-semibold text-text mb-2">
                🔧 Technical Details
              </h4>
              <ul className="text-xs text-text-light space-y-1">
                <li>• OCR Model: mistral-ocr-latest</li>
                <li>• Analysis Model: mistral-large-latest</li>
                <li>• Official Mistral SDK: @mistralai/mistralai</li>
                <li>• FEMA compliance focused</li>
              </ul>
            </div>
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