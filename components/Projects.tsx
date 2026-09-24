import { projects } from '@/data/projects';
import ProjectCard from './ProjectCard';
import ProjectTile from './ProjectTile';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import SwipeRow from './SwipeRow';

const featured = projects.filter((p) => p.featured);
const more = projects.filter((p) => !p.featured);

export default function Projects() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          id="work-title"
          label="03 — Selected work"
          title="Systems built for the way a business actually runs."
          intro="Most of this work lives inside organizations, behind corporate sign-in. Here is what each system does and the problem it solved."
        />

        <div className="space-y-24 md:space-y-32">
          {featured.map((project, i) => (
            <Reveal key={project.slug}>
              <ProjectCard project={project} index={i} flip={i % 2 === 1} />
            </Reveal>
          ))}
        </div>

        {more.length > 0 && (
          <div className="mt-28 md:mt-36">
            <Reveal className="mb-10 flex items-baseline justify-between gap-6 border-t border-line pt-6">
              <h3 className="text-2xl font-medium md:text-3xl">More projects</h3>
              <p className="font-mono text-xs text-muted">
                Internal systems, SaaS &amp; websites · {String(more.length).padStart(2, '0')}
              </p>
            </Reveal>
            <Reveal>
              <SwipeRow
                label="More projects"
                gridClassName="sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-16 lg:grid-cols-3"
                items={more.map((project) => (
                  <ProjectTile key={project.slug} project={project} />
                ))}
              />
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
