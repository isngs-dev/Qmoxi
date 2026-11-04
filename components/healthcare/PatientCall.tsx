"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { CalendarCheck, Mic, PhoneOff, ShieldCheck, Volume2 } from "lucide-react";
import { PhoneFrame } from "@/components/shared/DeviceFrames";
import { Waveform } from "@/components/shared/Waveform";
import { usePrefersReducedMotion } from "@/lib/utils/usePrefersReducedMotion";

const CAPTIONS = [
  { who: "Patient", text: "I'd like to book a follow-up visit." },
  { who: "Q", text: "Happy to help. Can I have your date of birth?" },
  { who: "Patient", text: "July 9th, 1979." },
  { who: "Q", text: "Thanks. Tuesday at 9:15 is open — shall I book it?" },
  { who: "Patient", text: "Yes, please." },
  { who: "Q", text: "You're booked for Tuesday at 9:15." },
];

const CHIPS = [
  { at: 1, Icon: Mic, text: "Intent · Book follow-up" },
  { at: 3, Icon: ShieldCheck, text: "Patient details collected" },
  { at: 5, Icon: CalendarCheck, text: "Scheduling updated" },
];

/** Healthcare hero visual: an in-progress patient call answered by Q, with live captions. */
export function PatientCall() {
  const reduce = usePrefersReducedMotion();
  const [tick, setTick] = useState(0);
  const idx = reduce ? CAPTIONS.length - 1 : tick % (CAPTIONS.length + 2);
  const caption = CAPTIONS[Math.min(idx, CAPTIONS.length - 1)];
  const seconds = 14 + tick * 2;

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setTick((n) => n + 1), 2200);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <div className="relative">
      <PhoneFrame label="Illustrative patient call answered by Q" className="w-[270px] sm:w-[290px]">
        <div className="flex h-full flex-col bg-gradient-to-b from-ink-800 via-ink-900 to-black px-5 pb-6 pt-14 text-center">
          <p className="eyebrow text-[0.55rem] text-gold/80">Patient access line</p>
          <div className="relative mx-auto mt-6 flex size-24 items-center justify-center">
            <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full border border-gold/50" />
            <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full border border-gold/40 [animation-delay:1.3s]" />
            <span className="display relative flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-700 text-4xl text-black">
              Q
            </span>
          </div>
          <p className="mt-5 text-lg font-semibold text-gold-100">Q · AI Agent</p>
          <p className="font-mono text-xs text-smoke" suppressHydrationWarning>
            00:{String(seconds % 60).padStart(2, "0")}
          </p>
          <Waveform bars={22} active={caption.who === "Q"} className="mx-auto mt-6 h-9 justify-center" />
          <div className="mt-6 min-h-[5.5rem] rounded-2xl bg-white/[0.05] p-4 text-left">
            <AnimatePresence mode="wait">
              <m.p
                key={idx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                className="text-[0.82rem] leading-snug text-gold-100"
              >
                <span className="eyebrow mb-1 block text-[0.52rem] text-gold">{caption.who}</span>
                {caption.text}
              </m.p>
            </AnimatePresence>
          </div>
          <div aria-hidden className="mt-auto flex justify-center gap-6 pt-6">
            <span className="flex size-12 items-center justify-center rounded-full bg-white/10 text-gold-100">
              <Volume2 className="size-5" />
            </span>
            <span className="flex size-12 items-center justify-center rounded-full bg-gold/90 text-black">
              <PhoneOff className="size-5" />
            </span>
          </div>
        </div>
      </PhoneFrame>

      <ul className="pointer-events-none absolute inset-y-0 -left-4 hidden flex-col justify-center gap-24 sm:flex lg:-left-36">
        {CHIPS.map(({ at, Icon, text }) => {
          const on = reduce || Math.min(idx, CAPTIONS.length - 1) >= at;
          return (
            <m.li
              key={text}
              initial={false}
              animate={{ opacity: on ? 1 : 0.25, x: on ? 0 : -8 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 rounded-full border border-gold/30 bg-black/80 px-3.5 py-2 text-[0.72rem] text-gold-100 backdrop-blur"
            >
              <Icon aria-hidden className="size-3.5 text-gold" /> {text}
            </m.li>
          );
        })}
      </ul>
      <p className="eyebrow mt-4 text-center text-[0.58rem] text-smoke">Illustrative call</p>
    </div>
  );
}
