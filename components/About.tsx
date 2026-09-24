import Image from 'next/image';
import { about, site } from '@/data/site';
import Reveal, { Stagger, StaggerItem } from './Reveal';
import SectionHeading from './SectionHeading';

function Portrait() {
  return (
    <figure className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-line bg-surface">
        {site.photo ? (
          <Image
            src={site.photo}
            alt={`Portrait of ${site.name}`}
            fill
            sizes="(min-width: 768px) 22rem, 90vw"
            className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:grayscale-0"
          />
        ) : (
          <div className="grid-lines absolute inset-0 grid place-items-center">
            <span className="rounded border border-dashed border-line-strong bg-surface px-3 py-1.5 font-mono text-xs text-muted">
              [Your professional photo]
            </span>
          </div>
        )}
        {/* Corner ticks give the frame a drafted, editorial feel */}
        <span aria-hidden className="absolute top-3 left-3 size-3 border-t border-l border-accent" />
        <span aria-hidden className="absolute right-3 bottom-3 size-3 border-r border-b border-accent" />
      </div>
      <figcaption className="mt-3 flex justify-between font-mono text-[11px] text-muted">
        <span>Fig. 01 — {site.name}</span>
        <span>{site.location.replace('Based in ', '')}</span>
      </figcaption>
    </figure>
  );
}

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading id="about-title" label="01 — About" title={about.heading} />

        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <Reveal x={-16} className="md:col-span-4 lg:col-span-3">
            <div className="mx-auto max-w-[15rem] sm:max-w-xs md:max-w-none">
              <Portrait />
            </div>
          </Reveal>

          <div className="space-y-6 text-lg leading-relaxed text-ink/85 md:col-span-8 lg:col-span-5 lg:col-start-5">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.08 * i}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-10 md:col-span-12 lg:col-span-3 lg:col-start-10 lg:grid-cols-1">
            <Reveal delay={0.1}>
              <h3 className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Current focus</h3>
              <Stagger as="ul" className="mt-4 border-t border-line">
                {about.focus.map((f) => (
                  <StaggerItem as="li" key={f} className="border-b border-line py-2.5 text-[15px]">
                    {f}
                  </StaggerItem>
                ))}
              </Stagger>
            </Reveal>

            <Reveal delay={0.18}>
              <h3 className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">How the work evolved</h3>
              <Stagger as="ol" className="relative mt-4 space-y-2.5 pl-5">
                <span aria-hidden className="absolute top-1.5 bottom-1.5 left-[3px] w-px bg-line" />
                {about.path.map((step, i) => {
                  const last = i === about.path.length - 1;
                  return (
                    <StaggerItem as="li" key={step} className="relative text-[15px]">
                      <span
                        aria-hidden
                        className={`absolute top-[0.55em] -left-5 size-[7px] rounded-full ${
                          last ? 'border border-accent bg-bg' : 'bg-accent'
                        }`}
                      />
                      <span className={last ? 'text-muted' : ''}>{step}</span>
                      {last && <span className="ml-2 font-mono text-[11px] text-accent">next</span>}
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
