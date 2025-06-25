import { useState } from 'react';
import { FileUpload } from '../components/FileUpload';
import { ReviewOutput } from '../components/ReviewOutput';
import { MistralApiService } from '../services/mistralApi';
import { FileText, Upload, ChevronUp, ChevronDown, ArrowLeft, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function AprPage() {
  const [formPdf, setFormPdf] = useState<File | null>(null);
  const [supportingFiles, setSupportingFiles] = useState<File[]>([]);
  const [reviewOutput, setReviewOutput] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState<string>('');
  const [isUploadSectionCollapsed, setIsUploadSectionCollapsed] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const handleAnalyze = async () => {
    if (!formPdf) return;

    // Get API key from environment variables
    const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
    
    if (!apiKey) {
      setReviewOutput(`# Configuration Error

**Missing API Key**

The Mistral API key is not configured. Please contact the administrator to set up the VITE_MISTRAL_API_KEY environment variable.

**For Administrators:**
- Add VITE_MISTRAL_API_KEY to your Netlify environment variables
- Redeploy the application after adding the key`);
      return;
    }

    setIsAnalyzing(true);
    setReviewOutput('');
    setIsUploadSectionCollapsed(true); // Collapse upload section when analysis starts
    
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
- Invalid API key configuration
- API key doesn't have access to Mistral OCR
- API key has expired

**Solutions:**
- Contact administrator to verify API key configuration
- Check if the Mistral account has OCR access enabled
- Administrator may need to generate a new API key`;
      } else if (errorMessage.includes('429') || errorMessage.includes('rate limit')) {
        errorReport += `**Rate limit exceeded**
- Please wait a few minutes before trying again
- Contact administrator if this persists`;
      } else if (errorMessage.includes('413') || errorMessage.includes('too large')) {
        errorReport += `**Document too large**
- Try reducing the PDF file size
- Split large documents into smaller parts`;
      } else {
        errorReport += `**General troubleshooting:**
- Check your internet connection
- Ensure the PDF file is not corrupted
- Try with a smaller document first
- Contact support if the issue persists`;
      }
      
      setReviewOutput(errorReport);
      setAnalysisProgress('');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Bar - Solid background for maximum contrast */}
      <header className="bg-brand-dark shadow-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Back to Home */}
              <a 
                href="/"
                className="text-white hover:text-brand-light transition-colors p-3 rounded-xl hover:bg-white/10 group"
                title="Back to Home"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </a>

              {/* Logo with fallback */}
              {!logoError ? (
                <img 
                  src="/logo.png" 
                  alt="Regality AI Logo" 
                  className="w-10 h-10 rounded-xl object-cover shadow-card"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-card">
                  <div className="w-6 h-6 bg-brand-dark rounded"></div>
                </div>
              )}
              
              {/* Brand Name */}
              <h1 className="text-white text-2xl font-garamond font-semibold">
                Regality AI
              </h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a 
                href="https://regality.ai" 
                className="text-white/80 hover:text-white transition-colors font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                About
              </a>
              <a 
                href="https://regality.ai/contact/" 
                className="text-white/80 hover:text-white transition-colors font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content with consistent container */}
      <div className="bg-gradient-to-b from-brand-light/10 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          {/* Main Title - Consistent spacing */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-16 bg-brand-dark rounded-2xl flex items-center justify-center shadow-card">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-5xl font-bold text-text">
                Form APR Reconciler
              </h2>
            </div>
            {/* Fixed subline with high contrast */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 inline-block shadow-card border border-grey/10">
              <p className="text-xl text-text font-medium">
                AI-driven FEMA compliance review powered by Mistral OCR
              </p>
            </div>
          </div>

          {/* 12-column grid layout */}
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left Sidebar - 4 columns */}
            <div className="lg:col-span-4 space-y-8">
              {/* Upload Section - Collapsible */}
              <div className="bg-white rounded-2xl shadow-card border border-grey/10">
                <div 
                  className="flex items-center justify-between p-8 cursor-pointer group"
                  onClick={() => setIsUploadSectionCollapsed(!isUploadSectionCollapsed)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center">
                      <Upload className="w-6 h-6 text-brand-dark" />
                    </div>
                    <h3 className="text-xl font-semibold text-text">
                      Upload Documents
                    </h3>
                  </div>
                  <div className="text-grey group-hover:text-text transition-colors">
                    {isUploadSectionCollapsed ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronUp className="w-5 h-5" />
                    )}
                  </div>
                </div>
                
                {!isUploadSectionCollapsed && (
                  <div className="px-8 pb-8">
                    <FileUpload
                      formPdf={formPdf}
                      supportingFiles={supportingFiles}
                      onFormPdfChange={setFormPdf}
                      onSupportingFilesChange={setSupportingFiles}
                    />
                  </div>
                )}
              </div>

              {/* Analyze Button */}
              <Button
                onClick={handleAnalyze}
                disabled={!formPdf || isAnalyzing}
                size="lg"
                className="w-full"
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {analysisProgress || 'Analyzing Documents...'}
                  </div>
                ) : (
                  'Start Analysis'
                )}
              </Button>

              {/* Progress Info */}
              {isAnalyzing && analysisProgress && (
                <div className="bg-white border border-brand-dark/20 rounded-2xl p-6 shadow-card">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-brand-dark rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-brand-dark font-semibold">
                      {analysisProgress}
                    </p>
                  </div>
                  <p className="text-text-light text-sm">
                    Using official Mistral OCR API (mistral-ocr-latest)
                  </p>
                </div>
              )}
            </div>

            {/* Main Content - 8 columns */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl shadow-card p-8 border border-grey/10">
                <h3 className="text-2xl font-semibold text-text mb-8 flex items-center gap-3">
                  <div className="w-8 h-8 bg-mna-yellow rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  Review Results
                </h3>
                <ReviewOutput output={reviewOutput} isAnalyzing={isAnalyzing} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}