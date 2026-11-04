"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/utils/usePrefersReducedMotion";
import { Check, PhoneIncoming } from "lucide-react";
import { Waveform } from "@/components/shared/Waveform";
import { cn } from "@/lib/utils/cn";

type Line = { who: "caller" | "q"; text: string };
type Scenario = {
  channel: string;
  lines: Line[];
  intent: string;
  systems: string[];
  outcome: string;
};

// Illustrative conversations built only from capabilities the site describes
// (appointment scheduling, billing & service conversations, intelligent routing).
const SCENARIOS: Scenario[] = [
  {
    channel: "Patient access line",
    lines: [
      { who: "caller", text: "Hi — I need to move my appointment on Thursday." },
      { who: "q", text: "I can help with that. Can you confirm your date of birth?" },
      { who: "caller", text: "March 4th, 1986." },
      { who: "q", text: "Thank you. I have Friday at 10:30 or Monday at 2:15. Which works better?" },
    ],
    intent: "Reschedule appointment",
    systems: ["Scheduling", "Patient records"],
    outcome: "Appointment moved to Friday, 10:30",
  },
  {
    channel: "Billing & service line",
    lines: [
      { who: "caller", text: "I have a question about a charge on my statement." },
      { who: "q", text: "Of course. I've found your account — is this about the March 12th visit?" },
      { who: "caller", text: "Yes, I think I was billed twice." },
      { who: "q", text: "I'll connect you with a billing specialist now and pass along the details." },
    ],
    intent: "Billing inquiry",
    systems: ["Billing", "Account records"],
    outcome: "Routed to billing with full context",
  },
];

const STAGES = ["Receive", "Understand", "Connect", "Act"] as const;
const STEP_MS = 1700;
// step 0..3 → transcript lines, 4 → systems, 5 → outcome
const LAST_STEP = 5;

export function QConsole() {
  const reduce = usePrefersReducedMotion();
  const [scenario, setScenario] = useState(0);
  const [rawStep, setStep] = useState(0);
  // Pauses while hovered or focused (WCAG 2.2.2); reduced motion shows the completed frame, static.
  const [paused, setPaused] = useState(false);
  const playing = !reduce && !paused;
  const step = reduce ? LAST_STEP : rawStep;

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(
      () => {
        if (step < LAST_STEP) setStep(step + 1);
        else {
          setScenario((s) => (s + 1) % SCENARIOS.length);
          setStep(0);
        }
      },
      step === LAST_STEP ? STEP_MS * 2 : STEP_MS,
    );
    return () => clearTimeout(t);
  }, [playing, step]);

  const s = SCENARIOS[scenario];
  const visibleLines = s.lines.slice(0, Math.min(step + 1, s.lines.length));
  const qSpeaking = step < 4 && s.lines[step]?.who === "q";
  const stageIndex = step === 0 ? 0 : step <= 2 ? 1 : step <= 4 ? 2 : 3;

  return (
    <div
      className="relative"
      role="region"
      aria-label="Illustrative Q call demonstration (pauses while hovered or focused)"
      tabIndex={0}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-[1.75rem] bg-ink-900/90 ring-1 ring-gold/25 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-gold/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="relative flex size-9 items-center justify-center rounded-full bg-gold text-black">
              <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full bg-gold/50" />
              <PhoneIncoming aria-hidden className="relative size-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-gold-100">Q · Live interaction</p>
              <p className="eyebrow text-[0.6rem] text-smoke">{s.channel}</p>
            </div>
          </div>
        </div>

        {/* Transcript */}
        <div className="flex h-[284px] flex-col justify-end gap-3 overflow-hidden px-5 pb-4 pt-5 [mask-image:linear-gradient(to_bottom,transparent,#000_16%)]" aria-live="off">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleLines.map((line, i) => (
              <m.div
                key={`${scenario}-${i}`}
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className={cn("flex", line.who === "q" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2.5 text-[0.86rem] leading-snug",
                    line.who === "q" ? "rounded-br-md bg-gold text-black" : "rounded-bl-md bg-white/[0.06] text-gold-100",
                  )}
                >
                  <span className="eyebrow mb-1 block text-[0.55rem] opacity-60">{line.who === "q" ? "Q" : "Caller"}</span>
                  {line.text}
                </div>
              </m.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Voice + intent */}
        <div className="flex items-center justify-between gap-4 border-t border-gold/10 px-5 py-4">
          <Waveform bars={26} active={qSpeaking} className="h-8 flex-1" />
          <AnimatePresence mode="wait">
            {step >= 1 && (
              <m.span
                key={`${scenario}-intent`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="shrink-0 rounded-full border border-gold/30 px-3 py-1 font-mono text-[0.65rem] text-gold"
              >
                Intent · {s.intent}
              </m.span>
            )}
          </AnimatePresence>
        </div>

        {/* Pipeline */}
        <div className="border-t border-gold/10 bg-black/40 px-5 py-5">
          <ol className="grid grid-cols-4 gap-2" aria-label="Q processing stages">
            {STAGES.map((stage, i) => (
              <li key={stage} className="relative">
                <div className="h-0.5 w-full overflow-hidden rounded-full bg-gold/15">
                  <m.div
                    className="h-full origin-left bg-gold"
                    initial={false}
                    animate={{ scaleX: i <= stageIndex ? 1 : 0 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                <p className={cn("eyebrow mt-2 text-[0.58rem]", i <= stageIndex ? "text-gold" : "text-smoke")}>
                  0{i + 1} {stage}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-4 flex min-h-8 flex-wrap items-center gap-2">
            <AnimatePresence mode="popLayout">
              {step >= 4 &&
                s.systems.map((sys, i) => (
                  <m.span
                    key={`${scenario}-${sys}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.12 }}
                    className="rounded-md bg-white/[0.06] px-2.5 py-1 font-mono text-[0.65rem] text-gold-100"
                  >
                    ↳ {sys}
                  </m.span>
                ))}
              {step >= LAST_STEP && (
                <m.span
                  key={`${scenario}-done`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-[0.72rem] font-medium text-gold"
                >
                  <Check aria-hidden className="size-3.5" /> {s.outcome}
                </m.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <p className="eyebrow mt-4 text-right text-[0.58rem] text-smoke">Illustrative interaction</p>
    </div>
  );
}
