import { cn } from "@/lib/utils/cn";

/** Gold voice waveform — Q's "voice". Pure CSS; pauses when `active` is false. */
export function Waveform({
  bars = 28,
  active = true,
  className,
  barClassName,
}: {
  bars?: number;
  active?: boolean;
  className?: string;
  barClassName?: string;
}) {
  return (
    <div aria-hidden className={cn("flex h-10 min-w-0 items-center gap-[3px] overflow-hidden", className)}>
      {Array.from({ length: bars }, (_, i) => {
        // Deterministic pseudo-random heights so SSR and client match.
        const h = 30 + ((i * 37) % 70);
        return (
          <span
            key={i}
            className={cn("w-[3px] origin-center rounded-full bg-gold", active && "animate-wave", barClassName)}
            style={{
              height: `${h}%`,
              animationDelay: `${(i % 7) * 0.11}s`,
              animationDuration: `${0.9 + (i % 5) * 0.15}s`,
              transform: active ? undefined : "scaleY(0.25)",
              transition: "transform .4s",
            }}
          />
        );
      })}
    </div>
  );
}
