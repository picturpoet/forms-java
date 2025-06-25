import { ArrowRight, FileText, Zap, Clock, Brain, ExternalLink, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { CardTile } from '../components/ui/CardTile';

export function LandingPage() {
  const [logoError, setLogoError] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-grey/10 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="container mx-auto px-4 py-6">
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

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-10 animate-fade-in">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-7xl font-bold text-text leading-tight tracking-tight">
                Reclaim your time with{' '}
                <span className="text-brand-dark">Regal Forms</span>
              </h1>
              
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

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 pt-6">
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

          {/* Right Visual Placeholder */}
          <div className="order-first lg:order-last animate-slide-up">
            <div className="bg-gradient-to-br from-brand-light via-brand-light/80 to-mna-yellow/20 rounded-3xl p-12 lg:p-16 border border-brand-dark/10 shadow-xl">
              <div className="aspect-square flex items-center justify-center">
                {/* Enhanced placeholder for visual */}
                <div className="text-center space-y-8">
                  <div className="relative">
                    <div className="w-32 h-32 bg-brand-dark rounded-3xl mx-auto flex items-center justify-center shadow-xl">
                      <FileText className="w-16 h-16 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-mna-yellow rounded-2xl flex items-center justify-center shadow-lg">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-text">
                      Visual Coming Soon
                    </h3>
                    <p className="text-text-light leading-relaxed max-w-sm mx-auto">
                      Problem → Solution visualization showcasing the transformation from manual paperwork to AI automation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Preview */}
      <section className="bg-gradient-to-b from-brand-light/30 to-white py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-text mb-6">
              Why choose Regal Forms?
            </h2>
            <p className="text-xl text-text-light max-w-3xl mx-auto leading-relaxed">
              Built specifically for regulatory compliance, powered by cutting-edge AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
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

          {/* Trust indicators */}
          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-8 py-4 shadow-card border border-grey/10">
              <CheckCircle className="w-6 h-6 text-mna-yellow" />
              <span className="text-text font-medium">Trusted by compliance professionals</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-grey/10 py-12">
        <div className="container mx-auto px-4">
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