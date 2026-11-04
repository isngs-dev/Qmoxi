"use client";

import { useState } from "react";
import { ChevronsLeftRight, X, Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Reveal } from "@/components/shared/Reveal";
import { HC_CHALLENGES } from "@/lib/constants/content/healthcare";

/**
 * Before/after comparison. A native range input drives the divider, so it is
 * keyboard- and screen-reader-operable out of the box.
 */
export function Challenges() {
  const [pos, setPos] = useState(50);

  return (
    <section aria-labelledby="challenges-title" className="relative py-24 lg:py-36">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel index="01">The challenge</SectionLabel>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <h2 id="challenges-title" className="display text-[clamp(2.4rem,5vw,4.8rem)] text-gold-100">
                {HC_CHALLENGES.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl text-lg text-mist">
                {HC_CHALLENGES.intro}
                <span className="hidden sm:inline"> Drag the divider to compare a traditional IVR with Q.</span>
              </p>
            </Reveal>
          </div>
        </div>

        {/* Mobile: stacked before/after lists */}
        <div className="mt-12 grid gap-4 sm:hidden">
          {(["before", "after"] as const).map((tone) => (
            <div key={tone} className="overflow-hidden rounded-[1.5rem] border border-gold/20">
              <Panel tone={tone} stacked />
            </div>
          ))}
        </div>

        <Reveal className="mt-14 hidden sm:block lg:mt-20">
          <div className="relative select-none overflow-hidden rounded-[1.75rem] border border-gold/20">
            {/* After (With Q) — full layer */}
            <Panel tone="after" />
            {/* Before (Legacy IVR) — clipped layer */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
              aria-hidden
            >
              <Panel tone="before" />
            </div>

            <div className="sr-only">
              <p>Legacy IVR challenges:</p>
              <ul>
                {HC_CHALLENGES.rows.map((r) => (
                  <li key={r.before}>{r.before}</li>
                ))}
              </ul>
            </div>

            {/* Divider */}
            <div aria-hidden className="pointer-events-none absolute inset-y-0 w-px bg-gold" style={{ left: `${pos}%` }}>
              <span className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-black shadow-[0_0_0_6px_rgba(0,0,0,0.6)]">
                <ChevronsLeftRight className="size-5" />
              </span>
            </div>
            <label className="sr-only" htmlFor="compare-range">
              Compare legacy IVR with Q
            </label>
            <input
              id="compare-range"
              type="range"
              min={0}
              max={100}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-valuetext={`${pos}% legacy IVR shown`}
              className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Panel({ tone, stacked }: { tone: "before" | "after"; stacked?: boolean }) {
  const before = tone === "before";
  return (
    <div className={before ? "h-full bg-ink-800" : "bg-gold text-black"} aria-label={before ? undefined : "With Q"}>
      <div className="flex items-center justify-between px-6 pt-6 sm:px-10 sm:pt-8">
        <p className={`eyebrow ${before ? "text-smoke" : "text-black/75"}`}>{before ? "Legacy IVR" : "With Q"}</p>
        <p className={`hidden font-mono text-xs sm:block ${before ? "text-smoke" : "text-black/70"}`}>
          {before ? "“Press 1 for appointments… Press 2 for billing…”" : "“How can I help you today?”"}
        </p>
      </div>
      <ul className="mt-6 px-6 pb-4 sm:px-10 sm:pb-6">
        {HC_CHALLENGES.rows.map((r) => (
          <li
            key={r.before}
            className={`flex min-h-[4.75rem] items-center gap-4 border-t py-4 sm:min-h-[5rem] sm:py-5 ${before ? "border-white/10" : stacked ? "border-black/15" : "flex-row-reverse border-black/15 text-right"}`}
          >
            <span
              className={`flex size-7 shrink-0 items-center justify-center rounded-full ${
                before ? "bg-white/5 text-smoke" : "bg-black text-gold"
              }`}
            >
              {before ? <X className="size-3.5" /> : <Check className="size-3.5" />}
            </span>
            <span className={`${stacked ? "" : "max-w-[46%]"} text-sm sm:text-lg ${before ? "text-mist line-through decoration-smoke/60" : "font-medium"}`}>
              {before ? r.before : r.after}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
