import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Share2, Layers, Cpu, Zap, Activity, Database } from 'lucide-react';

const Architecture = () => {
  const principles = [
    {
      title: "Clean Enterprise Logic",
      desc: "Separation of concerns using Domain-Driven Design (DDD) to ensure large-scale ERPs remain maintainable.",
      icon: <Layers size={24} />,
      color: "blue"
    },
    {
      title: "Resilient Microservices",
      desc: "Architecting decoupled services for stock, finance, and archives that communicate via high-performance APIs.",
      icon: <Share2 size={24} />,
      color: "cyan"
    },
    {
      title: "Identity & Security",
      desc: "Zero-trust architecture with RBAC and centralized Identity Server management for sensitive enterprise data.",
      icon: <Shield size={24} />,
      color: "indigo"
    },
    {
      title: "Operational Efficiency",
      desc: "Optimizing database layers and workflows for high availability in national-scale infrastructure.",
      icon: <Cpu size={24} />,
      color: "purple"
    }
  ];

  return (
    <section id="architecture" className="py-32 transition-colors duration-500 px-8">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <div className="badge-elite mb-6">SYSTEM_DESIGN_PHILO</div>
          <h2 className="text-4xl md:text-6xl font-black text-[var(--text-main)] mb-8 tracking-tight">
            Engineering for <br />
            <span className="gradient-text">Scalability & Trust.</span>
          </h2>
          <p className="text-[var(--text-muted)] text-lg leading-relaxed max-w-2xl mx-auto font-semibold">
            Beyond coding, I focus on the structural integrity of the entire enterprise ecosystem. 
            From Stock Management backends to secure Digital Archives, every layer is architected for maximum durability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {principles.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-10 group hover:bg-primary/5 transition-all border-[var(--border-color)]"
            >
              <div className="mb-10 text-primary group-hover:scale-110 transition-transform w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:border-primary/50">
                {p.icon}
              </div>
              <h3 className="text-xl font-black text-[var(--text-main)] mb-4 tracking-tight">{p.title}</h3>
              <p className="text-[var(--text-dim)] text-sm leading-relaxed font-bold group-hover:text-[var(--text-muted)] transition-colors">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-24">
            <div className="glass p-12 border-[var(--border-color)] group hover:bg-primary/5 transition-all">
                <div className="flex items-center gap-3 mb-8">
                    <Zap size={20} className="text-primary" />
                    <h3 className="text-xl font-black text-[var(--text-main)] tracking-tight">Ecosystem Architecture</h3>
                </div>
                <div className="space-y-6">
                    <div className="p-6 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5">
                        <div className="text-sm font-black text-[var(--text-dim)] mb-2 uppercase tracking-widest text-[11px]">Legacy State</div>
                        <p className="text-[var(--text-dim)] text-sm leading-relaxed font-bold">Tight coupling, single point of failure, and slow manual background processing.</p>
                    </div>
                    <div className="p-6 bg-primary/10 rounded-xl border border-primary/20">
                        <div className="text-sm font-black text-primary mb-2 uppercase tracking-widest text-[11px]">Enterprise Optimized</div>
                        <p className="text-[var(--text-muted)] dark:text-zinc-300 text-sm leading-relaxed font-black">Fault isolation, tech-stack flexibility, and sub-MS query performance geared for high-availability corporate environments.</p>
                    </div>
                </div>
            </div>

            <div className="glass p-12 border-[var(--border-color)] group hover:bg-primary/5 transition-all">
                <div className="flex items-center gap-3 mb-8">
                    <Layers size={20} className="text-primary" />
                    <h3 className="text-xl font-black text-[var(--text-main)] tracking-tight">Structured Domain Layers</h3>
                </div>
                <div className="relative pl-8 border-l-2 border-slate-200 dark:border-white/10 space-y-8">
                    {[
                        { label: "Core Domain Layer", desc: "Pure business logic (Stock, Pharmacy rules). Zero external dependencies.", color: "bg-blue-500" },
                        { label: "Infrastructure Layer", desc: "External concerns: SQL Server, Identity Providers, File Systems.", color: "bg-cyan-500" },
                        { label: "Presentation Layer", desc: "High-density React/Blazor dashboards for real-time operations overhead.", color: "bg-indigo-500" }
                    ].map((layer, i) => (
                        <div key={i} className="relative">
                            <div className={`absolute left-[-37px] top-1.5 w-4 h-4 rounded-full ${layer.color} border-4 border-[var(--bg-deep)] shadow-sm`} />
                            <div className="text-sm font-black text-[var(--text-main)] mb-1 tracking-tight uppercase">{layer.label}</div>
                            <p className="text-[var(--text-dim)] text-xs leading-relaxed font-bold">{layer.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="glass p-1 lg:p-2 overflow-hidden border-[var(--border-color)]">
            <div className="bg-transparent rounded-2xl p-12 lg:p-24 overflow-hidden relative border border-[var(--border-color)] shadow-inner">
                <div className="flex flex-col items-center justify-center relative z-10">
                    <div className="mb-12 flex flex-col items-center">
                        <div className="px-6 py-2 bg-primary/10 border border-primary/20 rounded-full text-[9px] font-mono text-primary font-black tracking-widest mb-4 uppercase">System_Entry_Point</div>
                        <div className="p-6 glass border-slate-300 dark:border-white/20 text-[var(--text-main)] font-black text-xs md:text-sm tracking-[0.2em] uppercase shadow-sm">Distributed Load Balancer</div>
                    </div>

                    <div className="w-[2px] h-12 bg-gradient-to-b from-primary to-transparent mb-8" />

                    <div className="flex flex-wrap gap-4 justify-center items-center mb-12">
                        <div className="px-8 py-4 glass border-blue-500/10 text-[var(--text-main)] font-black text-[10px] tracking-widest uppercase shadow-sm">Enterprise API</div>
                        <div className="w-8 h-[2px] bg-[var(--border-color)]" />
                        <div className="px-8 py-4 glass border-cyan-500/10 text-[var(--text-main)] font-black text-[10px] tracking-widest uppercase shadow-sm">Identity Core</div>
                        <div className="w-8 h-[2px] bg-[var(--border-color)]" />
                        <div className="px-8 py-4 glass border-purple-500/10 text-[var(--text-main)] font-black text-[10px] tracking-widest uppercase shadow-sm">Workflow Mesh</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-center items-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-24 h-24 rounded-full glass border-primary/20 flex flex-col items-center justify-center text-[var(--text-dim)] font-mono text-[8px] gap-2">
                                <Database size={20} className="text-primary" />
                                DATA_PERSISTENCE
                            </div>
                            <span className="text-[9px] font-mono text-[var(--text-dim)] font-black uppercase tracking-tighter">SQL_SERVER_CLUSTER</span>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-24 h-24 rounded-full glass border-primary/20 flex flex-col items-center justify-center text-[var(--text-dim)] font-mono text-[8px] gap-2">
                                <Zap size={20} className="text-primary" />
                                CACHE_ENGINE
                            </div>
                            <span className="text-[9px] font-mono text-[var(--text-dim)] font-black uppercase tracking-tighter">REDIS_BACKED</span>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-24 h-24 rounded-full glass border-primary/20 flex flex-col items-center justify-center text-[var(--text-dim)] font-mono text-[8px] gap-2">
                                <Activity size={20} className="text-primary" />
                                MONITORING
                            </div>
                            <span className="text-[9px] font-mono text-[var(--text-dim)] font-black uppercase tracking-tighter">ELK_HARDENED</span>
                        </div>
                    </div>
                    
                    <div className="mt-16 text-[var(--text-dim)] font-mono text-[10px] tracking-[0.4em] uppercase text-center font-black">
                        // SECURE_SYSTEM_ARCHITECTURE_V5.0 // AUTH_HARDENED
                    </div>
                </div>
                
                <div className="absolute inset-0 opacity-[0.1] dark:opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>
        </div>
      </div>
    </section>
  );
};

export default Architecture;
