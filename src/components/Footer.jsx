import React from 'react';
import { Mail, Phone, Github, Linkedin, Terminal, Activity } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="py-16 transition-colors duration-500 border-t border-[var(--border-color)] px-8 bg-transparent">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6 group cursor-pointer">
              {/* <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                <Terminal size={16} className="text-white" />
              </div> */}
              <span className="text-xl font-black tracking-tighter text-[var(--text-main)] uppercase">
                Abdena<span className="text-primary">.dev</span>
              </span>
            </div>
            <p className="text-[var(--text-dim)] text-[13px] leading-relaxed max-w-xs font-semibold">
              Architecting resilient enterprise ecosystems with technical precision and operational empathy.
            </p>
          </div>

          <div>
            <h4 className="text-[var(--text-main)] font-black text-[10px] tracking-[0.2em] uppercase mb-6">Navigation</h4>
            <ul className="space-y-5">
              {['About', 'Matrix', 'Projects', 'Architecture', 'Experience'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-[var(--text-dim)] hover:text-primary transition-colors text-sm font-bold uppercase tracking-wider">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--text-main)] font-black text-[10px] tracking-[0.2em] uppercase mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:abdiolbelachew@gmail.com" className="flex items-center gap-4 text-[var(--text-dim)] hover:text-primary transition-colors text-sm font-bold">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-[var(--border-color)]">
                    <Mail size={16} className="text-primary/60" />
                  </div>
                  abdiolbelachew@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+251966780537" className="flex items-center gap-4 text-[var(--text-dim)] hover:text-primary transition-colors text-sm font-bold">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-[var(--border-color)]">
                    <Phone size={16} className="text-primary/60" />
                  </div>
                  +251 966 780 537
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--text-main)] font-black text-[10px] tracking-[0.2em] uppercase mb-6">System Status</h4>
            <div className="bg-white/80 dark:bg-white/5 rounded-2xl p-6 border border-[var(--border-color)] inline-block w-full shadow-sm">
              <div className="flex items-center gap-3 text-green-600 dark:text-green-500 mb-4 animate-pulse">
                <Activity size={14} />
                <span className="text-[10px] font-mono tracking-widest font-black">ALL SYSTEMS OPERATIONAL</span>
              </div>
              <div className="text-[var(--text-dim)] font-mono text-[9px] space-y-1.5 leading-relaxed uppercase tracking-widest font-black">
                <div className="flex justify-between border-b border-[var(--border-color)] pb-2"><span>NODE</span> <span className="text-[var(--text-muted)]">ADDIS ABABA ETHIOPIA</span></div>
                <div className="flex justify-between border-b border-[var(--border-color)] pb-2"><span>SEC</span> <span className="text-[var(--text-muted)]">LEVEL 4 ENCRYPTED</span></div>
                <div className="flex justify-between"><span>VER</span> <span className="text-[var(--text-muted)]">6.2.0_STABLE</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--border-color)] flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[var(--text-dim)] font-mono text-[10px] tracking-[0.2em] uppercase font-black">
            © {currentYear} ABDENA BELACHEW — ELITE ENGINEERING PORFTOLIO
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/AbdenaBelachew" className="text-[var(--text-dim)] hover:text-primary transition-all hover:scale-125"><Github size={18} /></a>
            <a href="https://www.linkedin.com/in/abdiol" className="text-[var(--text-dim)] hover:text-primary transition-all hover:scale-125"><Linkedin size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
