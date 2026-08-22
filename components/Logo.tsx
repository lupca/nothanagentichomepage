import React from 'react';
import Image from 'next/image';

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

  return (
    <div
      className={`inline-flex items-center gap-3 ${className}`}
      aria-label="Nỏ Thần Agentic Logo"
    >
      <Image
        src={isNegative ? '/logo-icon-negative.png' : '/logo-icon-color.png'}
        alt=""
        width={40}
        height={40}
        className="shrink-0 select-none"
        priority
      />

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
