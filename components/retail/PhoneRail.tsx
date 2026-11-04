"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils/cn";

/**
 * Horizontal rail with a hidden scrollbar. Still scrollable by touch, trackpad
 * and keyboard; prev/next buttons give mouse users an explicit control.
 */
export function PhoneRail({ children, label }: { children: React.ReactNode; label: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 40 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const btn =
    "flex size-12 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:border-gold hover:bg-gold hover:text-black disabled:pointer-events-none disabled:opacity-30";

  return (
    <div>
      <Container className="flex justify-end gap-3">
        <button type="button" onClick={() => scrollByCard(-1)} disabled={edges.start} aria-label="Previous screen" className={btn}>
          <ArrowLeft aria-hidden className="size-5" />
        </button>
        <button type="button" onClick={() => scrollByCard(1)} disabled={edges.end} aria-label="Next screen" className={btn}>
          <ArrowRight aria-hidden className="size-5" />
        </button>
      </Container>
      <ol
        ref={ref}
        tabIndex={0}
        aria-label={label}
        className={cn(
          "no-scrollbar mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 outline-none sm:px-8 lg:gap-10",
          "lg:px-[max(3rem,calc((100vw_-_1360px)/2_+_3rem))]",
          // Matching scroll-padding so snapping keeps the side gutters instead of pulling the first card flush.
          "scroll-px-5 sm:scroll-px-8 lg:scroll-px-[max(3rem,calc((100vw_-_1360px)/2_+_3rem))]",
          "focus-visible:ring-2 focus-visible:ring-gold/60",
        )}
      >
        {children}
      </ol>
    </div>
  );
}
