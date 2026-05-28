import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import resumePdf from '../assets/abdene_resume.pdf';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: 'About',    href: '#about' },
    { label: 'Skills',   href: '#matrix' },
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Contact',  href: '#contact' },
  ];

  const close = () => setMenuOpen(false);

  return (
    <>
      {/* ── Floating Navbar ── */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-3 left-1/2 -translate-x-1/2 z-50 h-12 w-[calc(100%-2rem)] max-w-[1100px]
                   flex items-center justify-between px-5
                   bg-[var(--bg-glass)] backdrop-blur-md border border-[var(--border-color)]
                   rounded-xl shadow-sm transition-colors duration-500"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center shadow-md shadow-primary/10">
            <Activity size={12} className="text-white" />
          </div>
          <span className="text-sm font-bold tracking-tight text-[var(--text-main)]">
            Abdena <span className="text-primary">Belachew</span>
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs font-semibold text-[var(--text-dim)] hover:text-primary transition-all"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <a
            href={resumePdf}
            download="dotnet.pdf"
            className="hidden sm:block text-xs font-semibold text-[var(--text-dim)] hover:text-primary transition-all"
          >
            Resume
          </a>

          <a
            href="#contact"
            className="hidden sm:block px-3 py-1 bg-primary text-white rounded-md text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm shadow-primary/10"
          >
            Hire Me
          </a>

          {/* Mobile menu trigger — three dots */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="lg:hidden flex flex-col items-center justify-center gap-[4px] w-8 h-8 rounded-md hover:bg-primary/10 transition-all"
          >
            {menuOpen ? (
              <X size={16} className="text-[var(--text-main)]" />
            ) : (
              <>
                <span className="block w-4 h-[2px] bg-[var(--text-main)] rounded-full" />
                <span className="block w-4 h-[2px] bg-[var(--text-main)] rounded-full" />
                <span className="block w-4 h-[2px] bg-[var(--text-main)] rounded-full" />
              </>
            )}
          </button>
        </div>
      </motion.header>

      {/* ── Mobile slide-down menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed top-[3.75rem] left-1/2 -translate-x-1/2 z-40
                       w-[calc(100%-2rem)] max-w-[1100px]
                       bg-[var(--bg-glass)] backdrop-blur-md
                       border border-[var(--border-color)] rounded-xl shadow-lg
                       overflow-hidden lg:hidden"
          >
            <nav className="flex flex-col py-2">
              {navItems.map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={close}
                  className="px-6 py-3 text-sm font-semibold text-[var(--text-dim)] hover:text-primary
                             hover:bg-primary/5 transition-all border-b border-[var(--border-color)] last:border-0"
                >
                  {item.label}
                </a>
              ))}

              {/* Resume & Hire Me in mobile menu */}
              <div className="flex items-center gap-3 px-6 py-4">
                <a
                  href={resumePdf}
                  download="dotnet.pdf"
                  onClick={close}
                  className="flex-1 text-center py-2 border border-[var(--border-color)] rounded-lg
                             text-xs font-semibold text-[var(--text-dim)] hover:text-primary hover:border-primary transition-all"
                >
                  Resume
                </a>
                <a
                  href="#contact"
                  onClick={close}
                  className="flex-1 text-center py-2 bg-primary text-white rounded-lg
                             text-xs font-semibold hover:bg-primary/90 transition-all"
                >
                  Hire Me
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop to close */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
