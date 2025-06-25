import { Download, FileText, AlertCircle, CheckCircle } from 'lucide-react';

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
    a.download = 'form_apr_review.txt';
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
          Analyzing Your Documents
        </h3>
        <p className="text-text-light max-w-md">
          Our AI is carefully reviewing your Form APR and supporting documents for compliance issues...
        </p>
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
          Upload your Form APR and click "Start Analysis" to begin the compliance review.
        </p>
      </div>
    );
  }

  // Parse the output to identify different sections
  const sections = output.split('\n\n').filter(section => section.trim());
  
  return (
    <div className="space-y-6">
      {/* Download Button */}
      <div className="flex justify-end">
        <button
          onClick={downloadReport}
          className="inline-flex items-center gap-2 bg-accent-yellow hover:bg-accent-orange text-text px-4 py-2 rounded-lg transition-colors font-medium"
        >
          <Download className="w-4 h-4" />
          Download Report
        </button>
      </div>

      {/* Review Content */}
      <div className="prose prose-sm max-w-none">
        {sections.map((section, index) => {
          const isHeader = section.startsWith('#') || section.startsWith('**');
          const isStatus = section.includes('✅') || section.includes('⚠️') || section.includes('❌');
          
          if (isHeader) {
            return (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold text-text border-b border-grey-200 pb-2">
                  {section.replace(/[#*]/g, '').trim()}
                </h3>
              </div>
            );
          }
          
          if (isStatus) {
            const isSuccess = section.includes('✅');
            const isWarning = section.includes('⚠️');
            const isError = section.includes('❌');
            
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
                <div className="flex items-start gap-2">
                  {isSuccess && <CheckCircle className="w-5 h-5 text-accent-yellow mt-0.5 flex-shrink-0" />}
                  {isWarning && <AlertCircle className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" />}
                  {isError && <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />}
                  <div className="text-sm text-text whitespace-pre-wrap">
                    {section}
                  </div>
                </div>
              </div>
            );
          }
          
          return (
            <div key={index} className="text-sm text-text-light whitespace-pre-wrap bg-grey-50 p-4 rounded-lg border border-grey-200">
              {section}
            </div>
          );
        })}
      </div>
    </div>
  );
}