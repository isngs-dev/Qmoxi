import { cn } from "@/lib/utils/cn";

/** Mono index label, e.g. "03 — Meet Q". Used to give sections an editorial spine. */
export function SectionLabel({
  index,
  children,
  className,
  tone = "gold",
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
  tone?: "gold" | "dark";
}) {
  return (
    <p
      className={cn(
        "eyebrow flex items-center gap-3",
        tone === "gold" ? "text-gold" : "text-gold-900",
        className,
      )}
    >
      {index && <span className="tabular-nums">{index}</span>}
      <span aria-hidden className={cn("h-px w-8", tone === "gold" ? "bg-gold/60" : "bg-black/40")} />
      <span>{children}</span>
    </p>
  );
}
