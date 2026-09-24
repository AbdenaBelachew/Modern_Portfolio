'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { hero, site } from '@/data/site';
import Button from './Button';
import HeroDiagram from './HeroDiagram';
import { ease } from './Reveal';

// Load sequence: eyebrow → name → title → description → buttons → tech line.
const step = (i: number, y = 18) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: 0.15 + i * 0.12, ease },
});

const timeFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Africa/Addis_Ababa',
  hour: '2-digit',
  minute: '2-digit',
});

// Rendered after mount only, so server and client HTML match.
function LocalTime() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setNow(timeFormat.format(new Date()));
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {now ?? '--:--'} <span className="text-muted">EAT · UTC+3</span>
    </span>
  );
}

export default function Hero() {
  const [titleA, titleB] = site.title.split(' & ');
  const sectionRef = useRef<HTMLElement>(null);

  // Cursor-following spotlight on the grid; only for fine pointers.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !window.matchMedia('(pointer: fine)').matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
        el.style.setProperty('--spot', '1');
      });
    };
    const onLeave = () => el.style.setProperty('--spot', '0');
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const status = [
    {
      label: 'System status',
      value: (
        <span className="flex items-center gap-2.5">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-50 [animation-duration:2.4s]" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          {site.availability}
        </span>
      ),
    },
    { label: 'Currently building', value: site.currentlyBuilding },
    { label: 'Local time', value: <LocalTime /> },
    { label: 'Location', value: site.location },
  ];

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-28 md:pt-32"
      style={{ '--mx': '70%', '--my': '30%', '--spot': '0' } as React.CSSProperties}
    >
      {/* Static grid, faded toward the edges */}
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_65%_35%,black,transparent_75%)]"
      />
      {/* Brighter accent grid revealed around the cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500 [background-image:linear-gradient(var(--accent)_1px,transparent_1px),linear-gradient(90deg,var(--accent)_1px,transparent_1px)] [background-position:-1px_-1px] [background-size:28px_28px] [mask-image:radial-gradient(240px_circle_at_var(--mx)_var(--my),black_20%,transparent)]"
        style={{ opacity: 'calc(var(--spot) * 0.55)' }}
      />

      <div className="container-page grid flex-1 items-center gap-14 pb-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <motion.p
            {...step(0, 8)}
            className="flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-accent uppercase"
          >
            <span aria-hidden className="h-px w-8 bg-accent" />
            {hero.eyebrow}
          </motion.p>

          <h1 className="mt-8">
            <motion.span
              {...step(1, 28)}
              className="block text-[clamp(2.9rem,8vw,6.25rem)] leading-[0.95] font-semibold tracking-[-0.045em]"
            >
              {site.name}
              <span className="text-accent">.</span>
            </motion.span>
            <motion.span
              {...step(2, 24)}
              className="mt-5 block text-[clamp(1.4rem,2.8vw,2.15rem)] leading-[1.15] font-normal tracking-[-0.02em] text-muted"
            >
              {titleA}
              <br />
              <span className="text-ink">&amp; {titleB}</span>
            </motion.span>
          </h1>

          <motion.p {...step(3, 10)} className="mt-8 max-w-xl text-lg leading-relaxed text-ink/80 md:text-xl">
            {hero.lead}
          </motion.p>

          <motion.div {...step(4, 10)} className="mt-10 flex flex-wrap gap-3">
            <Button href="#work">View work</Button>
            <Button href="#contact" variant="secondary" arrow={false}>
              Contact me
            </Button>
          </motion.div>

          <motion.ul
            {...step(5, 6)}
            aria-label="Core technologies"
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-2 font-mono text-[13px] text-muted"
          >
            {hero.techLine.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease }}
          className="lg:col-span-5"
        >
          <HeroDiagram />
        </motion.div>
      </div>

      <motion.dl
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="border-t border-line bg-bg/60 backdrop-blur-sm"
      >
        <div className="container-page grid grid-cols-2 lg:grid-cols-4">
          {status.map((s, i) => (
            <div
              key={s.label}
              className={`py-4 pr-4 text-sm md:py-5 ${i % 2 === 1 ? 'border-l border-line pl-4' : ''} ${
                i >= 2 ? 'border-t border-line lg:border-t-0' : ''
              } ${i === 2 ? 'lg:border-l lg:pl-4' : ''}`}
            >
              <dt className="font-mono text-[10.5px] tracking-[0.16em] text-muted uppercase">{s.label}</dt>
              <dd className="mt-1.5">{s.value}</dd>
            </div>
          ))}
        </div>
      </motion.dl>
    </section>
  );
}
