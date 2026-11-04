import { MapPin } from "lucide-react";

/** Coded, illustrative program dashboard (no real client data). */
const PROGRAMS = [
  { name: "Quick-service audit · Q3", stage: "Field collection", pct: 72 },
  { name: "Retail compliance check", stage: "Editing", pct: 88 },
  { name: "Banking branch experience", stage: "Scheduling", pct: 35 },
  { name: "Grocery price audit", stage: "Reporting", pct: 96 },
];
const BARS = [38, 52, 46, 61, 70, 64, 78, 82, 75, 88, 92, 86];
const PINS = [
  [18, 32], [28, 58], [42, 40], [55, 66], [63, 30], [72, 52], [84, 38], [36, 74], [78, 72],
];

export function ProgramDashboard() {
  return (
    <div aria-hidden className="grid gap-4 p-4 text-left sm:p-6 lg:grid-cols-12">
      {/* Programs */}
      <div className="rounded-xl border border-gold/10 bg-black/40 p-4 lg:col-span-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-gold-100">Active programs</p>
          <span className="eyebrow text-[0.55rem] text-smoke">Illustrative</span>
        </div>
        <ul className="mt-4 space-y-3.5">
          {PROGRAMS.map((p) => (
            <li key={p.name}>
              <div className="flex justify-between gap-3 text-[0.75rem]">
                <span className="truncate text-gold-100">{p.name}</span>
                <span className="shrink-0 font-mono text-smoke">{p.stage}</span>
              </div>
              <div className="mt-1.5 h-1 rounded-full bg-gold/10">
                <div className="h-full rounded-full bg-gold" style={{ width: `${p.pct}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Map */}
      <div className="relative min-h-44 overflow-hidden rounded-xl border border-gold/10 bg-ink-800 lg:col-span-4">
        <div className="dot-grid absolute inset-0 opacity-60" />
        {PINS.map(([x, y], i) => (
          <span key={i} className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
            <span className="absolute -left-3 -top-3 size-6 animate-pulse-ring rounded-full bg-gold/30" style={{ animationDelay: `${i * 0.3}s` }} />
            <span className="absolute -left-1 -top-1 size-2 rounded-full bg-gold" />
          </span>
        ))}
        {/* Location pin: geofenced shop the shopper has checked in at */}
        <span className="absolute left-[50%] top-[46%] -translate-x-1/2 -translate-y-full">
          <span className="absolute left-1/2 top-full size-8 -translate-x-1/2 -translate-y-1/2 animate-pulse-ring rounded-full bg-gold/35" />
          <MapPin className="relative size-8 fill-gold text-black drop-shadow-[0_6px_10px_rgba(0,0,0,0.6)]" strokeWidth={1.75} />
        </span>
        <p className="eyebrow absolute bottom-3 left-3 text-[0.55rem] text-gold">Shops in field</p>
      </div>
      {/* Chart */}
      <div className="rounded-xl border border-gold/10 bg-black/40 p-4 lg:col-span-3">
        <p className="text-sm font-semibold text-gold-100">Completion trend</p>
        <div className="mt-4 flex h-28 items-end gap-1">
          {BARS.map((h, i) => (
            <span key={i} className="flex-1 rounded-t-sm bg-gold" style={{ height: `${h}%`, opacity: 0.35 + (i / BARS.length) * 0.65 }} />
          ))}
        </div>
        <div className="mt-3 flex justify-between font-mono text-[0.6rem] text-smoke">
          <span>Wk 1</span>
          <span>Wk 12</span>
        </div>
      </div>
    </div>
  );
}
