import { Container } from "@/components/layout/Container";
import { Button } from "@/components/shared/Button";
import { Reveal } from "@/components/shared/Reveal";
import { SignalLine } from "@/components/shared/SignalLine";
import { cn } from "@/lib/utils/cn";

type Cta = { label: string; href: string; external?: boolean };

/**
 * Closing call-to-action. Variants keep each page's ending distinct:
 * - gradient: the original site's black → gold band (home)
 * - signal:   black field with the heartbeat line (healthcare)
 * - ivory:    light editorial panel (about)
 * - frame:    hairline-framed black panel (retail / contact)
 */
export function CtaBand({
  eyebrow,
  title,
  body,
  primary,
  secondary,
  variant = "gradient",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  body?: string;
  primary: Cta;
  secondary?: Cta;
  variant?: "gradient" | "signal" | "ivory" | "frame";
}) {
  const light = variant === "ivory";
  return (
    <section
      aria-label="Get started"
      className={cn(
        "relative overflow-hidden",
        variant === "gradient" && "bg-black lg:bg-brand-gradient",
        variant === "signal" && "grain bg-black",
        variant === "ivory" && "on-light bg-ivory text-black",
        variant === "frame" && "bg-black py-6",
      )}
    >
      <Container className={cn(variant === "frame" && "px-3 sm:px-5 lg:px-8")}>
        <div
          className={cn(
            "relative py-24 sm:py-32",
            variant === "signal" && "pt-6 sm:pt-8",
            variant === "frame" && "rounded-[2rem] border border-gold/25 px-6 hairline-grid sm:px-12 lg:px-20",
          )}
        >
          {variant === "gradient" && <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-brand-gradient lg:hidden" />}
          {/* In normal flow (not absolute) so the line always sits above the content and never overlaps it */}
          {variant === "signal" && <SignalLine className="mb-10 opacity-80 sm:mb-14" />}
          <div className={cn("relative grid gap-10 lg:grid-cols-12 lg:items-end")}>
            <div className="lg:col-span-8">
              {eyebrow && (
                <Reveal>
                  <p className={cn("eyebrow", light ? "text-gold-800" : "text-gold")}>{eyebrow}</p>
                </Reveal>
              )}
              <Reveal delay={0.05}>
                <h2 className={cn("display mt-6 text-[clamp(2.75rem,6.5vw,6rem)]", light ? "text-black" : "text-gold-100")}>{title}</h2>
              </Reveal>
            </div>
            <Reveal delay={0.15} className="lg:col-span-4">
              {body && (
                <p className={cn("text-base leading-relaxed", light ? "text-black/75" : variant === "gradient" ? "text-mist lg:text-black/80" : "text-mist")}>
                  {body}
                </p>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  href={primary.href}
                  external={primary.external}
                  size="lg"
                  variant={light ? "dark" : "primary"}
                  className={variant === "gradient" ? "lg:bg-black lg:text-gold lg:hover:bg-ink-700" : undefined}
                >
                  {primary.label}
                </Button>
                {secondary && (
                  <Button
                    href={secondary.href}
                    external={secondary.external}
                    size="lg"
                    variant={light ? "outline-dark" : "outline"}
                    className={variant === "gradient" ? "lg:border-black/40 lg:text-black lg:hover:bg-black/5" : undefined}
                  >
                    {secondary.label}
                  </Button>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
