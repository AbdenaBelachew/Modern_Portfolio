import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Terminal } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const navItems = [
    { label: 'Manifesto', href: '#about' },
    { label: 'Matrix', href: '#matrix' },
    { label: 'Projects', href: '#projects' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Milestones', href: '#experience' },
    { label: 'Inquiry', href: '#contact' }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-8 bg-[var(--bg-glass)] backdrop-blur-xl border-b border-[var(--border-color)] transition-colors duration-500"
    >
      <div className="flex items-center gap-6 cursor-pointer group">
        <span className="text-xl font-bold tracking-tighter text-[var(--text-main)] uppercase">
          Abdena<span className="text-primary">.dev</span>
        </span>


      </div>

      <nav className="hidden lg:flex items-center gap-10">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-[10px] font-black text-[var(--text-dim)] hover:text-primary transition-all tracking-[0.2em] uppercase"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-6">
        <ThemeToggle />
        <a
          href="/assets/resume.pdf"
          className="hidden sm:block text-[10px] font-mono font-black text-[var(--text-dim)] hover:text-primary transition-all tracking-[0.2em] uppercase"
        >
          Resume
        </a>
        <a
          href="#contact"
          className="px-6 py-2 bg-primary/5 dark:bg-white/5 border border-primary/20 dark:border-white/10 hover:bg-primary text-primary hover:text-white rounded-full text-xs font-black tracking-widest uppercase transition-all shadow-sm"
        >
          Connect
        </a>
      </div>
    </motion.header>
  );
};

export default Header;
