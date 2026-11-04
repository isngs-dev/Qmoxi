"use client";

import { useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { AudioLines, BrainCircuit, CircleCheckBig, Network } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Reveal } from "@/components/shared/Reveal";
import { Emblem } from "@/components/shared/Logo";
import { MEET_Q } from "@/lib/constants/content/home";
import { cn } from "@/lib/utils/cn";

const STAGES = [
  { name: "Receive", Icon: AudioLines },
  { name: "Understand", Icon: BrainCircuit },
  { name: "Connect", Icon: Network },
  { name: "Act", Icon: CircleCheckBig },
];

type Scenario = { label: string; note?: string; steps: [string, string][]; outcome: string };

// Illustrative examples, limited to capabilities described on qmoxi.com.
const SCENARIOS: Record<"healthcare" | "retail", Scenario> = {
  healthcare: {
    label: "Healthcare",
    steps: [
      ["Caller", "“I need to reschedule my appointment for next week.”"],
      ["Intent", "Reschedule appointment · collects name, date of birth, preferred day"],
      ["Systems", "Scheduling → availability retrieved · Patient record → visit located"],
      ["Action", "Appointment moved and confirmed back to the caller"],
    ],
    outcome: "No phone menu, no hold queue — and no staff time spent on a routine change.",
  },
  retail: {
    label: "Retail",
    note: "24/7 agent support launching December 2026",
    steps: [
      ["Shopper", "“Can I move my Tuesday shop to Thursday?”"],
      ["Intent", "Reschedule assignment · identifies shopper, shop and preferred date"],
      ["Systems", "Assignment management → shop window checked · eligibility confirmed"],
      ["Action", "Assignment updated and the change logged for the program team"],
    ],
    outcome: "Shopper questions answered around the clock, without adding support headcount.",
  },
};

