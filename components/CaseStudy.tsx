import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Lock } from 'lucide-react';
import { getNeighbors, techByLayer, type Project } from '@/data/projects';
import WithPlaceholders from './Placeholder';
import Reveal from './Reveal';
import Zoomable from './Zoomable';

// Screenshot presented inside a minimal browser window.
function BrowserFrame({ project }: { project: Project }) {
  const frame = (
    <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-lift">
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </span>
        <span className="mx-auto truncate rounded bg-bg px-3 py-0.5 font-mono text-[11px] text-muted">
          {project.category.toLowerCase()}
        </span>
        <span className="w-[42px]" aria-hidden />
      </div>
      <div className="relative aspect-[16/10] bg-bg">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} interface`}
            fill
            priority
            sizes="(min-width: 1216px) 72rem, 100vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="grid-lines absolute inset-0 grid place-items-center p-8 text-center">
            <div>
              <p className="font-display text-4xl font-semibold tracking-tight text-ink/85 md:text-6xl">{project.name}</p>
              <span className="mt-5 inline-block rounded border border-dashed border-line-strong bg-surface px-2.5 py-1 font-mono text-[11px] text-muted">
                [Project screenshot]
              </span>
            </div>
          </div>
        )}
      </div>
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

function StorySection({ index, label, children }: { index: number; label: string; children: React.ReactNode }) {
  return (
    <Reveal as="section" className="grid gap-4 border-t border-line py-10 md:grid-cols-12 md:gap-10 md:py-14">
      <h2 className="font-mono text-xs font-normal tracking-[0.16em] text-accent uppercase md:sticky md:top-24 md:col-span-3 md:self-start">
        {String(index).padStart(2, '0')} — {label}
      </h2>
      <div className="md:col-span-9 lg:col-span-8">{children}</div>
    </Reveal>
  );
}

export default function CaseStudy({ project }: { project: Project }) {
  const { prev, next } = getNeighbors(project.slug);
  const layers = techByLayer(project.tech);

  // Only the parts of the story the write-up actually covers.
  const story = [
    project.problem && { label: 'The problem', body: project.problem },
    project.solution && { label: 'The approach', body: project.solution },
    project.rationale && { label: 'Why it’s built this way', body: project.rationale },
  ].filter(Boolean) as { label: string; body: string }[];

  return (
    <article>
      {/* Header */}
      <header className="container-page pt-28 md:pt-36">
        <Reveal>
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.14em] text-muted uppercase transition-colors hover:text-ink"
          >
            <ArrowLeft size={14} aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1" />
            All work
          </Link>
        </Reveal>

        <Reveal delay={0.05} className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
          {project.labels.map((l, i) => (
            <span key={l}>
              {i > 0 && <span aria-hidden className="mr-3">/</span>}
              {l}
            </span>
          ))}
          <span>
            <span aria-hidden className="mr-3">/</span>
            <WithPlaceholders text={project.year} />
          </span>
          {project.status && (
            <span className="ml-1 inline-flex items-center gap-1.5 rounded border border-line px-2 py-0.5 text-ink">
              <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              {project.status}
            </span>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-5 max-w-5xl text-[clamp(2.3rem,6vw,4.75rem)] leading-[1.02] font-semibold tracking-[-0.035em]">
            {project.name}
          </h1>
          <p className="mt-4 text-lg text-muted">{project.category}</p>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-ink/85 md:text-2xl md:leading-snug">
            {project.overview ?? project.description}
          </p>
        </Reveal>

        {project.facts && (
          <Reveal delay={0.22}>
            <dl className="mt-12 grid grid-cols-2 border-y border-line sm:grid-cols-4">
              {project.facts.map((f, i) => (
                <div
                  key={f.label}
                  className={`py-5 pr-4 ${i > 0 ? 'sm:border-l sm:border-line sm:pl-5' : ''} ${i % 2 === 1 ? 'border-l border-line pl-4 sm:pl-5' : ''} ${
                    i >= 2 ? 'border-t border-line sm:border-t-0' : ''
                  }`}
                >
                  <dt className="font-mono text-[10.5px] tracking-[0.16em] text-muted uppercase">{f.label}</dt>
                  <dd className="mt-2 font-display text-xl font-medium md:text-2xl">{f.value}</dd>
                </div>
              ))}
              <div className="border-t border-l border-line py-5 pl-4 sm:border-t-0 sm:pl-5">
                <dt className="font-mono text-[10.5px] tracking-[0.16em] text-muted uppercase">Stack</dt>
                <dd className="mt-2 font-display text-xl font-medium md:text-2xl">{project.tech.length} tools</dd>
              </div>
            </dl>
          </Reveal>
        )}
      </header>

      {/* Visual */}
      <Reveal y={40} className="container-page mt-14 md:mt-20">
        <BrowserFrame project={project} />
        {project.image && (
          <p className="mt-3 font-mono text-[11px] text-muted">
            <span className="md:hidden">Tap</span>
            <span className="hidden md:inline">Click</span> the screenshot to view it full size.
          </p>
        )}
      </Reveal>

      {/* Story */}
      <div className="container-page mt-16 md:mt-24">
        {story.map((s, i) => (
          <StorySection key={s.label} index={i + 1} label={s.label}>
            <p className="text-xl leading-relaxed text-ink/85 md:text-2xl md:leading-snug">{s.body}</p>
          </StorySection>
        ))}

        <StorySection index={story.length + 1} label="Outcome">
          <p className="border-l-2 border-accent pl-5 font-display text-2xl leading-snug font-medium md:pl-7 md:text-[2.1rem]">
            {project.result}
          </p>
        </StorySection>

        <StorySection index={story.length + 2} label="Stack by layer">
          <dl className="divide-y divide-line border-y border-line">
            {layers.map(({ layer, items }) => (
              <div key={layer} className="grid gap-3 py-4 sm:grid-cols-[12rem_1fr] sm:items-center">
                <dt className="flex items-center gap-2.5 text-sm text-muted">
                  <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                  {layer}
                </dt>
                <dd className="flex flex-wrap gap-1.5">
                  {items.map((t) => (
                    <span key={t} className="rounded border border-line bg-surface px-2.5 py-1 font-mono text-xs">
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </StorySection>

        <StorySection index={story.length + 3} label="See it">
          {project.live || project.repo ? (
            <div className="flex flex-wrap gap-3">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-on-accent shadow-card transition-all hover:-translate-y-px hover:shadow-lift"
                >
                  View live project
                  <ArrowUpRight size={15} aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-line-strong px-5 py-3 text-sm font-medium transition-colors hover:border-ink"
                >
                  <Github size={15} aria-hidden /> Source on GitHub
                </a>
              )}
            </div>
          ) : (
            <div className="rounded-md border border-line bg-surface p-6 md:p-8">
              <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                <Lock size={13} aria-hidden /> No public link
              </p>
              <p className="mt-3 text-lg text-ink/85">
                There&apos;s no public demo for this one. I&apos;m happy to walk you through how it works on a call.
              </p>
              <Link
                href="/#contact"
                className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent"
              >
                <span className="link-draw">Request a walkthrough</span>
                <ArrowRight size={15} aria-hidden className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </StorySection>
      </div>

      {/* Next / previous */}
      <nav aria-label="More projects" className="mt-20 border-t border-line md:mt-28">
        <Link href={`/work/${next.slug}`} className="group block">
          <div className="container-page grid items-center gap-8 py-14 md:grid-cols-12 md:py-20">
            <div className="md:col-span-7">
              <p className="font-mono text-xs tracking-[0.16em] text-accent uppercase">Next project</p>
              <p className="mt-4 flex items-start gap-4 font-display text-4xl leading-[1.05] font-semibold tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-2 md:text-6xl">
                {next.name}
                <ArrowRight
                  aria-hidden
                  className="mt-2 size-8 shrink-0 text-accent transition-transform duration-500 group-hover:translate-x-2 md:size-12"
                />
              </p>
              <p className="mt-4 max-w-xl text-muted">{next.description}</p>
            </div>
            <div className="md:col-span-5">
              <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-line bg-surface shadow-card transition-all duration-500 group-hover:border-accent/60 group-hover:shadow-lift">
                {next.image ? (
                  <Image
                    src={next.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 30rem, 92vw"
                    className="object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                ) : (
                  <div className="grid-lines absolute inset-0 grid place-items-center font-display text-3xl font-semibold text-ink/80">
                    {next.name}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
        <div className="container-page flex justify-between border-t border-line py-5 text-sm">
          <Link href={`/work/${prev.slug}`} className="group inline-flex items-center gap-2 text-muted transition-colors hover:text-ink">
            <ArrowLeft size={15} aria-hidden className="transition-transform group-hover:-translate-x-1" />
            <span className="max-w-[40vw] truncate">{prev.name}</span>
          </Link>
          <Link href="/#work" className="text-muted transition-colors hover:text-ink">
            All work
          </Link>
        </div>
      </nav>
    </article>
  );
}
