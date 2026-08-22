'use client';

import React from 'react';
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

  if (shouldReduceMotion) {
    return (
      <MotionComponent
        data-reveal
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0 }}
        className={className}
      >
        {children}
      </MotionComponent>
    );
  }

  return (
    <MotionComponent
      data-reveal
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};

export default Reveal;
