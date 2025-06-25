import { Download, FileText, AlertCircle, CheckCircle, Clock, Table, Copy, Brain } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/buttons';

interface ReviewOutputProps {
  output: string;
  isAnalyzing: boolean;
}

export function ReviewOutput({ output, isAnalyzing }: ReviewOutputProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

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

  const copyToClipboard = async (text: string, sectionName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(sectionName);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const processInlineMarkdown = (text: string): JSX.Element => {
    // Handle bold text (**text**)
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    
    return (
      <>
        {parts.map((part, index) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            const boldText = part.slice(2, -2);
            return <strong key={index} className="font-semibold text-text">{boldText}</strong>;
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
        
        // Special handling for Document Deficiency List
        if (text.toLowerCase().includes('document deficiency') || text.toLowerCase().includes('deficiency list')) {
          // Find the content for this section
          let sectionContent = '';
          let sectionIndex = currentIndex + 1;
          
          // Collect all content until next major header or end
          while (sectionIndex < lines.length) {
            const nextLine = lines[sectionIndex].trim();
            if (nextLine.startsWith('#') && (nextLine.match(/^#+/) || [''])[0].length <= level) {
              break;
            }
            sectionContent += lines[sectionIndex] + '\n';
            sectionIndex++;
          }
          
          // Clean up the content for copying
          const cleanContent = sectionContent
            .split('\n')
            .filter(line => line.trim())
            .map(line => line.replace(/^[-•]\s*/, '• '))
            .join('\n');
          
          elements.push(
            <div key={currentIndex} className="mb-8">
              <div className="bg-gradient-to-r from-red-50 to-red-50/50 border border-red-200 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold text-red-800 flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-white" strokeWidth={2} />
                    </div>
                    {text}
                  </h3>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => copyToClipboard(cleanContent, 'deficiency-list')}
                    className="bg-red-100 hover:bg-red-200 text-red-700 border-red-300"
                  >
                    <Copy className="w-4 h-4" strokeWidth={2} />
                    {copiedSection === 'deficiency-list' ? 'Copied!' : 'Copy List'}
                  </Button>
                </div>
                
                <div className="bg-white rounded-xl p-6 border border-red-200 shadow-card">
                  <div className="font-mono text-sm text-text leading-relaxed whitespace-pre-wrap">
                    {cleanContent || 'No deficiencies found.'}
                  </div>
                </div>
                
                <p className="text-xs text-red-600 mt-4 flex items-center gap-2">
                  <AlertCircle className="w-3 h-3" strokeWidth={2} />
                  Copy this list to share with your client or compliance team
                </p>
              </div>
            </div>
          );
          
          currentIndex = sectionIndex - 1;
        }
        // Regular headers
        else if (level === 1) {
          elements.push(
            <h1 key={currentIndex} className="text-4xl font-bold text-text mb-8 border-b-2 border-brand-dark/20 pb-4">
              {processInlineMarkdown(text)}
            </h1>
          );
        } else if (level === 2) {
          elements.push(
            <h2 key={currentIndex} className="text-3xl font-semibold text-text mb-6 border-b border-grey/20 pb-3 mt-12">
              {processInlineMarkdown(text)}
            </h2>
          );
        } else if (level === 3) {
          elements.push(
            <h3 key={currentIndex} className="text-2xl font-medium text-text mb-4 mt-8">
              {processInlineMarkdown(text)}
            </h3>
          );
        } else {
          elements.push(
            <h4 key={currentIndex} className="text-xl font-medium text-text mb-3 mt-6">
              {processInlineMarkdown(text)}
            </h4>
          );
        }
      }
      // Bold text (standalone lines)
      else if (line.startsWith('**') && line.endsWith('**')) {
        const text = line.replace(/^\*\*|\*\*$/g, '');
        elements.push(
          <p key={currentIndex} className="font-semibold text-text mb-3 text-lg">
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
            className={`p-6 rounded-2xl border-l-4 mb-6 shadow-card ${
              isSuccess
                ? 'bg-gradient-to-r from-green-50 to-green-50/50 border-mna-yellow'
                : isWarning
                ? 'bg-gradient-to-r from-yellow-50 to-yellow-50/50 border-mna-orange'
                : isError
                ? 'bg-gradient-to-r from-red-50 to-red-50/50 border-red-400'
                : 'bg-gradient-to-r from-brand-light to-brand-light/50 border-grey'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isSuccess ? 'bg-mna-yellow' : isError ? 'bg-red-500' : 'bg-mna-orange'
              }`}>
                {isSuccess && <CheckCircle className="w-5 h-5 text-white" strokeWidth={2} />}
                {(isWarning || isError) && <AlertCircle className="w-5 h-5 text-white" strokeWidth={2} />}
              </div>
              <div className="text-text leading-relaxed flex-1">
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
            <li key={listIndex} className="mb-2">
              {processInlineMarkdown(text)}
            </li>
          );
          listIndex++;
        }
        
        const isOrdered = lines[currentIndex].trim().match(/^\d+\./);
        const ListTag = isOrdered ? 'ol' : 'ul';
        const listClass = isOrdered ? 'list-decimal list-inside' : 'list-disc list-inside';
        
        elements.push(
          <ListTag key={currentIndex} className={`${listClass} text-text-light mb-6 space-y-2 bg-brand-light/30 p-6 rounded-2xl border border-brand-dark/10`}>
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
            <div key={currentIndex} className="mb-8 overflow-x-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-brand-dark rounded-lg flex items-center justify-center">
                  <Table className="w-4 h-4 text-white" strokeWidth={2} />
                </div>
                <span className="text-lg font-semibold text-text">Review Table</span>
              </div>
              <table className="w-full border border-grey/20 rounded-2xl overflow-hidden shadow-card">
                <thead className="bg-brand-light">
                  <tr>
                    {headers.map((header, idx) => (
                      <th key={idx} className="px-6 py-4 text-left font-semibold text-text border-b border-grey/20">
                        {processInlineMarkdown(header)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIdx) => (
                    <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-brand-light/20'}>
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx} className="px-6 py-4 text-text-light border-b border-grey/10">
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
          <p key={currentIndex} className="text-text-light leading-relaxed mb-4">
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
      <div className="flex flex-col items-center justify-center py-16 text-center loading">
        <div className="w-20 h-20 border-4 border-brand-light border-t-brand-dark rounded-full animate-spin mb-6"></div>
        <h3 className="text-2xl font-semibold text-text mb-4">
          AI Analysis in Progress
        </h3>
        <p className="text-text-light max-w-md mb-6 leading-relaxed">
          Our Mistral AI is processing your documents with OCR technology for comprehensive FEMA compliance review...
        </p>
        <div className="flex items-center gap-3 text-brand-dark bg-brand-light rounded-xl px-6 py-3">
          <Clock className="w-5 h-5" strokeWidth={2} />
          <span className="font-medium">This may take 1-3 minutes depending on document complexity</span>
        </div>
      </div>
    );
  }

  if (!output) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 bg-brand-light rounded-2xl flex items-center justify-center mb-6">
          <FileText className="w-10 h-10 text-brand-dark" strokeWidth={2} />
        </div>
        <h3 className="text-2xl font-semibold text-text mb-4">
          Ready for Analysis
        </h3>
        <p className="text-text-light max-w-md leading-relaxed">
          Upload your Form APR and click "Start Analysis" to begin the AI-powered compliance review using Mistral OCR technology.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Download Button */}
      <div className="flex justify-end">
        <Button
          onClick={downloadReport}
          variant="secondary"
          className="bg-mna-yellow hover:bg-mna-orange text-white shadow-card"
        >
          <Download className="w-4 h-4" strokeWidth={2} />
          Download Report
        </Button>
      </div>

      {/* Review Content with Proper Markdown Rendering */}
      <div className="space-y-6">
        {renderMarkdownContent(output)}
      </div>

      {/* Analysis Info Footer */}
      <div className="mt-12 p-8 bg-gradient-to-r from-brand-light to-brand-light/50 rounded-2xl border border-brand-dark/20 shadow-card">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-10 h-10 bg-brand-dark rounded-xl flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <span className="text-lg font-semibold text-brand-dark">Analysis completed using Mistral AI with OCR technology</span>
        </div>
        <p className="text-text-light">
          This report was generated by AI and should be reviewed by a qualified professional before submission.
        </p>
      </div>
    </div>
  );
}
