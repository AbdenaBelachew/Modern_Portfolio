import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Layout, 
  FileText, 
  Zap, 
  Layers, 
  ChevronRight, 
  Loader2, 
  AlertCircle,
  Eye,
  Settings,
  Monitor,
  Maximize2,
  CheckCircle2,
  History,
  X,
  PlusCircle,
  Sparkles,
  BarChart3,
  Search,
  Globe,
  HardDrive
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Zenith Studio v4: Minimalist Luxury Components ---
const LuxuryInput = ({ label, value, onChange, placeholder, icon: Icon, onFocus }) => (
  <div className="space-y-3 group" onMouseEnter={onFocus}>
    <label className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-primary transition-colors">
      {Icon && <Icon size={14} className="opacity-50" />}
      {label}
    </label>
    <div className="relative">
      <input 
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 text-sm font-medium text-zinc-900 dark:text-white outline-none focus:bg-white dark:focus:bg-white/10 focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all placeholder:text-zinc-300 dark:placeholder:text-zinc-600"
      />
    </div>
  </div>
);

const LuxuryTextarea = ({ label, value, onChange, placeholder, minHeight = "120px", onFocus }) => (
  <div className="space-y-3 group" onMouseEnter={onFocus}>
    <label className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-primary transition-colors">
      <FileText size={14} className="opacity-50" />
      {label}
    </label>
    <textarea 
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ minHeight }}
      className="w-full bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-3xl px-6 py-5 text-sm font-medium text-zinc-900 dark:text-white outline-none focus:bg-white dark:focus:bg-white/10 focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all placeholder:text-zinc-300 dark:placeholder:text-zinc-600 resize-none leading-relaxed"
    />
  </div>
);

const ProjectEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('identity');
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Enterprise Solution',
    description: '',
    full_description: '',
    problem: '',
    solution: '',
    tech: [],
    gallery_images: [],
    metrics: []
  });

  useEffect(() => {
    if (isEdit) fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
      if (error) throw error;
      if (data) setFormData({
        ...data,
        tech: data.tech || [],
        gallery_images: data.gallery_images || [],
        metrics: data.metrics || []
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error: saveError } = isEdit 
        ? await supabase.from('projects').update({ ...formData }).eq('id', id)
        : await supabase.from('projects').insert([{ ...formData }]);
      if (saveError) throw saveError;
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  const updateArray = (field, index, value, isDelete = false) => {
    const newArr = [...formData[field]];
    if (isDelete) newArr.splice(index, 1);
    else if (index === -1) {
      if (field === 'metrics') newArr.push({ label: '', value: '' });
      else newArr.push('');
    } else newArr[index] = value;
    setFormData({ ...formData, [field]: newArr });
  };

  if (loading) return (
    <div className="h-screen bg-white dark:bg-zinc-950 flex flex-col items-center justify-center p-8">
        <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 bg-primary rounded-3xl shadow-2xl shadow-primary/40 flex items-center justify-center text-white"
        >
            <Sparkles size={32} />
        </motion.div>
        <span className="mt-8 text-[12px] font-bold tracking-[0.3em] uppercase opacity-40">Refining Workspace...</span>
    </div>
  );

  return (
    <div className="h-screen bg-white dark:bg-zinc-950 flex overflow-hidden font-inter text-zinc-900 dark:text-white transition-colors duration-500">
      
      {/* --- Left Pane: Control Studio --- */}
      <aside className="w-[480px] flex flex-col bg-white dark:bg-zinc-950 border-r border-zinc-100 dark:border-white/5 z-20">
        <header className="p-10 flex items-center justify-between">
            <button 
                onClick={() => navigate('/admin/dashboard')} 
                className="group flex items-center gap-3 text-sm font-bold text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all"
            >
                <div className="p-2 border border-zinc-100 dark:border-white/10 rounded-xl group-hover:border-zinc-300 transition-all">
                    <ArrowLeft size={18} />
                </div>
                Back
            </button>
            <div className="flex items-center gap-3 px-4 py-2 bg-zinc-50 dark:bg-white/5 rounded-full border border-zinc-100 dark:border-white/5">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-[10px] font-bold tracking-widest uppercase opacity-60">Studio_Live</span>
            </div>
        </header>

        <div className="flex-1 overflow-y-auto px-10 space-y-16 custom-scrollbar pb-32">
            {/* General Info */}
            <section className="space-y-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/5 text-primary rounded-2xl"><Sparkles size={18} /></div>
                    <h2 className="text-xl font-black tracking-tight">General Basics</h2>
                </div>
                <div className="space-y-8">
                    <LuxuryInput 
                        label="Project Title"
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        placeholder="Name of your creation"
                        onFocus={() => setActiveSection('identity')}
                    />
                    <div className="space-y-3">
                        <label className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Industry Classification</label>
                        <select 
                            className="w-full bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:ring-8 focus:ring-primary/5 transition-all appearance-none cursor-pointer"
                            value={formData.category}
                            onChange={e => setFormData({...formData, category: e.target.value})}
                        >
                            <option value="Enterprise Solution">Enterprise Solution</option>
                            <option value="Full-Stack Dev">Full-Stack Dev</option>
                            <option value="SaaS Architecture">SaaS Architecture</option>
                            <option value="System Optimization">System Optimization</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Visual Assets */}
            <section className="space-y-8 border-t border-zinc-100 dark:border-white/5 pt-16">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-zinc-100 dark:bg-white/5 text-zinc-500 rounded-2xl"><ImageIcon size={18} /></div>
                    <h2 className="text-xl font-black tracking-tight">Visual Identity</h2>
                </div>
                <div className="space-y-8">
                    <LuxuryInput 
                        label="Hero Asset URL"
                        value={formData.image_url}
                        onChange={e => setFormData({...formData, image_url: e.target.value})}
                        placeholder="Cloud storage path or external URL"
                        icon={Globe}
                        onFocus={() => setActiveSection('identity')}
                    />
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Artifact Gallery</span>
                            <button onClick={() => updateArray('gallery_images', -1)} className="text-primary hover:scale-110 transition-all"><PlusCircle size={20} /></button>
                        </div>
                        <div className="space-y-4">
                            {formData.gallery_images.map((img, i) => (
                                <div key={i} className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                                    <input className="flex-1 bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl px-5 py-3 text-xs font-medium outline-none focus:border-primary transition-all" value={img} onChange={e => updateArray('gallery_images', i, e.target.value)} placeholder="Artifact URL" />
                                    <button onClick={() => updateArray('gallery_images', i, null, true)} className="p-2 text-zinc-300 hover:text-red-500 transition-all"><Trash2 size={16} /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Storytelling */}
            <section className="space-y-8 border-t border-zinc-100 dark:border-white/5 pt-16">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-zinc-100 dark:bg-white/5 text-zinc-500 rounded-2xl"><FileText size={18} /></div>
                    <h2 className="text-xl font-black tracking-tight">The Story</h2>
                </div>
                <div className="space-y-8">
                    <LuxuryInput 
                        label="The Catchphrase"
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                        placeholder="A punchy one-liner"
                        onFocus={() => setActiveSection('narrative')}
                    />
                    <LuxuryTextarea 
                        label="Detailed Narrative"
                        value={formData.full_description}
                        onChange={e => setFormData({...formData, full_description: e.target.value})}
                        placeholder="Explain the background and technical complexity..."
                        minHeight="180px"
                        onFocus={() => setActiveSection('narrative')}
                    />
                </div>
            </section>

            {/* Metrics & Performance */}
            <section className="space-y-8 border-t border-zinc-100 dark:border-white/5 pt-16">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-zinc-100 dark:bg-white/5 text-zinc-500 rounded-2xl"><BarChart3 size={18} /></div>
                    <h2 className="text-xl font-black tracking-tight">Impact & Metrics</h2>
                </div>
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Performance Data</span>
                        <button onClick={() => updateArray('metrics', -1)}><PlusCircle size={20} className="text-primary" /></button>
                    </div>
                    {formData.metrics.map((m, i) => (
                        <div key={i} className="grid grid-cols-2 gap-3 p-4 bg-zinc-50 dark:bg-white/5 rounded-3xl border border-zinc-100 dark:border-white/5">
                            <input className="bg-transparent border-b border-zinc-200 dark:border-white/10 px-2 py-1 text-[11px] font-bold outline-none focus:border-primary" placeholder="Metric" value={m.label} onChange={e => {
                                const nM = [...formData.metrics]; nM[i].label = e.target.value; setFormData({...formData, metrics: nM});
                            }} />
                            <input className="bg-transparent border-b border-zinc-200 dark:border-white/10 px-2 py-1 text-sm font-black text-primary outline-none focus:border-primary" placeholder="Value" value={m.value} onChange={e => {
                                const nM = [...formData.metrics]; nM[i].value = e.target.value; setFormData({...formData, metrics: nM});
                            }} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Technology */}
            <section className="space-y-8 border-t border-zinc-100 dark:border-white/5 pt-16">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-zinc-100 dark:bg-white/5 text-zinc-500 rounded-2xl"><Zap size={18} /></div>
                    <h2 className="text-xl font-black tracking-tight">Tech Ecosystem</h2>
                </div>
                <div className="space-y-6">
                   <div className="flex flex-wrap gap-2">
                        {formData.tech.map((t, i) => (
                            <div key={i} className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl group hover:border-primary transition-all">
                                <input className="bg-transparent text-[11px] font-bold outline-none w-20" value={t} onChange={e => updateArray('tech', i, e.target.value)} />
                                <button onClick={() => updateArray('tech', i, null, true)} className="text-zinc-400 hover:text-red-500"><X size={12} /></button>
                            </div>
                        ))}
                        <button onClick={() => updateArray('tech', -1)} className="px-4 py-2 border border-dashed border-zinc-200 dark:border-white/20 rounded-xl text-zinc-400 hover:border-primary hover:text-primary transition-all">
                            <Plus size={14} />
                        </button>
                   </div>
                </div>
            </section>
        </div>

        <footer className="p-10 border-t border-zinc-100 dark:border-white/5 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl">
            <div className="flex gap-4">
                <button 
                  onClick={() => navigate('/admin/dashboard')}
                  className="flex-1 py-5 rounded-3xl text-[12px] font-bold tracking-widest uppercase hover:bg-zinc-100 dark:hover:bg-white/5 transition-all text-zinc-400"
                >
                    Discard
                </button>
                <button 
                   onClick={handleSave}
                   disabled={saving}
                   className="flex-[2] py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-3xl text-[12px] font-bold tracking-widest uppercase shadow-2xl shadow-zinc-900/20 dark:shadow-white/20 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {saving ? 'Finishing...' : 'Publish Project'}
                </button>
            </div>
        </footer>
      </aside>

      {/* --- Right Pane: Presentation Canvas --- */}
      <main className="flex-1 bg-zinc-50 dark:bg-black overflow-y-auto relative py-20 px-12 custom-scrollbar">
        
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-[0.03] dark:opacity-[0.07]">
            <div className="absolute top-0 right-0 w-full h-[50vh] bg-gradient-to-b from-primary to-transparent blur-[150px]" />
        </div>

        {/* Minimal Tool Toggle */}
        <div className="fixed top-12 right-12 z-50">
            <button className="p-4 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-white/5 rounded-3xl shadow-2xl flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase text-zinc-400 hover:text-primary transition-all">
                <Monitor size={16} /> Presentation Mode
            </button>
        </div>

        {/* Presentation Area */}
        <div className="max-w-6xl mx-auto py-20">
            <motion.div 
                layout
                className="bg-white dark:bg-zinc-900/40 rounded-[60px] shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-white/5 overflow-hidden p-20 space-y-32"
            >
                {/* Hero Section */}
                <div className={`space-y-16 transition-all duration-1000 ${activeSection === 'identity' ? 'scale-100' : 'scale-[0.98] opacity-50'}`}>
                    <div className="space-y-8 text-center">
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-5 py-2 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] rounded-full">
                            {formData.category}
                        </motion.div>
                        <h1 className="text-8xl font-black tracking-tight leading-none text-zinc-900 dark:text-white">
                            {formData.title || "Untitled Creation"}
                        </h1>
                    </div>
                    
                    <div className="aspect-[21/10] rounded-[40px] overflow-hidden shadow-2xl relative group bg-zinc-100 dark:bg-white/5">
                        {formData.image_url ? (
                            <img src={formData.image_url} alt="" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <Sparkles size={80} className="text-zinc-200 dark:text-white/5" strokeWidth={0.5} />
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>
                </div>

                {/* Narrative Grid */}
                <div className={`grid grid-cols-12 gap-24 transition-all duration-1000 ${activeSection === 'narrative' ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-30 blur-sm'}`}>
                    <div className="col-span-12 lg:col-span-7 space-y-12">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-primary">
                                <Search size={24} />
                                <span className="text-[12px] font-black tracking-[0.3em] uppercase">Core Investigation</span>
                            </div>
                            <p className="text-3xl font-bold italic leading-tight text-zinc-500 dark:text-zinc-400">
                                "{formData.description || "The story begins with a single line of code and a grand vision..."}"
                            </p>
                        </div>
                        <div className="text-xl leading-relaxed text-zinc-400 dark:text-zinc-500 whitespace-pre-wrap">
                            {formData.full_description || "Detailed technical documentation will populate this section as you build your narrative in the studio vault."}
                        </div>
                    </div>
                    
                    <div className="col-span-12 lg:col-span-5 space-y-16">
                        <div className="space-y-10">
                            <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-30">Key Metrics</span>
                            <div className="space-y-12">
                                {formData.metrics.map((m, i) => (
                                    <div key={i} className="group border-l border-zinc-100 dark:border-white/5 pl-8 hover:border-primary transition-all">
                                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">{m.label || "METRIC"}</p>
                                        <p className="text-5xl font-black text-zinc-900 dark:text-white group-hover:text-primary transition-colors">{m.value || "0.0"}</p>
                                    </div>
                                ))}
                                {formData.metrics.length === 0 && <p className="text-sm font-medium italic opacity-20">No data points calibrated.</p>}
                            </div>
                        </div>

                        <div className="space-y-10 pt-10 border-t border-zinc-100 dark:border-white/5">
                            <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-30">Ecosystem</span>
                            <div className="flex flex-wrap gap-3">
                                {formData.tech.map((t, i) => (
                                    <span key={i} className="px-5 py-2 bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:border-primary hover:text-primary transition-all">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Conflict / Resolution */}
                <div className="grid md:grid-cols-2 gap-20 py-24 border-y border-zinc-100 dark:border-white/5">
                     <div className="space-y-8">
                        <span className="inline-flex items-center gap-3 px-4 py-2 bg-red-500/5 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Challenge
                        </span>
                        <p className="text-lg font-medium leading-relaxed opacity-60">
                            {formData.problem || "The technical challenge addressed by this node."}
                        </p>
                    </div>
                    <div className="space-y-8">
                        <span className="inline-flex items-center gap-3 px-4 py-2 bg-green-500/5 text-green-500 text-[10px] font-black uppercase tracking-widest rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Solution
                        </span>
                        <p className="text-lg font-medium leading-relaxed opacity-60">
                            {formData.solution || "The architectural resolution implemented."}
                        </p>
                    </div>
                </div>

                {/* Final Artifacts */}
                <div className="space-y-20">
                     <div className="space-y-6 text-center">
                        <div className="text-[10px] font-black tracking-[0.5em] uppercase opacity-20">System Artifacts</div>
                        <h2 className="text-5xl font-black tracking-tight text-zinc-900 dark:text-white">Capture Reality</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {formData.gallery_images.map((img, i) => (
                             <motion.div 
                                key={i}
                                whileHover={{ y: -10 }}
                                className="aspect-square bg-zinc-50 dark:bg-zinc-800/40 rounded-[40px] overflow-hidden border border-zinc-100 dark:border-white/10 shadow-xl group"
                             >
                                {img && <img src={img} alt="" className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" />}
                             </motion.div>
                        ))}
                    </div>
                    {formData.gallery_images.length === 0 && (
                        <div className="py-40 border-2 border-dashed border-zinc-100 dark:border-white/5 rounded-[60px] flex flex-col items-center justify-center opacity-10">
                            <HardDrive size={60} />
                            <span className="text-[12px] font-bold tracking-widest uppercase mt-4">Empty Storage Node</span>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          @apply bg-zinc-200 dark:bg-zinc-800 rounded-full;
        }
      `}} />
    </div>
  );
};

export default ProjectEditor;
