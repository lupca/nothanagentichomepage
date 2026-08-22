'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface RevealProps {
  children: React.ReactNode;
  /** Delay in seconds before the animation starts, used to stagger sibling items. */
  delay?: number;
  className?: string;
  /** Element/component to render as. Defaults to 'div'. */
  as?: 'div' | 'li' | 'tr' | 'span';
}

/**
 * Signals descendants of a `Reveal` when it has entered the viewport (or,
 * under reduced motion, immediately). Descendants that need to trigger their
 * own "enter" behaviour (e.g. `StatCounter`'s count-up) should consume this
 * instead of running a second `useInView`/IntersectionObserver on the same
 * element tree - two independent observers watching overlapping elements is
 * what caused the stats-strip race condition this context replaces. `Reveal`
 * is the single source of truth for "in view", driven by the same observer
 * that powers its own `whileInView` animation.
 *
 * Defaults to `false` so a consumer used outside any `Reveal` never assumes
 * it's already visible; such consumers should have their own fallback for
 * convergence (see `StatCounter`).
 */
export const RevealContext = React.createContext<boolean>(false);

/**
 * Reveal-on-scroll wrapper: fades and slides content up by 16px once, the
 * first time it enters the viewport. Deliberately restrained — no parallax,
 * no scale, no bounce, no looping motion — per the site's due-diligence
 * audience.
 *
 * Respects prefers-reduced-motion by skipping the scroll trigger and
 * animating straight to the resting state on mount, with zero duration —
 * content is visually indistinguishable from static, fully-opaque markup.
 *
 * Important: both branches render the *same* `motion[as]` element type.
 * Swapping between a plain host element (e.g. `<div>`) and a `motion.div`
 * based on `shouldReduceMotion` causes a hydration mismatch — the server
 * always renders the animated variant (it can't know the client's OS
 * preference), and if the client's first render then produces a different
 * element type, hydration silently fails to reconcile the style attribute
 * in production builds, leaving content stuck at `opacity: 0` forever. Only
 * the animation *props* differ between the two branches, never the tag.
 */
export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className, as = 'div' }) => {
  const shouldReduceMotion = useReducedMotion();
  const MotionComponent = (motion as any)[as] ?? motion.div;
  // Under reduced motion there's no scroll trigger at all - content resolves
  // to its resting state on mount, so descendants should treat it as
  // revealed immediately too.
  const [revealed, setRevealed] = useState(shouldReduceMotion ?? false);

  if (shouldReduceMotion) {
    return (
      <MotionComponent
        data-reveal
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0 }}
        className={className}
      >
        <RevealContext.Provider value={true}>{children}</RevealContext.Provider>
      </MotionComponent>
    );
  }

  return (
    <MotionComponent
      data-reveal
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setRevealed(true)}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, ease: 'easeOut', delay }}
      className={className}
    >
      <RevealContext.Provider value={revealed}>{children}</RevealContext.Provider>
    </MotionComponent>
  );
};

export default Reveal;
