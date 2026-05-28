import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Database, ShieldCheck, Cpu } from 'lucide-react';

const Hero = () => {
  return (
    <section id="system" className="relative pt-32 pb-16 overflow-hidden min-h-screen flex items-center">
      <div className="mesh-background" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-7xl mb-6 leading-[1.1] tracking-tight text-[var(--text-main)] font-black">
            Senior Full-Stack <br />
            <span className="gradient-text">.NET Developer</span>
          </h1>

          <p className="text-base md:text-lg text-[var(--text-muted)] max-w-2xl mx-auto mb-10 leading-relaxed">
            I design and build secure, high-performance enterprise applications
            that streamline operations and drive business efficiency at scale.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a href="#projects" className="btn-primary">View Projects</a>
            <a href="#contact" className="btn-secondary">Contact Me</a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Experience', value: '4+ Years', icon: <Cpu size={18} /> },
              { label: 'Systems Built', value: '10+', icon: <Database size={18} /> },
              { label: 'Uptime', value: '99.99%', icon: <ShieldCheck size={18} /> },
              { label: 'Stack', value: '.NET / React', icon: <Terminal size={18} /> },
            ].map((stat, idx) => (
              <div key={idx} className="glass p-5 group hover:border-primary/30 transition-all cursor-default">
                <div className="text-primary mb-3 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-2xl font-black text-[var(--text-main)] mb-1">{stat.value}</div>
                <div className="text-[11px] text-[var(--text-dim)] uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
