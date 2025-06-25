import { Download, FileText, AlertCircle, CheckCircle, Clock, Table } from 'lucide-react';

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

  const processInlineMarkdown = (text: string): JSX.Element => {
    // Handle bold text (**text**)
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    
    return (
      <>
        {parts.map((part, index) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            const boldText = part.slice(2, -2);
            return <strong key={index} className="font-semibold">{boldText}</strong>;
          }
          return <span key={index}>{part}</span>;
        })}
      </>
    );
  };

  const renderMarkdownContent = (content: string) => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let currentIndex = 0;

    while (currentIndex < lines.length) {
      const line = lines[currentIndex].trim();
      
      if (!line) {
        currentIndex++;
        continue;
      }

      // Headers
      if (line.startsWith('#')) {
        const level = (line.match(/^#+/) || [''])[0].length;
        const text = line.replace(/^#+\s*/, '');
        
        if (level === 1) {
          elements.push(
            <h1 key={currentIndex} className="text-3xl font-bold text-text mb-6 border-b-2 border-primary-200 pb-3">
              {processInlineMarkdown(text)}
            </h1>
          );
        } else if (level === 2) {
          elements.push(
            <h2 key={currentIndex} className="text-2xl font-semibold text-text mb-4 border-b border-grey-200 pb-2 mt-8">
              {processInlineMarkdown(text)}
            </h2>
          );
        } else if (level === 3) {
          elements.push(
            <h3 key={currentIndex} className="text-xl font-medium text-text mb-3 mt-6">
              {processInlineMarkdown(text)}
            </h3>
          );
        } else {
          elements.push(
            <h4 key={currentIndex} className="text-lg font-medium text-text mb-2 mt-4">
              {processInlineMarkdown(text)}
            </h4>
          );
        }
      }
      // Bold text (standalone lines)
      else if (line.startsWith('**') && line.endsWith('**')) {
        const text = line.replace(/^\*\*|\*\*$/g, '');
        elements.push(
          <p key={currentIndex} className="font-semibold text-text mb-2">
            {text}
          </p>
        );
      }
      // Status indicators
      else if (line.includes('✅') || line.includes('⚠️') || line.includes('❌')) {
        const isSuccess = line.includes('✅');
        const isWarning = line.includes('⚠️');
        const isError = line.includes('❌');
        
        elements.push(
          <div
            key={currentIndex}
            className={`p-4 rounded-lg border-l-4 mb-4 ${
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
                {processInlineMarkdown(line)}
              </div>
            </div>
          </div>
        );
      }
      // Lists
      else if (line.startsWith('- ') || line.startsWith('• ') || line.match(/^\d+\./)) {
        const listItems = [];
        let listIndex = currentIndex;
        
        while (listIndex < lines.length && (lines[listIndex].trim().startsWith('- ') || lines[listIndex].trim().startsWith('• ') || lines[listIndex].trim().match(/^\d+\./))) {
          const listLine = lines[listIndex].trim();
          const text = listLine.replace(/^[-•]\s*|\d+\.\s*/, '');
          listItems.push(
            <li key={listIndex} className="mb-1">
              {processInlineMarkdown(text)}
            </li>
          );
          listIndex++;
        }
        
        const isOrdered = lines[currentIndex].trim().match(/^\d+\./);
        const ListTag = isOrdered ? 'ol' : 'ul';
        const listClass = isOrdered ? 'list-decimal list-inside' : 'list-disc list-inside';
        
        elements.push(
          <ListTag key={currentIndex} className={`${listClass} text-sm text-text-light mb-4 space-y-1 bg-grey-50 p-4 rounded-lg border border-grey-200`}>
            {listItems}
          </ListTag>
        );
        
        currentIndex = listIndex - 1;
      }
      // Tables (simple detection)
      else if (line.includes('|') && lines[currentIndex + 1]?.includes('|')) {
        const tableLines = [];
        let tableIndex = currentIndex;
        
        while (tableIndex < lines.length && lines[tableIndex].trim().includes('|')) {
          tableLines.push(lines[tableIndex].trim());
          tableIndex++;
        }
        
        if (tableLines.length > 1) {
          const headers = tableLines[0].split('|').map(h => h.trim()).filter(h => h);
          const rows = tableLines.slice(2).map(row => 
            row.split('|').map(cell => cell.trim()).filter(cell => cell)
          );
          
          elements.push(
            <div key={currentIndex} className="mb-6 overflow-x-auto">
              <div className="flex items-center gap-2 mb-3">
                <Table className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-medium text-text">Review Table</span>
              </div>
              <table className="w-full border border-grey-300 rounded-lg overflow-hidden">
                <thead className="bg-primary-50">
                  <tr>
                    {headers.map((header, idx) => (
                      <th key={idx} className="px-4 py-3 text-left text-sm font-semibold text-text border-b border-grey-300">
                        {processInlineMarkdown(header)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIdx) => (
                    <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-grey-50'}>
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx} className="px-4 py-3 text-sm text-text border-b border-grey-200">
                          {processInlineMarkdown(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
          
          currentIndex = tableIndex - 1;
        }
      }
      // Regular paragraphs (with inline markdown processing)
      else {
        elements.push(
          <p key={currentIndex} className="text-sm text-text-light leading-relaxed mb-3">
            {processInlineMarkdown(line)}
          </p>
        );
      }
      
      currentIndex++;
    }

    return elements;
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

      {/* Review Content with Proper Markdown Rendering */}
      <div className="space-y-4">
        {renderMarkdownContent(output)}
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