import React, { useState } from 'react';
import { Key, ExternalLink } from 'lucide-react';

interface ApiKeySetupProps {
  onApiKeySet: (apiKey: string) => void;
}

export function ApiKeySetup({ onApiKeySet }: ApiKeySetupProps) {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySet(apiKey.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Key className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">API Setup</h1>
          </div>
          <p className="text-gray-600">
            Enter your Mistral AI API key to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
              Mistral API Key
            </label>
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Continue
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 mb-2">
            Don't have an API key?
          </p>
          <a
            href="https://console.mistral.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Get one from Mistral AI
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="mt-4 text-xs text-gray-500 text-center">
          Your API key is stored locally and never shared
        </div>
      </div>
    </div>
  );
}