import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { AB_WHY } from "@/lib/constants/content/about";

/** Three reasons, told through oversized typography rather than icon cards. */
export function WhyChoose() {
  return (
    <section aria-labelledby="why-title" className="border-t border-gold/15 bg-ink-950 py-24 lg:py-32">
      <Container>
        <SectionLabel index="03">Why Qmoxi</SectionLabel>
        <Reveal>
          <h2 id="why-title" className="display mt-8 text-[clamp(2.4rem,5vw,4.8rem)] text-gold-100">
            Why Organizations Choose Qmoxi
          </h2>
        </Reveal>
        <RevealGroup as="ol" className="mt-16 divide-y divide-gold/15 border-y border-gold/15" stagger={0.12}>
          {AB_WHY.map((w) => (
            <RevealItem as="li" key={w.title} className="group grid items-center gap-6 py-10 md:grid-cols-12 lg:py-12">
              <span
                aria-hidden
                className="display text-outline text-[clamp(5rem,12vw,11rem)] leading-[0.8] transition-colors duration-700 group-hover:text-gold md:col-span-5"
              >
                {w.big}
              </span>
              <h3 className="text-2xl font-medium text-gold-100 md:col-span-3">{w.title}</h3>
              <p className="leading-relaxed text-mist md:col-span-4">{w.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
