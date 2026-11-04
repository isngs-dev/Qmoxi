import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/shared/Button";
import { BrowserFrame, PhoneFrame } from "@/components/shared/DeviceFrames";
import { RT_HERO } from "@/lib/constants/content/retail";
import { DEMO_RETAIL_HREF } from "@/lib/constants/site";
import { ProgramDashboard } from "./ProgramDashboard";

export function RetailHero() {
  return (
    <section className="grain relative overflow-hidden pt-[calc(var(--header-h)+3rem)]">
      <div aria-hidden className="hairline-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />
      <Container className="relative">
        <div className="mx-auto max-w-5xl text-center">
          <p className="eyebrow animate-rise text-gold">{RT_HERO.eyebrow}</p>
          <h1 className="display mt-8 animate-rise text-[clamp(2.9rem,6.4vw,6.4rem)] text-gold-100 [animation-delay:.1s]">
            Run Smarter Mystery Shopping Programs.{" "}
            <span className="text-metal italic">From One Connected Platform.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl animate-rise text-lg leading-relaxed text-mist [animation-delay:.22s]">{RT_HERO.body}</p>
          <div className="mt-10 flex animate-rise flex-wrap justify-center gap-3 [animation-delay:.32s]">
            <Button href={DEMO_RETAIL_HREF} size="lg">
              Request a Retail Demo
            </Button>
            <Button href="/contact" size="lg" variant="outline">
              Let’s Connect
            </Button>
          </div>
        </div>

        {/* Product composite */}
        <div className="relative mx-auto mt-20 max-w-6xl animate-rise pb-24 [animation-delay:.4s] lg:mt-24">
          <BrowserFrame className="ml-auto w-full sm:w-[86%] lg:w-[82%]" url="Qmoxi Platform · Program overview">
            <ProgramDashboard />
          </BrowserFrame>
          <div className="absolute -bottom-2 left-0 hidden sm:block lg:left-2">
            <PhoneFrame label="PrestoShopper mobile app" className="w-[190px] lg:w-[220px]">
              <Image
                src="/images/retail/prestoshopper-app-screen.png"
                alt="PrestoShopper app listing available mystery shopping assignments by location"
                fill
                sizes="220px"
                className="object-cover object-top"
              />
            </PhoneFrame>
          </div>
        </div>
      </Container>
    </section>
  );
}
