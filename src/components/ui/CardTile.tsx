import React from 'react';
import { cn } from '../utils/cn';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface CardTileProps {
  title: string;
  description: string;
  href?: string;
  icon?: LucideIcon;
  className?: string;
  onClick?: () => void;
}

export function CardTile({
  title,
  description,
  href,
  icon: Icon,
  className,
  onClick,
}: CardTileProps) {
  const baseStyles = cn(
    'group relative flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-card transition-all duration-200 hover:shadow-lg transform hover:-translate-y-[2px] active:translate-y-0',
    'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-dark/40',
    'border border-grey/10 hover:border-grey/20',
    'cursor-pointer',
    className
  );

  const content = (
    <>
      {Icon && (
        <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center transition-all duration-200 group-hover:bg-brand-dark group-hover:shadow-lg">
          <Icon className="w-6 h-6 text-brand-dark transition-all duration-200 group-hover:text-white" strokeWidth={2} />
        </div>
      )}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-text group-hover:text-brand-dark transition-colors duration-200">{title}</h3>
        <p className="text-text-light leading-relaxed">{description}</p>
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} className={baseStyles} tabIndex={0}>
        {content}
      </a>
    );
  }

  return (
    <div className={baseStyles} onClick={onClick} tabIndex={0} role="button" onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.();
      }
    }}>
      {content}
    </div>
  );
}