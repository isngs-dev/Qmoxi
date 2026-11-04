"use client";

import { useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Reveal } from "@/components/shared/Reveal";
import { RT_COMPONENTS } from "@/lib/constants/content/retail";
import { cn } from "@/lib/utils/cn";
import { WhiteLabelPreview } from "./WhiteLabelPreview";

export function HowRetailWorks() {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const c = RT_COMPONENTS[active];

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = RT_COMPONENTS.length;
    const next = e.key === "ArrowRight" || e.key === "ArrowDown" ? (i + 1) % n : e.key === "ArrowLeft" || e.key === "ArrowUp" ? (i - 1 + n) % n : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section aria-labelledby="how-retail-title" className="relative border-t border-gold/15 py-24 lg:py-36">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel index="01">The ecosystem</SectionLabel>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <h2 id="how-retail-title" className="display text-[clamp(2.4rem,5vw,4.8rem)] text-gold-100">
                How Qmoxi Retail Works
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-2xl text-lg text-mist">
                Three connected components — the platform your staff runs, the app your shoppers use, and the branded experience your clients see.
              </p>
            </Reveal>
          </div>
        </div>

        <div role="tablist" aria-label="Qmoxi Retail components" className="mt-14 grid gap-3 md:grid-cols-3 lg:mt-20">
          {RT_COMPONENTS.map((item, i) => {
            const on = i === active;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`rt-tab-${item.id}`}
                aria-selected={on}
                aria-controls="rt-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border p-6 text-left transition-colors duration-500",
                  on ? "border-gold bg-gold text-black" : "border-gold/20 text-gold-100 hover:border-gold/50",
                )}
              >
                <span className={cn("display text-5xl leading-none", on ? "text-black" : "text-outline")}>{item.letter}</span>
                <span className="mt-6 block text-xl font-semibold">{item.name}</span>
                <span className={cn("eyebrow mt-1 block text-[0.62rem]", on ? "text-black/70" : "text-smoke")}>{item.sub}</span>
              </button>
            );
          })}
        </div>

        <div
          id="rt-panel"
          role="tabpanel"
          aria-labelledby={`rt-tab-${c.id}`}
          className="mt-4 overflow-hidden rounded-[1.75rem] border border-gold/20 bg-ink-900"
        >
          <AnimatePresence mode="wait">
            <m.div
              key={c.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}
              className="grid gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:p-14"
            >
              <div className="lg:col-span-5">
                <h3 className="display text-4xl text-gold-100 sm:text-5xl">{c.name}</h3>
                <p className="mt-5 leading-relaxed text-mist">{c.body}</p>
                {c.id === "platform" && (
                  <dl className="mt-8 grid gap-4">
                    {c.notes.map((n) => (
                      <div key={n.k} className="flex gap-5 border-t border-gold/15 pt-4">
                        <dt className="display w-24 shrink-0 text-2xl text-gold">{n.k}</dt>
                        <dd className="text-sm leading-relaxed text-gold-100">{n.v}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {c.id === "private" && <p className="mt-8 border-l-2 border-gold pl-4 text-gold-100">{c.split}</p>}
              </div>

              <div className="lg:col-span-7">
                {c.id === "platform" && <Pipeline stages={c.pipeline} />}
                {c.id === "presto" && <PrestoSteps steps={c.steps} />}
                {c.id === "private" && (
                  <div className="space-y-6">
                    <WhiteLabelPreview />
                    <div className="grid gap-6 sm:grid-cols-2">
                      <List title="You bring" items={c.yours} />
                      <List title="Qmoxi runs" items={c.ours} />
                    </div>
                  </div>
                )}
              </div>
            </m.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}

function Pipeline({ stages }: { stages: readonly string[] }) {
  return (
    <ol className="relative grid gap-2">
      {stages.map((s, i) => (
        <m.li
          key={s}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 + i * 0.07 }}
          className="flex items-center gap-4 rounded-xl border border-gold/15 bg-black/40 px-4 py-3"
          style={{ marginLeft: `${i * 4}%` }}
        >
          <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</span>
          <span className="text-gold-100">{s}</span>
          <span aria-hidden className="ml-auto h-px w-10 bg-gold/40" />
        </m.li>
      ))}
    </ol>
  );
}

function PrestoSteps({ steps }: { steps: readonly string[] }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2">
      {steps.map((s, i) => (
        <m.li
          key={s}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 + i * 0.07 }}
          className="relative rounded-2xl border border-gold/15 bg-black/40 p-5"
        >
          <span className="display text-4xl text-gold">{i + 1}</span>
          <span className="mt-3 block text-gold-100">{s}</span>
        </m.li>
      ))}
    </ol>
  );
}

function List({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <p className="eyebrow text-smoke">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((it) => (
          <li key={it} className="flex items-center gap-2.5 text-sm text-gold-100">
            <Check aria-hidden className="size-4 text-gold" /> {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
