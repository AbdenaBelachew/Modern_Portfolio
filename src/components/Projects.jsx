import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Loader2, Database, Shield, Zap, X, ChevronRight, Layout } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      id: 'fallback-1',
      title: "StockMaster ERP Ecosystem",
      category: "Enterprise Supply Chain",
      description: "A comprehensive backend-heavy ERP solution for national-level inventory and procurement synchronization.",
      full_description: "This project involved architecting a massive .NET Core ecosystem to replace legacy siloed inventory systems. The core challenge was high-concurrency stock synchronization across multiple physical warehouses.",
      rationale: "Selected a Microservices architecture to ensure that the core 'Inventory' and 'Procurement' domains could scale independently during peak seasonal traffic. Redis was chosen as the shared state layer to handle race conditions in warehouse stock updates.",
      problem: "National-level distributors were struggling with siloed inventory data, manual reconciliation errors, and 30%+ stock wastage.",
      solution: "Architected a centralized .NET Core ecosystem featuring real-time inventory synchronization, automated procurement logic, and multi-warehouse management.",
      impact: "Reduced inventory discrepancies by 95% and accelerated order fulfillment cycles by 40%.",
      metrics: [
        { label: "Consistency", value: "99.99%" },
        { label: "Sync Latency", value: "< 200ms" },
        { label: "Throughput", value: "50k/min" }
      ],
      tech: ["ASP.NET Core", "SQL Server", "Redis", "EF Core"],
      gallery_images: [],
      image_url: null
    },
    {
      id: 'fallback-2',
      title: "PharmaConnect Management",
      category: "HealthTech",
      description: "Secure health-tech platform for pharmaceutical compliance and patient record management.",
      full_description: "PharmaConnect was designed to solve the critical issue of drug expiry and prescriptive compliance in retail pharmacy environments.",
      rationale: "Compliance was the primary driver. We implemented a strictly typed domain model to prevent medication errors and leveraged ASP.NET Core Identity for a hardened, HIPAA-aligned authentication layer.",
      problem: "Retail pharmacies faced high operational overhead, compliance risks with expiry tracking, and slow retrieval of patient historical records.",
      solution: "Developed a secure, RBAC-protected management system with automated drug expiry alerts, encrypted prescription storage, and integrated billing.",
      impact: "Ensured 100% regulatory compliance and reduced patient wait times by an average of 15 minutes per visit.",
      metrics: [
        { label: "Uptime", value: "99.9%" },
        { label: "Search Speed", value: "0.1s" },
        { label: "Data Integrity", value: "100%" }
      ],
      tech: ["React", ".NET 9.0", "PostgreSQL", "JWT"],
      gallery_images: [],
      image_url: null
    },
    {
      id: 'fallback-3',
      title: "ArchivaSecure DMS",
      category: "Document Management",
      description: "High-performance digital archiving system for government-level record durability.",
      full_description: "ArchivaSecure is a digital transformation powerhouse. It serves as a resilient document management system for government departments dealing with millions of physical records.",
      rationale: "Retrievability at scale was key. We chose ElasticSearch for its powerful meta-data indexing, allowing sub-second retrieval across millions of encrypted PDF artifacts.",
      problem: "Government departments were overwhelmed by physical record backlogs, making critical data retrieval slow and prone to loss.",
      solution: "Implemented a high-performance Digital Archives system with OCR capabilities, elastic meta-search, and redundant secure storage.",
      impact: "Digitized over 2 million records, achieving sub-second retrieval times and ensuring long-term data durability.",
      metrics: [
        { label: "Records Indexed", value: "2M+" },
        { label: "Retrieval", value: "0.5s" },
        { label: "Redundancy", value: "Geo-Ref" }
      ],
      tech: ["C#", "ASP.NET Core", "Blazor", "SQL Server"],
      gallery_images: [],
      image_url: null
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLiveSync, setIsLiveSync] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        // Map data defensively to handle Supabase column variations (Strings vs Arrays)
        const mappedData = data.map(project => ({
          ...project,
          tech: Array.isArray(project.tech) ? project.tech :
            (typeof project.tech === 'string' ? project.tech.split(',').map(t => t.trim()) : []),
          gallery_images: Array.isArray(project.gallery_images) ? project.gallery_images :
            (typeof project.gallery_images === 'string' ? project.gallery_images.split(',').map(img => img.trim()) : []),
          metrics: Array.isArray(project.metrics) ? project.metrics :
            (typeof project.metrics === 'string' ? JSON.parse(project.metrics) : [])
        }));
        setProjects(mappedData);
        setIsLiveSync(true);
      }
    } catch (err) {
      // Silence 404 console noise - seamlessly use fallback if table doesn't exist yet
      const isNotFoundError = err.code === 'PGRST205' || err.status === 404 || err.message?.includes('does not exist');
      
      if (!isNotFoundError) {
        console.error('Unexpected Projects fetch error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="projects" className="py-32 transition-colors duration-500">
      <div className="container mx-auto px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div>
            <div className="badge-elite mb-6">PROJECT_MANIFEST</div>
            <h2 className="text-4xl md:text-5xl font-black text-[var(--text-main)] tracking-tight">
              Enterprise Grade <br />
              <span className="gradient-text">Case Studies.</span>
            </h2>
          </div>
          <div className="flex flex-col items-end gap-3">
            <p className="text-[var(--text-dim)] max-w-sm text-right text-sm leading-relaxed font-mono font-bold">
              FOCUSED ON SCALE AND IMPACT <br />
              HARDENED IN PRODUCTION
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
            <span className="text-[10px] font-mono tracking-widest uppercase">Initializing_Project_Stream...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass group flex flex-col h-full hover:bg-primary/5 transition-all overflow-hidden border-[var(--border-color)]"
              >
                {/* Project Image Header */}
                <div className="relative aspect-video overflow-hidden border-b border-[var(--border-color)] bg-zinc-200/50 dark:bg-zinc-900/50 cursor-pointer" onClick={() => setSelectedProject(project)}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 dark:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-200/40 to-transparent z-10 opacity-100 dark:opacity-0" />
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/5">
                      <div className="flex flex-col items-center gap-3">
                        <Database size={24} className="text-primary/40" />
                        <div className="text-[9px] font-mono text-[var(--text-dim)] tracking-[0.3em] uppercase select-none">
                          System_Visual_Secure
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="absolute top-4 right-4 z-20 flex gap-2">
                    <button className="p-2 glass bg-white/80 dark:bg-zinc-950/50 hover:bg-primary hover:text-white transition-all border-[var(--border-color)] group/btn">
                      <Github size={14} className="text-[var(--text-dim)] group-hover/btn:text-white" />
                    </button>
                    <button className="p-2 glass bg-white/80 dark:bg-zinc-950/50 hover:bg-primary hover:text-white transition-all border-[var(--border-color)] group/btn">
                      <ExternalLink size={14} className="text-[var(--text-dim)] group-hover/btn:text-white" />
                    </button>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-[9px] font-black tracking-widest uppercase rounded">
                      {project.category}
                    </span>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-[var(--text-dim)] hover:text-primary transition-colors font-mono text-[10px] tracking-widest uppercase flex items-center gap-2 font-black"
                    >
                      Learn_More <ChevronRight size={14} />
                    </button>
                  </div>

                  <h3
                    onClick={() => setSelectedProject(project)}
                    className="text-xl font-black text-[var(--text-main)] mb-6 tracking-tight group-hover:text-primary transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>

                  <p className="text-[var(--text-muted)] text-[13px] leading-relaxed mb-10 font-bold line-clamp-2">
                    {project.description}
                  </p>

                  <div className="space-y-6 flex-1 mb-10">
                    <div>
                      <div className="text-[9px] font-mono text-[var(--text-dim)] uppercase tracking-widest mb-2 flex items-center gap-2 font-black">
                        <span className="w-1 h-1 bg-red-500 rounded-full" /> Description
                      </div>
                      <p className="text-[var(--text-muted)] text-[12px] leading-relaxed line-clamp-4 font-semibold italic">{project.full_description}</p>
                    </div>
                    <div className="pt-4 border-t border-[var(--border-color)]">
                      <div className="text-[9px] font-mono text-[var(--text-dim)] uppercase tracking-widest mb-2 flex items-center gap-2 font-black">
                        <span className="w-1 h-1 bg-green-500 rounded-full" /> Key Impact
                      </div>
                      <p className="text-[var(--text-main)] text-[12px] font-black leading-relaxed">{project.rationale}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-auto pt-6 border-t border-[var(--border-color)]">
                    {(Array.isArray(project.tech) ? project.tech : []).slice(0, 4).map((t, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-primary/40" />
                        <span className="text-[8px] font-mono text-[var(--text-dim)] uppercase tracking-tight font-black">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-[var(--bg-deep)]/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-6xl max-h-[95vh] glass border-[var(--border-color)] overflow-y-auto custom-scrollbar bg-[var(--bg-deep)]"
            >
              {/* Expansive Header: Large Image */}
              <div className="relative w-full h-[300px] md:h-[450px] overflow-hidden border-b border-[var(--border-color)]">
                {selectedProject.image_url ? (
                  <img src={selectedProject.image_url} alt={selectedProject.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-primary/5">
                    <Layout size={64} className="text-primary/20" />
                    <span className="text-[12px] font-mono tracking-[0.4em] text-[var(--text-dim)] uppercase italic">System_Blueprint_Secure</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-deep)] to-transparent opacity-60" />
                
                {/* Close Button Overlay */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 z-50 p-3 bg-black/50 backdrop-blur-xl hover:bg-primary rounded-full transition-all group border border-white/10"
                >
                  <X size={24} className="text-white group-hover:scale-110" />
                </button>
              </div>

              {/* Expansive Content Area */}
              <div className="p-8 md:p-20">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
                  <div className="max-w-3xl">
                    <div className="badge-elite mb-6">{selectedProject.category}</div>
                    <h2 className="text-4xl md:text-7xl font-black text-[var(--text-main)] tracking-tighter leading-tight mb-8">
                      {selectedProject.title}
                    </h2>
                    <p className="text-[var(--text-muted)] text-xl md:text-2xl leading-relaxed font-semibold">
                      {selectedProject.full_description || selectedProject.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 min-w-[200px]">
                    <button className="btn-primary w-full py-4 flex items-center justify-center gap-3">
                      <Github size={18} /> Source_Code
                    </button>
                    <button className="btn-secondary w-full py-4 flex items-center justify-center gap-3">
                      <ExternalLink size={18} /> Live_System
                    </button>
                  </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-12 mb-20">
                  {/* Left: Technical Rationale */}
                  <div className="lg:col-span-2 p-10 bg-zinc-100 dark:bg-white/[0.03] border border-[var(--border-color)] rounded-3xl">
                    <div className="text-[11px] font-mono text-primary uppercase tracking-[0.4em] mb-6 font-black flex items-center gap-2">
                      <Zap size={16} /> Technical_Rationale
                    </div>
                    <p className="text-[var(--text-muted)] text-lg leading-relaxed font-bold italic">
                      {selectedProject.rationale}
                    </p>
                  </div>

                  {/* Right: Key Metrics */}
                  <div className="space-y-4">
                    <div className="text-[11px] font-mono text-[var(--text-dim)] uppercase tracking-[0.4em] mb-4 font-black">Performance_KPIs</div>
                    {selectedProject.metrics && Array.isArray(selectedProject.metrics) && selectedProject.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="p-6 glass border-[var(--border-color)] flex justify-between items-center group/metric hover:border-primary/30 transition-all">
                        <div className="text-[10px] font-mono text-[var(--text-dim)] uppercase tracking-[0.2em] font-black">{metric.label}</div>
                        <div className="text-xl font-black text-primary transition-colors">{metric.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Artifacts Gallery */}
                {selectedProject.gallery_images && selectedProject.gallery_images.length > 0 && (
                  <div className="mb-20">
                    <div className="text-[11px] font-mono text-[var(--text-dim)] uppercase tracking-[0.4em] mb-8 font-black flex items-center gap-2">
                      <Layout size={16} /> System_Artifact_Gallery
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                      {selectedProject.gallery_images.map((img, i) => (
                        <div key={i} className="rounded-2xl overflow-hidden glass border-[var(--border-color)]">
                          <img src={img} alt={`${selectedProject.title} artifact ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-12 mb-20 border-t border-[var(--border-color)] pt-12">
                  <div>
                    <div className="text-[11px] font-mono text-[var(--text-dim)] uppercase tracking-[0.4em] mb-6 font-black flex items-center gap-2 text-primary">
                      <span className="w-2 h-2 rounded-full bg-current" /> Detailed_Context
                    </div>
                    <p className="text-[var(--text-muted)] text-base leading-relaxed font-semibold italic">
                      {selectedProject.problem}
                    </p>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-[var(--text-dim)] uppercase tracking-[0.4em] mb-6 font-black flex items-center gap-2 text-primary">
                      <span className="w-2 h-2 rounded-full bg-current" /> Structural_Solution
                    </div>
                    <p className="text-[var(--text-muted)] text-base leading-relaxed font-semibold">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>

                <div className="p-12 bg-primary/5 border border-primary/20 rounded-3xl mb-20">
                  <div className="text-[11px] font-mono text-primary uppercase tracking-[0.4em] mb-4 font-black flex items-center gap-2">
                    <Shield size={18} /> Verified_Operational_Impact
                  </div>
                  <p className="text-2xl md:text-4xl font-black text-[var(--text-main)] tracking-tight leading-tight">
                    {selectedProject.impact}
                  </p>
                </div>

                <div className="pt-12 border-t border-[var(--border-color)]">
                  <div className="text-[11px] font-mono text-[var(--text-dim)] uppercase tracking-[0.4em] mb-8 font-black">Final_Infrastructure_Stack</div>
                  <div className="flex flex-wrap gap-4">
                    {(Array.isArray(selectedProject.tech) ? selectedProject.tech : []).map((t, i) => (
                      <span key={i} className="px-6 py-3 bg-white/[0.03] border border-[var(--border-color)] rounded-xl text-[12px] font-mono font-bold text-[var(--text-muted)] group hover:border-primary/50 transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