export function MeetQ() {
  const [active, setActive] = useState(0);
  const [scenarioKey, setScenarioKey] = useState<"healthcare" | "retail">("healthcare");
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const lit = MEET_Q.questions[active].stage; // highest stage index lit (4 = full pipeline)
  const scenario = SCENARIOS[scenarioKey];
  const focusStage = Math.min(lit, 3);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const n = MEET_Q.questions.length;
    let next = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % n;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next >= 0) {
      e.preventDefault();
      setActive(next);
      tabsRef.current[next]?.focus();
    }
  };

  return (
    <section id="meet-q" aria-labelledby="meet-q-title" className="grain relative overflow-hidden bg-ink-950 py-24 lg:py-36">
      <div aria-hidden className="hairline-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <SectionLabel index="02">Meet Q</SectionLabel>
          </div>
          <div className="lg:col-span-9">
            <Reveal>
              <h2 id="meet-q-title" className="display text-[clamp(2.6rem,6vw,5.8rem)] text-gold-100">
                Meet <span className="text-metal italic">Q.</span> The Intelligence Behind Every Interaction.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-lg text-mist">{MEET_Q.intro}</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-12">
          {/* Questions as tabs */}
          <div role="tablist" aria-label="What Q changes" aria-orientation="vertical" className="lg:col-span-5">
            {MEET_Q.questions.map((item, i) => {
              const selected = i === active;
              return (
                <button
                  key={item.q}
                  ref={(el) => {
                    tabsRef.current[i] = el;
                  }}
                  role="tab"
                  id={`q-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="q-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={cn(
                    "group relative block w-full border-t border-gold/15 py-6 pl-10 pr-2 text-left transition-colors last:border-b",
                    selected ? "text-gold-100" : "text-smoke hover:text-gold-100",
                  )}
                >
                  <span className="eyebrow absolute left-0 top-7 text-[0.62rem] tabular-nums">0{i + 1}</span>
                  {selected && (
                    <m.span layoutId="q-tab-bar" aria-hidden className="absolute -top-px left-0 h-px w-full bg-gold" />
                  )}
                  <span className="block text-xl leading-snug sm:text-[1.35rem]">{item.q}</span>
                  <AnimatePresence initial={false}>
                    {selected && (
                      <m.span
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45 }}
                        className="block overflow-hidden"
                      >
                        <span className="block pt-3 text-[0.95rem] leading-relaxed text-mist">{item.a}</span>
                      </m.span>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          {/* Stage diagram */}
          <div
            id="q-panel"
            role="tabpanel"
            aria-labelledby={`q-tab-${active}`}
            className="relative rounded-[1.75rem] border border-gold/20 bg-black/60 p-5 sm:p-8 lg:col-span-7"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Emblem size={40} />
                <div>
                  <p className="text-sm font-semibold text-gold-100">How Q handles it</p>
                  <p className="eyebrow text-[0.58rem] text-smoke">Illustrative example</p>
                </div>
              </div>
              <div className="flex rounded-full border border-gold/25 p-1" role="group" aria-label="Example scenario">
                {(Object.keys(SCENARIOS) as Array<keyof typeof SCENARIOS>).map((k) => (
                  <button
                    key={k}
                    type="button"
                    aria-pressed={scenarioKey === k}
                    onClick={() => setScenarioKey(k)}
                    className={cn(
                      "relative rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
                      scenarioKey === k ? "text-black" : "text-gold hover:text-gold-300",
                    )}
                  >
                    {scenarioKey === k && <m.span layoutId="scenario-pill" className="absolute inset-0 rounded-full bg-gold" />}
                    <span className="relative">{SCENARIOS[k].label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Nodes */}
            <div className="relative mt-10 sm:mt-12">
              <div aria-hidden className="absolute left-[12.5%] right-[12.5%] top-7 h-px bg-gold/15" />
              <m.div
                aria-hidden
                className="absolute left-[12.5%] top-7 h-px w-[75%] origin-left bg-gold"
                initial={false}
                animate={{ scaleX: focusStage / 3 }}
                transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
              />
              <m.div
                aria-hidden
                className="absolute top-[1.55rem] size-2.5 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_18px_4px_rgba(212,175,55,0.6)]"
                initial={false}
                animate={{ left: `${12.5 + (focusStage / 3) * 75}%` }}
                transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
              />
              <ol className="relative grid grid-cols-4">
                {STAGES.map(({ name, Icon }, i) => {
                  const on = i <= lit;
                  return (
                    <li key={name} className="flex flex-col items-center text-center">
                      <m.span
                        initial={false}
                        animate={{ scale: i === focusStage && lit < 4 ? 1.08 : 1 }}
                        className={cn(
                          "relative z-10 flex size-14 items-center justify-center rounded-full border transition-colors duration-500",
                          on ? "border-gold bg-gold text-black" : "border-gold/25 bg-ink-900 text-gold/60",
                        )}
                      >
                        <Icon aria-hidden className="size-5" />
                      </m.span>
                      <span className={cn("eyebrow mt-3 text-[0.6rem]", on ? "text-gold" : "text-smoke")}>{name}</span>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Log */}
            <div className="mt-10 rounded-2xl bg-ink-850 p-5 font-mono text-[0.78rem] ring-1 ring-gold/10 sm:p-6">
              <AnimatePresence mode="wait">
                <m.ul
                  key={`${scenarioKey}-${lit}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-3"
                >
                  {scenario.steps.map(([k, v], i) => (
                    <li
                      key={k}
                      className={cn(
                        "grid grid-cols-[5.5rem_1fr] gap-3 transition-opacity",
                        i <= lit ? "opacity-100" : "opacity-25",
                      )}
                    >
                      <span className="text-gold">{k}</span>
                      <span className="font-sans text-[0.88rem] text-gold-100">{v}</span>
                    </li>
                  ))}
                  {lit >= 4 && (
                    <li className="mt-2 border-t border-gold/15 pt-4 font-sans text-[0.95rem] text-gold">{scenario.outcome}</li>
                  )}
                </m.ul>
              </AnimatePresence>
              {scenario.note && (
                <p className="mt-5 inline-flex rounded-full border border-gold/30 px-3 py-1 font-sans text-[0.7rem] text-gold">
                  Upcoming · {scenario.note}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Capabilities */}
        <Reveal className="mt-16 lg:mt-20">
          <ul className="flex flex-wrap gap-2.5" aria-label="Q capabilities">
            {MEET_Q.capabilities.map((c) => (
              <li key={c} className="rounded-full border border-gold/20 px-4 py-2 text-sm text-gold-100">
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
