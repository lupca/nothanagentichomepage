'use client';

import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

export interface StatCounterProps {
  /** The full stat string exactly as it should read once settled, e.g. "126/126", "< 3s", "6". */
  value: string;
  className?: string;
}

interface Token {
  text: string;
  /** Numeric target for this token, or null if it's a literal separator/prefix/suffix. */
  target: number | null;
}

/**
 * Splits a stat string into animatable numeric runs and literal text runs, so
 * prefixes, suffixes, and separators (e.g. "< ", "s", "/") stay intact while
 * only the digits count up.
 */
function parseTokens(value: string): Token[] {
  const tokens: Token[] = [];
  const re = /\d+/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(value))) {
    if (match.index > last) {
      tokens.push({ text: value.slice(last, match.index), target: null });
    }
    tokens.push({ text: match[0], target: parseInt(match[0], 10) });
    last = match.index + match[0].length;
  }
  if (last < value.length) {
    tokens.push({ text: value.slice(last), target: null });
  }
  return tokens;
}

/**
 * Counts the numeric portion of a stat value up from 0 once it scrolls into
 * view (~1.2s, ease-out, once only). Non-numeric or unrecognized values are
 * rendered statically rather than mangled. Respects prefers-reduced-motion by
 * showing the final value immediately.
 */
export const StatCounter: React.FC<StatCounterProps> = ({ value, className }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const shouldReduceMotion = useReducedMotion();
  const tokens = parseTokens(value);
  const hasNumbers = tokens.some((t) => t.target !== null);
  const [progress, setProgress] = useState(shouldReduceMotion || !hasNumbers ? 1 : 0);

  useEffect(() => {
    if (!isInView || shouldReduceMotion || !hasNumbers) return;
    const controls = animate(0, 1, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (v) => setProgress(v),
    });
    return () => controls.stop();
  }, [isInView, shouldReduceMotion, hasNumbers]);

  if (!hasNumbers) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  const display = tokens
    .map((t) => (t.target === null ? t.text : String(Math.round(t.target * progress))))
    .join('');

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
};

export default StatCounter;
