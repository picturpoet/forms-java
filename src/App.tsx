import { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { ReviewOutput } from './components/ReviewOutput';
import { ApiKeySetup } from './components/ApiKeySetup';
import { FileText, Upload } from 'lucide-react';

function App() {
  const [apiKey, setApiKey] = useState<string>('');
  const [formPdf, setFormPdf] = useState<File | null>(null);
  const [supportingFiles, setSupportingFiles] = useState<File[]>([]);
  const [reviewOutput, setReviewOutput] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!formPdf || !apiKey) return;

    setIsAnalyzing(true);
    try {
      // This would normally call the Mistral API with model: 'mistral-ocr-latest' and temperature: 0.8
      // For now, we'll show a placeholder response
      const mockResponse = `
# Executive Summary

The Form APR has been analyzed for compliance with FEMA regulations and RBI guidelines. Several areas require attention before submission.

## Key Findings

- **Missing Documentation**: Share certificates not provided
- **Inconsistency Found**: Section VI dividend amounts don't match bank statements
- **Compliance Issue**: UIN format requires verification

## Detailed Review

### Section I - APR Period
- **Status**: ✅ OK
- **Finding**: Reporting period correctly covers full financial year

### Section II - UIN Details
- **Status**: ⚠️ Requires Verification
- **Finding**: UIN format needs validation against RBI allotment letter

### Section III - Capital Structure
- **Status**: ❌ Incomplete
- **Finding**: Supporting share certificates missing

## Overall Assessment

**Status**: File with Minor Fixes

Please address the identified issues before final submission to the RBI portal.
      `;

      setTimeout(() => {
        setReviewOutput(mockResponse);
        setIsAnalyzing(false);
      }, 3000);
    } catch (error) {
      console.error('Analysis failed:', error);
      setIsAnalyzing(false);
    }
  };

  if (!apiKey) {
    return <ApiKeySetup onApiKeySet={setApiKey} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-primary-600" />
            <h1 className="text-4xl font-bold text-text">
              Form APR Reconciler
            </h1>
          </div>
          <p className="text-lg text-text-light">
            powered by Regality - AI-driven FEMA compliance review
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Upload Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-grey-200">
              <div className="flex items-center gap-2 mb-4">
                <Upload className="w-5 h-5 text-primary-600" />
                <h2 className="text-xl font-semibold text-text">
                  Upload Documents
                </h2>
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
                  Analyzing Documents...
                </div>
              ) : (
                'Start Analysis'
              )}
            </button>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-grey-200">
              <h2 className="text-2xl font-semibold text-text mb-6">
                Review Results
              </h2>
              <ReviewOutput output={reviewOutput} isAnalyzing={isAnalyzing} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;