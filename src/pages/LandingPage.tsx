import { ArrowRight, FileText, Zap, Clock, Brain, ExternalLink, CheckCircle, Monitor, Smartphone, ZapIcon, ClockIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { CardTile } from '../components/ui/CardTile';
import { Header } from '../components/Header';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="landing" />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 pt-8 pb-12">
        {/* Hero Content */}
        <div className="text-center space-y-6 mb-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-tight tracking-tight">
              Reclaim your time with{' '}
              <span className="text-brand-dark">Regal Forms</span>
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-text-light leading-relaxed font-light max-w-4xl mx-auto">
              Your brain wasn't built to babysit paperwork. Let it do something that matters.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="group"
              onClick={() => window.location.href = '/apr'}
            >
              <ZapIcon className="w-5 h-5 transition-all duration-200 group-hover:fill-current" strokeWidth={2} />
              Try Forms
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2} />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="group"
              onClick={() => window.open('https://regality.ai/contact/', '_blank')}
            >
              Contact Sales
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2} />
            </Button>
          </div>
        </div>

        {/* Visual Mockup */}
        <div className="mb-12">
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-brand-light via-brand-light/80 to-mna-yellow/20 rounded-3xl p-2 shadow-2xl border border-brand-dark/10">
              <div className="bg-white/90 backdrop-blur-sm rounded-t-2xl px-6 py-3 border-b border-grey/10">
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
              
              <div className="bg-white rounded-b-2xl p-6 md:p-8 min-h-[350px] md:min-h-[400px]">
                <div className="space-y-6">
                  <div className="text-center space-y-3">
                    <h4 className="text-base md:text-lg font-semibold text-text flex items-center justify-center gap-2">
                      <ClockIcon className="w-4 h-4 md:w-5 md:h-5 text-mna-orange transition-all duration-200 hover:fill-current" strokeWidth={2} />
                      Before: Manual Process
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center shadow-card hover:shadow-lg transition-all duration-200 transform hover:-translate-y-[1px]">
                        <FileText className="w-8 h-8 text-red-600 mx-auto mb-2" strokeWidth={2} />
                        <p className="text-sm text-red-700 font-medium">Hours of Reading</p>
                      </div>
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center shadow-card hover:shadow-lg transition-all duration-200 transform hover:-translate-y-[1px]">
                        <Monitor className="w-8 h-8 text-red-600 mx-auto mb-2" strokeWidth={2} />
                        <p className="text-sm text-red-700 font-medium">Manual Cross-Check</p>
                      </div>
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center shadow-card hover:shadow-lg transition-all duration-200 transform hover:-translate-y-[1px]">
                        <Brain className="w-8 h-8 text-red-600 mx-auto mb-2" strokeWidth={2} />
                        <p className="text-sm text-red-700 font-medium">Human Error Risk</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-12 h-12 bg-brand-dark rounded-full flex items-center justify-center shadow-card hover:shadow-lg transition-all duration-200 transform hover:-translate-y-[1px]">
                      <ArrowRight className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>
                  </div>

                  <div className="text-center space-y-3">
                    <h4 className="text-base md:text-lg font-semibold text-text flex items-center justify-center gap-2">
                      <ZapIcon className="w-4 h-4 md:w-5 md:h-5 text-mna-yellow transition-all duration-200 hover:fill-current" strokeWidth={2} />
                      After: AI Automation
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center shadow-card hover:shadow-lg transition-all duration-200 transform hover:-translate-y-[1px]">
                        <Brain className="w-8 h-8 text-green-600 mx-auto mb-2" strokeWidth={2} />
                        <p className="text-sm text-green-700 font-medium">AI OCR Analysis</p>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center shadow-card hover:shadow-lg transition-all duration-200 transform hover:-translate-y-[1px]">
                        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" strokeWidth={2} />
                        <p className="text-sm text-green-700 font-medium">Auto Compliance</p>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center shadow-card hover:shadow-lg transition-all duration-200 transform hover:-translate-y-[1px]">
                        <ClockIcon className="w-8 h-8 text-green-600 mx-auto mb-2 transition-all duration-200 hover:fill-current" strokeWidth={2} />
                        <p className="text-sm text-green-700 font-medium">Minutes Not Hours</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Problem/Solution Section */}
      <section className="bg-gradient-to-b from-brand-light/30 to-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-4">
              In the AI era, everyone should do smarter work
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <div className="bg-gradient-to-r from-mna-orange/10 to-mna-orange/5 rounded-2xl p-8 border border-mna-orange/20 shadow-card hover:shadow-lg transition-all duration-200 transform hover:-translate-y-[2px]">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 bg-mna-orange rounded-2xl flex items-center justify-center shadow-card">
                  <ClockIcon className="w-7 h-7 text-white transition-all duration-200 hover:fill-current" strokeWidth={2} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold text-text">
                    Forms are soul-crushing
                  </h3>
                  <p className="text-text-light leading-relaxed">
                    Hours spent on repetitive data entry, cross-referencing documents, 
                    and ensuring compliance. There has to be a better way.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-brand-light to-brand-light/50 rounded-2xl p-8 border border-brand-dark/20 shadow-card hover:shadow-lg transition-all duration-200 transform hover:-translate-y-[2px]">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 bg-brand-dark rounded-2xl flex items-center justify-center shadow-card">
                  <Brain className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold text-text">
                    AI does the heavy lifting
                  </h3>
                  <p className="text-text-light leading-relaxed">
                    Upload your documents, let our AI analyze, cross-reference, and flag issues. 
                    Get compliance-ready reports in minutes, not hours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-4">
              Why choose Regal Forms?
            </h2>
            <p className="text-lg md:text-xl text-text-light max-w-3xl mx-auto leading-relaxed">
              Built specifically for regulatory compliance, powered by cutting-edge AI technology
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <CardTile
              icon={ZapIcon}
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
          <div className="mt-16 text-center">
            <div className="space-y-4">
              <p className="text-text-light text-sm font-medium">Trusted by leading compliance professionals</p>
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-card border border-grey/10 hover:border-brand-dark/20 transition-all duration-200 transform hover:-translate-y-[1px] group">
                  <div className="w-6 h-6 bg-brand-dark rounded group-hover:bg-mna-yellow transition-colors duration-200"></div>
                  <span className="text-text-light font-medium group-hover:text-text transition-colors duration-200">RegTech Partners</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-card border border-grey/10 hover:border-brand-dark/20 transition-all duration-200 transform hover:-translate-y-[1px] group">
                  <div className="w-6 h-6 bg-brand-dark rounded group-hover:bg-mna-orange transition-colors duration-200"></div>
                  <span className="text-text-light font-medium group-hover:text-text transition-colors duration-200">Compliance Experts</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-card border border-grey/10 hover:border-brand-dark/20 transition-all duration-200 transform hover:-translate-y-[1px] group">
                  <div className="w-6 h-6 bg-brand-dark rounded group-hover:bg-mna-yellow transition-colors duration-200"></div>
                  <span className="text-text-light font-medium group-hover:text-text transition-colors duration-200">Financial Advisors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-grey/10 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-brand-dark rounded-lg flex items-center justify-center shadow-card">
                <div className="w-4 h-4 bg-white rounded"></div>
              </div>
              <span className="text-text-light font-medium">
                © 2025 Regality AI. Built for regulatory excellence.
              </span>
            </div>
            
            <div className="flex items-center gap-8">
              <a 
                href="https://regality.ai" 
                className="text-text-light hover:text-text transition-colors font-medium min-h-[44px] flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                About Regality
              </a>
              <a 
                href="https://regality.ai/contact/" 
                className="text-text-light hover:text-text transition-colors font-medium min-h-[44px] flex items-center"
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