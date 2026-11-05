import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/shared/Reveal";
import { AB_MISSION } from "@/lib/constants/content/about";

/** Mission and vision as two editorial pull-quotes on a light ground. */
export function MissionVision() {
  return (
    <section aria-label="Mission and vision" className="on-light bg-ivory text-black">
      <Container className="py-24 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <Reveal as="figure" className="lg:col-span-7">
            <figcaption className="eyebrow flex items-center gap-3 text-gold-800">
              <span className="h-px w-8 bg-gold-800/60" /> Our Mission
            </figcaption>
            <blockquote className="display mt-8 text-[clamp(2rem,3.8vw,3.6rem)] leading-[1.08]">
              <span aria-hidden className="text-gold-800">“</span>
              {AB_MISSION.mission}
              <span aria-hidden className="text-gold-800">”</span>
            </blockquote>
          </Reveal>
          <Reveal as="figure" delay={0.12} className="border-black/15 lg:col-span-5 lg:border-l lg:pl-12">
            <figcaption className="eyebrow flex items-center gap-3 text-gold-800">
              <span className="h-px w-8 bg-gold-800/60" /> Our Vision
            </figcaption>
            <blockquote className="mt-8 text-xl leading-relaxed text-black/80 sm:text-2xl sm:leading-relaxed">{AB_MISSION.vision}</blockquote>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
