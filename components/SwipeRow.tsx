'use client';

import { useRef, useState } from 'react';
import { haptic } from '@/lib/feedback';

type Props = {
  items: React.ReactNode[];
  label: string;
  // Layout from `sm` up, e.g. 'sm:grid sm:grid-cols-2 sm:gap-8'. Below `sm` it's a swipe row.
  gridClassName: string;
  itemClassName?: string;
};

const GAP = 16;

// Horizontal, snap-scrolling row on phones; a normal grid from `sm` up.
export default function SwipeRow({ items, label, gridClassName, itemClassName = '' }: Props) {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);

  const onScroll = () => {
    const el = scroller.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    if (el.scrollLeft > 4) setTouched(true);
    const i = Math.max(0, Math.min(items.length - 1, Math.round(el.scrollLeft / (first.offsetWidth + GAP))));
    if (i !== active) {
      setActive(i);
      haptic(6); // light tick as each card snaps in
    }
  };

  const goTo = (i: number) => {
    const el = scroller.current;
    const child = el?.children[i] as HTMLElement | undefined;
    if (el && child) el.scrollTo({ left: child.offsetLeft - el.offsetLeft - 20, behavior: 'smooth' });
  };

  return (
    <div>
      <div
        ref={scroller}
        onScroll={onScroll}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        className={`-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:snap-none sm:overflow-x-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden ${gridClassName}`}
      >
        {items.map((item, i) => (
          <div
            key={i}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
            className={`w-[84%] shrink-0 snap-start sm:w-auto ${itemClassName}`}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Phone-only position indicator */}
      <div className="mt-5 flex items-center justify-between sm:hidden">
        <div className="flex items-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show item ${i + 1}`}
              aria-current={i === active}
              className="grid h-6 place-items-center"
            >
              <span
                className={`block h-1 rounded-full transition-all duration-300 ${
                  i === active ? 'w-6 bg-accent' : 'w-1.5 bg-line-strong'
                }`}
              />
            </button>
          ))}
        </div>
        <p className="font-mono text-[11px] text-muted tabular-nums">
          <span className={`mr-3 transition-opacity duration-500 ${touched ? 'opacity-0' : 'opacity-100'}`}>Swipe →</span>
          {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </p>
      </div>
    </div>
  );
}
