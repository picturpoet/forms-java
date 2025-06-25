import { Download, FileText, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface ReviewOutputProps {
  output: string;
  isAnalyzing: boolean;
}

export function ReviewOutput({ output, isAnalyzing }: ReviewOutputProps) {
  const downloadReport = () => {
    if (!output) return;
    
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `form_apr_review_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
        <h3 className="text-lg font-semibold text-text mb-2">
          AI Analysis in Progress
        </h3>
        <p className="text-text-light max-w-md mb-4">
          Our Mistral AI is processing your documents with OCR technology for comprehensive FEMA compliance review...
        </p>
        <div className="flex items-center gap-2 text-sm text-primary-600">
          <Clock className="w-4 h-4" />
          <span>This may take 1-3 minutes depending on document complexity</span>
        </div>
      </div>
    );
  }

  if (!output) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FileText className="w-16 h-16 text-grey-300 mb-4" />
        <h3 className="text-lg font-semibold text-text mb-2">
          Ready for Analysis
        </h3>
        <p className="text-text-light max-w-md">
          Upload your Form APR and click "Start Analysis" to begin the AI-powered compliance review using Mistral OCR technology.
        </p>
      </div>
    );
  }

  // Parse the output to identify different sections and status indicators
  const lines = output.split('\n');
  const sections: Array<{ type: 'header' | 'status' | 'content'; content: string; level?: number }> = [];
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;
    
    // Detect headers
    if (trimmedLine.startsWith('#')) {
      const level = (trimmedLine.match(/^#+/) || [''])[0].length;
      sections.push({
        type: 'header',
        content: trimmedLine.replace(/^#+\s*/, ''),
        level
      });
    }
    // Detect status lines
    else if (trimmedLine.includes('✅') || trimmedLine.includes('⚠️') || trimmedLine.includes('❌')) {
      sections.push({
        type: 'status',
        content: trimmedLine
      });
    }
    // Regular content
    else {
      sections.push({
        type: 'content',
        content: trimmedLine
      });
    }
  }
  
  return (
    <div className="space-y-6">
      {/* Download Button */}
      <div className="flex justify-end">
        <button
          onClick={downloadReport}
          className="inline-flex items-center gap-2 bg-accent-yellow hover:bg-accent-orange text-text px-4 py-2 rounded-lg transition-colors font-medium shadow-sm hover:shadow-md"
        >
          <Download className="w-4 h-4" />
          Download Report
        </button>
      </div>

      {/* Review Content */}
      <div className="space-y-4">
        {sections.map((section, index) => {
          if (section.type === 'header') {
            const HeaderTag = section.level === 1 ? 'h2' : section.level === 2 ? 'h3' : 'h4';
            const headerClasses = section.level === 1 
              ? 'text-2xl font-bold text-text border-b-2 border-primary-200 pb-3'
              : section.level === 2
              ? 'text-xl font-semibold text-text border-b border-grey-200 pb-2'
              : 'text-lg font-medium text-text';
              
            return (
              <HeaderTag key={index} className={headerClasses}>
                {section.content}
              </HeaderTag>
            );
          }
          
          if (section.type === 'status') {
            const isSuccess = section.content.includes('✅');
            const isWarning = section.content.includes('⚠️');
            const isError = section.content.includes('❌');
            
            return (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  isSuccess
                    ? 'bg-green-50 border-accent-yellow'
                    : isWarning
                    ? 'bg-accent-yellow-light border-accent-orange'
                    : isError
                    ? 'bg-red-50 border-red-400'
                    : 'bg-grey-50 border-grey-400'
                }`}
              >
                <div className="flex items-start gap-3">
                  {isSuccess && <CheckCircle className="w-5 h-5 text-accent-yellow mt-0.5 flex-shrink-0" />}
                  {(isWarning || isError) && <AlertCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isError ? 'text-red-600' : 'text-accent-orange'}`} />}
                  <div className="text-sm text-text leading-relaxed">
                    {section.content}
                  </div>
                </div>
              </div>
            );
          }
          
          // Regular content
          return (
            <div key={index} className="text-sm text-text-light leading-relaxed bg-grey-50 p-4 rounded-lg border border-grey-200">
              {section.content}
            </div>
          );
        })}
      </div>

      {/* Analysis Info Footer */}
      <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-200">
        <div className="flex items-center gap-2 text-sm text-primary-700">
          <CheckCircle className="w-4 h-4" />
          <span className="font-medium">Analysis completed using Mistral AI with OCR technology</span>
        </div>
        <p className="text-xs text-primary-600 mt-1">
          This report was generated by AI and should be reviewed by a qualified professional before submission.
        </p>
      </div>
    </div>
  );
}