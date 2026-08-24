import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Network, Layout, ShieldCheck, Zap } from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: "Enterprise Application Systems",
      desc: "Architecting full-stack platforms with React, ASP.NET Core, and Node.js for large-scale operations — from dashboards and workflows to archives and ERP-aligned systems.",
      icon_name: "database",
      tags: ["React", ".NET", "Node.js"]
    },
    {
      title: "Secure API Ecosystems",
      desc: "Designing high-performance, secure RESTful APIs with advanced RBAC and Identity Server integration for financial compliance.",
      icon_name: "shield",
      tags: ["Auth0", "JWT", "OAuth2"]
    },
    {
      title: "Business Process Automation",
      desc: "Transforming complex manual workflows into automated digital systems that drive operational efficiency and data integrity.",
      icon_name: "zap",
      tags: ["Workflows", "DMS", "ERP"]
    },
    {
      title: "Full-Stack Enterprise Dashboards",
      desc: "Building high-density React dashboards and full-stack interfaces that provide real-time visibility into complex business metrics and operations.",
      icon_name: "layout",
      tags: ["React", "Custom UI", "Dashboards"]
    }
  ];

  const getIcon = (name) => {
    switch (name?.toLowerCase()) {
      case 'code': return <Code2 size={20} />;
      case 'database': return <Database size={20} />;
      case 'network': return <Network size={20} />;
      case 'layout': return <Layout size={20} />;
      case 'shield': return <ShieldCheck size={20} />;
      case 'zap': return <Zap size={20} />;
      default: return <Code2 size={20} />;
    }
  };

  return (
    <section id="services" className="py-20 transition-colors duration-500 font-inter">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">Services</p>
            <h2 className="text-3xl md:text-4xl font-black text-[var(--text-main)] tracking-tight">
              Services Offered
            </h2>
          </div>
          <p className="text-[var(--text-dim)] max-w-xs text-sm leading-relaxed">
            Available for consultancy, architecture advisory, and end-to-end software development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-8 group hover:bg-primary/5 transition-all border-[var(--border-color)]"
            >
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:border-primary/50 transition-all group-hover:scale-105 flex-shrink-0">
                  {getIcon(service.icon_name || service.icon)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[var(--text-main)] mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">
                    {service.desc || service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-mono text-[var(--text-dim)] tracking-wider uppercase">
                        {tag} {tIdx < service.tags.length - 1 && "•"}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 glass p-8 text-center border-[var(--border-color)] max-w-2xl mx-auto">
          <h4 className="text-lg font-bold text-[var(--text-main)] mb-4">Have an interesting project in mind?</h4>
          <div className="flex justify-center gap-4">
            <a href="mailto:abdiolbelachew@gmail.com" className="btn-primary py-2 px-6 text-sm">Start a Project</a>
            <a href="#contact" className="btn-secondary py-2 px-6 text-sm">Get in Touch</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
