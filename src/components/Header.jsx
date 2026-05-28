import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import resumePdf from '../assets/abdene_resume.pdf';

const Header = () => {
  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#matrix' },
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-3 left-1/2 -translate-x-1/2 z-50 h-12 w-[calc(100%-2rem)] max-w-[1100px] flex items-center justify-between px-6 bg-[var(--bg-glass)] backdrop-blur-md border border-[var(--border-color)] rounded-xl transition-colors duration-500 shadow-sm"
    >
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center shadow-md shadow-primary/10">
          <Activity size={12} className="text-white" />
        </div>
        <span className="text-sm font-bold tracking-tight text-[var(--text-main)]">
          Abdena <span className="text-primary">Belachew</span>
        </span>
      </div>

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
          className="px-3 py-1 bg-primary text-white rounded-md text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm shadow-primary/10"
        >
          Hire Me
        </a>
      </div>
    </motion.header>
  );
};

export default Header;
