import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { SignalLine } from "@/components/shared/SignalLine";
import { AB_STORY } from "@/lib/constants/content/about";

/** Company story as a horizontal chapter timeline threaded by the signal line. */
export function Story() {
  return (
    <section aria-labelledby="story-title" className="border-t border-gold/15 py-24 lg:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel index="01">Our story</SectionLabel>
          </div>
          <Reveal className="lg:col-span-8">
            <h2 id="story-title" className="display text-[clamp(2.4rem,5vw,4.8rem)] text-gold-100">
              {AB_STORY.title}
            </h2>
          </Reveal>
        </div>

        <SignalLine className="mt-16 hidden lg:block" />

        <RevealGroup as="ol" className="mt-10 grid gap-px overflow-hidden rounded-[1.5rem] bg-gold/15 sm:grid-cols-2 lg:mt-4 lg:grid-cols-4" stagger={0.12}>
          {AB_STORY.chapters.map((c, i) => (
            <RevealItem as="li" key={c.when} className={`relative flex flex-col p-7 lg:p-8 ${i === 3 ? "bg-gold text-black" : "bg-black"}`}>
              <p className={`eyebrow text-[0.62rem] ${i === 3 ? "text-black/70" : "text-smoke"}`}>
                0{i + 1} · {c.label}
              </p>
              <p className={`display mt-6 text-5xl leading-none ${i === 3 ? "text-black" : "text-gold"}`}>{c.when}</p>
              <h3 className={`mt-8 text-lg font-semibold ${i === 3 ? "text-black" : "text-gold-100"}`}>{c.title}</h3>
              <p className={`mt-3 text-[0.95rem] leading-relaxed ${i === 3 ? "text-black/80" : "text-mist"}`}>{c.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
