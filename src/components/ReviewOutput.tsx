import React from 'react';
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
    a.download = 'form_apr_review.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Analyzing Your Documents
        </h3>
        <p className="text-gray-600 max-w-md">
          Our AI is carefully reviewing your Form APR and supporting documents for compliance issues...
        </p>
      </div>
    );
  }

  if (!output) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FileText className="w-16 h-16 text-gray-300 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Ready for Analysis
        </h3>
        <p className="text-gray-600 max-w-md">
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
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
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
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
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
                    ? 'bg-green-50 border-green-400'
                    : isWarning
                    ? 'bg-yellow-50 border-yellow-400'
                    : isError
                    ? 'bg-red-50 border-red-400'
                    : 'bg-gray-50 border-gray-400'
                }`}
              >
                <div className="flex items-start gap-2">
                  {isSuccess && <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />}
                  {isWarning && <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />}
                  {isError && <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />}
                  <div className="text-sm text-gray-800 whitespace-pre-wrap">
                    {section}
                  </div>
                </div>
              </div>
            );
          }
          
          return (
            <div key={index} className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
              {section}
            </div>
          );
        })}
      </div>
    </div>
  );
}