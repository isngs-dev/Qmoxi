import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Emblem } from "@/components/shared/Logo";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { RT_AI } from "@/lib/constants/content/retail";
import { cn } from "@/lib/utils/cn";

/** AI-powered retail operations — upcoming capabilities keep their published status. */
export function AiRetailOps() {
  return (
    <section aria-labelledby="ai-retail-title" className="grain relative overflow-hidden bg-ink-950 py-24 lg:py-32">
      <div aria-hidden className="absolute -left-40 top-1/2 size-[520px] -translate-y-1/2 rounded-full border border-gold/10" />
      <div aria-hidden className="absolute -left-20 top-1/2 size-[360px] -translate-y-1/2 rounded-full border border-gold/10" />
      <Container className="relative grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel index="05">Powered by Q</SectionLabel>
          <div className="mt-8 flex items-center gap-4">
            <Emblem size={56} />
            <span className="eyebrow text-gold">Q for Retail</span>
          </div>
          <Reveal>
            <h2 id="ai-retail-title" className="display mt-8 text-[clamp(2.4rem,4.8vw,4.6rem)] text-gold-100">
              {RT_AI.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 leading-relaxed text-mist">{RT_AI.body}</p>
          </Reveal>
        </div>
        <RevealGroup as="ul" className="space-y-4 lg:col-span-6 lg:col-start-7" stagger={0.12}>
          {RT_AI.items.map((it) => {
            const upcoming = it.status.startsWith("Launching");
            return (
              <RevealItem
                as="li"
                key={it.title}
                className={cn(
                  "rounded-2xl border p-6 sm:p-8",
                  upcoming ? "border-dashed border-gold/40 bg-black/50" : "border-gold/20 bg-ink-900",
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-2xl font-medium text-gold-100">{it.title}</h3>
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-semibold",
                      upcoming ? "border border-gold/50 text-gold" : "bg-gold text-black",
                    )}
                  >
                    {it.status}
                  </span>
                </div>
                <p className="mt-3 leading-relaxed text-mist">{it.body}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
