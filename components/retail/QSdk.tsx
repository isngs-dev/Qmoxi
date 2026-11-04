import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Button } from "@/components/shared/Button";
import { Reveal } from "@/components/shared/Reveal";
import { RT_SDK } from "@/lib/constants/content/retail";
import { EXTERNAL } from "@/lib/constants/site";

/** Q SDK — Presto-like collection embedded inside an organization's own app. */
export function QSdk() {
  return (
    <section aria-labelledby="sdk-title" className="on-light bg-ivory text-black">
      <Container className="grid gap-14 py-24 lg:grid-cols-12 lg:items-center lg:py-32">
        <div className="lg:col-span-5">
          <SectionLabel index="03" tone="dark" className="text-gold-800!">
            Developers
          </SectionLabel>
          <Reveal>
            <h2 id="sdk-title" className="display mt-8 text-[clamp(3rem,7vw,7rem)] leading-[0.9]">
              {RT_SDK.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 text-2xl leading-snug">{RT_SDK.body}</p>
            <p className="mt-4 leading-relaxed text-black/70">{RT_SDK.detail}</p>
          </Reveal>
          <div className="mt-8">
            <Button href={EXTERNAL.qSdk} external variant="dark">
              Explore Q SDK
            </Button>
          </div>
        </div>

        <Reveal variant="right" className="relative lg:col-span-7">
          <figure className="relative overflow-hidden rounded-[1.75rem]">
            <Image
              src="/images/retail/q-sdk-convenience-store.png"
              alt="A shopper using a branded mobile app to collect audit data in a convenience store aisle"
              width={1280}
              height={720}
              sizes="(min-width: 1024px) 760px, 100vw"
              className="h-auto w-full"
            />
          </figure>
          {/* Plug-in diagram */}
          <div aria-hidden className="relative -mt-16 ml-auto w-[88%] rounded-2xl bg-black p-5 text-white shadow-2xl sm:-mt-24 sm:w-[70%]">
            <p className="eyebrow text-[0.58rem] text-smoke">Your branded app</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {["Home", "Rewards", "Account"].map((t) => (
                <span key={t} className="rounded-lg border border-white/10 px-2 py-3 text-center text-[0.7rem] text-mist">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between rounded-lg border border-gold bg-gold/10 px-3 py-3">
              <span className="text-[0.78rem] font-semibold text-gold">Q SDK · Presto-style collection</span>
              <span className="font-mono text-[0.6rem] text-gold/80">embedded</span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
