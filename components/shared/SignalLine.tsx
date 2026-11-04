"use client";

import { m } from "motion/react";
import { cn } from "@/lib/utils/cn";

/**
 * The heartbeat/voice line from the Qmoxi logo, redrawn as a scroll-triggered
 * gold stroke. Used as a recurring divider motif across the site.
 */
const PATH =
  "M0 40 H360 C372 40 376 40 382 34 L392 8 L404 70 L416 22 L424 46 L432 40 H520 L532 40 L540 26 L548 54 L556 40 H640 C652 40 656 40 662 34 L672 8 L684 70 L696 22 L704 46 L712 40 H1200";

export function SignalLine({ className, tone = "gold", label }: { className?: string; tone?: "gold" | "dark"; label?: string }) {
  return (
    <div className={cn("relative w-full", className)} aria-hidden={label ? undefined : true} role={label ? "img" : undefined} aria-label={label}>
      <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="h-12 w-full overflow-visible sm:h-16">
        <path d={PATH} fill="none" stroke={tone === "gold" ? "rgb(212 175 55 / 0.15)" : "rgb(0 0 0 / 0.12)"} strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <m.path
          d={PATH}
          fill="none"
          stroke={tone === "gold" ? "#D4AF37" : "#000"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 2.2, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>
    </div>
  );
}
