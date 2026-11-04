import { Container } from "@/components/layout/Container";
import { Button } from "@/components/shared/Button";
import { HOME_HERO } from "@/lib/constants/content/home";
import { QConsole } from "./QConsole";

export function HomeHero() {
  const [l1, l2, l3] = HOME_HERO.lines;
  return (
    <section className="grain relative overflow-hidden pt-[calc(var(--header-h)+3rem)] lg:min-h-[min(100svh,58rem)] lg:pt-[calc(var(--header-h)+4.5rem)]">
      {/* Structural texture + a single focused light source behind the console */}
      <div aria-hidden className="hairline-grid mask-fade-b pointer-events-none absolute inset-0 opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[720px] w-[720px] rounded-full opacity-40 blur-3xl [background:radial-gradient(closest-side,rgb(212_175_55/0.35),transparent)]"
      />

      <Container className="relative grid gap-14 pb-20 lg:grid-cols-12 lg:gap-8 lg:pb-28">
        <div className="lg:col-span-7 lg:pt-6">
          <p className="eyebrow animate-rise text-gold">{HOME_HERO.eyebrow}</p>
          <h1 className="display mt-8 text-[clamp(3.1rem,7.4vw,7.6rem)] text-gold-100">
            {[l1, l2].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <span className="block animate-rise" style={{ animationDelay: `${0.12 + i * 0.12}s` }}>
                  {line}
                </span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.12em]">
              <span className="block animate-rise" style={{ animationDelay: "0.36s" }}>
                {l3.replace("Q.", "")}
                <span className="text-metal italic">Q.</span>
              </span>
            </span>
          </h1>
          <p className="mt-8 max-w-xl animate-rise text-lg leading-relaxed text-mist [animation-delay:.5s]">{HOME_HERO.body}</p>
          <div className="mt-10 flex animate-rise flex-wrap gap-3 [animation-delay:.6s]">
            <Button href={HOME_HERO.primary.href} size="lg">
              {HOME_HERO.primary.label}
            </Button>
            <Button href={HOME_HERO.secondary.href} size="lg" variant="outline">
              {HOME_HERO.secondary.label}
            </Button>
          </div>

          <dl className="mt-16 grid max-w-xl animate-rise grid-cols-3 border-t border-gold/15 [animation-delay:.75s]">
            {HOME_HERO.facts.map((f) => (
              <div key={f.k} className="border-r border-gold/15 py-5 pr-4 last:border-r-0 [&:not(:first-child)]:pl-4">
                <dt className="eyebrow text-[0.62rem] text-smoke">{f.k}</dt>
                <dd className="mt-2 text-sm font-medium text-gold-100">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="animate-rise [animation-delay:.35s] lg:col-span-5">
          <QConsole />
        </div>
      </Container>
    </section>
  );
}
