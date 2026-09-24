'use client';

import { motion, type Variants } from 'framer-motion';

export const ease = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, amount: 0.2 } as const;

type Tag = 'div' | 'li' | 'ul' | 'ol' | 'section' | 'article' | 'p';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  // Vertical offset; pass x for a small horizontal slide instead.
  y?: number;
  x?: number;
  as?: Tag;
};

// Fades and slides its children in the first time they scroll into view.
export default function Reveal({ children, className, delay = 0, y = 20, x = 0, as = 'div' }: RevealProps) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: x ? 0 : y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={viewport}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </M>
  );
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

// Parent/child pair for staggered lists.
export function Stagger({ children, className, as = 'div' }: Omit<RevealProps, 'delay' | 'y' | 'x'>) {
  const M = motion[as];
  return (
    <M className={className} variants={container} initial="hidden" whileInView="show" viewport={viewport}>
      {children}
    </M>
  );
}

export function StaggerItem({ children, className, as = 'div' }: Omit<RevealProps, 'delay' | 'y' | 'x'>) {
  const M = motion[as];
  return (
    <M className={className} variants={item}>
      {children}
    </M>
  );
}
