interface AnalysisConfig {
  model: string;
}

interface ConfigPanelProps {
  config: AnalysisConfig;
  onConfigChange: (config: AnalysisConfig) => void;
}

export function ConfigPanel({ config, onConfigChange }: ConfigPanelProps) {
  const models = [
    { value: 'mistral-ocr-latest', label: 'Mistral OCR (Recommended)' },
    { value: 'mistral-large-latest', label: 'Mistral Large' },
    { value: 'mistral-medium-latest', label: 'Mistral Medium' }
  ];

  return (
    <div className="space-y-4">
      {/* Model Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          AI Model
        </label>
        <select
          value={config.model}
          onChange={(e) => onConfigChange({ ...config, model: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          {models.map((model) => (
            <option key={model.value} value={model.value}>
              {model.label}
            </option>
          ))}
        </select>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs text-blue-800">
          <strong>Mistral OCR</strong> is recommended for Form APR analysis as it can extract text directly from PDF images. Analysis creativity is set to 0.8 for optimal results.
        </p>
      </div>
    </div>
  );
}