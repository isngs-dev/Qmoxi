import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Button } from "@/components/shared/Button";
import { PhoneFrame } from "@/components/shared/DeviceFrames";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { SOLUTIONS } from "@/lib/constants/content/home";
import { PulseMonitor } from "./PulseMonitor";

export function Solutions() {
  const { healthcare: hc, retail: rt } = SOLUTIONS;
  return (
    <section id="solutions" aria-labelledby="solutions-title" className="relative">
      {/* Intro */}
      <Container className="pb-16 pt-24 lg:pb-24 lg:pt-36">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <SectionLabel index="01">Platform</SectionLabel>
          </div>
          <div className="lg:col-span-9">
            <Reveal>
              <h2 id="solutions-title" className="display text-[clamp(2.6rem,5.6vw,5.4rem)] text-gold-100">
                One Intelligent Platform.
                <br />
                <span className="text-gold">Built for Healthcare and Retail.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-lg text-mist">{SOLUTIONS.intro}</p>
            </Reveal>
          </div>
        </div>
      </Container>

      {/* Healthcare — black editorial row */}
      <div className="border-y border-gold/15">
        <Container className="grid lg:grid-cols-12">
          <div className="py-16 lg:col-span-7 lg:border-r lg:border-gold/15 lg:py-24 lg:pr-16">
            <p className="eyebrow text-gold">{hc.name}</p>
            <Reveal>
              <h3 className="display mt-6 text-[clamp(2.2rem,4vw,3.75rem)] text-white">{hc.statement}</h3>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-xl leading-relaxed text-mist">{hc.body}</p>
            </Reveal>
            <RevealGroup as="ol" className="mt-10 border-t border-gold/15">
              {hc.capabilities.map((c, i) => (
                <RevealItem
                  as="li"
                  key={c}
                  className="group flex items-baseline gap-6 border-b border-gold/15 py-4 transition-colors hover:bg-gold/[0.04]"
                >
                  <span className="eyebrow w-8 text-smoke tabular-nums">0{i + 1}</span>
                  <span className="text-lg text-gold-100 transition-transform duration-500 group-hover:translate-x-1">{c}</span>
                </RevealItem>
              ))}
            </RevealGroup>
            <div className="mt-10">
              <Button href={hc.cta.href}>{hc.cta.label}</Button>
            </div>
          </div>
          <div className="relative flex items-center py-16 lg:col-span-5 lg:py-24 lg:pl-16">
            <PulseMonitor />
          </div>
        </Container>
      </div>

      {/* Retail — full-bleed gold band */}
      <div className="on-gold relative overflow-hidden bg-gold text-black">
        <div aria-hidden className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:22px_22px]" />
        <Container className="relative grid items-center gap-14 py-20 lg:grid-cols-12 lg:py-28">
          <div className="relative order-2 flex justify-center lg:order-1 lg:col-span-5">
            <Reveal variant="scale" className="relative">
              <PhoneFrame label="PrestoShopper app — available assignments" className="w-[230px] sm:w-[260px]">
                <Image
                  src="/images/retail/prestoshopper-app-screen.png"
                  alt="PrestoShopper app screen listing nearby mystery shopping assignments with pay amounts"
                  fill
                  sizes="260px"
                  className="object-cover object-top"
                />
              </PhoneFrame>
              <div className="absolute -right-6 top-16 hidden w-56 animate-float rounded-2xl bg-black p-4 text-gold shadow-2xl sm:-right-28 sm:block">
                <p className="eyebrow text-[0.58rem] text-gold/70">Program overview</p>
                {[
                  ["Scheduling", 82],
                  ["Field collection", 64],
                  ["Editing & review", 41],
                ].map(([label, pct]) => (
                  <div key={label} className="mt-3">
                    <div className="flex justify-between text-[0.7rem] text-gold-100">
                      <span>{label}</span>
                    </div>
                    <div className="mt-1.5 h-1 rounded-full bg-gold/15">
                      <div className="h-full rounded-full bg-gold" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute -left-4 bottom-20 hidden rounded-full bg-black px-4 py-2 text-[0.7rem] font-medium text-gold shadow-xl sm:-left-20 sm:block">
                ● Shop claimed · Geofence verified
              </div>
            </Reveal>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-7 lg:pl-10">
            <p className="eyebrow text-black/75">{rt.name}</p>
            <Reveal>
              <h3 className="display mt-6 text-[clamp(2.2rem,4vw,3.75rem)]">{rt.statement}</h3>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-xl leading-relaxed text-black/80">{rt.body}</p>
            </Reveal>
            <RevealGroup as="ul" className="mt-10 grid gap-x-8 sm:grid-cols-2">
              {rt.capabilities.map((c) => (
                <RevealItem as="li" key={c} className="flex items-center gap-3 border-t border-black/20 py-3.5 text-[0.95rem] font-medium">
                  <span aria-hidden className="size-1.5 rotate-45 bg-black" />
                  {c}
                </RevealItem>
              ))}
            </RevealGroup>
            <p className="mt-8 inline-flex items-center gap-3 rounded-full border border-black/25 px-4 py-2 text-sm">
              <span className="eyebrow rounded-full bg-black px-2 py-0.5 text-[0.58rem] text-gold">Coming</span>
              {rt.upcoming}
            </p>
            <div className="mt-10">
              <Button href={rt.cta.href} variant="dark">
                {rt.cta.label}
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
