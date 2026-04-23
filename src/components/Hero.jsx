import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Database, ShieldCheck, Cpu } from 'lucide-react';

const Hero = () => {
  return (
    <section id="system" className="relative pt-40 pb-20 overflow-hidden min-h-screen flex items-center">
      <div className="mesh-background" />

      <div className="container mx-auto px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 mb-8 bg-primary/5 border border-primary/10 px-4 py-2 rounded-full">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.2em] text-primary font-bold uppercase transition-colors">
              STATUS: ARCHITECTING ENTERPRISE SYSTEMS
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl mb-8 leading-[1.1] tracking-tight text-[var(--text-main)] font-black">
            Senior Full-Stack <br />
            <span className="gradient-text">.NET Developer</span>
          </h1>

          <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            I design and develop secure, high-performance enterprise applications
            that streamline operations and drive business efficiency at scale.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mb-20">
            <a href="#projects" className="btn-primary">View Projects</a>
            <a href="#contact" className="btn-secondary">Contact Me</a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'EXPERIENCE', value: '4+ Years', icon: <Cpu size={20} /> },
              { label: 'SYSTEMS', value: '10+ Core', icon: <Database size={20} /> },
              { label: 'UPTIME', value: '99.99%', icon: <ShieldCheck size={20} /> },
              { label: 'STACK', value: 'Elite Grade', icon: <Terminal size={20} /> },
            ].map((stat, idx) => (
              <div key={idx} className="glass p-8 group hover:border-primary/30 transition-all cursor-default">
                <div className="text-primary mb-4 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-3xl font-black text-[var(--text-main)] mb-1">{stat.value}</div>
                <div className="text-[10px] font-mono tracking-widest text-[var(--text-dim)] uppercase">
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
