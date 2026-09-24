'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ease } from './Reveal';

// Schematic of how a business process becomes running software.
// Coordinates are in the SVG viewBox (440 × 380).

type Node = { id: string; label: string; x: number; y: number; w: number; accent?: boolean };

const H = 32;

const nodes: Node[] = [
  { id: 'biz', label: 'Business process', x: 220, y: 44, w: 168, accent: true },
  { id: 'ui', label: 'React UI', x: 72, y: 160, w: 104 },
  { id: 'api', label: '.NET / Node API', x: 220, y: 160, w: 136 },
  { id: 'erp', label: 'SAP ERP', x: 368, y: 160, w: 100 },
  { id: 'db', label: 'SQL Server · PostgreSQL · MySQL', x: 220, y: 236, w: 244 },
  { id: 'ci', label: 'CI/CD', x: 72, y: 330, w: 92 },
  { id: 'k8s', label: 'Docker · K8s', x: 220, y: 330, w: 124 },
  { id: 'prod', label: 'Production', x: 368, y: 330, w: 112, accent: true },
];

const edges = [
  'M220 60 V144', // business → API
  'M124 160 H152', // UI → API
  'M288 160 H318', // API → ERP
  'M220 176 V220', // API → DB
  'M220 252 V314', // DB → containers
  'M118 330 H158', // CI → containers
  'M282 330 H312', // containers → production
];

const lanes = [
  { y: 12, label: '01 Business' },
  { y: 112, label: '02 System' },
  { y: 284, label: '03 Delivery' },
];

export default function HeroDiagram() {
  const reduce = useReducedMotion();

  return (
    <figure className="relative overflow-hidden rounded-md border border-line bg-surface/70 shadow-card backdrop-blur-[1px]">
      <figcaption className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[10.5px] tracking-[0.14em] text-muted uppercase">
        <span><span className="hidden sm:inline">Fig. 01 — </span>Process → production</span>
        <span className="flex items-center gap-1.5">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 [animation-duration:2.6s]" />
            <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
          </span>
          Running
        </span>
      </figcaption>

      <svg
        viewBox="0 0 440 380"
        role="img"
        aria-label="Diagram: a business process flows into a React UI, a .NET or Node API and SAP ERP, backed by SQL Server, PostgreSQL and MySQL, shipped through CI/CD and Docker/Kubernetes to production."
        className="block w-full font-mono"
      >
        {/* Lanes */}
        {lanes.map((lane, i) => (
          <motion.g
            key={lane.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.1, duration: 0.6 }}
          >
            {i > 0 && (
              <line x1="0" x2="440" y1={lane.y - 12} y2={lane.y - 12} className="stroke-line" strokeDasharray="3 5" />
            )}
            <text x="14" y={lane.y + 10} className="fill-muted" fontSize="9.5" letterSpacing="1.4">
              {lane.label.toUpperCase()}
            </text>
          </motion.g>
        ))}

        {/* Edges draw in once */}
        {edges.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            strokeWidth="1.25"
            className="stroke-line-strong"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.9 + i * 0.09, duration: 0.5, ease: 'easeInOut' }}
          />
        ))}

        {/* Signals travel under the nodes, so they "enter" each step */}
        {!reduce && (
          <g className="fill-accent">
            <circle r="3.2">
              <animateMotion dur="5.5s" begin="2.2s" repeatCount="indefinite" path="M220 44 V330 H368" />
            </circle>
            <circle r="2.6" opacity="0.8">
              <animateMotion dur="4s" begin="3.4s" repeatCount="indefinite" path="M72 160 H368" />
            </circle>
            <circle r="2.6" opacity="0.8">
              <animateMotion dur="3.2s" begin="4.2s" repeatCount="indefinite" path="M72 330 H220" />
            </circle>
          </g>
        )}

        {/* Nodes */}
        {nodes.map((n, i) => (
          <motion.g
            key={n.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 + i * 0.07, duration: 0.5, ease }}
          >
            <rect
              x={n.x - n.w / 2}
              y={n.y - H / 2}
              width={n.w}
              height={H}
              rx="5"
              strokeWidth="1"
              className={n.accent ? 'fill-surface stroke-accent' : 'fill-surface stroke-line-strong'}
            />
            {n.id === 'prod' && <circle cx={n.x - n.w / 2 + 14} cy={n.y} r="3" className="fill-accent" />}
            <text
              x={n.id === 'prod' ? n.x + 6 : n.x}
              y={n.y + 4}
              textAnchor="middle"
              fontSize="11.5"
              className={n.accent ? 'fill-accent' : 'fill-ink'}
            >
              {n.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </figure>
  );
}
