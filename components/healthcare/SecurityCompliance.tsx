import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { HC_SECURITY } from "@/lib/constants/content/healthcare";
import { EXTERNAL } from "@/lib/constants/site";

// Only the references published on qmoxi.com — no badges, no added claims.
const PLAQUES: { name: string; caption: string; href?: string; linkLabel?: string }[] = [
  { name: "HIPAA", caption: "Healthcare data privacy" },
  { name: "SOC 2 Type II", caption: "SOC 2 Compliant", href: EXTERNAL.soc2, linkLabel: "Read about SOC 2 compliance" },
  { name: "ISO 27001", caption: "ISO 27001 Certified", href: EXTERNAL.iso27001, linkLabel: "Read about ISO 27001 certification" },
];

export function SecurityCompliance() {
  return (
    <section aria-labelledby="security-title" className="border-t border-gold/15 bg-ink-950 pb-10 pt-24 lg:pb-12 lg:pt-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index="06">Security</SectionLabel>
            <Reveal>
              <h2 id="security-title" className="display mt-8 text-[clamp(2.4rem,4.6vw,4.4rem)] text-gold-100">
                {HC_SECURITY.title}
              </h2>
            </Reveal>
          </div>
          <div className="space-y-8 lg:col-span-6 lg:col-start-7 lg:pt-16">
            <Reveal>
              <p className="text-lg leading-relaxed text-mist">{HC_SECURITY.body}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="text-xl font-semibold text-gold-100">{HC_SECURITY.subtitle}</h3>
              <p className="mt-3 leading-relaxed text-mist">{HC_SECURITY.subbody}</p>
            </Reveal>
          </div>
        </div>

        <RevealGroup as="ul" className="mt-16 grid border-y border-gold/20 md:grid-cols-3" stagger={0.12}>
          {PLAQUES.map((p) => (
            <RevealItem as="li" key={p.name} className="border-gold/20 py-10 md:border-r md:px-10 md:first:pl-0 md:last:border-r-0">
              <p className="display text-[clamp(2.6rem,4.4vw,4rem)] leading-none text-metal">{p.name}</p>
              <p className="eyebrow mt-5 text-smoke">{p.caption}</p>
              {p.href && (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm text-gold hover:text-gold-300"
                >
                  <span className="link-underline">{p.linkLabel}</span>
                  <ArrowUpRight aria-hidden className="size-3.5" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
