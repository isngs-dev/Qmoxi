"use client";

import { useState } from "react";
import { m } from "motion/react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Reveal } from "@/components/shared/Reveal";
import { HC_TRIAGE } from "@/lib/constants/content/healthcare";
import { cn } from "@/lib/utils/cn";

// Administrative routing examples — Q directs requests; it does not give clinical advice.
const REQUESTS = [
  { ask: "“I need to book a follow-up visit.”", intent: "Appointment request", dest: 0 },
  { ask: "“I have a question about my bill.”", intent: "Billing inquiry", dest: 1 },
  { ask: "“I'm a new patient and need to register.”", intent: "Patient intake", dest: 2 },
  { ask: "“I'd like to speak with my care team.”", intent: "Staff handoff", dest: 3 },
];
const DESTS = ["Scheduling", "Billing", "Registration", "Care team"];
const DEST_Y = [40, 120, 200, 280];

export function TriageFlow() {
  const [active, setActive] = useState(0);
  const req = REQUESTS[active];
  const y = DEST_Y[req.dest];

  return (
    <section id="triage" aria-labelledby="triage-title" className="py-24 lg:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel index="05">Triage & routing</SectionLabel>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <h2 id="triage-title" className="display text-[clamp(2.4rem,5vw,4.6rem)] text-gold-100">
                {HC_TRIAGE.title}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">{HC_TRIAGE.body}</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-smoke">Choose a patient request</p>
            <div className="mt-5 space-y-2">
              {REQUESTS.map((r, i) => (
                <button
                  key={r.ask}
                  type="button"
                  aria-pressed={active === i}
                  onClick={() => setActive(i)}
                  className={cn(
                    "block w-full rounded-2xl border px-5 py-4 text-left transition-colors",
                    active === i ? "border-gold bg-gold/10 text-gold-100" : "border-gold/15 text-mist hover:border-gold/40",
                  )}
                >
                  {r.ask}
                </button>
              ))}
            </div>
          </div>

          <div className="relative rounded-[1.75rem] border border-gold/20 bg-ink-900 p-4 sm:p-8 lg:col-span-8">
            <svg viewBox="0 0 640 320" className="w-full" role="img" aria-label={`${req.intent} routed to ${DESTS[req.dest]}`}>
              {/* Caller → Q */}
              <line x1="70" y1="160" x2="250" y2="160" stroke="#D4AF37" strokeWidth="1.5" />
              {/* Q → each destination (muted) */}
              {DEST_Y.map((dy, i) => (
                <path
                  key={i}
                  d={`M330 160 C430 160 430 ${dy} 500 ${dy}`}
                  fill="none"
                  stroke="rgba(212,175,55,0.18)"
                  strokeWidth="1"
                />
              ))}
              {/* Active route */}
              <m.path
                key={active}
                d={`M330 160 C430 160 430 ${y} 500 ${y}`}
                fill="none"
                stroke="#D4AF37"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
              />
              {/* Caller */}
              <circle cx="46" cy="160" r="24" fill="none" stroke="#D4AF37" strokeOpacity="0.5" />
              <text x="46" y="200" textAnchor="middle" className="fill-[#8f8a7c] font-mono text-[11px] uppercase tracking-widest">
                Caller
              </text>
              {/* Q node */}
              <circle cx="290" cy="160" r="40" fill="#D4AF37" />
              <text x="290" y="171" textAnchor="middle" className="fill-black font-display text-[34px]">
                Q
              </text>
              <m.text
                key={`intent-${active}`}
                x="290"
                y="228"
                textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fill-[#f6edd0] font-mono text-[12px]"
              >
                Intent · {req.intent}
              </m.text>
              {/* Destinations */}
              {DESTS.map((d, i) => {
                const on = i === req.dest;
                return (
                  <g key={d}>
                    <rect
                      x="500"
                      y={DEST_Y[i] - 18}
                      width="132"
                      height="36"
                      rx="18"
                      fill={on ? "#D4AF37" : "rgba(212,175,55,0.06)"}
                      stroke={on ? "#D4AF37" : "rgba(212,175,55,0.25)"}
                      style={{ transition: "fill .5s" }}
                    />
                    <text
                      x="566"
                      y={DEST_Y[i] + 5}
                      textAnchor="middle"
                      className={cn("text-[13px] font-semibold", on ? "fill-black" : "fill-[#bdb8aa]")}
                    >
                      {d}
                    </text>
                  </g>
                );
              })}
            </svg>
            <p className="eyebrow mt-2 text-[0.58rem] text-smoke">Illustrative routing</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
