import React from 'react';
import { motion } from 'framer-motion';
import { Server, Layout, Database, Activity } from 'lucide-react';

const TechStack = () => {
  const stack = [
    {
      category: "Backend Development",
      icon: <Server size={18} />,
      tools: ["C#", ".NET Core 9.0", "ASP.NET Core", "Web API", "Microservices", "RESTful Design", "Node.js"]
    },
    {
      category: "Frontend Engineering",
      icon: <Layout size={18} />,
      tools: ["React", "Next.js", "JavaScript (ES6+)", "Tailwind CSS", "Framer Motion", "Material UI"]
    },
    {
      category: "Data & Systems",
      icon: <Database size={18} />,
      tools: ["PostgreSQL", "SQL Server", "Redis", "Entity Framework"]
    },
    {
      category: "DevOps & Automation",
      icon: <Activity size={18} />,
      tools: ["Docker", "Git", "Jenkins", "CI/CD Pipelines", "Azure / AWS"]
    }
  ];

  return (
    <section id="matrix" className="py-20 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">Tech Stack</p>
            <h2 className="text-3xl md:text-4xl font-black text-[var(--text-main)] tracking-tight">
              My Tech Stack
            </h2>
          </div>
          <p className="text-[var(--text-dim)] max-w-xs text-sm leading-relaxed">
            Selected tools and technologies I use to build robust, scalable web applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stack.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-6 group hover:bg-primary/5 transition-all border-[var(--border-color)]"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 border border-primary/20 group-hover:border-primary/50 transition-all">
                {group.icon}
              </div>
              <h3 className="text-base font-bold text-[var(--text-main)] mb-4 pb-2 border-b border-[var(--border-color)]">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.tools.map((tool, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 text-[11px] text-[var(--text-muted)] dark:text-zinc-400 rounded-md hover:border-primary/40 hover:text-primary transition-all cursor-default"
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
