import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  showBackButton?: boolean;
  currentPage?: 'landing' | 'apr';
}

export function Header({ showBackButton = false, currentPage = 'landing' }: HeaderProps) {
  const [logoError, setLogoError] = useState(false);

  return (
    <header className="bg-white border-b border-grey/10 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <a 
                href="/"
                className="text-brand-dark hover:text-brand-dark/80 transition-colors p-2 rounded-xl hover:bg-brand-light group min-h-[44px] min-w-[44px] flex items-center justify-center"
                title="Back to Home"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" strokeWidth={2} />
              </a>
            )}

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

          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="https://regality.ai" 
              className="text-text-light hover:text-text transition-colors font-medium min-h-[44px] flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              About
            </a>
            <a 
              href="https://regality.ai/contact/" 
              className="text-text-light hover:text-text transition-colors font-medium min-h-[44px] flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}