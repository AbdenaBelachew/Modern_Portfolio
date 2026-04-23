import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Network, Layout, ShieldCheck, Zap, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Services = () => {
  const [services, setServices] = useState([
    {
      title: "Enterprise Backend Systems",
      desc: "Architecting robust ASP.NET Core ecosystems for large-scale operations, from stock management to national archives.",
      icon_name: "database",
      tags: ["C#", ".NET 9/10", "NodeJS"]
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
      desc: "Building high-density React dashboards that provide real-time visibility into complex business metrics and operations.",
      icon_name: "layout",
      tags: ["React", "Custom UI", "Dashboards"]
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [isLiveSync, setIsLiveSync] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        // Map data defensively
        const mappedData = data.map(service => ({
          ...service,
          tags: Array.isArray(service.tags) ? service.tags :
            (typeof service.tags === 'string' ? service.tags.split(',').map(t => t.trim()) : [])
        }));
        setServices(mappedData);
        setIsLiveSync(true);
      }
    } catch (err) {
      // Silence 404 console noise - seamlessly use fallback if table doesn't exist yet
      const isNotFoundError = err.code === 'PGRST205' || err.status === 404 || err.message?.includes('does not exist');

      if (!isNotFoundError) {
        console.error('Unexpected Services fetch error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (name) => {
    switch (name?.toLowerCase()) {
      case 'code': return <Code2 size={24} />;
      case 'database': return <Database size={24} />;
      case 'network': return <Network size={24} />;
      case 'layout': return <Layout size={24} />;
      case 'shield': return <ShieldCheck size={24} />;
      case 'zap': return <Zap size={24} />;
      default: return <Code2 size={24} />;
    }
  };

  return (
    <section id="services" className="py-32 transition-colors duration-500 px-8 font-inter">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
          <div>
            <div className="badge-elite mb-6">FREELANCE_SERVICES</div>
            <h2 className="text-4xl md:text-6xl font-black text-[var(--text-main)] tracking-tight leading-tight">
              Strategic Solutions <br />
              <span className="gradient-text">For Your Scale.</span>
            </h2>
          </div>
          <div className="flex flex-col items-end gap-3 text-right">
            <p className="text-[var(--text-dim)] max-w-sm text-sm leading-relaxed font-mono font-bold">
              AVAILABLE FOR CONSULTANCY <br />
              ADVISORY & EXECUTION
            </p>
            {isLiveSync && (
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] font-mono text-green-600 dark:text-green-400 font-black tracking-widest">LIVE_DB_ACTIVE</span>
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-[var(--text-dim)]">
            <Loader2 className="animate-spin mb-4" size={32} />
            <span className="text-[10px] font-mono tracking-widest uppercase">Fetching_Service_Catalog...</span>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-12 group hover:bg-primary/5 transition-all border-[var(--border-color)]"
              >
                <div className="flex flex-col md:flex-row gap-10 items-start">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:border-primary/50 transition-all group-hover:scale-105">
                    {getIcon(service.icon_name || service.icon)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-[var(--text-main)] mb-4 tracking-tight group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-[var(--text-muted)] text-base leading-relaxed mb-10 font-semibold">
                      {service.desc || service.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {service.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-mono text-[var(--text-dim)] tracking-[0.2em] font-black uppercase">
                          {tag} {tIdx < service.tags.length - 1 && "—"}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-20 glass p-12 text-center border-[var(--border-color)]">
          <h4 className="text-xl md:text-2xl font-black text-[var(--text-main)] mb-6 tracking-tight">Ready to architect your next system?</h4>
          <div className="flex justify-center flex-wrap gap-6 mt-8">
            <a href="mailto:abdiolbelachew@gmail.com" className="btn-primary">Start a Project</a>
            <a href="#contact" className="btn-secondary">View Process</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
