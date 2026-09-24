'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';
import { haptic } from '@/lib/feedback';

type Props = { src: string; alt: string; children: React.ReactNode };

// Wraps a screenshot so a tap opens it full screen. On phones the wide image is
// shown at full height and panned sideways; swipe down (or tap ✕) to close.
export default function Zoomable({ src, alt, children }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.y) > 110 || Math.abs(info.velocity.y) > 600) setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          haptic();
          setOpen(true);
        }}
        aria-label={`View ${alt} full screen`}
        className="relative block w-full cursor-zoom-in text-left"
      >
        {children}
        <span
          aria-hidden
          className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full bg-bg/90 text-ink shadow-card backdrop-blur-sm md:hidden"
        >
          <Maximize2 size={15} />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            className="fixed inset-0 z-[90] flex flex-col bg-[#060908]/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <div
              className="flex items-center justify-between px-4 text-white/70"
              style={{ paddingTop: 'calc(0.75rem + env(safe-area-inset-top))' }}
            >
              <span className="truncate pr-4 font-mono text-[11px] tracking-[0.14em] uppercase">{alt}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                autoFocus
                className="grid size-11 shrink-0 place-items-center rounded-full border border-white/15 text-white transition-colors active:bg-white/10"
              >
                <X size={18} aria-hidden />
              </button>
            </div>

            <motion.div
              className="flex flex-1 items-center"
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.5}
              onDragEnd={onDragEnd}
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Phones: full-height strip that scrolls sideways. Larger screens: fit to view. */}
              <div
                className="w-full overflow-x-auto overscroll-x-contain [scrollbar-width:none] sm:flex sm:justify-center sm:overflow-visible [&::-webkit-scrollbar]:hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={src}
                  alt={alt}
                  width={1600}
                  height={1000}
                  sizes="(min-width: 640px) 92vw, 180vw"
                  className="block h-[62svh] w-auto max-w-none rounded-md px-4 sm:h-auto sm:max-h-[82vh] sm:w-auto sm:max-w-[92vw] sm:px-0"
                />
              </div>
            </motion.div>

            <p
              className="px-4 text-center font-mono text-[11px] text-white/50 sm:hidden"
              style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
            >
              Swipe sideways to pan · swipe down to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
