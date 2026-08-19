import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Loader2, Database, Shield, Zap, X, ChevronRight, Layout } from 'lucide-react';
import { getProjects } from '../lib/store';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    setProjects(getProjects());
    setLoading(false);
  }, []);

  return (
    <section id="projects" className="py-20 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">Projects</p>
            <h2 className="text-3xl md:text-4xl font-black text-[var(--text-main)] tracking-tight">
              Case Studies
            </h2>
          </div>
          <p className="text-[var(--text-dim)] max-w-xs text-sm leading-relaxed">
            Real-world enterprise systems designed and developed to deliver high business impact.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-[var(--text-dim)]">
            <Loader2 className="animate-spin mb-4" size={24} />
            <span className="text-xs uppercase tracking-wider">Loading projects...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id || idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass group flex flex-col h-full hover:bg-primary/5 transition-all overflow-hidden border-[var(--border-color)]"
              >
                {/* Project Image Header */}
                <div className="relative aspect-video overflow-hidden border-b border-[var(--border-color)] bg-zinc-200/50 dark:bg-zinc-900/50 cursor-pointer" onClick={() => setSelectedProject(project)}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/5">
                      <Database size={24} className="text-primary/40" />
                    </div>
                  )}

                  <div className="absolute top-3 right-3 z-20 flex gap-2">
                    <button className="p-1.5 glass bg-white/80 dark:bg-zinc-950/50 hover:bg-primary hover:text-white transition-all border-[var(--border-color)]">
                      <Github size={13} className="text-[var(--text-dim)] hover:text-inherit" />
                    </button>
                    <button className="p-1.5 glass bg-white/80 dark:bg-zinc-950/50 hover:bg-primary hover:text-white transition-all border-[var(--border-color)]">
                      <ExternalLink size={13} className="text-[var(--text-dim)] hover:text-inherit" />
                    </button>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-bold tracking-wider uppercase rounded">
                      {project.category}
                    </span>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-primary hover:underline font-mono text-[10px] tracking-wider uppercase flex items-center gap-1 font-bold"
                    >
                      Details <ChevronRight size={12} />
                    </button>
                  </div>

                  <h3
                    onClick={() => setSelectedProject(project)}
                    className="text-lg font-bold text-[var(--text-main)] mb-3 group-hover:text-primary transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>

                  <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-[var(--border-color)]">
                    {(Array.isArray(project.tech) ? project.tech : []).slice(0, 4).map((t, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-100 dark:bg-white/5 text-[9px] font-mono text-[var(--text-dim)] rounded uppercase">
                        {t}
                      </span>
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
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              className="relative w-full max-w-4xl max-h-[90vh] glass border-[var(--border-color)] overflow-y-auto custom-scrollbar bg-[var(--bg-deep)] rounded-2xl"
            >
              {/* Header: Large Image */}
              <div className="relative w-full h-[240px] md:h-[350px] overflow-hidden border-b border-[var(--border-color)]">
                {selectedProject.image_url ? (
                  <img src={selectedProject.image_url} alt={selectedProject.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-primary/5">
                    <Layout size={40} className="text-primary/20" />
                    <span className="text-xs text-[var(--text-dim)] italic font-mono uppercase">System Design Blueprint</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-deep)] to-transparent opacity-80" />

                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-50 p-2 bg-black/40 hover:bg-primary rounded-full transition-all group border border-white/10"
                >
                  <X size={18} className="text-white group-hover:scale-110" />
                </button>
              </div>

              {/* Content Area */}
              <div className="p-6 md:p-12">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
                  <div className="max-w-2xl">
                    <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-bold uppercase rounded mb-4 inline-block">
                      {selectedProject.category}
                    </span>
                    <h2 className="text-2xl md:text-4xl font-black text-[var(--text-main)] tracking-tight mb-4">
                      {selectedProject.title}
                    </h2>
                    <p className="text-[var(--text-muted)] text-base leading-relaxed">
                      {selectedProject.full_description || selectedProject.description}
                    </p>
                  </div>

                  <div className="flex gap-3 w-full md:w-auto flex-shrink-0">
                    <button className="btn-primary py-2 px-4 text-sm flex items-center gap-2 shadow-none rounded-lg flex-1 md:flex-none justify-center">
                      <Github size={16} /> Code
                    </button>
                    <button className="btn-secondary py-2 px-4 text-sm flex items-center gap-2 rounded-lg flex-1 md:flex-none justify-center">
                      <ExternalLink size={16} /> Live Site
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  {/* Left: Technical Rationale */}
                  <div className="md:col-span-2 p-6 bg-zinc-100 dark:bg-white/[0.03] border border-[var(--border-color)] rounded-2xl">
                    <div className="text-xs font-semibold text-primary uppercase mb-3 flex items-center gap-2">
                      <Zap size={14} /> Technical Choice
                    </div>
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed italic">
                      {selectedProject.rationale}
                    </p>
                  </div>

                  {/* Right: Key Metrics */}
                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-[var(--text-dim)] uppercase mb-2">Metrics & KPIs</div>
                    {selectedProject.metrics && Array.isArray(selectedProject.metrics) && selectedProject.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="p-4 glass border-[var(--border-color)] flex justify-between items-center hover:border-primary/20 transition-all">
                        <div className="text-[10px] font-mono text-[var(--text-dim)] uppercase tracking-wider">{metric.label}</div>
                        <div className="text-base font-bold text-primary">{metric.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Challenges & Solutions */}
                <div className="grid md:grid-cols-2 gap-8 mb-8 border-t border-[var(--border-color)] pt-8">
                  <div>
                    <div className="text-xs font-semibold text-primary uppercase mb-3">The Problem</div>
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                      {selectedProject.problem}
                    </p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-primary uppercase mb-3">The Solution</div>
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>

                {/* Impact Banner */}
                <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl mb-8">
                  <div className="text-xs font-semibold text-primary uppercase mb-2 flex items-center gap-2">
                    <Shield size={16} /> Verified Impact
                  </div>
                  <p className="text-lg md:text-xl font-bold text-[var(--text-main)]">
                    {selectedProject.impact}
                  </p>
                </div>

                <div className="pt-6 border-t border-[var(--border-color)]">
                  <div className="text-xs font-semibold text-[var(--text-dim)] mb-4">Infrastructure & Tech Stack</div>
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(selectedProject.tech) ? selectedProject.tech : []).map((t, i) => (
                      <span key={i} className="px-3 py-1.5 bg-slate-100 dark:bg-white/5 border border-[var(--border-color)] rounded-lg text-xs font-mono font-medium text-[var(--text-muted)]">
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
