'use client';

import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';

/**
 * ImageLightbox - click-to-enlarge for a single image.
 *
 * Renders a keyboard-accessible trigger button around a thumbnail `<Image>`;
 * clicking (or pressing Enter/Space on) it opens a full-screen overlay
 * showing the same image at up to ~90vw/90vh, with `caption` carried
 * through underneath.
 *
 * Props:
 * - src, alt, width, height: passed straight to next/image for both the
 *   thumbnail and the enlarged view (width/height are the image's intrinsic
 *   pixel size, used for aspect ratio).
 * - caption: optional text shown under the thumbnail and under the enlarged
 *   image (e.g. a "demonstration data" notice) - plain text/JSX.
 * - closeLabel / openLabel: localized accessible strings for the close
 *   button and the trigger's aria-label. Callers own i18n (this component
 *   has no locale knowledge); pass the picked strings for the caller's
 *   `pick(locale)` dictionary.
 * - sizes, className, imageClassName: layout passthroughs for the thumbnail.
 *
 * Reusable as-is for any product screenshot grid - SOAI's page can adopt it
 * with the same props shape.
 */
export interface ImageLightboxProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: React.ReactNode;
  closeLabel: string;
  openLabel: string;
  sizes?: string;
  className?: string;
  imageClassName?: string;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  src,
  alt,
  width,
  height,
  caption,
  closeLabel,
  openLabel,
  sizes = '(min-width: 768px) 50vw, 100vw',
  className,
  imageClassName,
}) => {
  const [open, setOpen] = useState(false);
  // The overlay is portaled to document.body (see below) so that its
  // position:fixed is relative to the viewport, not to some ancestor that
  // happens to carry a CSS transform (e.g. a settled framer-motion reveal),
  // which would otherwise turn "fixed" into "positioned relative to that
  // ancestor" and break the full-screen overlay.
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={openLabel}
        className={`group relative block w-full overflow-hidden rounded-lg border border-line bg-paper text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 ${className ?? ''}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className={`w-full h-auto max-w-full block transition-[filter] duration-200 group-hover:brightness-95 ${imageClassName ?? ''}`}
        />
        <span className="pointer-events-none absolute bottom-2 right-2 flex items-center justify-center rounded-full bg-ink/80 p-1.5 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
          <ZoomIn className="w-4 h-4" />
        </span>
      </button>

      {open &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4"
            onClick={close}
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[90vh] max-w-[90vw] flex-col items-center gap-3"
            >
              <h2 id={titleId} className="sr-only">
                {alt}
              </h2>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={close}
                aria-label={closeLabel}
                className="absolute -top-10 right-0 flex items-center justify-center rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange"
              >
                <X className="w-5 h-5" />
              </button>
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                sizes="90vw"
                className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain"
              />
              {caption && <p className="text-caption font-mono text-white/70 text-center">{caption}</p>}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default ImageLightbox;
