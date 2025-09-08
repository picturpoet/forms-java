import { useState } from 'react';
import { ANALYSIS_MODELS } from '../services/openRouterApi';
import { Button } from './ui/buttons';
import { AlertCircle, CheckCircle } from 'lucide-react';

export function DiagnosticTest() {
  const [testResults, setTestResults] = useState<{
    apiKeyPresent: boolean;
    connectionTest?: 'success' | 'error';
    error?: string;
  }>({ apiKeyPresent: true });
  const [isRunning, setIsRunning] = useState(false);

  const runDiagnostic = async () => {
    setIsRunning(true);
    const results: typeof testResults = {
      apiKeyPresent: true // Always true since we use server-side proxy
    };

    try {
      // Test connection through our Netlify Function proxy
      const testResponse = await fetch(`${window.location.origin}/.netlify/functions/openrouter-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "mistral/mistral-medium-latest",
          messages: [
            {
              role: "user",
              content: "Hello! This is a test connection. Please respond with 'Connection successful!'"
            }
          ],
          max_tokens: 50
        })
      });

      if (testResponse.ok) {
        const data = await testResponse.json();
        results.connectionTest = 'success';
        console.log('Test response:', data);
      } else {
        const errorText = await testResponse.text();
        results.connectionTest = 'error';
        results.error = `HTTP ${testResponse.status}: ${testResponse.statusText} - ${errorText}`;
      }
    } catch (error) {
      results.connectionTest = 'error';
      results.error = error instanceof Error ? error.message : 'Unknown error';
    }

    setTestResults(results);
    setIsRunning(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border border-grey/10 p-6">
      <h3 className="text-lg font-semibold text-text mb-4">
        🔧 Open Router Integration Diagnostic
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          {testResults.apiKeyPresent ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600" />
          )}
          <span className="text-sm">
            Server Configuration: {testResults.apiKeyPresent ? 'Ready' : 'Error'}
          </span>
        </div>

        {testResults.connectionTest && (
          <div className="flex items-center gap-3">
            {testResults.connectionTest === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600" />
            )}
            <span className="text-sm">
              Connection Test: {testResults.connectionTest === 'success' ? 'Success' : 'Failed'}
            </span>
          </div>
        )}

        {testResults.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-700 font-medium">Error:</p>
            <p className="text-sm text-red-600">{testResults.error}</p>
          </div>
        )}

        <div>
          <p className="text-sm text-text-light mb-2">Available Models:</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(ANALYSIS_MODELS).map(([key, name]) => (
              <span key={key} className="px-2 py-1 bg-brand-light rounded text-xs text-brand-dark">
                {name}
              </span>
            ))}
          </div>
        </div>

        <Button 
          onClick={runDiagnostic} 
          disabled={isRunning}
          className="w-full"
        >
          {isRunning ? 'Running Diagnostic...' : 'Run Diagnostic Test'}
        </Button>
      </div>
    </div>
  );
}