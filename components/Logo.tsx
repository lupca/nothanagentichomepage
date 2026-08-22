import React from 'react';

export interface LogoProps {
  variant?: 'color' | 'negative';
  showWordmark?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'color',
  showWordmark = true,
  className = '',
}) => {
  const isNegative = variant === 'negative';
  const navyStroke = isNegative ? '#FFFFFF' : '#1B1B4B';
  const orange = '#E8541E';

  return (
    <div
      className={`inline-flex items-center gap-3 ${className}`}
      aria-label="Nỏ Thần Agentic Logo"
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        role="img"
        aria-hidden="true"
      >
        {/* Outward-pointing chevrons forming a diamond/kite outline */}
        <path
          d="M24 4 L44 24 L24 30 L4 24 Z"
          stroke={navyStroke}
          strokeWidth="2.25"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M24 30 L38 32 L24 44 L10 32 Z"
          stroke={navyStroke}
          strokeWidth="2.25"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Upward arrow shaft through the vertical center */}
        <line x1="24" y1="38" x2="24" y2="12" stroke={orange} strokeWidth="2.5" strokeLinecap="round" />
        <path
          d="M17 18 L24 9 L31 18"
          stroke={orange}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Circuit-node circles at the base */}
        <line x1="16" y1="36" x2="24" y2="38" stroke={navyStroke} strokeWidth="1.25" />
        <line x1="32" y1="36" x2="24" y2="38" stroke={navyStroke} strokeWidth="1.25" />
        <circle cx="24" cy="38" r="3" fill={orange} />
        <circle cx="16" cy="36" r="1.75" fill={navyStroke} />
        <circle cx="32" cy="36" r="1.75" fill={navyStroke} />
      </svg>

      {showWordmark && (
        <span
          className={`font-display font-bold text-h3 tracking-tight select-none ${
            isNegative ? 'text-white' : 'text-navy'
          }`}
        >
          NỎ THẦN<span className="text-orange"> AGENTIC</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
