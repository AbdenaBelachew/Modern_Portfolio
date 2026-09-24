import Link from 'next/link';
import type { Project } from '@/data/projects';
import { CaseStudyLink, ProjectLinks, ProjectMeta, ProjectVisual } from './ProjectCard';

// Compact card for the "More projects" grid.
export default function ProjectTile({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col">
      <ProjectVisual project={project} sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 92vw" compact />
      <div className="flex flex-1 flex-col pt-5">
        <ProjectMeta project={project} />
        <h3 className="mt-3 text-xl leading-snug font-medium transition-transform duration-500 ease-out group-hover:translate-x-1">
          <Link href={`/work/${project.slug}`} className="link-draw">
            {project.name}
          </Link>
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{project.description}</p>
        <p className="mt-4 font-mono text-[11px] leading-relaxed text-muted">{project.tech.join(' · ')}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-5">
          <CaseStudyLink project={project} compact />
          {(project.live || project.repo) && <ProjectLinks project={project} />}
        </div>
      </div>
    </article>
  );
}
