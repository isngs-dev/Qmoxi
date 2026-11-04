import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Counter } from "@/components/shared/Counter";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { RT_STATS } from "@/lib/constants/content/retail";

/** Published PrestoShopper scale figures, reproduced exactly. */
export function ScaleStats() {
  return (
    <section aria-labelledby="stats-title" className="on-gold relative overflow-hidden bg-gold text-black">
      <Container className="py-24 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-black/70">PrestoShopper · By the numbers</p>
            <h2 id="stats-title" className="display mt-6 text-[clamp(2.6rem,5.6vw,5.4rem)]">
              {RT_STATS.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="leading-relaxed text-black/80">{RT_STATS.intro}</p>
          </Reveal>
        </div>

        <RevealGroup as="dl" className="mt-16 grid grid-cols-2 border-t border-black/25 md:grid-cols-3 lg:grid-cols-5" stagger={0.1}>
          {RT_STATS.items.map((s) => (
            <RevealItem key={s.label} className="flex flex-col border-b border-black/25 py-8 pr-4 md:border-r md:px-6 md:first:pl-0 lg:border-b-0 lg:last:border-r-0">
              <dt className="eyebrow order-2 mt-3 text-[0.62rem] text-black/75">{s.label}</dt>
              <dd className="display -order-1 text-[clamp(2.6rem,4.6vw,4.4rem)] leading-none tabular-nums">
                {"text" in s ? (
                  <span className="block text-[0.62em] leading-[1.05]">{s.text}</span>
                ) : (
                  <Counter value={s.value} prefix={"prefix" in s ? s.prefix : ""} suffix={s.suffix} />
                )}
              </dd>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-20">
          <figure className="overflow-hidden rounded-[1.75rem] bg-black">
            <Image
              src="/images/retail/end-brands.jpg"
              alt="End brands that utilize Qmoxi software — a wall of well-known retail, automotive, banking, hospitality and consumer brand logos"
              width={1320}
              height={1194}
              sizes="(min-width: 1360px) 1264px, 100vw"
              className="mx-auto h-auto w-full max-w-4xl"
            />
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
