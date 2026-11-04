import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Emblem } from "@/components/shared/Logo";
import { Reveal } from "@/components/shared/Reveal";
import { AB_POWERED } from "@/lib/constants/content/about";

/** Q at the centre, connecting the two verticals. */
export function PoweredByQ() {
  return (
    <section aria-labelledby="powered-title" className="relative overflow-hidden py-24 lg:py-36">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel index="02" className="justify-center">
            Powered by Q
          </SectionLabel>
          <Reveal>
            <h2 id="powered-title" className="display mt-8 text-[clamp(2.4rem,5vw,4.8rem)] text-gold-100">
              {AB_POWERED.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 text-lg leading-relaxed text-mist">{AB_POWERED.body}</p>
          </Reveal>
        </div>

        <Reveal className="relative mt-16 grid items-center gap-8 lg:mt-24 lg:grid-cols-[1fr_auto_1fr]">
          <Side title="Qmoxi Healthcare" href="/qmoxihealthcare" items={AB_POWERED.healthcare} align="right" />
          <div className="relative mx-auto flex size-56 items-center justify-center lg:size-72">
            <span aria-hidden className="absolute inset-0 rounded-full border border-gold/20" />
            <span aria-hidden className="absolute inset-6 rounded-full border border-gold/30" />
            <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full border border-gold/30 [animation-duration:4s]" />
            <Emblem size={150} alt="Q, the Qmoxi AI agent" className="relative shadow-[0_0_80px_-10px_rgba(212,175,55,0.5)]" />
          </div>
          <Side title="Qmoxi Retail" href="/retail" items={AB_POWERED.retail} align="left" note="AI scheduling and 24/7 agent support launching December 2026" />
        </Reveal>
      </Container>
    </section>
  );
}

function Side({
  title,
  href,
  items,
  align,
  note,
}: {
  title: string;
  href: string;
  items: string[];
  align: "left" | "right";
  note?: string;
}) {
  return (
    <div className={align === "right" ? "text-center lg:text-right" : "text-center lg:text-left"}>
      <Link href={href} className="display link-underline text-4xl text-gold-100 hover:text-gold">
        {title}
      </Link>
      <ul className={`mt-6 flex flex-wrap gap-2 justify-center ${align === "right" ? "lg:justify-end" : "lg:justify-start"}`}>
        {items.map((i) => (
          <li key={i} className="rounded-full border border-gold/20 px-3.5 py-1.5 text-sm text-gold-100">
            {i}
          </li>
        ))}
      </ul>
      {note && <p className="mt-4 text-xs text-smoke">{note}</p>}
    </div>
  );
}
