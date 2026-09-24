'use client';

import { useId, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { ExperienceEntry } from '@/data/experience';
import WithPlaceholders from './Placeholder';
import { ease } from './Reveal';

// Phones show the first few highlights with a "show more" toggle.
const VISIBLE_ON_PHONE = 3;

// One timeline entry. The marker column sits left of the rail drawn by <Experience>.
export default function ExperienceItem({ entry }: { entry: ExperienceEntry }) {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const hiddenCount = Math.max(0, entry.highlights.length - VISIBLE_ON_PHONE);

  return (
    <li className="relative grid gap-4 pb-16 pl-10 last:pb-0 md:grid-cols-12 md:gap-0 md:pl-0">
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease }}
        className="md:col-span-3 md:pr-12 md:text-right"
      >
        <p className="font-display text-3xl font-medium tracking-tight md:text-4xl">{entry.marker}</p>
        <p className="mt-1 font-mono text-xs text-muted">
          <WithPlaceholders text={entry.period} />
        </p>
      </motion.div>

      {/* Node on the rail */}
      <motion.span
        aria-hidden
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.15, ease }}
        className="absolute top-3 left-0 grid size-[15px] place-items-center rounded-full border border-accent bg-bg md:left-[25%] md:-translate-x-1/2"
      >
        <span className="size-[7px] rounded-full bg-accent" />
      </motion.span>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        className="md:col-span-9 md:pl-12"
      >
        <h3 className="text-2xl leading-snug font-medium">{entry.role}</h3>
        <p className="mt-1.5 text-muted">
          <WithPlaceholders text={entry.organization} />
        </p>

        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] tracking-[0.12em] text-accent uppercase" aria-label="Focus areas">
          {entry.focus.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        <ul id={listId} className="mt-5 max-w-2xl space-y-2.5">
          {entry.highlights.map((h, i) => (
            <li
              key={h}
              className={`gap-3 leading-relaxed text-ink/85 ${i >= VISIBLE_ON_PHONE && !expanded ? 'hidden md:flex' : 'flex'}`}
            >
              <span aria-hidden className="mt-[0.75em] h-px w-3 shrink-0 bg-line-strong" />
              {h}
            </li>
          ))}
        </ul>
        {hiddenCount > 0 && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            aria-controls={listId}
            className="mt-4 inline-flex items-center gap-1.5 py-1 text-sm font-medium text-accent md:hidden"
          >
            {expanded ? 'Show less' : `Show ${hiddenCount} more`}
            <ChevronDown size={15} aria-hidden className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
          </button>
        )}
      </motion.div>
    </li>
  );
}
