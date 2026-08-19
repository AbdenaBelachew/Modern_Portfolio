import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle2, Loader2, MessageSquare, Building2, User } from 'lucide-react';
import { addInquiry } from '../lib/store';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Enterprise Solution',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const categories = [
    'Enterprise Solution',
    'Full-Stack Development',
    'System Architecture',
    'Stock/Inventory System',
    'Archive Management',
    'Consultancy'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      addInquiry({
        full_name: formData.name,
        name: formData.name,
        email: formData.email,
        category: formData.category,
        message: formData.message,
      });
      setStatus('success');
      setFormData({ name: '', email: '', category: 'Enterprise Solution', message: '' });
    } catch (err) {
      console.error('Inquiry error:', err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-4xl mx-auto">
          <div>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">Contact</p>
            <h2 className="text-3xl md:text-4xl font-black text-[var(--text-main)] mb-6 tracking-tight">
              Get in Touch
            </h2>
            <p className="text-[var(--text-muted)] text-base leading-relaxed mb-8">
              Interested in working together or want to discuss enterprise systems? Send me a message and I'll get back to you within 24 hours.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:scale-105 transition-transform">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[var(--text-dim)] uppercase tracking-wider mb-0.5">Response Time</div>
                  <div className="text-[var(--text-main)] text-sm font-semibold">Within 24 Hours</div>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:scale-105 transition-transform">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[var(--text-dim)] uppercase tracking-wider mb-0.5">Email Direct</div>
                  <div className="text-[var(--text-main)] text-sm font-semibold">abdiolbelachew@gmail.com</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="glass p-8 text-center flex flex-col items-center justify-center border-green-500/20 bg-green-500/5 min-h-[350px]"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-6 border border-green-500/30">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">Message Sent!</h3>
                  <p className="text-[var(--text-dim)] text-sm mb-6">Thank you. I have received your request and will follow up shortly.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-primary font-mono text-[11px] tracking-wider font-bold uppercase hover:underline"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="glass p-6 md:p-8 border-[var(--border-color)] space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-[var(--text-dim)] uppercase tracking-wider flex items-center gap-1.5">
                        <User size={12} className="text-primary opacity-60" /> Full Name
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-100 dark:bg-white/5 border border-[var(--border-color)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-main)] focus:border-primary/50 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-[var(--text-dim)] uppercase tracking-wider flex items-center gap-1.5">
                        <Building2 size={12} className="text-primary opacity-60" /> Email Address
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-100 dark:bg-white/5 border border-[var(--border-color)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-main)] focus:border-primary/50 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-[var(--text-dim)] uppercase tracking-wider">
                      System / Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-slate-100 dark:bg-white/5 border border-[var(--border-color)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-main)] focus:border-primary/50 outline-none transition-all"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat} className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-[var(--text-dim)] uppercase tracking-wider">
                      Message Details
                    </label>
                    <textarea
                      required
                      rows="4"
                      placeholder="Describe your project or inquiries..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-100 dark:bg-white/5 border border-[var(--border-color)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-main)] focus:border-primary/50 outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    disabled={status === 'submitting'}
                    type="submit"
                    className="w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50 group shadow-none text-sm rounded-xl"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        <span className="font-mono text-xs tracking-wider">SENDING...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        <span className="font-mono text-xs tracking-wider uppercase">Send Message</span>
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
