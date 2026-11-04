import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Reveal } from "@/components/shared/Reveal";
import { HC_FEATURES } from "@/lib/constants/content/healthcare";
import { cn } from "@/lib/utils/cn";
import {
  AvailabilityVisual,
  CalendarVisual,
  ConversationVisual,
  IntakeVisual,
  IntegrationVisual,
  RoutingVisual,
  SecurityVisual,
  TelephonyVisual,
} from "./FeatureVisuals";

type Key = keyof typeof HC_FEATURES.items;

const LAYOUT: { key: Key; span: string; Visual: () => React.JSX.Element; tone?: "gold"; href?: string; row?: boolean }[] = [
  { key: "conversations", span: "lg:col-span-7", Visual: ConversationVisual },
  { key: "telephony", span: "lg:col-span-5", Visual: TelephonyVisual },
  { key: "integration", span: "lg:col-span-5", Visual: IntegrationVisual },
  { key: "availability", span: "lg:col-span-7", Visual: AvailabilityVisual, tone: "gold" },
  { key: "security", span: "lg:col-span-4", Visual: SecurityVisual },
  { key: "scheduling", span: "lg:col-span-4", Visual: CalendarVisual, href: "#scheduling" },
  { key: "triage", span: "lg:col-span-4", Visual: RoutingVisual, href: "#triage" },
  { key: "intake", span: "lg:col-span-12", Visual: IntakeVisual, row: true },
];

/** Eight features in a varied editorial grid — each with its own visual, not a repeated icon card. */
export function FeaturesBento() {
  return (
    <section aria-labelledby="features-title" className="relative py-24 lg:py-36">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel index="03">Features</SectionLabel>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <h2 id="features-title" className="display text-[clamp(2.4rem,5vw,4.8rem)] text-gold-100">
                {HC_FEATURES.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl text-lg text-mist">{HC_FEATURES.intro}</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-12">
          {LAYOUT.map(({ key, span, Visual, tone, href, row }, i) => {
            const f = HC_FEATURES.items[key];
            const gold = tone === "gold";
            return (
              <Reveal
                as="article"
                key={key}
                delay={(i % 3) * 0.06}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-[1.5rem] border p-7 sm:p-9",
                  gold ? "on-gold border-gold bg-gold text-black" : "border-gold/15 bg-ink-900",
                  row && "lg:flex-row lg:items-center lg:gap-14",
                  span,
                )}
              >
                <div className={cn("flex items-start justify-between gap-6", row && "lg:w-[34%] lg:shrink-0 lg:flex-col")}>
                  <div>
                    <p className={cn("eyebrow text-[0.62rem]", gold ? "text-black/70" : "text-smoke")}>
                      Feature 0{i + 1}
                    </p>
                    <h3 className={cn("mt-4 text-2xl font-semibold tracking-tight", gold ? "text-black" : "text-gold-100")}>
                      {f.title}
                    </h3>
                    <p className={cn("mt-3 max-w-md leading-relaxed", gold ? "text-black/80" : "text-mist")}>{f.body}</p>
                    {href && (
                      <a href={href} className="link-underline mt-4 inline-block text-sm font-medium text-gold">
                        See how it works ↓
                      </a>
                    )}
                  </div>
                </div>
                <div
                  className={cn(
                    "mt-10",
                    row && "lg:mt-0 lg:flex-1",
                    gold && "viz-invert",
                  )}
                >
                  <Visual />
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
