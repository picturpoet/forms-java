import { ArrowRight, FileText, Zap, Clock, Brain, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export function LandingPage() {
  const [logoError, setLogoError] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-grey-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded"></div>
                </div>
              )}
              
              <h1 className="text-primary-600 text-2xl font-garamond font-medium">
                Regality AI
              </h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a 
                href="https://regality.ai" 
                className="text-text-light hover:text-text transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                About
              </a>
              <a 
                href="https://regality.ai/contact/" 
                className="text-text-light hover:text-text transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-text leading-tight">
                Reclaim your time with{' '}
                <span className="text-primary-600">Regal Forms</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-text-light leading-relaxed">
                Your brain wasn't built to babysit paperwork. Let it do something that matters.
              </p>
            </div>

            {/* Problem Statement */}
            <div className="bg-grey-50 rounded-2xl p-6 border border-grey-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent-orange rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text mb-2">
                    Forms are soul-crushing
                  </h3>
                  <p className="text-text-light">
                    Hours spent on repetitive data entry, cross-referencing documents, 
                    and ensuring compliance. There has to be a better way.
                  </p>
                </div>
              </div>
            </div>

            {/* Solution Statement */}
            <div className="bg-primary-50 rounded-2xl p-6 border border-primary-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text mb-2">
                    AI does the heavy lifting
                  </h3>
                  <p className="text-text-light">
                    Upload your documents, let our AI analyze, cross-reference, and flag issues. 
                    Get compliance-ready reports in minutes, not hours.
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="/apr"
                className="inline-flex items-center justify-center gap-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl group"
              >
                <Zap className="w-5 h-5" />
                Try Forms
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a
                href="https://regality.ai/contact/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white hover:bg-grey-50 text-primary-600 font-semibold px-8 py-4 rounded-xl border-2 border-primary-600 transition-all duration-200 hover:shadow-lg group"
              >
                Contact Sales
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Visual Placeholder */}
          <div className="order-first lg:order-last">
            <div className="bg-gradient-to-br from-primary-100 to-accent-yellow-light rounded-3xl p-8 lg:p-12 border border-primary-200">
              <div className="aspect-square flex items-center justify-center">
                {/* Placeholder for your visual */}
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-primary-600 rounded-2xl mx-auto flex items-center justify-center">
                    <FileText className="w-12 h-12 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-text">
                      Visual Coming Soon
                    </h3>
                    <p className="text-text-light">
                      Problem → Solution visualization will be placed here
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Preview */}
      <section className="bg-grey-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4">
              Why choose Regal Forms?
            </h2>
            <p className="text-lg text-text-light max-w-2xl mx-auto">
              Built specifically for regulatory compliance, powered by cutting-edge AI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-grey-200">
              <div className="w-12 h-12 bg-accent-yellow rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-text mb-2">
                Lightning Fast
              </h3>
              <p className="text-text-light">
                What takes hours manually, our AI completes in minutes with higher accuracy
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-grey-200">
              <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-text mb-2">
                FEMA Compliant
              </h3>
              <p className="text-text-light">
                Built for Indian regulatory requirements with deep domain expertise
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-grey-200">
              <div className="w-12 h-12 bg-accent-orange rounded-xl flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-text mb-2">
                AI-Powered
              </h3>
              <p className="text-text-light">
                Advanced OCR and document analysis using state-of-the-art models
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-grey-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Logo with fallback */}
              {!logoError ? (
                <img 
                  src="/logo.png" 
                  alt="Regality AI Logo" 
                  className="w-8 h-8 rounded-lg object-cover"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded"></div>
                </div>
              )}
              <span className="text-text-light">
                © 2025 Regality AI. Built for regulatory excellence.
              </span>
            </div>
            
            <div className="flex items-center gap-6">
              <a 
                href="https://regality.ai" 
                className="text-text-light hover:text-text transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                About Regality
              </a>
              <a 
                href="https://regality.ai/contact/" 
                className="text-text-light hover:text-text transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}