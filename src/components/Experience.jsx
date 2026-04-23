import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Building2, Calendar, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Experience = () => {
  const [experiences, setExperiences] = useState([
    {
      company: "Enterprise Solutions Hub",
      role: "Lead Backend Developer",
      period: "2021 — PRESENT",
      achievements: [
        "Architected and deployed a multi-tenant Stock Management ERP used by national distributors to manage 50,000+ SKUs.",
        "Engineered a high-performance Pharmacy Management System with real-time expiry tracking and compliant prescription workflows.",
        "Led the migration of core legacy services to .NET 9.0, achieving a 60% reduction in server response latency."
      ]
    },
    {
      company: "Technical Systems Inc.",
      role: "Senior Software Engineer",
      period: "2019 — 2021",
      achievements: [
        "Developed a robust Digital Archives & Document Management System (DMS) handling 1M+ secure enterprise records.",
        "Implemented advanced RBAC and Identity Server protocols to secure sensitive governmental and legal documents.",
        "Automated complex business workflows, reducing manual processing time by over 70% for administrative teams."
      ]
    },
    {
      company: "Financial Core Tech",
      role: "Full-Stack Developer",
      period: "2017 — 2019",
      achievements: [
        "Built a Shareholder Management Portal featuring automated dividend reconciliation and secure digital voting.",
        "Developed custom internal dashboards using React and .NET Core to visualize real-time corporate equity metrics.",
        "Integrated multi-layer authentication and audit logging for fintech-standard transaction security."
      ]
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [isLiveSync, setIsLiveSync] = useState(false);

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('experience')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        // Map data defensively to handle Supabase column variations
        const mappedData = data.map(exp => ({
          ...exp,
          achievements: Array.isArray(exp.achievements) ? exp.achievements :
            (typeof exp.achievements === 'string' ? JSON.parse(exp.achievements) : [])
        }));
        setExperiences(mappedData);
        setIsLiveSync(true);
      }
    } catch (err) {
      // Silence 404 console noise - seamlessly use fallback if table doesn't exist yet
      const isNotFoundError = err.code === 'PGRST205' || err.status === 404 || err.message?.includes('does not exist');

      if (!isNotFoundError) {
        console.error('Unexpected Experience fetch error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="experience" className="py-0 transition-colors duration-500 font-inter">
      {/* <div className="container mx-auto px-8">
        <div className="max-w-4xl">
          <div className="flex justify-between items-start mb-12">
            <div>
              <div className="badge-elite mb-6">PROFESSIONAL_JOURNEY</div>
              <h2 className="text-4xl md:text-5xl font-black text-[var(--text-main)] tracking-tight leading-tight">
                Impact-Driven <br />
                <span className="gradient-text">Milestones.</span>
              </h2>
            </div>
            {isLiveSync && (
                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] font-mono text-green-600 dark:text-green-400 font-black tracking-widest">LIVE_DB_ACTIVE</span>
                </div>
            )}
          </div>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-[var(--text-dim)]">
              <Loader2 className="animate-spin mb-4" size={32} />
              <span className="text-[10px] font-mono tracking-widest uppercase">Syncing_Journey_Logs...</span>
            </div>
          ) : (
            <div className="space-y-16">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pl-12 border-l-2 border-slate-200 dark:border-white/5 pb-12 last:pb-0"
                >
                  <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-[var(--bg-deep)] shadow-lg shadow-primary/20" />
                  
                  <div className="mb-10">
                      <div className="flex items-center gap-3 mb-6">
                          <div className="px-3 py-1 bg-primary/5 border border-primary/10 rounded-md text-[10px] font-mono text-primary font-bold tracking-widest flex items-center gap-2">
                             <Calendar size={12} /> {exp.period}
                          </div>
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-black text-[var(--text-main)] mt-4 tracking-tight">{exp.role}</h3>
                      <div className="flex items-center gap-2 text-[var(--text-dim)] font-black text-[11px] mt-3 uppercase tracking-[0.2em]">
                          <Building2 size={14} className="text-primary/60" />
                          {exp.company}
                      </div>
                  </div>

                  <ul className="space-y-6 max-w-3xl font-inter">
                      {exp.achievements.map((item, i) => (
                          <li key={i} className="flex gap-4 text-[var(--text-muted)] group">
                              <CheckCircle2 size={18} className="text-primary/40 group-hover:text-primary transition-all flex-shrink-0 mt-0.5" />
                              <span className="text-sm md:text-base leading-relaxed group-hover:text-[var(--text-main)] transition-colors font-semibold">
                                  {item}
                              </span>
                          </li>
                      ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div> */}
    </section>
  );
};

export default Experience;
