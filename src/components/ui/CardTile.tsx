import React from 'react';
import { cn } from '../utils/cn';
import { LucideIcon } from 'lucide-react';

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
    'group relative flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-card transition-all duration-200 hover:shadow-lg',
    'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-dark/40',
    'border border-grey/10 hover:border-grey/20',
    className
  );

  const content = (
    <>
      {Icon && (
        <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-brand-dark" />
        </div>
      )}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-text">{title}</h3>
        <p className="text-text-light leading-relaxed">{description}</p>
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} className={baseStyles}>
        {content}
      </a>
    );
  }

  return (
    <div className={baseStyles} onClick={onClick}>
      {content}
    </div>
  );
}