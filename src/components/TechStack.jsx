import React from 'react';
import { motion } from 'framer-motion';
import { Server, Layout, Database, Activity } from 'lucide-react';

const TechStack = () => {
  const stack = [
    {
      category: "Backend Architecture",
      icon: <Server size={20} />,
      tools: ["C#", ".NET Core 9.0", "ASP.NET Core", "Web API", "Microservices", "RESTful Design", "Node.js"]
    },
    {
      category: "Frontend Engineering",
      icon: <Layout size={20} />,
      tools: ["React", "JavaScript (ES6+)", "Tailwind CSS", "Framer Motion", "Blazor"]
    },
    {
      category: "Data & Systems",
      icon: <Database size={20} />,
      tools: ["PostgreSQL", "SQL Server", "Redis", "Entity Framework"]
    },
    {
      category: "DevOps & Automation",
      icon: <Activity size={20} />,
      tools: ["Docker", "Git", "Jenkins", "CI/CD Pipelines", "Azure / AWS"]
    }
  ];

  return (
    <section id="matrix" className="py-32 transition-colors duration-500">
      <div className="container mx-auto px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div>
            <div className="badge-elite mb-6">CORE_TECH_MATRIX</div>
            <h2 className="text-4xl md:text-5xl font-black text-[var(--text-main)] tracking-tight">
              Elite Grade <br />
              <span className="gradient-text">Technology Stack.</span>
            </h2>
          </div>
          <p className="text-[var(--text-dim)] max-w-sm text-right text-sm leading-relaxed font-mono font-bold">
            SELECTED TOOLS FOR ENTERPRISE SCALABILITY
            HIGH PERFORMANCE GUARANTEED
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stack.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-10 group hover:bg-primary/5 transition-all border-[var(--border-color)]"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-10 border border-primary/20 group-hover:border-primary/50 transition-all">
                {group.icon}
              </div>
              <h3 className="text-lg font-black text-[var(--text-main)] mb-8 tracking-tight uppercase border-b border-[var(--border-color)] pb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.tools.map((tool, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1.5 bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 text-[11px] font-black text-[var(--text-muted)] dark:text-zinc-400 rounded-md hover:border-primary/40 hover:text-primary transition-all cursor-default shadow-sm"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
