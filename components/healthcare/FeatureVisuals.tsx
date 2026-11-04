import { Lock } from "lucide-react";

/* Small, purpose-built visuals for each healthcare feature (pure CSS/SVG, no JS). */

export function ConversationVisual() {
  return (
    <div aria-hidden className="space-y-2.5">
      <div className="w-fit max-w-[80%] rounded-2xl rounded-bl-md bg-white/[0.06] px-4 py-2.5 text-sm text-gold-100">
        Can you explain this charge on my statement?
      </div>
      <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-gold px-4 py-2.5 text-sm text-black">
        Of course — that&apos;s the co-pay from your visit on the 12th.
      </div>
      <div className="w-fit rounded-2xl rounded-bl-md bg-white/[0.06] px-4 py-2.5 text-sm text-gold-100">
        <span className="inline-flex gap-1">
          <span className="size-1.5 animate-pulse rounded-full bg-gold" />
          <span className="size-1.5 animate-pulse rounded-full bg-gold [animation-delay:.2s]" />
          <span className="size-1.5 animate-pulse rounded-full bg-gold [animation-delay:.4s]" />
        </span>
      </div>
    </div>
  );
}

export function TelephonyVisual() {
  const lanes = ["Inbound", "Outbound", "Inbound", "Outbound"];
  return (
    <div aria-hidden className="space-y-3">
      {lanes.map((l, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="eyebrow w-16 text-[0.55rem] text-smoke">{l}</span>
          <div className="relative h-px flex-1 overflow-hidden bg-gold/15">
            <span
              className="absolute -top-[3px] size-[7px] rounded-full bg-gold shadow-[0_0_10px_rgba(212,175,55,0.8)] [animation:lane_3.2s_linear_infinite]"
              style={{ animationDelay: `${i * 0.7}s` }}
            />
          </div>
        </div>
      ))}
      <p className="pt-2 font-mono text-[0.7rem] text-gold">Queue · 0 waiting</p>
    </div>
  );
}

export function IntegrationVisual() {
  const nodes = ["EHR", "Scheduling", "Billing", "Registration"];
  return (
    <div aria-hidden className="relative">
      <svg viewBox="0 0 300 120" className="w-full">
        {nodes.map((_, i) => {
          const x = 30 + i * 80;
          return (
            <path
              key={i}
              d={`M150 22 C150 60 ${x} 60 ${x} 96`}
              fill="none"
              stroke="#D4AF37"
              strokeOpacity="0.5"
              strokeDasharray="3 5"
              className="[animation:dash_2s_linear_infinite]"
            />
          );
        })}
        <circle cx="150" cy="18" r="13" fill="#D4AF37" />
        <text x="150" y="23" textAnchor="middle" className="fill-black font-display text-[15px]">
          Q
        </text>
      </svg>
      <div className="-mt-2 grid grid-cols-4 gap-2 text-center">
        {nodes.map((n) => (
          <span key={n} className="truncate rounded-md bg-white/[0.06] px-1 py-1 font-mono text-[0.6rem] text-gold-100">
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}

export function AvailabilityVisual() {
  return (
    <div aria-hidden>
      <div className="flex h-16 items-end gap-[3px]">
        {Array.from({ length: 24 }, (_, h) => (
          <span
            key={h}
            className="flex-1 rounded-sm bg-gold"
            style={{ height: `${35 + ((h * 53) % 60)}%`, opacity: h < 7 || h > 19 ? 0.55 : 1 }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between font-mono text-[0.6rem] text-smoke">
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>24:00</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {["After hours", "Holidays", "Peak periods", "All time zones"].map((t) => (
          <span key={t} className="rounded-full border border-gold/25 px-2.5 py-1 text-[0.68rem] text-gold-100">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SecurityVisual() {
  return (
    <div aria-hidden className="relative flex h-32 items-center justify-center">
      {[0, 1, 2].map((i) => (
        <span key={i} className="absolute rounded-full border border-gold/25" style={{ width: 60 + i * 44, height: 60 + i * 44 }} />
      ))}
      <span className="relative flex size-14 items-center justify-center rounded-full bg-gold text-black">
        <Lock className="size-6" />
      </span>
    </div>
  );
}

export function CalendarVisual() {
  const days = ["M", "T", "W", "T", "F"];
  return (
    <div aria-hidden className="grid grid-cols-5 gap-1.5">
      {days.map((d, i) => (
        <span key={i} className="text-center font-mono text-[0.6rem] text-smoke">
          {d}
        </span>
      ))}
      {Array.from({ length: 15 }, (_, i) => (
        <span
          key={i}
          className={`h-7 rounded-md ${
            i === 8 ? "bg-gold" : i === 3 || i === 11 ? "bg-gold/30" : "bg-white/[0.05]"
          }`}
        />
      ))}
    </div>
  );
}

export function RoutingVisual() {
  return (
    <svg aria-hidden viewBox="0 0 240 120" className="w-full">
      <circle cx="24" cy="60" r="10" fill="#D4AF37" />
      {[20, 60, 100].map((y, i) => (
        <g key={y}>
          <path d={`M34 60 C110 60 110 ${y} 196 ${y}`} fill="none" stroke="#D4AF37" strokeOpacity={i === 1 ? 1 : 0.3} strokeWidth={i === 1 ? 1.6 : 1} />
          <rect x="196" y={y - 9} width="38" height="18" rx="9" fill={i === 1 ? "#D4AF37" : "rgba(212,175,55,0.15)"} />
        </g>
      ))}
    </svg>
  );
}

export function IntakeVisual() {
  const fields = [
    ["Name", "Jordan A."],
    ["Date of birth", "07 / 09 / 1979"],
    ["Reason for visit", "Follow-up"],
    ["Insurance", "On file · confirmed"],
  ];
  return (
    <div aria-hidden className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {fields.map(([k, v], i) => (
        <div key={k} className="rounded-xl border border-gold/15 bg-white/[0.03] p-4">
          <p className="eyebrow text-[0.55rem] text-smoke">{k}</p>
          <p className="mt-2 flex items-center justify-between text-sm text-gold-100">
            {v}
            <span className="size-2 rounded-full bg-gold" style={{ opacity: 0.4 + i * 0.2 }} />
          </p>
        </div>
      ))}
    </div>
  );
}

