'use client';

import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { animate, useReducedMotion } from 'framer-motion';
import { RevealContext } from './Reveal';

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

// useLayoutEffect warns when it runs on the server; this component only
// needs the "before paint" guarantee on the client, so fall back to
// useEffect (a no-op difference server-side, since neither runs there).
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

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
 * Counts the numeric portion of a stat value up from 0 once its ancestor
 * `Reveal` reports the element has scrolled into view (~1.2s, ease-out, once
 * only). Non-numeric or unrecognized values are rendered statically rather
 * than mangled. Respects prefers-reduced-motion by showing the final value
 * immediately.
 *
 * Correctness guarantees, deliberately layered rather than relying on any
 * single trigger:
 *
 * 1. The rendered value always *starts* (both on the server and on the
 *    client's first render, before any effect runs) as the real, final
 *    value. A no-JS reader, or one whose hydration is slow, therefore never
 *    sees a zero state - the count-up is purely a post-hydration, client-only
 *    embellishment layered on top of correct markup, not something the
 *    correctness of the displayed text depends on.
 * 2. There is exactly one "in view" signal for this element tree: the
 *    `RevealContext` provided by the ancestor `Reveal`, driven by the same
 *    viewport observer that powers `Reveal`'s own `whileInView` animation.
 *    This component does not run a second, independent
 *    IntersectionObserver/`useInView` alongside it - that duplication was
 *    the root cause of the original bug (the two observers could fire out of
 *    order, leaving the counter parked at its initial value).
 * 3. Even so, if the reveal signal is ever missed, delayed indefinitely, or
 *    this component is used somewhere without a `Reveal` ancestor, a
 *    fallback timer forces the count-up to start on its own after 2s. The
 *    zero state is never allowed to persist as a terminal state.
 */
export const StatCounter: React.FC<StatCounterProps> = ({ value, className }) => {
  const shouldReduceMotion = useReducedMotion();
  const revealed = useContext(RevealContext);
  const tokens = parseTokens(value);
  const hasNumbers = tokens.some((t) => t.target !== null);

  // Always initialise to the settled, final value - this is what's
  // server-rendered, and it's what the client's first render must match too.
  const [progress, setProgress] = useState(1);
  const startedRef = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (shouldReduceMotion || !hasNumbers || startedRef.current) return;

    // Now safely past hydration: drop to the pre-count state (before the
    // browser paints, so there's no visible flash of the final value first)
    // and arm the count-up.
    setProgress(0);

    let cleanup: (() => void) | undefined;

    const startCounting = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const controls = animate(0, 1, {
        duration: 1.2,
        ease: 'easeOut',
        onUpdate: setProgress,
        onComplete: () => setProgress(1),
      });
      cleanup = () => controls.stop();
    };

    if (revealed) {
      startCounting();
    } else {
      const fallback = window.setTimeout(startCounting, 2000);
      cleanup = () => window.clearTimeout(fallback);
    }

    return () => cleanup?.();
  }, [revealed, shouldReduceMotion, hasNumbers]);

  if (!hasNumbers) {
    return (
      <span className={className}>
        {value}
      </span>
    );
  }

  const display = tokens
    .map((t) => (t.target === null ? t.text : String(Math.round(t.target * progress))))
    .join('');

  return (
    <span className={className}>
      {display}
    </span>
  );
};

export default StatCounter;
