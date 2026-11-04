import { Container } from "@/components/layout/Container";
import { RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { HC_BENEFITS } from "@/lib/constants/content/healthcare";

/** Three preserved benefits set as an editorial strip with oversized numerals. */
export function Benefits() {
  return (
    <section aria-label="Benefits" className="border-y border-gold/15 bg-ink-950">
      <Container>
        <RevealGroup as="ol" className="grid md:grid-cols-3" stagger={0.12}>
          {HC_BENEFITS.map((b, i) => (
            <RevealItem
              as="li"
              key={b.title}
              className="relative border-gold/15 py-12 md:border-r md:px-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0 lg:py-16"
            >
              <span aria-hidden className="display block text-[4.5rem] leading-none text-outline">
                {i + 1}
              </span>
              <h2 className="relative mt-6 text-xl font-semibold text-gold-100">{b.title}</h2>
              <p className="relative mt-4 max-w-sm leading-relaxed text-mist">{b.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
