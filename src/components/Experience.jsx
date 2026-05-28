import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Building2 } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      company: "Enterprise Initiatives",
      role: "Full-Stack Development & Project Leadership",
      period: "2022 — PRESENT",
      achievements: [
        "Developed and contributed to scalable enterprise applications using ASP.NET MVC / .NET Core, React, Node.js, and SQL-based technologies.",
        "Led development efforts and project delivery across multiple enterprise initiatives, from architecture design through deployment and ongoing support.",
        "Collaborated with cross-functional teams and ensured successful project delivery while maintaining high engineering standards.",
        "Implemented Jenkins CI/CD pipelines to streamline build and release processes, and utilized Docker containerization for consistent deployments.",
        "Focused on clean architecture, maintainability, scalability, and high performance throughout the software development lifecycle."
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 transition-colors duration-500 font-inter">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 text-center md:text-left">
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">Milestones</p>
            <h2 className="text-3xl md:text-4xl font-black text-[var(--text-main)] tracking-tight">
              Work Experience
            </h2>
          </div>
          
          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-8 border-l border-slate-200 dark:border-white/10 pb-8 last:pb-0"
              >
                <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary" />
                
                <div className="mb-4">
                  <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">
                    {exp.period}
                  </span>
                  <h3 className="text-xl font-bold text-[var(--text-main)] mt-2">{exp.role}</h3>
                  <div className="flex items-center gap-2 text-sm text-[var(--text-dim)] font-medium mt-1">
                    <Building2 size={14} className="text-primary/70" />
                    {exp.company}
                  </div>
                </div>

                <ul className="space-y-3 font-inter">
                  {exp.achievements.map((item, i) => (
                    <li key={i} className="flex gap-3 text-[var(--text-muted)] text-sm leading-relaxed">
                      <CheckCircle2 size={16} className="text-primary/60 flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
