export function ConfigPanel() {
  return (
    <div className="space-y-4">
      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs text-blue-800">
          <strong>Analysis Configuration:</strong> Using Mistral OCR for optimal Form APR text extraction with creativity level set to 0.8 for balanced analysis results.
        </p>
      </div>
    </div>
  );
}