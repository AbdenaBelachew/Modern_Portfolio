import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 transition-colors duration-500 border-t border-[var(--border-color)] px-6 bg-transparent">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold tracking-tight text-[var(--text-main)]">
              Abdena<span className="text-primary">.dev</span>
            </span>
            <span className="text-[var(--text-dim)] text-xs">•</span>
            <span className="text-[var(--text-dim)] text-xs">Addis Ababa, Ethiopia</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="mailto:abdiolbelachew@gmail.com" className="text-[var(--text-dim)] hover:text-primary transition-colors text-xs font-semibold">
              abdiolbelachew@gmail.com
            </a>
            <a href="tel:+251966780537" className="text-[var(--text-dim)] hover:text-primary transition-colors text-xs font-semibold">
              +251 966 780 537
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://github.com/AbdenaBelachew" className="text-[var(--text-dim)] hover:text-primary transition-all hover:scale-105" aria-label="GitHub"><Github size={16} /></a>
            <a href="https://www.linkedin.com/in/abdiol" className="text-[var(--text-dim)] hover:text-primary transition-all hover:scale-105" aria-label="LinkedIn"><Linkedin size={16} /></a>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-[var(--border-color)] flex flex-col sm:flex-row justify-between items-center text-[var(--text-dim)] text-[11px] font-medium gap-2">
          <div>
            © {currentYear} Abdena Belachew. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-green-500 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Available for Hire
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
