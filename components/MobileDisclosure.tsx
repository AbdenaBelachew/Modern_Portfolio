'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

// Collapsed behind a tap on phones; always open from `md` up.
export default function MobileDisclosure({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between border-t border-line py-3.5 text-left font-mono text-[11px] tracking-[0.14em] text-muted uppercase active:text-ink md:hidden"
      >
        {label}
        <Plus size={16} aria-hidden className={`transition-transform duration-300 ${open ? 'rotate-45 text-accent' : ''}`} />
      </button>
      <div className={`${open ? 'block' : 'hidden'} md:block`}>{children}</div>
    </div>
  );
}
