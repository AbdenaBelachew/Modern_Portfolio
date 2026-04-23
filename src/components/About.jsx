import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Network, ShieldAlert } from 'lucide-react';

const About = () => {
  const experiences = [
    {
      title: "Backend Architecture",
      desc: "Designing and building robust backend systems with ASP.NET Core, focused on enterprise applications, complex workflows, and high-performance APIs that support real business operations.",
      icon: <Layers size={24} />
    },
    {
      title: "Enterprise Solutions",
      desc: "Built and delivered enterprise systems including Stock Management,Pharmacy management systems, Archives Management systems, Shareholder Management and workflow-driven platforms focused on real business operations.",
      icon: <Network size={24} />
    },
    {
      title: "Security & Compliance",
      desc: "Implementing LDAP/AD integration, RBAC, and secure transaction middleware for fintech and banking sectors.",
      icon: <ShieldAlert size={24} />
    }
  ];

  return (
    <section id="about" className="py-32 transition-colors duration-500">
      <div className="container mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="badge-elite mb-6">ARCHITECTURAL_MANIFESTO</div>
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight text-[var(--text-main)]">
              Solving Complexity through <br />
              <span className="text-primary tracking-tight">Structured Engineering.</span>
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-10 leading-relaxed font-semibold">
              Over the past 4 years, I have focused on building resilient, high-availability ecosystems that serve as the digital backbone for large-scale enterprises.
            </p>
            <p className="text-[var(--text-dim)] text-base mb-12 leading-relaxed font-medium">
              My approach combines technical precision with operational empathy. I don't just build software; I design systems that solve human and business bottlenecks, ensuring every module contributes to overall organizational scalability and security.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              <motion.div 
                whileHover={{ y: -5 }}
                className="p-10 glass border-primary/20 bg-primary/5 shadow-2xl shadow-primary/5 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-2 opacity-10">
                    <Layers size={40} />
                </div>
                <div className="text-4xl font-black text-primary mb-2 tracking-tighter">10+ Major</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--text-dim)] font-black font-mono">Systems_Deployed</div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="p-10 glass border-[var(--border-color)] relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-2 opacity-10">
                    <Network size={40} />
                </div>
                <div className="text-4xl font-black text-primary mb-2 tracking-tighter">National</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--text-dim)] font-black font-mono">Scale_Operations</div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {experiences.map((exp, idx) => (
              <div key={idx} className="glass group p-8 hover:bg-primary/5 transition-all border-[var(--border-color)]">
                <div className="flex gap-8 items-center">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:border-primary/50 transition-all group-hover:scale-105">
                    {exp.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-main)] mb-2 tracking-tight">{exp.title}</h3>
                    <p className="text-[var(--text-dim)] text-sm leading-relaxed font-semibold">{exp.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
