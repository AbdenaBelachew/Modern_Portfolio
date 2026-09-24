'use client';

import { Moon, Sun } from 'lucide-react';
import { haptic } from '@/lib/feedback';

// The pre-paint script in layout.tsx sets the initial class; the icons swap
// purely through CSS so server and client markup always match.
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.classList.contains('dark') ? 'light' : 'dark';
    root.classList.toggle('dark', next === 'dark');
    haptic();
    // Keep the mobile browser bar in step with the page.
    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((m) => m.setAttribute('content', next === 'dark' ? '#0b0f0e' : '#f7f7f3'));
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Storage blocked (private mode): the theme still applies for this visit.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className={`group relative grid size-10 place-items-center rounded-md border border-line text-ink transition-colors duration-300 hover:border-line-strong hover:text-accent ${className}`}
    >
      <Sun
        size={16}
        aria-hidden
        className="absolute scale-100 rotate-0 transition-all duration-500 ease-out dark:scale-0 dark:-rotate-90"
      />
      <Moon
        size={15}
        aria-hidden
        className="absolute scale-0 rotate-90 transition-all duration-500 ease-out dark:scale-100 dark:rotate-0"
      />
    </button>
  );
}
