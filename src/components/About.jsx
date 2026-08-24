import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Network, ShieldAlert } from 'lucide-react';

const About = () => {
  const strengths = [
    {
      title: "Full-Stack Architecture",
      desc: "Building enterprise applications with React on the frontend and ASP.NET Core, Node.js, and REST APIs on the backend — from complex workflows to high-performance services.",
      icon: <Layers size={22} />
    },
    {
      title: "Enterprise Solutions",
      desc: "Delivered systems including SAP ERP transformation support, Shareholder & AGM, Risk & Compliance, Outsourcing Management, Digital Archives, and Pharmacy platforms.",
      icon: <Network size={22} />
    },
    {
      title: "Security & Compliance",
      desc: "Implementing LDAP/AD integration, RBAC, and secure transaction middleware for fintech and banking sectors.",
      icon: <ShieldAlert size={22} />
    }
  ];

  return (
    <section id="about" className="py-20 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">About Me</p>
            <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight text-[var(--text-main)]">
              Solving complexity through <br />
              <span className="text-primary">structured engineering.</span>
            </h2>
            <p className="text-[var(--text-muted)] text-base mb-6 leading-relaxed">
              Over 4 years, I've focused on building resilient, high-availability systems with React, .NET, and Node.js that serve as the digital backbone for large-scale enterprises.
            </p>
            <p className="text-[var(--text-dim)] text-sm mb-10 leading-relaxed">
              I combine technical precision with operational empathy — designing systems that solve real business bottlenecks while ensuring organizational scalability and security.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <motion.div
                whileHover={{ y: -4 }}
                className="p-6 glass border-primary/20 bg-primary/5 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-2 opacity-10">
                  <Layers size={36} />
                </div>
                <div className="text-3xl font-black text-primary mb-1">10+</div>
                <div className="text-xs uppercase tracking-wider text-[var(--text-dim)] font-semibold">Systems Deployed</div>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="p-6 glass border-[var(--border-color)] relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-2 opacity-10">
                  <Network size={36} />
                </div>
                <div className="text-3xl font-black text-primary mb-1">National</div>
                <div className="text-xs uppercase tracking-wider text-[var(--text-dim)] font-semibold">Scale Operations</div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            {strengths.map((item, idx) => (
              <div key={idx} className="glass group p-6 hover:bg-primary/5 transition-all border-[var(--border-color)]">
                <div className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:border-primary/50 transition-all group-hover:scale-105">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--text-main)] mb-2">{item.title}</h3>
                    <p className="text-[var(--text-dim)] text-sm leading-relaxed">{item.desc}</p>
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
