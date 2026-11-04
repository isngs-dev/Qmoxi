import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "outline" | "dark" | "ghost" | "outline-dark";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-gold text-black hover:bg-gold-300",
  outline: "border border-gold/50 text-gold hover:border-gold hover:bg-gold/10",
  dark: "bg-black text-gold hover:bg-ink-700",
  "outline-dark": "border border-black/40 text-black hover:border-black hover:bg-black/5",
  ghost: "text-gold hover:text-gold-300 px-0!",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  external?: boolean;
  className?: string;
  ariaLabel?: string;
};

/** Link styled as a button. Internal links use next/link; external ones open in a new tab. */
export function Button({ href, children, variant = "primary", size = "md", external, className, ariaLabel }: Props) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  const classes = cn(
    "group relative inline-flex items-center justify-center gap-3 rounded-full font-semibold tracking-[-0.005em] transition-[background-color,border-color,color] duration-300",
    size === "lg" ? "h-14 px-7 text-[0.95rem]" : "h-12 px-6 text-sm",
    VARIANTS[variant],
    className,
  );
  const content = (
    <>
      <span>{children}</span>
      <span
        aria-hidden
        className={cn(
          "relative flex size-6 items-center justify-center overflow-hidden rounded-full",
          variant === "primary" ? "bg-black/10" : variant === "dark" ? "bg-gold/15" : "bg-current/10",
        )}
      >
        <Icon className="size-3.5 transition-transform duration-500 ease-[var(--ease-quint)] group-hover:translate-x-[3px] group-focus-visible:translate-x-[3px]" />
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} aria-label={ariaLabel}>
        {content}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}
