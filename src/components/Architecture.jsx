import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Share2, Layers, Cpu, Zap } from 'lucide-react';

const Architecture = () => {
  const principles = [
    {
      title: "Clean Code",
      desc: "Separation of concerns using Domain-Driven Design (DDD) to ensure enterprise systems remain maintainable.",
      icon: <Layers size={20} />
    },
    {
      title: "Microservices",
      desc: "Architecting decoupled, modular services that communicate via fast and high-performance API endpoints.",
      icon: <Share2 size={20} />
    },
    {
      title: "Security Core",
      desc: "Zero-trust identity systems with secure role-based access controls protecting sensitive customer data.",
      icon: <Shield size={20} />
    },
    {
      title: "High Performance",
      desc: "Optimizing database queries and system workflows for low latency and high availability at scale.",
      icon: <Cpu size={20} />
    }
  ];

  return (
    <section id="architecture" className="py-20 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">Architecture</p>
          <h2 className="text-3xl md:text-4xl font-black text-[var(--text-main)] mb-6 tracking-tight">
            Engineering Principles
          </h2>
          <p className="text-[var(--text-muted)] text-base leading-relaxed">
            I focus on the structural integrity of every system. From React interfaces and API services to the database layer, every component is engineered to be highly maintainable, secure, and resilient.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {principles.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-6 group hover:bg-primary/5 transition-all border-[var(--border-color)]"
            >
              <div className="mb-6 text-primary group-hover:scale-105 transition-transform w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:border-primary/40">
                {p.icon}
              </div>
              <h3 className="text-base font-bold text-[var(--text-main)] mb-2">{p.title}</h3>
              <p className="text-[var(--text-dim)] text-sm leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="glass p-8 border-[var(--border-color)]">
            <div className="flex items-center gap-3 mb-6">
              <Zap size={18} className="text-primary" />
              <h3 className="text-lg font-bold text-[var(--text-main)]">Modern Architecture Goals</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5">
                <div className="text-[10px] font-semibold text-[var(--text-dim)] mb-1 uppercase tracking-wider">Traditional Monolith</div>
                <p className="text-[var(--text-dim)] text-xs leading-relaxed">Tight coupling, single point of failure, and difficult deployments.</p>
              </div>
              <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                <div className="text-[10px] font-semibold text-primary mb-1 uppercase tracking-wider">Decoupled Services</div>
                <p className="text-[var(--text-muted)] text-xs leading-relaxed font-semibold">Fault isolation, continuous delivery, and optimized scalability.</p>
              </div>
            </div>
          </div>

          <div className="glass p-8 border-[var(--border-color)]">
            <div className="flex items-center gap-3 mb-6">
              <Layers size={18} className="text-primary" />
              <h3 className="text-lg font-bold text-[var(--text-main)]">Clean Domain Layers</h3>
            </div>
            <div className="relative pl-6 border-l border-slate-200 dark:border-white/10 space-y-6">
              {[
                { label: "Core Domain Layer", desc: "Pure business rules and system logic. Zero external dependencies.", color: "bg-primary" },
                { label: "Infrastructure Layer", desc: "External dependencies: SQL, authentication providers, file servers.", color: "bg-accent" },
                { label: "Presentation Layer", desc: "Fast React frontends and high-performance API endpoints.", color: "bg-indigo-500" }
              ].map((layer, i) => (
                <div key={i} className="relative">
                  <div className={`absolute left-[-29px] top-1.5 w-2.5 h-2.5 rounded-full ${layer.color}`} />
                  <div className="text-xs font-bold text-[var(--text-main)] mb-1 uppercase tracking-wider">{layer.label}</div>
                  <p className="text-[var(--text-dim)] text-xs leading-relaxed">{layer.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Architecture;
