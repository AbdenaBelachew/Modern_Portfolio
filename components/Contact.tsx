'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, CircleAlert, Github, Linkedin, LoaderCircle, Mail, Send } from 'lucide-react';
import { email, socials, type Social } from '@/data/social';
import QuickActions from './QuickActions';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

// Set NEXT_PUBLIC_FORM_ENDPOINT (e.g. a Formspree URL) to deliver messages.
// Without it the form hands the message to the visitor's own email app and says so.
const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

const socialIcons: Record<Social['label'], typeof Mail> = { GitHub: Github, LinkedIn: Linkedin, Email: Mail };

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = 'idle' | 'sending' | 'sent' | 'handoff' | 'error';

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = 'Please add your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (f.message.trim().length < 10) e.message = 'A sentence or two helps — at least 10 characters.';
  return e;
}

const inputBase =
  'mt-2 w-full rounded-md border bg-bg px-3.5 py-3 text-base text-ink sm:text-[15px] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted/70 focus:border-accent focus:ring-[3px] focus:ring-accent-soft';

function Field({
  id,
  label,
  error,
  textarea,
  ...props
}: { id: keyof Fields; label: string; error?: string; textarea?: boolean } & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const describedBy = error ? `${id}-error` : undefined;
  const cls = `${inputBase} ${error ? 'border-red-600/70 dark:border-red-400/70' : 'border-line hover:border-line-strong'}`;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {textarea ? (
        <textarea id={id} name={id} rows={6} aria-invalid={!!error} aria-describedby={describedBy} className={`${cls} resize-y`} {...props} />
      ) : (
        <input id={id} name={id} aria-invalid={!!error} aria-describedby={describedBy} className={cls} {...props} />
      )}
      <AnimatePresence>
        {error && (
          <motion.p
            id={describedBy}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 text-sm text-red-700 dark:text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const [values, setValues] = useState<Fields>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    // Clear a field's error as soon as it's being fixed.
    if (errors[name as keyof Fields]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }

    if (!endpoint) {
      const subject = encodeURIComponent(`Project inquiry from ${values.name}`);
      const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      setStatus('handoff');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setValues({ name: '', email: '', message: '' });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  const sending = status === 'sending';

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading id="contact-title" label="05 — Let's talk" title="Have a system that needs building?" />

        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5 lg:col-span-4 lg:col-start-4">
            <Reveal>
              <p className="text-lg leading-relaxed text-ink/85">
                Whether you&apos;re planning an enterprise application, modernizing an existing system, or need help
                turning a business process into software, I&apos;d be happy to hear about it.
              </p>
            </Reveal>

            <Reveal delay={0.1} as="ul" className="mt-10 border-t border-line">
              {socials.map((s) => {
                const Icon = socialIcons[s.label];
                const external = s.href.startsWith('http');
                return (
                  <li key={s.label} className="border-b border-line">
                    <a
                      href={s.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer' : undefined}
                      className="group flex items-center gap-4 py-4"
                    >
                      <Icon size={17} aria-hidden className="text-muted transition-colors duration-300 group-hover:text-accent" />
                      <span className="text-sm font-medium">{s.label}</span>
                      <span className="ml-auto truncate text-sm text-muted transition-colors group-hover:text-ink">{s.handle}</span>
                      <ArrowUpRight
                        size={15}
                        aria-hidden
                        className="shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                      />
                    </a>
                  </li>
                );
              })}
            </Reveal>

            <Reveal delay={0.15} className="mt-6">
              <QuickActions />
            </Reveal>
          </div>

          <Reveal delay={0.15} className="md:col-span-7 lg:col-span-5">
            <form noValidate onSubmit={onSubmit} className="rounded-md border border-line bg-surface p-6 shadow-card md:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Name" autoComplete="name" value={values.name} onChange={onChange} error={errors.name} />
                <Field
                  id="email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={onChange}
                  error={errors.email}
                />
              </div>
              <div className="mt-5">
                <Field
                  id="message"
                  label="Message"
                  textarea
                  placeholder="What are you building, and where are you stuck?"
                  value={values.message}
                  onChange={onChange}
                  error={errors.message}
                />
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex min-w-44 items-center justify-center gap-2.5 overflow-hidden rounded-md bg-accent px-5 py-3 text-sm font-medium text-on-accent shadow-card transition-[filter,box-shadow] duration-300 hover:shadow-lift hover:brightness-110 disabled:cursor-wait disabled:opacity-80"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={sending ? 'sending' : 'idle'}
                      initial={{ y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -12, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex items-center gap-2.5"
                    >
                      {sending ? (
                        <>
                          Sending <LoaderCircle size={15} className="animate-spin" aria-hidden />
                        </>
                      ) : (
                        <>
                          Send message
                          <Send
                            size={14}
                            aria-hidden
                            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </>
                      )}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>

                <div aria-live="polite" className="text-sm sm:text-right">
                  <AnimatePresence mode="wait">
                    {status === 'sent' && (
                      <motion.p key="sent" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2">
                        <Check size={15} className="text-accent" aria-hidden /> Message sent. I&apos;ll reply by email.
                      </motion.p>
                    )}
                    {status === 'handoff' && (
                      <motion.p key="handoff" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-muted">
                        Your email app should open with this message ready to send.
                      </motion.p>
                    )}
                    {status === 'error' && (
                      <motion.p key="error" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="inline-flex items-start gap-2 text-red-700 dark:text-red-400">
                        <CircleAlert size={15} className="mt-0.5 shrink-0" aria-hidden />
                        <span>
                          Couldn&apos;t send. Please email{' '}
                          <a href={`mailto:${email}`} className="underline">
                            {email}
                          </a>
                        </span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {!endpoint && status === 'idle' && (
                <p className="mt-5 border-t border-line pt-4 text-xs text-muted">
                  This form opens your email app with the message filled in. Nothing is sent from this page.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
