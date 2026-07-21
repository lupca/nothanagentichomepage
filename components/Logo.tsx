import React from 'react';
import Image from 'next/image';

export interface LogoProps {
  variant?: 'color' | 'negative';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'color', className = '' }) => {
  const isNegative = variant === 'negative';

  return (
    <div 
      className={`inline-flex items-center gap-3 ${className}`} 
      aria-label="NoThanagentic Logo"
    >
      <div className="relative w-10 h-10 overflow-hidden rounded-md flex-shrink-0">
        <Image 
          src="/logo.jpeg" 
          alt="NoThanagentic Logo" 
          fill
          sizes="40px"
          className="object-cover"
        />
      </div>
      <span
        className={`font-sans font-extrabold text-h3 tracking-tight select-none ${
          isNegative ? 'text-white' : 'text-brand-bg'
        }`}
      >
        NỎ THẦN<span className={isNegative ? 'text-white/95' : 'text-brand-accent'}> AGENTIC</span>
      </span>
    </div>
  );
};
