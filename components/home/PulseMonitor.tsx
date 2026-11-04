import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";

const BEAT =
  "M0 50 H70 L80 50 L88 20 L98 82 L108 34 L116 58 L122 50 H200 L210 50 L218 20 L228 82 L238 34 L246 58 L252 50 H330 L340 50 L348 20 L358 82 L368 34 L376 58 L382 50 H400";

const CALLS = [
  { time: "06:12", ask: "After-hours appointment request", result: "Booked" },
  { time: "06:40", ask: "Billing question", result: "Routed to billing" },
  { time: "07:05", ask: "Confirm upcoming visit", result: "Confirmed" },
  { time: "07:31", ask: "New patient intake", result: "Details collected" },
];

/** Healthcare visual: a patient-line monitor — the logo's heartbeat as a live signal. */
export function PulseMonitor() {
  return (
    <Reveal variant="fade" className="w-full">
      <div className="relative overflow-hidden rounded-[1.5rem] border border-gold/20 bg-ink-900">
        <div className="flex items-center justify-between border-b border-gold/10 px-5 py-3.5">
          <p className="eyebrow text-[0.6rem] text-gold">Patient line · Q active</p>
          <span className="flex items-center gap-2 text-[0.68rem] text-mist">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-gold/70" />
              <span className="relative size-2 rounded-full bg-gold" />
            </span>
            24/7
          </span>
        </div>
        <div aria-hidden className="relative h-28 overflow-hidden border-b border-gold/10 dot-grid">
          <div className="absolute inset-y-0 left-0 flex w-[200%] animate-marquee [animation-duration:9s]">
            {[0, 1].map((k) => (
              <svg key={k} viewBox="0 0 400 100" preserveAspectRatio="none" className="h-full w-1/2">
                <path d={BEAT} fill="none" stroke="#D4AF37" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
              </svg>
            ))}
          </div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-900 to-transparent" />
        </div>
        <RevealGroup as="ul" className="divide-y divide-gold/10" stagger={0.12}>
          {CALLS.map((c) => (
            <RevealItem as="li" key={c.time} className="flex items-center gap-4 px-5 py-3.5 text-[0.8rem]">
              <span className="font-mono text-smoke">{c.time}</span>
              <span className="flex-1 text-gold-100">{c.ask}</span>
              <span className="rounded-full bg-gold/10 px-2.5 py-0.5 text-[0.68rem] text-gold">{c.result}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
      <p className="eyebrow mt-3 text-[0.58rem] text-smoke">Illustrative call activity</p>
    </Reveal>
  );
}
