import { Blocks, CodeXml, Container, Server } from 'lucide-react';
import { skillGroups, type SkillGroup } from '@/data/skills';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import SwipeRow from './SwipeRow';

const icons: Record<SkillGroup['icon'], typeof Server> = {
  code: CodeXml,
  server: Server,
  blocks: Blocks,
  container: Container,
};

function SkillCard({ group }: { group: SkillGroup }) {
  const Icon = icons[group.icon];
  return (
    <div className="group relative h-full rounded-md border border-line bg-bg p-6 transition-colors duration-300 sm:rounded-none sm:border-0 sm:border-r sm:border-b sm:bg-transparent sm:hover:bg-bg md:p-9">
      {/* Accent rule grows along the top edge on hover */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
      <div className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-md border border-line text-accent transition-colors duration-300 group-hover:border-accent">
          <Icon size={17} aria-hidden />
        </span>
        <h3 className="font-mono text-xs tracking-[0.16em] uppercase">{group.title}</h3>
      </div>
      <p className="mt-4 text-muted">{group.summary}</p>

      <dl className="mt-7 space-y-5">
        {group.featured.map((s) => (
          <div key={s.name}>
            <dt className="font-display text-lg font-medium">{s.name}</dt>
            <dd className="mt-1 text-[15px] text-muted">{s.note}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-7 border-t border-dashed border-line pt-4 text-sm leading-relaxed text-muted">
        <span className="mr-2 font-mono text-[11px] tracking-[0.12em] text-ink uppercase">Also</span>
        {group.also.join(' · ')}
      </p>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="border-y border-line bg-surface py-20 md:py-32">
      <div className="container-page">
        <SectionHeading
          id="skills-title"
          label="02 — Capabilities"
          title="Grouped by what the work actually needs."
          intro="From the screen a user works in, down to the pipeline that deploys it."
        />

        <Reveal>
          <SwipeRow
            label="Capabilities"
            gridClassName="sm:grid sm:grid-cols-2 sm:gap-0 sm:border-t sm:border-l sm:border-line"
            items={skillGroups.map((group) => (
              <SkillCard key={group.title} group={group} />
            ))}
          />
        </Reveal>
      </div>
    </section>
  );
}
