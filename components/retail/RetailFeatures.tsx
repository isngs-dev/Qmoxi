"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Reveal } from "@/components/shared/Reveal";
import { RT_FEATURES } from "@/lib/constants/content/retail";
import { usePrefersReducedMotion } from "@/lib/utils/usePrefersReducedMotion";
import { cn } from "@/lib/utils/cn";

/**
 * Scrollytelling: the visual on the left stays pinned while the four features
 * scroll past on the right; each one swaps the visual as it enters view.
 */
export function RetailFeatures() {
  const [active, setActive] = useState(0);
  const id = RT_FEATURES.items[active].id;

  return (
    <section aria-labelledby="rt-features-title" className="relative border-t border-gold/15 py-24 lg:py-36">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel index="04">Features</SectionLabel>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <h2 id="rt-features-title" className="display text-[clamp(2.4rem,5vw,4.8rem)] text-gold-100">
                {RT_FEATURES.title}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-2xl text-lg text-mist">{RT_FEATURES.intro}</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12">
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-[calc(var(--header-h)+3rem)]">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem] border border-gold/20 bg-ink-900">
                <AnimatePresence mode="wait">
                  <m.div
                    key={id}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <FeatureVisual id={id} />
                  </m.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <ol className="lg:col-span-5 lg:col-start-8">
            {RT_FEATURES.items.map((f, i) => (
              <m.li
                key={f.id}
                onViewportEnter={() => setActive(i)}
                viewport={{ amount: "some", margin: "-45% 0px -45% 0px" }}
                className="flex min-h-[48vh] flex-col justify-center border-t border-gold/15 py-12 first:border-t-0 lg:py-0"
              >
                <p className={cn("display text-7xl transition-colors duration-500", i === active ? "text-gold" : "text-outline")}>
                  0{i + 1}
                </p>
                <h3 className="mt-6 text-3xl font-medium tracking-tight text-gold-100">{f.title}</h3>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-mist">{f.body}</p>
                <div className="mt-8 aspect-[4/5] overflow-hidden rounded-2xl border border-gold/20 bg-ink-900 sm:aspect-[5/4] lg:hidden">
                  <div className="relative h-full">
                    <FeatureVisual id={f.id} />
                  </div>
                </div>
              </m.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function FeatureVisual({ id }: { id: string }) {
  if (id === "geo") return <GeoVisual />;
  if (id === "pm") return <ProgramVisual />;
  if (id === "lang") return <LanguageVisual />;
  return <AnalyticsVisual />;
}

const MARKETS = [
  { x: 22, y: 34, r: 1 },
  { x: 30, y: 44, r: 0.7 },
  { x: 48, y: 30, r: 0.8 },
  { x: 52, y: 38, r: 1.1 },
  { x: 70, y: 40, r: 0.9 },
  { x: 78, y: 62, r: 0.7 },
  { x: 34, y: 66, r: 0.8 },
  { x: 58, y: 58, r: 0.6 },
];

function GeoVisual() {
  return (
    <div aria-hidden className="relative h-full w-full">
      <div className="dot-grid absolute inset-0 opacity-70" />
      {MARKETS.map((mk, i) => (
        <span key={i} className="absolute" style={{ left: `${mk.x}%`, top: `${mk.y}%` }}>
          <span
            className="absolute -translate-x-1/2 -translate-y-1/2 animate-pulse-ring rounded-full border border-gold/60"
            style={{ width: 70 * mk.r, height: 70 * mk.r, animationDelay: `${i * 0.35}s` }}
          />
          <span className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
        </span>
      ))}
      <div className="absolute bottom-6 left-6 rounded-xl bg-black/80 px-4 py-3 backdrop-blur">
        <p className="eyebrow text-[0.55rem] text-smoke">Geofence</p>
        <p className="mt-1 text-sm text-gold-100">Check-in verified on location</p>
      </div>
    </div>
  );
}

function ProgramVisual() {
  const rows = [
    { n: "Program setup", s: 0, w: 18 },
    { n: "Shopper scheduling", s: 14, w: 30 },
    { n: "Field visits", s: 26, w: 42 },
    { n: "Editing & QA", s: 52, w: 26 },
    { n: "Client reporting", s: 72, w: 22 },
  ];
  return (
    <div aria-hidden className="flex h-full flex-col justify-center gap-3 p-6 sm:gap-4 sm:p-8">
      <div className="flex justify-between font-mono text-[0.6rem] text-smoke">
        {["Wk 1", "Wk 3", "Wk 5", "Wk 7", "Wk 9"].map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>
      {rows.map((r, i) => (
        <div key={r.n}>
          <p className="text-xs text-gold-100">{r.n}</p>
          <div className="relative mt-1.5 h-6 rounded-md bg-white/[0.04]">
            <m.div
              className="absolute inset-y-0 origin-left rounded-md bg-gold"
              style={{ left: `${r.s}%`, width: `${r.w}%`, opacity: 0.45 + i * 0.12 }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

const LANGS = [
  { code: "EN", q: "Were you greeted within 30 seconds?" },
  { code: "ES", q: "¿Le saludaron en menos de 30 segundos?" },
  { code: "FR", q: "Avez-vous été accueilli en moins de 30 secondes ?" },
  { code: "DE", q: "Wurden Sie innerhalb von 30 Sekunden begrüßt?" },
  { code: "PT", q: "Você foi recebido em menos de 30 segundos?" },
  { code: "JA", q: "30秒以内に挨拶されましたか？" },
];

function LanguageVisual() {
  const reduce = usePrefersReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % LANGS.length), 1800);
    return () => clearInterval(t);
  }, [reduce]);
  const l = LANGS[i];
  return (
    <div aria-hidden className="flex h-full flex-col justify-center p-8">
      <div className="flex flex-wrap gap-2">
        {LANGS.map((x, k) => (
          <span
            key={x.code}
            className={cn(
              "rounded-full border px-3 py-1 font-mono text-xs transition-colors duration-300",
              k === i ? "border-gold bg-gold text-black" : "border-gold/25 text-gold-100",
            )}
          >
            {x.code}
          </span>
        ))}
      </div>
      <div className="mt-8 rounded-2xl bg-white p-6 text-black">
        <p className="text-[0.65rem] font-semibold text-black/50">Survey question 4</p>
        <AnimatePresence mode="wait">
          <m.p
            key={l.code}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-2 text-xl font-semibold leading-snug"
          >
            {l.q}
          </m.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

function AnalyticsVisual() {
  const pts = [30, 42, 38, 55, 50, 64, 61, 72, 70, 81, 78, 88];
  const gid = useId();
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${(i / (pts.length - 1)) * 100} ${100 - p}`).join(" ");
  return (
    <div aria-hidden className="flex h-full flex-col p-8">
      <div className="grid grid-cols-3 gap-3">
        {[
          ["Visits completed", "On pace"],
          ["Avg. score", "Trending up"],
          ["Reports delivered", "This week"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl border border-gold/15 bg-black/40 p-3">
            <p className="eyebrow text-[0.5rem] text-smoke">{k}</p>
            <p className="mt-2 text-sm text-gold-100">{v}</p>
          </div>
        ))}
      </div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="mt-6 w-full flex-1">
        <defs>
          <linearGradient id={gid} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#D4AF37" stopOpacity="0.35" />
            <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${path} L100 100 L0 100 Z`} fill={`url(#${gid})`} />
        <m.path
          d={path}
          fill="none"
          stroke="#D4AF37"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.4 }}
        />
      </svg>
    </div>
  );
}
