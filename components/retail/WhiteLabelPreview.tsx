"use client";

import { useState } from "react";
import { m } from "motion/react";
import { cn } from "@/lib/utils/cn";

// Sample brand palettes for the illustrative white-label preview.
const BRANDS = [
  { id: "a", label: "Navy", primary: "#1e3a5f", accent: "#e8eef5", text: "#ffffff" },
  { id: "b", label: "Forest", primary: "#1f4d3a", accent: "#e7f0ea", text: "#ffffff" },
  { id: "c", label: "Crimson", primary: "#8a1c2b", accent: "#f6e7e9", text: "#ffffff" },
  { id: "d", label: "Qmoxi Gold", primary: "#000000", accent: "#f6edd0", text: "#d4af37" },
];

/** Live white-label preview: switch the brand and watch the shopper portal re-skin. */
export function WhiteLabelPreview() {
  const [brand, setBrand] = useState(BRANDS[0]);
  return (
    <div className="rounded-2xl border border-gold/15 bg-black/40 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="eyebrow text-[0.6rem] text-smoke">Illustrative preview · Your brand in front</p>
        <div role="radiogroup" aria-label="Sample brand colors" className="flex gap-2">
          {BRANDS.map((b) => (
            <button
              key={b.id}
              type="button"
              role="radio"
              aria-checked={brand.id === b.id}
              aria-label={b.label}
              onClick={() => setBrand(b)}
              className={cn(
                "size-7 rounded-full ring-offset-2 ring-offset-black transition-shadow",
                brand.id === b.id ? "ring-2 ring-gold" : "ring-1 ring-white/20",
              )}
              style={{ background: b.primary }}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl bg-white text-[#111]">
        <m.div
          className="flex items-center justify-between px-4 py-3"
          animate={{ backgroundColor: brand.primary, color: brand.text }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2.5">
            <m.span
              className="flex size-7 items-center justify-center rounded-md text-xs font-bold"
              animate={{ backgroundColor: brand.text, color: brand.primary }}
            >
              YC
            </m.span>
            <span className="text-sm font-semibold">Your Company Shopper Portal</span>
          </div>
          <span className="hidden font-mono text-[0.65rem] opacity-80 sm:block">shoppers.yourcompany.com</span>
        </m.div>
        <div className="grid gap-3 p-4 sm:grid-cols-3">
          {["Available shops", "My assignments", "Payments"].map((t, i) => (
            <m.div
              key={t}
              className="rounded-lg p-3"
              animate={{ backgroundColor: brand.accent }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <p className="text-[0.7rem] font-semibold opacity-70">{t}</p>
              <div className="mt-3 space-y-1.5">
                <div className="h-1.5 w-4/5 rounded-full bg-black/15" />
                <div className="h-1.5 w-3/5 rounded-full bg-black/10" />
              </div>
            </m.div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-black/5 px-4 py-2.5 text-[0.6rem] text-black/55">
          <span>© Your Company</span>
          <span>Powered by Qmoxi</span>
        </div>
      </div>
    </div>
  );
}
