import Reveal from './Reveal';

type Props = {
  label: string;
  title: string;
  intro?: string;
  id?: string;
};

// "01 — ABOUT" style label, heading, and an optional aside paragraph.
export default function SectionHeading({ label, title, intro, id }: Props) {
  return (
    <Reveal className="mb-12 grid gap-6 border-t border-line pt-6 md:mb-16 md:grid-cols-12 md:gap-10">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent md:col-span-3">{label}</p>
      <div className="md:col-span-9">
        <h2 id={id} className="max-w-3xl text-3xl leading-[1.1] font-medium md:text-[2.75rem]">
          {title}
        </h2>
        {intro && <p className="mt-5 max-w-2xl text-lg text-muted">{intro}</p>}
      </div>
    </Reveal>
  );
}
