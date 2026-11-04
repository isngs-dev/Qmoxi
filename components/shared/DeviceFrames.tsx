import { cn } from "@/lib/utils/cn";

/** Realistic phone shell for product screens (coded UI or screenshots). */
export function PhoneFrame({ children, className, label }: { children: React.ReactNode; className?: string; label?: string }) {
  return (
    <figure
      className={cn(
        "relative aspect-[9/19.5] w-[260px] rounded-[2.6rem] bg-gradient-to-b from-ink-500 via-ink-700 to-ink-600 p-[9px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(212,175,55,0.18)]",
        className,
      )}
      aria-label={label}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-ivory">
        <div aria-hidden className="absolute left-1/2 top-2 z-20 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-black" />
        {children}
      </div>
    </figure>
  );
}

/** Minimal browser chrome for dashboard previews. */
export function BrowserFrame({
  children,
  className,
  url = "Qmoxi Platform",
  tone = "dark",
}: {
  children: React.ReactNode;
  className?: string;
  url?: string;
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl shadow-[0_50px_100px_-40px_rgba(0,0,0,0.85)]",
        tone === "dark" ? "bg-ink-850 ring-1 ring-gold/20" : "bg-white ring-1 ring-black/10",
        className,
      )}
    >
      <div className={cn("flex items-center gap-3 px-4 py-3", tone === "dark" ? "border-b border-gold/10" : "border-b border-black/5")}>
        <div aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-gold/70" />
          <span className="size-2.5 rounded-full bg-gold/40" />
          <span className="size-2.5 rounded-full bg-gold/20" />
        </div>
        <div
          className={cn(
            "mx-auto flex h-6 min-w-0 max-w-[60%] flex-1 items-center justify-center truncate rounded-md px-3 font-mono text-[10px]",
            tone === "dark" ? "bg-white/5 text-mist" : "bg-black/5 text-black/60",
          )}
        >
          {url}
        </div>
        <span aria-hidden className="w-10" />
      </div>
      {children}
    </div>
  );
}
