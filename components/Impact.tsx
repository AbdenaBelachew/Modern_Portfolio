import { Blocks, Building2, Container, Repeat } from 'lucide-react';
import { impact, type ImpactItem } from '@/data/site';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import SwipeRow from './SwipeRow';

const icons: Record<ImpactItem['icon'], typeof Blocks> = {
  building: Building2,
  blocks: Blocks,
  repeat: Repeat,
  container: Container,
};

export default function Impact() {
  return (
    <section aria-labelledby="impact-title" className="pb-20 md:pb-32">
      <div className="container-page">
        <SectionHeading id="impact-title" label="Engineering impact" title="What the work adds up to." />

        {/* From `sm` up, the wrapper draws the outer frame and 1px gaps form the dividers */}
        <Reveal className="sm:overflow-hidden sm:rounded-md sm:border sm:border-line">
          <SwipeRow
            label="Engineering impact"
            gridClassName="sm:grid sm:grid-cols-2 sm:gap-px sm:bg-line lg:grid-cols-4"
            items={impact.map((item) => {
              const Icon = icons[item.icon];
              return (
                <div
                  key={item.title}
                  className="group h-full rounded-md border border-line bg-bg p-6 transition-colors duration-300 hover:bg-surface sm:rounded-none sm:border-0 md:p-7"
                >
                  <Icon
                    size={20}
                    aria-hidden
                    className="text-accent transition-transform duration-500 ease-out group-hover:-translate-y-0.5"
                  />
                  <h3 className="mt-6 text-xl font-medium">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{item.text}</p>
                  {item.metric && <p className="mt-4 font-mono text-sm text-accent">{item.metric}</p>}
                </div>
              );
            })}
          />
        </Reveal>
      </div>
    </section>
  );
}
