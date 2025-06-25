import { ArrowRight, FileText, Zap, Clock, Brain, ExternalLink, CheckCircle, Monitor, Smartphone } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { CardTile } from '../components/ui/CardTile';

export function LandingPage() {
  const [logoError, setLogoError] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-grey/10 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Logo with fallback */}
              {!logoError ? (
                <img 
                  src="/logo.png" 
                  alt="Regality AI Logo" 
                  className="w-10 h-10 rounded-xl object-cover shadow-card"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="w-10 h-10 bg-brand-dark rounded-xl flex items-center justify-center shadow-card">
                  <div className="w-6 h-6 bg-white rounded"></div>
                </div>
              )}
              
              <h1 className="text-brand-dark text-2xl font-garamond font-semibold">
                Regality AI
              </h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a 
                href="https://regality.ai" 
                className="text-text-light hover:text-text transition-colors font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                About
              </a>
              <a 
                href="https://regality.ai/contact/" 
                className="text-text-light hover:text-text transition-colors font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - Reduced from py-32 to py-16 */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left Content - 6 columns */}
          <div className="lg:col-span-6 space-y-12 animate-fade-in">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-7xl font-bold text-text leading-tight tracking-tight">
                Reclaim your time with{' '}
                <span className="text-brand-dark">Regal Forms</span>
              </h1>
              
              {/* 3x spacing from H1 to body copy */}
              <p className="text-xl lg:text-2xl text-text-light leading-relaxed font-light">
                Your brain wasn't built to babysit paperwork. Let it do something that matters.
              </p>
            </div>

            {/* Problem Statement */}
            <div className="bg-gradient-to-r from-mna-orange/10 to-mna-orange/5 rounded-2xl p-8 border border-mna-orange/20">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-mna-orange rounded-2xl flex items-center justify-center flex-shrink-0 shadow-card">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-text">
                    Forms are soul-crushing
                  </h3>
                  <p className="text-text-light leading-relaxed">
                    Hours spent on repetitive data entry, cross-referencing documents, 
                    and ensuring compliance. There has to be a better way.
                  </p>
                </div>
              </div>
            </div>

            {/* Solution Statement */}
            <div className="bg-gradient-to-r from-brand-light to-brand-light/50 rounded-2xl p-8 border border-brand-dark/20">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-brand-dark rounded-2xl flex items-center justify-center flex-shrink-0 shadow-card">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-text">
                    AI does the heavy lifting
                  </h3>
                  <p className="text-text-light leading-relaxed">
                    Upload your documents, let our AI analyze, cross-reference, and flag issues. 
                    Get compliance-ready reports in minutes, not hours.
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs - 4x spacing from body to CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 pt-8">
              <Button
                size="lg"
                className="group"
                onClick={() => window.location.href = '/apr'}
              >
                <Zap className="w-5 h-5" />
                Try Forms
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="group"
                onClick={() => window.open('https://regality.ai/contact/', '_blank')}
              >
                Contact Sales
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Right Visual - 6 columns with Mac-style mockup */}
          <div className="lg:col-span-6 order-first lg:order-last animate-slide-up">
            <div className="relative">
              {/* Mac Window Frame */}
              <div className="bg-gradient-to-br from-brand-light via-brand-light/80 to-mna-yellow/20 rounded-3xl p-2 shadow-2xl border border-brand-dark/10">
                {/* Window Header */}
                <div className="bg-white/90 backdrop-blur-sm rounded-t-2xl px-6 py-4 border-b border-grey/10">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex-1 text-center">
                      <div className="bg-grey/10 rounded-lg px-4 py-1 text-sm text-text-light inline-block">
                        forms.regality.ai/apr
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Window Content */}
                <div className="bg-white rounded-b-2xl p-8 min-h-[400px]">
                  {/* Before/After Visualization */}
                  <div className="space-y-8">
                    {/* Before - Manual Process */}
                    <div className="text-center space-y-4">
                      <h4 className="text-lg font-semibold text-text flex items-center justify-center gap-2">
                        <Clock className="w-5 h-5 text-mna-orange" />
                        Before: Manual Process
                      </h4>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                          <FileText className="w-8 h-8 text-red-600 mx-auto mb-2" />
                          <p className="text-xs text-red-700 font-medium">Hours of Reading</p>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                          <Monitor className="w-8 h-8 text-red-600 mx-auto mb-2" />
                          <p className="text-xs text-red-700 font-medium">Manual Cross-Check</p>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                          <Brain className="w-8 h-8 text-red-600 mx-auto mb-2" />
                          <p className="text-xs text-red-700 font-medium">Human Error Risk</p>
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center">
                      <div className="w-12 h-12 bg-brand-dark rounded-full flex items-center justify-center">
                        <ArrowRight className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* After - AI Process */}
                    <div className="text-center space-y-4">
                      <h4 className="text-lg font-semibold text-text flex items-center justify-center gap-2">
                        <Zap className="w-5 h-5 text-mna-yellow" />
                        After: AI Automation
                      </h4>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                          <Brain className="w-8 h-8 text-green-600 mx-auto mb-2" />
                          <p className="text-xs text-green-700 font-medium">AI OCR Analysis</p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                          <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                          <p className="text-xs text-green-700 font-medium">Auto Compliance</p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                          <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                          <p className="text-xs text-green-700 font-medium">Minutes Not Hours</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Preview - Consistent container and 4-col grid */}
      <section className="bg-gradient-to-b from-brand-light/30 to-white py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-text mb-8">
              Why choose Regal Forms?
            </h2>
            <p className="text-xl text-text-light max-w-3xl mx-auto leading-relaxed">
              Built specifically for regulatory compliance, powered by cutting-edge AI technology
            </p>
          </div>

          {/* 4-column grid aligned to 12-col system */}
          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8">
            <CardTile
              icon={Zap}
              title="Lightning Fast"
              description="What takes hours manually, our AI completes in minutes with higher accuracy and comprehensive analysis."
            />

            <CardTile
              icon={FileText}
              title="FEMA Compliant"
              description="Built for Indian regulatory requirements with deep domain expertise and up-to-date compliance rules."
            />

            <CardTile
              icon={Brain}
              title="AI-Powered"
              description="Advanced OCR and document analysis using state-of-the-art Mistral AI models for precision."
            />
          </div>

          {/* Trust indicators - 8x section padding */}
          <div className="mt-32 text-center">
            <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-8 py-4 shadow-card border border-grey/10">
              <CheckCircle className="w-6 h-6 text-mna-yellow" />
              <span className="text-text font-medium">Trusted by compliance professionals</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Consistent container */}
      <footer className="bg-white border-t border-grey/10 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {/* Logo with fallback */}
              {!logoError ? (
                <img 
                  src="/logo.png" 
                  alt="Regality AI Logo" 
                  className="w-8 h-8 rounded-lg object-cover shadow-card"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="w-8 h-8 bg-brand-dark rounded-lg flex items-center justify-center shadow-card">
                  <div className="w-4 h-4 bg-white rounded"></div>
                </div>
              )}
              <span className="text-text-light font-medium">
                © 2025 Regality AI. Built for regulatory excellence.
              </span>
            </div>
            
            <div className="flex items-center gap-8">
              <a 
                href="https://regality.ai" 
                className="text-text-light hover:text-text transition-colors font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                About Regality
              </a>
              <a 
                href="https://regality.ai/contact/" 
                className="text-text-light hover:text-text transition-colors font-medium"
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