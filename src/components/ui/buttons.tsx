import React from 'react';
import { cn } from '../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-dark/40 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98]";
  
  const variants = {
    primary: "bg-brand-dark hover:bg-brand-dark/90 text-white shadow-card hover:shadow-lg",
    secondary: "bg-mna-orange hover:bg-mna-orange/90 text-white shadow-card hover:shadow-lg",
    outline: "border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white hover:shadow-lg",
    ghost: "text-brand-dark hover:bg-brand-light hover:shadow-card",
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg gap-2 min-h-[44px] min-w-[44px]",
    md: "px-6 py-3 text-base rounded-xl gap-3 min-h-[44px]",
    lg: "px-8 py-4 text-lg rounded-xl gap-3 min-h-[44px]",
  };
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}