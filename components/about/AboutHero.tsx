import { Container } from "@/components/layout/Container";
import { AB_HERO } from "@/lib/constants/content/about";

export function AboutHero() {
  return (
    <section className="grain relative overflow-hidden pb-20 pt-[calc(var(--header-h)+4rem)] lg:pb-32">
      {/* Oversized outlined founding year */}
      <p
        aria-hidden
        className="display text-outline pointer-events-none absolute right-[4vw] top-[calc(var(--header-h)+1rem)] select-none text-[28vw] leading-[0.8] tracking-[-0.06em] lg:top-[calc(var(--header-h)+2.5rem)] lg:text-[19vw]"
      >
        2001
      </p>
      <Container className="relative">
        <p className="eyebrow flex animate-rise items-center gap-3 text-gold">
          <span className="h-px w-8 bg-gold/60" /> {AB_HERO.eyebrow}
        </p>
        <h1 className="display mt-10 max-w-5xl animate-rise text-[clamp(3.2rem,8vw,8.4rem)] text-gold-100 [animation-delay:.1s]">
          Built on Experience.
          <br />
          <em className="text-metal">Focused on the Future.</em>
        </h1>
        <div className="mt-14 grid animate-rise gap-10 border-t border-gold/20 pt-10 [animation-delay:.25s] lg:grid-cols-12">
          <p className="text-2xl leading-snug text-gold-100 lg:col-span-5">{AB_HERO.body}</p>
          <p className="leading-relaxed text-mist lg:col-span-6 lg:col-start-7">{AB_HERO.about}</p>
        </div>
      </Container>
    </section>
  );
}
