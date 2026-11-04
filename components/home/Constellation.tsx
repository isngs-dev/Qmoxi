"use client";

import { m } from "motion/react";

// Generic system categories — Q connects to what an organization already runs.
const NODES = [
  { label: "Telephony", angle: -90 },
  { label: "Scheduling", angle: -30 },
  { label: "Records", angle: 30 },
  { label: "Billing", angle: 90 },
  { label: "Reporting", angle: 150 },
  { label: "CRM", angle: 210 },
];

const C = 200;
const R = 150;

/** Integration constellation: Q at the centre, existing systems in orbit. */
export function Constellation() {
  return (
    <svg viewBox="0 0 400 400" className="mx-auto w-full max-w-[440px]" role="img" aria-label="Q at the centre, connected to existing systems such as telephony, scheduling, records, billing, reporting and CRM">
      <circle cx={C} cy={C} r={R} fill="none" stroke="rgb(0 0 0 / 0.12)" strokeDasharray="2 6" />
      <circle cx={C} cy={C} r={92} fill="none" stroke="rgb(0 0 0 / 0.08)" />
      {NODES.map((n, i) => {
        const rad = (n.angle * Math.PI) / 180;
        const x = Math.round((C + R * Math.cos(rad)) * 100) / 100;
        const y = Math.round((C + R * Math.sin(rad)) * 100) / 100;
        return (
          <g key={n.label}>
            <m.line
              x1={C}
              y1={C}
              x2={x}
              y2={y}
              stroke="#6B5617"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, delay: 0.2 + i * 0.12 }}
            />
            <m.g
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.12 }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            >
              <circle cx={x} cy={y} r={7} fill="#D4AF37" stroke="#000" strokeWidth="1" />
              <text
                x={x}
                y={y + (y > C ? 26 : -16)}
                textAnchor="middle"
                className="fill-black font-mono text-[11px] uppercase tracking-[0.14em]"
              >
                {n.label}
              </text>
            </m.g>
          </g>
        );
      })}
    </svg>
  );
}
