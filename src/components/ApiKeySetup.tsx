import { useState, useEffect } from 'react';
import { Key, ExternalLink } from 'lucide-react';

interface ApiKeySetupProps {
  onApiKeySet: (apiKey: string) => void;
}

export function ApiKeySetup({ onApiKeySet }: ApiKeySetupProps) {
  const [apiKey, setApiKey] = useState('');
  const [hasDefaultKey, setHasDefaultKey] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    // Check for environment variable (build-time)
    const defaultKey = import.meta.env.VITE_MISTRAL_API_KEY;
    if (defaultKey) {
      setHasDefaultKey(true);
      // Optionally auto-set the default key
      // onApiKeySet(defaultKey);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySet(apiKey.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Header Bar */}
      <header className="bg-primary-600 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            {/* Logo with fallback */}
            {!logoError ? (
              <img 
                src="/logo.png" 
                alt="Regality AI Logo" 
                className="w-10 h-10 rounded-lg object-cover"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-primary-600 rounded"></div>
              </div>
            )}
            
            {/* Brand Name */}
            <h1 className="text-white text-2xl font-garamond font-medium">
              Regality AI
            </h1>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center p-4 py-16">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border border-grey-200">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Key className="w-8 h-8 text-primary-600" />
              <h2 className="text-2xl font-bold text-text">API Setup</h2>
            </div>
            <p className="text-text-light">
              Enter your Mistral AI API key to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-text mb-2">
                Mistral API Key
              </label>
              <input
                type="password"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={hasDefaultKey ? "Using default key or enter your own..." : "Enter your API key..."}
                className="w-full px-4 py-3 border border-grey-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                required={!hasDefaultKey}
              />
            </div>

            {hasDefaultKey && (
              <button
                type="button"
                onClick={() => onApiKeySet(import.meta.env.VITE_MISTRAL_API_KEY!)}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 mb-2"
              >
                Use Default API Key
              </button>
            )}

            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              {hasDefaultKey ? "Use Custom Key" : "Continue"}
            </button>
          </form>

          <div className="mt-6 p-4 bg-accent-yellow-light rounded-lg border border-accent-yellow">
            <p className="text-sm text-text mb-2">
              Don't have an API key?
            </p>
            <a
              href="https://console.mistral.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-800 font-medium"
            >
              Get one from Mistral AI
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="mt-4 text-xs text-text-light text-center">
            Your API key is stored locally and never shared
          </div>
        </div>
      </div>
    </div>
  );
}