import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { Shield, Lock, Loader2, AlertCircle, Terminal } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/admin/dashboard';

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) {
            setError(authError.message);
            setLoading(false);
        } else {
            navigate(from, { replace: true });
        }
    };

    return (
        <div className="min-h-screen bg-[var(--bg-deep)] flex items-center justify-center p-8 relative overflow-hidden font-inter">
            {/* Ambient Technical Background */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-6 shadow-lg shadow-primary/10">
                        <Shield size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-[var(--test-main)] tracking-tighter uppercase mb-3">
                        Secure <span className="text-primary">Gateway</span>
                    </h1>
                    <p className="text-[var(--test-dim)] text-xs font-mono tracking-[0.2em] font-black uppercase italic">
                        Authorized_Access_Only // v6.2.0
                    </p>
                </div>

                <form onSubmit={handleLogin} className="glass p-10 border-[var(--border-color)] space-y-8 relative overflow-hidden">
                    {/* Status Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-primary/10">
                        {loading && <motion.div
                            className="h-full bg-primary"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />}
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-[var(--test-dim)] uppercase tracking-widest font-black flex items-center gap-2">
                                <Terminal size={12} className="text-primary" /> Admin_ID (Email)
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm text-[var(--test-main)] focus:border-primary/50 outline-none transition-all font-semibold"
                                placeholder="enter_identity..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-[var(--test-dim)] uppercase tracking-widest font-black flex items-center gap-2">
                                <Lock size={12} className="text-primary" /> Security_Hash (Password)
                            </label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm text-[var(--test-main)] focus:border-primary/50 outline-none transition-all font-semibold"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[11px] font-mono font-black"
                            >
                                <AlertCircle size={16} flex-shrink="0" />
                                <span>ACCESS_DENIED: {error.toUpperCase()}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary py-4 flex items-center justify-center gap-3 disabled:opacity-50 group relative overflow-hidden"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                <span className="font-mono text-[10px] tracking-[0.3em] font-black italic">DECRYPTING_CREDENTIALS...</span>
                            </>
                        ) : (
                            <>
                                <Shield size={18} className="group-hover:scale-110 transition-transform" />
                                <span className="font-mono text-[10px] tracking-[0.3em] font-black uppercase">Initialize_Auth_Handshake</span>
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center text-[var(--test-dim)] font-mono text-[8px] tracking-[0.5em] uppercase opacity-40">
                    // AES-256 System Encryption Enabled // ADDIS_ABABA_NODE_ACTIVE
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
