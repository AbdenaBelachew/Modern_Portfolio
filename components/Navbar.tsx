'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { nav, site } from '@/data/site';
import { socials, type Social } from '@/data/social';
import useActiveSection from '@/hooks/useActiveSection';
import { haptic } from '@/lib/feedback';
import QuickActions from './QuickActions';
import ThemeToggle from './ThemeToggle';
import { ease } from './Reveal';

const ids = nav.map((n) => n.id);
const socialIcons: Record<Social['label'], typeof Mail> = { GitHub: Github, LinkedIn: Linkedin, Email: Mail };

export default function Navbar() {
  const active = useActiveSection(ids);
  const { scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock scroll and close on Escape while the drawer is open; return focus after.
  useEffect(() => {
    if (!open) return;
    const button = menuButton.current;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      button?.focus();
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled ? 'border-line bg-bg/80 backdrop-blur-md' : 'border-transparent bg-bg/0'
        }`}
      >
        <nav className="container-page flex h-16 items-center justify-between gap-6" aria-label="Primary">
          <a href="#top" className="group flex items-center gap-2.5 font-display text-[17px] font-semibold tracking-tight">
            <span aria-hidden className="h-4 w-1 rounded-full bg-accent transition-transform duration-300 group-hover:scale-y-125" />
            {site.name}
          </a>

          <ul className="hidden items-center gap-7 md:flex">
            {nav.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} className="relative">
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`block py-2 text-sm transition-colors duration-200 ${
                      isActive ? 'text-ink' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {item.label}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      aria-hidden
                      className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-accent"
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              ref={menuButton}
              type="button"
              onClick={() => {
                haptic();
                setOpen(true);
              }}
              className="grid size-10 place-items-center rounded-md border border-line transition-colors hover:border-line-strong md:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu size={18} aria-hidden />
            </button>
          </div>
        </nav>
        {/* Reading progress */}
        <motion.div
          aria-hidden
          style={{ scaleX: scrollYProgress }}
          className="absolute inset-x-0 -bottom-px h-px origin-left bg-accent"
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              className="fixed inset-0 z-[70] bg-ink/25 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="drawer"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="fixed inset-y-0 right-0 z-[80] flex w-[min(20rem,86vw)] flex-col overflow-y-auto border-l border-line bg-surface px-6 pb-8 md:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease }}
              // Swipe right to dismiss
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={{ left: 0, right: 0.6 }}
              onDragEnd={(_, info) => {
                if (info.offset.x > 80 || info.velocity.x > 450) setOpen(false);
              }}
            >
              <div className="flex h-16 items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Menu</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid size-10 place-items-center rounded-md border border-line transition-colors hover:border-line-strong"
                  aria-label="Close menu"
                  autoFocus
                >
                  <X size={18} aria-hidden />
                </button>
              </div>

              <ul className="mt-6 border-t border-line">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.id}
                    className="border-b border-line"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.04, duration: 0.35, ease }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className={`flex items-baseline justify-between py-4 font-display text-2xl transition-colors ${
                        active === item.id ? 'text-accent' : 'text-ink hover:text-accent'
                      }`}
                    >
                      {item.label}
                      <span className="font-mono text-xs text-muted">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto space-y-5 pt-8">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-md bg-accent py-3.5 text-sm font-medium text-on-accent transition-transform active:scale-[0.98]"
                >
                  Have a system that needs building?
                </a>
                <QuickActions />
                <ul className="flex gap-2">
                  {socials.map((s) => {
                    const Icon = socialIcons[s.label];
                    const external = s.href.startsWith('http');
                    return (
                      <li key={s.label} className="flex-1">
                        <a
                          href={s.href}
                          target={external ? '_blank' : undefined}
                          rel={external ? 'noreferrer' : undefined}
                          aria-label={s.label}
                          className="grid h-11 place-items-center rounded-md border border-line text-muted transition-colors active:border-accent active:text-accent"
                        >
                          <Icon size={17} aria-hidden />
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <div
                  className="flex items-center justify-between border-t border-line pt-5"
                  style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
                >
                  <span className="text-sm text-muted">Theme</span>
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
