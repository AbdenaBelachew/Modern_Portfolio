import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Layout, 
  FileText, 
  ChevronRight, 
  Loader2, 
  AlertCircle,
  Save,
  Search,
  Package,
  Upload,
  X,
  Check,
  Smartphone,
  Monitor,
  Menu,
  Activity,
  LogOut,
  Settings,
  MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Components ---

const ImageUploader = ({ currentUrl, onUpload, label, onSetupRequired }) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const MAX_WIDTH = 1200; // Resize to reasonable max width
      const MAX_HEIGHT = 1200;
      
      const img = new Image();
      img.src = URL.createObjectURL(file);
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width = Math.round((width * MAX_HEIGHT) / height);
          height = MAX_HEIGHT;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      
      // Compress to WebP at 75% quality to keep DB payload small
      const compressedBase64 = canvas.toDataURL('image/webp', 0.75);
      
      onUpload(compressedBase64);
      URL.revokeObjectURL(img.src);
    } catch (err) {
      console.error('Upload Error:', err);
      alert('Failed to process and compress image: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const onDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{label}</label>
      <div 
        onDragEnter={onDrag}
        onDragLeave={onDrag}
        onDragOver={onDrag}
        onDrop={onDrop}
        className={`relative aspect-video rounded-2xl border-2 border-dashed transition-all overflow-hidden flex flex-col items-center justify-center gap-3
          ${dragActive ? 'border-primary bg-primary/5' : 'border-zinc-100 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20'}
          ${currentUrl ? 'bg-zinc-50 dark:bg-zinc-900 group' : 'bg-transparent'}
        `}
      >
        {currentUrl ? (
          <>
            <img src={currentUrl} alt="" className="w-full h-full object-cover group-hover:opacity-40 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               <label className="cursor-pointer p-4 bg-white dark:bg-zinc-800 rounded-full shadow-2xl text-primary transform scale-90 group-hover:scale-100 transition-all">
                  <Upload size={20} />
                  <input type="file" className="hidden" onChange={(e) => handleUpload(e.target.files[0])} accept="image/*" />
               </label>
            </div>
          </>
        ) : (
          <>
             {uploading ? (
               <Loader2 className="text-primary animate-spin" size={32} />
             ) : (
               <>
                 <div className="p-4 bg-zinc-50 dark:bg-white/5 rounded-full text-zinc-400">
                    <ImageIcon size={24} />
                 </div>
                 <div className="text-center">
                    <p className="text-[11px] font-bold text-zinc-500">Drag & Drop or</p>
                    <label className="text-[11px] font-bold text-primary cursor-pointer hover:underline">
                      Choose File
                      <input type="file" className="hidden" onChange={(e) => handleUpload(e.target.files[0])} accept="image/*" />
                    </label>
                 </div>
               </>
             )}
          </>
        )}
      </div>
    </div>
  );
};

// --- Manager Studio Main ---

