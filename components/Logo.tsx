import React from 'react';

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
      {/* 
        Horizontal Logo Ratio: 62x by 16x
        Contains Icon Mark (19x by 16x) and stylized Text Mark.
        Minimum 4x buffer should be handled by the parent container's padding/margin (e.g. p-4).
      */}
      <svg
        width="38"
        height="32"
        viewBox="0 0 19 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        aria-hidden="true"
      >
        <path
          d="M9.5 0L19 16H0L9.5 0Z"
          fill={isNegative ? '#FFFFFF' : '#F25C05'}
        />
        <circle
          cx="9.5"
          cy="10"
          r="3"
          fill={isNegative ? '#FFFFFF' : '#1D0B3B'}
        />
      </svg>
      <span
        className={`font-sans font-extrabold text-h3 tracking-tight select-none ${
          isNegative ? 'text-white' : 'text-brand-bg'
        }`}
      >
        NoThan<span className={isNegative ? 'text-white/95' : 'text-brand-accent'}>agentic</span>
      </span>
    </div>
  );
};
