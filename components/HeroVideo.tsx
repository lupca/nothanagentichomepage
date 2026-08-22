'use client';

import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

export interface HeroVideoProps {
  alt: string;
}

/**
 * Client-only island for the hero's walkthrough footage. Kept as small as
 * possible (just this <video> element) rather than converting the whole Hero
 * to a client component, since Hero otherwise stays a server component.
 *
 * Respects prefers-reduced-motion: the markup never carries the `autoplay`
 * attribute (so the browser can't start playback straight from the raw
 * server-rendered HTML before React even hydrates). Instead, playback is
 * started imperatively in an effect, only when the visitor does not prefer
 * reduced motion — mirroring the useReducedMotion approach in Reveal.tsx.
 * When reduced motion is preferred, the element simply sits on its poster
 * frame, unplayed.
 */
export const HeroVideo: React.FC<HeroVideoProps> = ({ alt }) => {
  const shouldReduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const video = videoRef.current;
    if (!video) return;
    // Autoplay can still be blocked by the browser in some contexts; ignore
    // the rejected promise since the poster frame is a fine static fallback.
    void video.play().catch(() => {});
  }, [shouldReduceMotion]);

  return (
    <video
      ref={videoRef}
      className="block w-full h-full object-cover"
      src="/media/soai/walkthrough-v3.webm"
      poster="/media/soai/walkthrough-poster.jpg"
      aria-label={alt}
      muted
      loop={!shouldReduceMotion}
      playsInline
      preload="metadata"
    />
  );
};

export default HeroVideo;
