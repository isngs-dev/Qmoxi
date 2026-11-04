"use client";

import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Reveal } from "@/components/shared/Reveal";
import { HC_SCHEDULING } from "@/lib/constants/content/healthcare";
import { cn } from "@/lib/utils/cn";

type Mode = "book" | "change" | "confirm";

const MODES: Record<Mode, { label: string; steps: string[]; from?: number; to: number; status: string }> = {
  book: {
    label: "Book",
    steps: ["Patient asks for a new visit", "Q collects details and preferences", "Q checks live availability", "Visit booked and read back"],
    to: 16,
    status: "Booked · Wed 16 · 9:15",
  },
  change: {
    label: "Change",
    steps: ["Patient asks to move a visit", "Q locates the existing appointment", "Q offers open alternatives", "Visit moved and confirmed"],
    from: 9,
    to: 18,
    status: "Moved · Fri 18 · 2:30",
  },
  confirm: {
    label: "Confirm",
    steps: ["Q reaches the patient ahead of the visit", "Patient confirms by simply saying yes", "Schedule updated in real time", "Team sees a confirmed day"],
    to: 11,
    status: "Confirmed · Thu 11 · 10:00",
  },
};

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const DATES = [7, 8, 9, 10, 11, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25];

export function SchedulingFlow() {
  const [mode, setMode] = useState<Mode>("book");
  const cfg = MODES[mode];

  return (
    <section id="scheduling" aria-labelledby="scheduling-title" className="border-t border-gold/15 bg-ink-950 py-24 lg:py-32">
      <Container className="grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <SectionLabel index="04">Scheduling</SectionLabel>
          <Reveal>
            <h2 id="scheduling-title" className="display mt-8 text-[clamp(2.4rem,5vw,4.6rem)] text-gold-100">
              {HC_SCHEDULING.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 leading-relaxed text-mist">{HC_SCHEDULING.body}</p>
          </Reveal>

          <div role="group" aria-label="Scheduling scenario" className="mt-10 inline-flex rounded-full border border-gold/25 p-1">
            {(Object.keys(MODES) as Mode[]).map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={mode === k}
                onClick={() => setMode(k)}
                className={cn(
                  "relative rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                  mode === k ? "text-black" : "text-gold hover:text-gold-300",
                )}
              >
                {mode === k && <m.span layoutId="sched-pill" className="absolute inset-0 rounded-full bg-gold" />}
                <span className="relative">{MODES[k].label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <m.ol
              key={mode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 space-y-0"
            >
              {cfg.steps.map((s, i) => (
                <m.li
                  key={s}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12 }}
                  className="flex items-center gap-4 border-t border-gold/15 py-3.5 text-gold-100"
                >
                  <span className="eyebrow w-6 text-[0.6rem] text-gold">0{i + 1}</span>
                  {s}
                </m.li>
              ))}
            </m.ol>
          </AnimatePresence>
        </div>

        <Reveal variant="right" className="lg:col-span-7 lg:pl-10">
          <div className="rounded-[1.75rem] border border-gold/20 bg-black p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-gold-100">Clinic schedule</p>
              <p className="eyebrow text-[0.6rem] text-smoke">Illustrative</p>
            </div>
            <div className="mt-6 grid grid-cols-5 gap-2 sm:gap-3">
              {WEEKDAYS.map((d) => (
                <p key={d} className="eyebrow text-center text-[0.6rem] text-smoke">
                  {d}
                </p>
              ))}
              {DATES.map((d) => {
                const isTo = d === cfg.to;
                const isFrom = d === cfg.from;
                return (
                  <div
                    key={d}
                    className={cn(
                      "relative flex aspect-[5/4] flex-col justify-between rounded-xl border p-2 text-left transition-colors duration-500 sm:p-3",
                      isTo ? "border-gold bg-gold text-black" : isFrom ? "border-gold/40 bg-gold/5 text-smoke" : "border-white/5 bg-white/[0.03] text-mist",
                    )}
                  >
                    <span className="font-mono text-xs">{d}</span>
                    {isFrom && <span className="hidden text-[0.6rem] line-through sm:block">Moved</span>}
                    <AnimatePresence>
                      {isTo && (
                        <m.span
                          key={`${mode}-${d}`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ type: "spring", stiffness: 400, damping: 22, delay: 0.35 }}
                          className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-black text-gold"
                        >
                          <Check aria-hidden className="size-3" />
                        </m.span>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 flex items-center justify-between rounded-2xl bg-white/[0.04] px-5 py-4">
              <span className="eyebrow text-[0.6rem] text-smoke">Status</span>
              <AnimatePresence mode="wait">
                <m.span
                  key={mode}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="font-medium text-gold"
                  aria-live="polite"
                >
                  {cfg.status}
                </m.span>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
