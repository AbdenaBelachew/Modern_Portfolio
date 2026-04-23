import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import {
  Plus,
  Trash2,
  Edit3,
  RefreshCcw,
  Loader2,
  Package,
  Activity,
  LogOut,
  Shield,
  MessageSquare,
  Settings
} from 'lucide-react';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setSyncing(true);
      const [projRes, inqRes] = await Promise.all([
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('inquiries').select('*').order('created_at', { ascending: false })
      ]);

      if (projRes.error) throw projRes.error;
      if (inqRes.error) console.warn("Inquiries fetch error:", inqRes.error);

      setProjects(projRes.data || []);
      setInquiries(inqRes.data || []);
    } catch (err) {
      console.error('Dash error:', err);
    } finally {
      setLoading(false);
      setSyncing(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const handleDelete = async (id, table) => {
    if (!window.confirm('CRITICAL: Permanent data deletion requested. Continue?')) return;

    try {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;

      if (table === 'projects') setProjects(projects.filter(p => p.id !== id));
      if (table === 'inquiries') setInquiries(inquiries.filter(i => i.id !== id));
    } catch (err) {
      alert('Deletion failed: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-deep)] flex items-center justify-center">
        <Loader2 className="text-primary animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-deep)] pt-32 pb-20 px-8 font-inter">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div>
            <div className="badge-elite mb-4">SYSTEM_ADMIN_PORTAL</div>
            <h1 className="text-4xl font-black text-[var(--text-main)] tracking-tighter uppercase">
              Command <span className="text-primary">Center</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={handleLogout}
              className="p-3 glass hover:bg-red-500/10 border-[var(--border-color)] text-[var(--text-dim)] hover:text-red-500 transition-all"
              title="Terminate Session"
            >
              <LogOut size={20} />
            </button>
            <button
              onClick={fetchDashboardData}
              disabled={syncing}
              className="p-3 glass hover:bg-primary/5 border-[var(--border-color)] text-[var(--text-dim)] hover:text-primary transition-all relative"
            >
              <RefreshCcw size={20} className={syncing ? "animate-spin" : ""} />
            </button>
            <button
              onClick={() => navigate('/admin/studio')}
              className="btn-primary flex items-center gap-3 py-3 px-6 rounded-xl hover:shadow-primary/30"
            >
              <Settings size={20} />
              <span className="font-mono text-[10px] tracking-widest font-black uppercase">Studio_Manager</span>
            </button>
            <button
              onClick={() => navigate('/')}
              className="glass hover:bg-primary/10 border-[var(--border-color)] text-[var(--text-main)] flex items-center gap-3 py-3 px-6 rounded-xl transition-all"
            >

              <span className="font-mono text-[10px] tracking-widest font-black uppercase">Main Home</span>
            </button>
          </div>
        </div>

        {/* System Overview Ticker */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Active_Nodes", value: projects.length, icon: <Package size={16} /> },
            { label: "Inquiries", value: inquiries.length, icon: <MessageSquare size={16} /> },
            { label: "Auth_Level", value: "ROOT", icon: <Shield size={16} /> },
            { label: "System_Status", value: "STABLE", icon: <Activity size={16} />, color: "text-green-500" }
          ].map((stat, i) => (stat.label === "Auth_Level" ? <StatCard key={i} {...stat} icon={<Package size={16} />} /> : <StatCard key={i} {...stat} />))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Projects Management Matrix */}
          <div className="space-y-6">
            <h2 className="text-xl font-black text-[var(--text-main)] tracking-tight uppercase flex items-center gap-3">
              <Package size={20} className="text-primary" /> Active Nodes
            </h2>
            <div className="glass border-[var(--border-color)] overflow-hidden">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <tbody className="divide-y divide-[var(--border-color)]">
                    {projects.length > 0 ? (
                      projects.map((project) => (
                        <tr key={project.id} className="group hover:bg-white/[0.02] transition-colors">

                          <td className="px-4 py-6">
                            <p className="text-sm font-black text-[var(--text-main)] tracking-tight shrink-0 flex items-center gap-3">
                              {project.title}
                            </p>
                          </td>

                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="px-6 py-12 text-center text-[var(--text-dim)] text-[10px] uppercase tracking-widest">No Active Nodes</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Inquiries Matrix */}
          <div className="space-y-6">
            <h2 className="text-xl font-black text-[var(--text-main)] tracking-tight uppercase flex items-center gap-3">
              <MessageSquare size={20} className="text-primary" /> Incoming Transmissions
            </h2>
            <div className="glass border-[var(--border-color)] overflow-hidden">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <tbody className="divide-y divide-[var(--border-color)]">
                    {inquiries.length > 0 ? (
                      inquiries.map((inq) => (
                        <tr key={inq.id} className="group hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-6">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between gap-4">
                                <p className="text-sm font-black text-[var(--text-main)]">{inq.full_name || inq.name}</p>
                                <span className="px-2 py-0.5 bg-primary/10 text-primary text-[8px] font-black uppercase tracking-widest rounded">{inq.category}</span>
                              </div>
                              <p className="text-[10px] font-mono text-[var(--text-dim)]">{inq.email}</p>
                              <div className="text-xs text-[var(--text-dim)] italic mt-2 break-all whitespace-pre-wrap leading-relaxed border-l-2 border-primary/20 pl-3 py-1">
                                "{inq.message}"
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-6 align-top text-right">
                            <button onClick={() => handleDelete(inq.id, 'inquiries')} className="p-2 rounded-md hover:bg-red-500/10 text-[var(--text-dim)] hover:text-red-500 transition-all opacity-0 group-hover:opacity-100">
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="px-6 py-12 text-center text-[var(--text-dim)] text-[10px] uppercase tracking-widest">No Incoming Transmissions</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon, color = "text-[var(--text-main)]" }) => (
  <div className="glass p-6 border-[var(--border-color)]">
    <div className="flex items-center gap-3 text-[var(--text-dim)] mb-3">
      {icon}
      <span className="text-[9px] font-mono tracking-widest uppercase font-black">{label}</span>
    </div>
    <div className={`text-2xl font-black tracking-tighter ${color}`}>{value}</div>
  </div>
);

export default Dashboard;