const ManagerStudio = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    category: 'Enterprise Solution',
    description: '',
    full_description: '',
    problem: '',
    solution: '',
    image_url: '',
    tech: [],
    gallery_images: [],
    metrics: []
  });

  const [error, setError] = useState(null);
  const [setupMode, setSetupMode] = useState(false);
  const [serviceKey, setServiceKey] = useState('');
  const [settingUp, setSettingUp] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedId) {
      const p = projects.find(p => p.id === selectedId);
      if (p) {
        const parseArr = (val, isObjArr = false) => {
          if (Array.isArray(val)) return val;
          if (typeof val === 'string') {
            if (!val.trim()) return [];
            try { return JSON.parse(val); } 
            catch(e) { return isObjArr ? [] : val.split(',').map(s => s.trim()); }
          }
          return [];
        };

        setFormData({
          ...p,
          tech: parseArr(p.tech),
          gallery_images: parseArr(p.gallery_images),
          metrics: parseArr(p.metrics, true)
        });
      }
    } else {
        setFormData({
            title: '',
            category: 'Enterprise Solution',
            description: '',
            full_description: '',
            problem: '',
            solution: '',
            image_url: '',
            tech: [],
            gallery_images: [],
            metrics: []
        });
    }
  }, [selectedId, projects]);

  const handleSelfHealing = async () => {
    if (!serviceKey) return;
    setSettingUp(true);
    try {
        const { createClient } = await import('@supabase/supabase-js');
        const adminSupabase = createClient(import.meta.env.VITE_SUPABASE_URL, serviceKey);
        
        const { error: createError } = await adminSupabase.storage.createBucket('projects', {
            public: true,
            allowedMimeTypes: ['image/*']
        });
        
        if (createError) throw createError;
        
        setSetupMode(false);
        setServiceKey('');
        alert('✓ Storage Initialized. You can now upload images!');
    } catch (err) {
        alert('Setup failed: ' + err.message);
    } finally {
        setSettingUp(false);
    }
  };

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (!error) setProjects(data || []);
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (selectedId) {
        const { error } = await supabase.from('projects').update({ ...formData }).eq('id', selectedId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from('projects').insert([{ ...formData }]).select();
        if (error) throw error;
        if (data) setSelectedId(data[0].id);
      }
      await fetchProjects();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Delete project permanently?')) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) {
      if (selectedId === id) setSelectedId(null);
      fetchProjects();
    }
  };

  const filteredProjects = projects.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

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
      <Loader2 className="text-primary animate-spin mb-6" size={40} />
      <span className="text-[12px] font-bold tracking-[0.3em] uppercase opacity-40">Loading_Studio_Matrix</span>
    </div>
  );

  return (
    <div className="h-screen bg-white dark:bg-zinc-950 flex flex-col md:flex-row overflow-hidden font-inter transition-colors duration-500">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-zinc-100 dark:border-white/5 bg-white dark:bg-zinc-950 z-30 shrink-0">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-primary/10 text-primary rounded-xl"><Package size={20} /></div>
             <h1 className="text-xl font-black tracking-tight">Studio</h1>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-zinc-900 dark:text-white bg-zinc-100 dark:bg-white/10 rounded-xl"
          >
             {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
      </div>

      {/* Sidebar: Project Navigator */}
      <aside className={`
        fixed md:static inset-y-0 left-0 w-full sm:w-[380px] md:w-[380px] flex flex-col border-r border-zinc-100 dark:border-white/5 bg-white dark:bg-zinc-950 z-40
        transform transition-transform duration-300 ease-in-out md:transform-none
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <header className="p-6 md:p-8 space-y-6">
           <div className="flex items-center justify-between">
              <h1 className="text-xl font-black tracking-tight flex items-center gap-2">
                 <div className="p-2 bg-primary/10 text-primary rounded-xl hidden md:flex"><Package size={20} /></div>
                 <span className="hidden md:inline">Manager Studio</span>
                 <span className="md:hidden">Projects</span>
              </h1>
              <div className="flex items-center gap-2">
                  <button 
                    onClick={() => navigate('/admin/dashboard')}
                    className="p-2.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all"
                  >
                     <LogOut size={20} />
                  </button>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="md:hidden p-2.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all"
                  >
                     <X size={20} />
                  </button>
              </div>
           </div>
           
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-primary transition-colors" size={16} />
              <input 
                placeholder="Search projects..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium outline-none focus:ring-4 focus:ring-primary/5 transition-all"
              />
           </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 custom-scrollbar pb-10">
           <button 
             onClick={() => { setSelectedId(null); setMobileMenuOpen(false); }}
             className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all mb-4 border-2 border-dashed
               ${!selectedId ? 'border-primary bg-primary/5 text-primary' : 'border-zinc-100 dark:border-white/5 text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5'}
             `}
           >
              <Plus size={20} />
              <span className="text-[12px] font-bold uppercase tracking-widest">New_Node_Initialization</span>
           </button>

           <div className="space-y-2">
              {filteredProjects.map(p => (
                <div 
                  key={p.id}
                  onClick={() => { setSelectedId(p.id); setMobileMenuOpen(false); }}
                  className={`group flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all relative overflow-hidden
                    ${selectedId === p.id ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xl shadow-zinc-900/10' : 'hover:bg-zinc-50 dark:hover:bg-white/5'}
                  `}
                >
                   <div className="w-12 h-12 rounded-xl border border-white/10 overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex-shrink-0">
                      {p.image_url && <img src={p.image_url} alt="" className="w-full h-full object-cover" />}
                   </div>
                   <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">{p.title || 'UNNAMED_PROJ'}</p>
                      <p className={`text-[10px] font-bold uppercase tracking-widest opacity-40 ${selectedId === p.id ? 'text-white/60 dark:text-zinc-500' : ''}`}>{p.category}</p>
                   </div>
                   <button 
                     onClick={(e) => handleDelete(e, p.id)}
                     className={`p-2 transition-all opacity-0 group-hover:opacity-100 ${selectedId === p.id ? 'text-white/40 hover:text-white dark:text-zinc-400 dark:hover:text-red-500' : 'text-zinc-300 hover:text-red-500'}`}
                   >
                     <Trash2 size={16} />
                   </button>
                </div>
              ))}
           </div>
        </div>
      </aside>

      {/* Main Area: Simple Refined Editor */}
      <main className="flex-1 overflow-y-auto bg-zinc-50/50 dark:bg-black/20 custom-scrollbar">
        <div className="max-w-4xl mx-auto py-8 md:py-20 px-4 md:px-10 space-y-12 md:space-y-20">
           
           <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
              <div className="space-y-2">
                 <span className="text-[10px] md:text-[12px] font-black tracking-[0.4em] text-primary uppercase">{selectedId ? 'Edit_Project' : 'Genesis_Mode'}</span>
                 <h2 className="text-3xl md:text-4xl font-black tracking-tight">{selectedId ? (formData.title || 'Untitled') : 'Uninitialized Node'}</h2>
              </div>
              <button 
                onClick={handleSave}
                disabled={saving}
                className="w-full md:w-auto px-8 md:px-10 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl text-[12px] font-black uppercase tracking-widest shadow-2xl transition-all hover:scale-[1.03] active:scale-[0.97] flex items-center justify-center gap-3"
              >
                 {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                 {saving ? 'Syncing...' : 'Sync Changes'}
              </button>
           </header>

           {/* Core Details Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <ImageUploader 
                label="Primary Identification Asset" 
                currentUrl={formData.image_url} 
                onUpload={url => setFormData({...formData, image_url: url})} 
                onSetupRequired={() => setSetupMode(true)}
              />
              <div className="space-y-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Identification String</label>
                    <input 
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-white/5 rounded-2xl p-5 text-sm font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all"
                      placeholder="Project Title"
                    />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Categorization</label>
                    <select 
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-white/5 rounded-2xl p-5 text-sm font-bold outline-none cursor-pointer"
                    >
                        <option value="Enterprise Solution">Enterprise Solution</option>
                        <option value="Full-Stack Dev">Full-Stack Dev</option>
                        <option value="SaaS Architecture">SaaS Architecture</option>
                        <option value="System Optimization">System Optimization</option>
                    </select>
                 </div>
              </div>
           </div>

           {/* Narrative Flow */}
           <div className="space-y-8 md:space-y-10 p-6 md:p-10 bg-white dark:bg-zinc-900/40 rounded-[30px] md:rounded-[40px] border border-zinc-100 dark:border-white/5 shadow-sm">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                   <ChevronRight size={14} className="text-primary" /> Brief_Mission_Statement
                </label>
                <input 
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-transparent border-b border-zinc-100 dark:border-white/10 p-2 text-lg font-medium outline-none focus:border-primary transition-all italic"
                  placeholder="The one-line impact of this project"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                   <FileText size={14} className="text-primary" /> Technical_Briefing_Buffer
                </label>
                <textarea 
                  value={formData.full_description}
                  onChange={e => setFormData({...formData, full_description: e.target.value})}
                  className="w-full h-40 bg-zinc-50 dark:bg-black/20 rounded-3xl p-6 text-sm leading-relaxed outline-none focus:ring-4 focus:ring-primary/5 transition-all resize-none"
                  placeholder="Deep technical documentation..."
                />
              </div>
           </div>

           {/* Performance & Tech Stack */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                 <div className="flex items-center justify-between px-2">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Ecosystem</span>
                    <button onClick={() => updateArray('tech', -1)}><PlusCircle size={18} className="text-primary" /></button>
                 </div>
                 <div className="flex flex-wrap gap-2">
                    {(formData.tech || []).map((t, i) => (
                       <div key={i} className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-white/5 rounded-full px-4 py-2">
                          <input className="bg-transparent text-[10px] font-bold outline-none w-16" value={t} onChange={e => updateArray('tech', i, e.target.value)} />
                          <button onClick={() => updateArray('tech', i, null, true)} className="text-zinc-300 hover:text-red-500"><X size={12} /></button>
                       </div>
                    ))}
                 </div>
              </div>
              <div className="space-y-6">
                 <div className="flex items-center justify-between px-2">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Performance Metrics</span>
                    <button onClick={() => updateArray('metrics', -1)}><PlusCircle size={18} className="text-primary" /></button>
                 </div>
                 <div className="space-y-3">
                    {(formData.metrics || []).map((m, i) => (
                      <div key={i} className="flex gap-2 p-2 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-white/5">
                        <input className="flex-1 bg-transparent px-2 text-[10px] font-bold outline-none" value={m.label} placeholder="Metric" onChange={e => {
                           const nM = [...formData.metrics]; nM[i].label = e.target.value; setFormData({...formData, metrics: nM});
                        }} />
                        <input className="flex-[0.4] bg-transparent px-2 text-[11px] font-black text-primary outline-none" value={m.value} placeholder="Value" onChange={e => {
                           const nM = [...formData.metrics]; nM[i].value = e.target.value; setFormData({...formData, metrics: nM});
                        }} />
                        <button onClick={() => updateArray('metrics', i, null, true)} className="text-zinc-300"><X size={14} /></button>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Gallery Hub */}
           <div className="space-y-8 bg-zinc-900 text-white p-6 md:p-10 rounded-[30px] md:rounded-[50px] shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                 <div className="space-y-1">
                    <h3 className="text-xl font-bold tracking-tight flex items-center gap-4">
                       Gallery Artifact Vault <Layout size={20} className="text-primary" />
                    </h3>
                    <p className="text-[10px] uppercase tracking-widest text-white/40">Visual record of technical achievements</p>
                 </div>
                 <button 
                  onClick={() => updateArray('gallery_images', -1)}
                  className="w-full md:w-auto p-4 bg-primary text-white rounded-2xl hover:scale-105 transition-all flex items-center justify-center"
                >
                    <Plus size={24} />
                 </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {(formData.gallery_images || []).map((img, i) => (
                    <div key={i} className="space-y-4">
                       <ImageUploader 
                          currentUrl={img} 
                          onUpload={url => updateArray('gallery_images', i, url)} 
                          label={`Visual_Node_0${i+1}`}
                          onSetupRequired={() => setSetupMode(true)}
                       />
                       <div className="flex gap-2">
                           <input 
                            className="flex-1 bg-white/5 border border-white/5 rounded-xl px-4 py-2 text-[10px] font-mono outline-none" 
                            disabled 
                            value={img || 'Awaiting upload...'} 
                           />
                           <button onClick={() => updateArray('gallery_images', i, null, true)} className="p-3 bg-red-500/10 text-red-500 rounded-xl"><Trash2 size={16} /></button>
                       </div>
                    </div>
                 ))}
                 {!(formData.gallery_images?.length) && (
                   <div className="col-span-full py-20 border border-dashed border-white/10 rounded-[40px] text-center opacity-30">
                      <ImageIcon className="mx-auto mb-4" size={40} strokeWidth={1} />
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em]">No_Visual_Payload_Detected</p>
                   </div>
                 )}
              </div>
           </div>

        </div>
      </main>

      {/* Setup Mode Overlay */}
      <AnimatePresence>
        {setupMode && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md"
          >
             <motion.div 
               initial={{ scale: 0.95, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.95, opacity: 0 }}
               className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-[30px] p-10 shadow-2xl space-y-6"
             >
                <div className="flex flex-col items-center justify-center text-center space-y-4 mb-6">
                    <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center">
                        <AlertCircle size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black">Storage Uninitialized</h3>
                        <p className="text-sm text-zinc-500 mt-2">The <strong className="text-zinc-900 dark:text-white">projects</strong> storage bucket is missing in your Supabase configuration.</p>
                    </div>
                </div>
                
                <div className="space-y-6">
                   <div className="space-y-4">
                       <p className="text-[12px] font-bold text-zinc-400 tracking-widest uppercase">Self-Healing Protocol</p>
                       <p className="text-sm text-zinc-500 leading-relaxed">
                           To fix this instantly, please paste your <strong className="text-zinc-900 dark:text-white">Service Role Key</strong> below. The system will automatically construct the required data structures.
                       </p>
                       <input 
                         value={serviceKey}
                         onChange={e => setServiceKey(e.target.value)}
                         placeholder="eyJhbGciOiJIUzI1NiIs..."
                         className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-white/10 rounded-2xl p-4 text-xs font-mono outline-none focus:ring-4 focus:ring-primary/5 transition-all text-center"
                       />
                   </div>
                   <div className="flex gap-3">
                       <button onClick={() => { setSetupMode(false); setServiceKey(''); }} className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-zinc-50 dark:hover:bg-white/5 rounded-2xl transition-all w-full">Abort</button>
                       <button 
                         onClick={handleSelfHealing} 
                         disabled={settingUp || !serviceKey}
                         className="px-6 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-xl transition-all w-full flex justify-center items-center gap-2 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                       >
                           {settingUp ? <Loader2 size={16} className="animate-spin" /> : 'Initialize Storage'}
                       </button>
                   </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

const PlusCircle = ({ size, className }) => (
    <div className={className} onClick={() => {}}>
        <Plus size={size} />
    </div>
);

export default ManagerStudio;
