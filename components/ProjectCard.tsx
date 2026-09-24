import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Github, Lock } from 'lucide-react';
import type { Project } from '@/data/projects';
import MobileDisclosure from './MobileDisclosure';
import WithPlaceholders from './Placeholder';
import Zoomable from './Zoomable';

export function ProjectVisual({ project, sizes, compact }: { project: Project; sizes: string; compact?: boolean }) {
  const frame = (
    <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-line bg-surface shadow-card transition-all duration-500 group-hover:border-accent/60 group-hover:shadow-lift">
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.name} interface`}
          fill
          sizes={sizes}
          className="object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
      ) : (
        <div className="grid-lines absolute inset-0 flex flex-col justify-between p-6 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] md:p-8">
          <span className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">{project.category}</span>
          <span className={`font-display font-semibold tracking-tight text-ink/85 ${compact ? 'text-3xl' : 'text-5xl md:text-6xl'}`}>
            {project.name}
          </span>
          <span className="w-fit rounded border border-dashed border-line-strong bg-surface px-2.5 py-1 font-mono text-[11px] text-muted">
            [Project screenshot]
          </span>
        </div>
      )}
      {project.status && (
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded bg-bg/90 px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-ink uppercase backdrop-blur-sm">
          <span aria-hidden className="size-1.5 rounded-full bg-accent" />
          {project.status}
        </span>
      )}
    </div>
  );

  return project.image ? (
    <Zoomable src={project.image} alt={`${project.name} interface`}>
      {frame}
    </Zoomable>
  ) : (
    frame
  );
}

export function ProjectLinks({ project }: { project: Project }) {
  if (!project.live && !project.repo) {
    return (
      <span className="inline-flex items-center gap-2 text-sm text-muted">
        <Lock size={14} aria-hidden />
        Private codebase · walkthrough on request
      </span>
    );
  }
  return (
    <div className="flex flex-wrap items-center gap-6 text-sm">
      {project.live && (
        <a href={project.live} target="_blank" rel="noreferrer" className="group/link inline-flex items-center gap-1.5 font-medium text-accent">
          <span className="link-draw">View project</span>
          <ArrowRight size={15} aria-hidden className="transition-transform duration-300 group-hover/link:translate-x-1" />
        </a>
      )}
      {project.repo && (
        <a href={project.repo} target="_blank" rel="noreferrer" className="group/link inline-flex items-center gap-1.5 text-ink">
          <Github size={15} aria-hidden />
          <span className="link-draw">GitHub</span>
          <ArrowUpRight
            size={14}
            aria-hidden
            className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
          />
        </a>
      )}
    </div>
  );
}

export function ProjectMeta({ project, index }: { project: Project; index?: number }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.16em] uppercase">
      {index !== undefined && <span className="text-accent">{String(index + 1).padStart(2, '0')}</span>}
      {index !== undefined && <span aria-hidden className="h-px w-5 bg-line-strong" />}
      {project.labels.map((l, i) => (
        <span key={l} className="text-muted">
          {i > 0 && <span aria-hidden className="mr-3">/</span>}
          {l}
        </span>
      ))}
      <span className="text-muted">
        <span aria-hidden className="mr-3">/</span>
        <WithPlaceholders text={project.year} />
      </span>
    </div>
  );
}

// Large editorial project row: visual on one side, the story on the other.
export default function ProjectCard({ project, index, flip }: { project: Project; index: number; flip?: boolean }) {
  return (
    <article className="group grid items-center gap-8 md:grid-cols-12 md:gap-12">
      <div className={`md:col-span-7 ${flip ? 'md:order-2' : ''}`}>
        <ProjectVisual project={project} sizes="(min-width: 1024px) 42rem, 92vw" />
      </div>

      <div className="md:col-span-5">
        <ProjectMeta project={project} index={index} />

        <h3 className="mt-4 text-3xl leading-tight font-medium transition-transform duration-500 ease-out group-hover:translate-x-1 md:text-[2rem]">
          {project.name}
        </h3>
        <p className="mt-1 text-muted">{project.category}</p>

        <p className="mt-5 leading-relaxed text-ink/85">{project.description}</p>

        {project.problem && project.solution && (
          <div className="mt-6">
          <MobileDisclosure label="Problem & approach">
          <dl className="grid gap-4 pb-5 text-[15px] sm:grid-cols-2 md:grid-cols-1 md:border-y md:border-line md:pt-5 lg:grid-cols-2">
            <div>
              <dt className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">Problem</dt>
              <dd className="mt-1.5 leading-relaxed text-ink/80">{project.problem}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">Approach</dt>
              <dd className="mt-1.5 leading-relaxed text-ink/80">{project.solution}</dd>
            </div>
          </dl>
          </MobileDisclosure>
          </div>
        )}

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technology">
          {project.tech.map((t) => (
            <li key={t} className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
              {t}
            </li>
          ))}
        </ul>

        <p className="mt-6 border-l-2 border-accent pl-4 text-[15px] text-ink/90">
          <span className="sr-only">Result: </span>
          {project.result}
        </p>

        <div className="mt-7">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}
