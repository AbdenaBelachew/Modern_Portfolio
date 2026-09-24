'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { ease } from './Reveal';

type Props = {
  open: boolean;
  onClose: () => void;
  label: string;
  children: React.ReactNode;
};

// Native-style sheet: slides up from the bottom, drag the handle (or anywhere) down to dismiss.
export default function BottomSheet({ open, onClose, label, children }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 90 || info.velocity.y > 500) onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="sheet-scrim"
            className="fixed inset-0 z-[70] bg-ink/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            key="sheet"
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className="fixed inset-x-0 bottom-0 z-[80] max-h-[88svh] overflow-y-auto rounded-t-2xl border-t border-line bg-surface px-5 pt-3 shadow-lift"
            style={{ paddingBottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.42, ease }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.7 }}
            onDragEnd={onDragEnd}
          >
            <div aria-hidden className="mx-auto mb-4 h-1 w-10 rounded-full bg-line-strong" />
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
