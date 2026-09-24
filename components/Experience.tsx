'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { experience } from '@/data/experience';
import ExperienceItem from './ExperienceItem';
import SectionHeading from './SectionHeading';

export default function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  // Rail fills in as the timeline scrolls through the viewport.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="experience" aria-labelledby="experience-title" className="border-y border-line bg-surface py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          id="experience-title"
          label="04 — Experience"
          title="From ERP implementation to full-stack delivery."
          intro="A career that started inside an SAP rollout and grew into building and running the applications around it."
        />

        <ol ref={listRef} className="relative">
          <span aria-hidden className="absolute top-3 bottom-3 left-[7px] w-px bg-line md:left-[25%]" />
          <motion.span
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute top-3 bottom-3 left-[7px] w-px origin-top bg-accent md:left-[25%]"
          />
          {experience.map((entry) => (
            <ExperienceItem key={entry.role} entry={entry} />
          ))}
        </ol>
      </div>
    </section>
  );
}
