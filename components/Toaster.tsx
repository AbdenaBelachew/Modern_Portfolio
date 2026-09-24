'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';

// Listens for toast() calls and shows one short message at a time.
export default function Toaster() {
  const [message, setMessage] = useState<{ id: number; text: string } | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onToast = (e: Event) => {
      clearTimeout(timer);
      setMessage({ id: Date.now(), text: (e as CustomEvent<string>).detail });
      timer = setTimeout(() => setMessage(null), 2200);
    };
    window.addEventListener('app-toast', onToast);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('app-toast', onToast);
    };
  }, []);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 z-[95] flex justify-center px-4"
      style={{ bottom: 'calc(5.75rem + env(safe-area-inset-bottom))' }}
    >
      <AnimatePresence>
        {message && (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm text-bg shadow-lift"
          >
            <Check size={15} aria-hidden className="text-accent" />
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
