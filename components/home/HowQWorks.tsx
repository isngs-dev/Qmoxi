"use client";

import { useRef, useState } from "react";
import { m, useScroll, useSpring } from "motion/react";
import { Building2, MessageSquareText, PlugZap, Route, ScanSearch } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { HOW_Q_WORKS } from "@/lib/constants/content/home";
import { cn } from "@/lib/utils/cn";

const ICONS = [MessageSquareText, ScanSearch, PlugZap, Route, Building2];

export function HowQWorks() {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 65%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section aria-labelledby="how-title" className="relative border-t border-gold/15 py-24 lg:py-36">
      <Container className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
            <SectionLabel index="03">Workflow</SectionLabel>
            <h2 id="how-title" className="display mt-8 text-[clamp(2.6rem,5.5vw,5.2rem)] text-gold-100">
              {HOW_Q_WORKS.title}
            </h2>
            <p className="mt-6 max-w-md text-lg text-mist">{HOW_Q_WORKS.intro}</p>
            <div aria-hidden className="mt-12 hidden items-end gap-4 lg:flex">
              <span className="display text-[9rem] leading-[0.8] text-gold tabular-nums">0{active + 1}</span>
              <span className="eyebrow mb-3 text-smoke">/ 0{HOW_Q_WORKS.steps.length}</span>
            </div>
          </div>
        </div>

        <ol ref={listRef} className="relative lg:col-span-7">
          <div aria-hidden className="absolute bottom-0 left-[1.6rem] top-0 w-px bg-gold/15" />
          <m.div
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute bottom-0 left-[1.6rem] top-0 w-px origin-top bg-gold"
          />
          {HOW_Q_WORKS.steps.map((step, i) => {
            const Icon = ICONS[i];
            const on = i <= active;
            return (
              <m.li
                key={step.title}
                onViewportEnter={() => setActive(i)}
                viewport={{ amount: 0.6, margin: "-10% 0px -30% 0px" }}
                className="relative grid grid-cols-[3.2rem_1fr] gap-6 pb-16 last:pb-0 sm:gap-10 lg:pb-24"
              >
                <span
                  className={cn(
                    "relative z-10 flex size-[3.2rem] items-center justify-center rounded-full border transition-all duration-500",
                    on ? "border-gold bg-gold text-black" : "border-gold/25 bg-black text-gold/70",
                  )}
                >
                  <Icon aria-hidden className="size-5" />
                </span>
                <div className={cn("transition-opacity duration-500", on ? "opacity-100" : "opacity-45")}>
                  <p className="eyebrow pt-1 text-gold">Step 0{i + 1}</p>
                  <h3 className="mt-3 text-2xl font-medium tracking-tight text-gold-100 sm:text-[1.75rem]">{step.title}</h3>
                  <p className="mt-4 max-w-lg leading-relaxed text-mist">{step.body}</p>
                </div>
              </m.li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
