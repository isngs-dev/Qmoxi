import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { Emblem } from "@/components/shared/Logo";
import { ENTERPRISE } from "@/lib/constants/content/home";
import { Constellation } from "./Constellation";

export function EnterpriseReady() {
  return (
    <section aria-labelledby="enterprise-title" className="on-light relative overflow-hidden bg-ivory text-black">
      <Container className="py-24 lg:py-36">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <SectionLabel index="04" tone="dark" className="text-gold-800!">
              Enterprise-ready
            </SectionLabel>
          </div>
          <div className="lg:col-span-9">
            <Reveal>
              <h2 id="enterprise-title" className="display text-[clamp(2.6rem,6vw,5.8rem)]">
                Built for Reliability,
                <br />
                <em className="text-gold-800">Security,</em> and Scale.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-black/75">{ENTERPRISE.intro}</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12">
          <div className="relative lg:col-span-5">
            <Constellation />
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Emblem size={84} alt="" className="shadow-[0_20px_50px_-10px_rgba(107,86,23,0.6)]" />
            </div>
          </div>
          <RevealGroup className="grid border-t border-black/15 sm:grid-cols-2 lg:col-span-7" stagger={0.1}>
            {ENTERPRISE.pillars.map((p, i) => (
              <RevealItem
                as="article"
                key={p.title}
                className="border-b border-black/15 py-8 sm:px-8 sm:odd:border-r sm:odd:pl-0 sm:even:pr-0"
              >
                <p className="display text-5xl text-gold-800 tabular-nums">0{i + 1}</p>
                <h3 className="mt-6 text-xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-black/75">{p.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
