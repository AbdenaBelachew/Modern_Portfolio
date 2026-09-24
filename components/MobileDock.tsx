'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { ArrowUp, ChevronUp } from 'lucide-react';
import { nav } from '@/data/site';
import useActiveSection from '@/hooks/useActiveSection';
import { haptic } from '@/lib/feedback';
import BottomSheet from './BottomSheet';
import QuickActions from './QuickActions';
import { ease } from './Reveal';
import ThemeToggle from './ThemeToggle';

const ids = nav.map((n) => n.id);
const pad = (n: number) => String(n).padStart(2, '0');

// Thumb-reachable bar on phones: where you are, how far along, and a way to get in touch.
// Tapping the section label opens a sheet for jumping anywhere.
export default function MobileDock() {
  const active = useActiveSection(ids);
  const { scrollYProgress } = useScroll();
  const [pastHero, setPastHero] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeSheet = useCallback(() => setSheetOpen(false), []);
  const index = nav.findIndex((n) => n.id === active);
  const visible = pastHero && active !== 'contact';

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            key="dock"
            initial={{ y: 96, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 96, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="fixed inset-x-3 z-40 md:hidden"
            style={{ bottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
          >
            <div className="flex items-center gap-2 rounded-lg border border-line bg-surface/90 p-2 shadow-lift backdrop-blur-md">
              <button
                type="button"
                onClick={() => {
                  haptic();
                  setSheetOpen(true);
                }}
                aria-haspopup="dialog"
                aria-label="Jump to section"
                className="flex min-w-0 flex-1 items-center gap-3 rounded-md py-0.5 pl-1 text-left transition-colors active:bg-bg"
              >
                <svg viewBox="0 0 36 36" className="size-9 shrink-0 -rotate-90" aria-hidden>
                  <circle cx="18" cy="18" r="15" fill="none" strokeWidth="2.5" className="stroke-line" />
                  <motion.circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="stroke-accent"
                    style={{ pathLength: scrollYProgress }}
                  />
                </svg>
                <span className="min-w-0 flex-1">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={active ?? 'intro'}
                      initial={{ y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -8, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="block"
                    >
                      <span className="block font-mono text-[10px] tracking-[0.14em] text-muted uppercase tabular-nums">
                        {index >= 0 ? `${pad(index + 1)} / ${pad(nav.length)}` : 'Intro'}
                      </span>
                      <span className="flex items-center gap-1 truncate text-sm font-medium">
                        {index >= 0 ? nav[index].label : 'Welcome'}
                        <ChevronUp size={14} aria-hidden className="text-muted" />
                      </span>
                    </motion.span>
                  </AnimatePresence>
                </span>
              </button>

              <a
                href="#top"
                aria-label="Back to top"
                onClick={() => haptic()}
                className="grid size-10 shrink-0 place-items-center rounded-md border border-line text-muted transition-colors active:bg-bg active:text-ink"
              >
                <ArrowUp size={16} aria-hidden />
              </a>
              <a
                href="#contact"
                onClick={() => haptic()}
                className="shrink-0 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-on-accent shadow-card transition-transform active:scale-[0.97]"
              >
                Let&apos;s talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomSheet open={sheetOpen} onClose={closeSheet} label="Jump to section">
        <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Jump to</p>
        <ol className="mt-3 border-t border-line">
          {nav.map((item, i) => {
            const current = item.id === active;
            return (
              <li key={item.id} className="border-b border-line">
                <a
                  href={`#${item.id}`}
                  onClick={() => {
                    haptic();
                    setSheetOpen(false);
                  }}
                  aria-current={current ? 'location' : undefined}
                  className={`flex items-center gap-4 py-3.5 transition-colors active:text-accent ${current ? 'text-accent' : ''}`}
                >
                  <span className="w-6 font-mono text-xs text-muted">{pad(i + 1)}</span>
                  <span className="flex-1 font-display text-xl">{item.label}</span>
                  {current && (
                    <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] uppercase">
                      <span className="size-1.5 rounded-full bg-accent" /> You&apos;re here
                    </span>
                  )}
                </a>
              </li>
            );
          })}
        </ol>

        <QuickActions className="mt-5" />

        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm text-muted">Theme</span>
          <ThemeToggle />
        </div>
      </BottomSheet>
    </>
  );
}
