import { Container } from "@/components/layout/Container";
import { Button } from "@/components/shared/Button";
import { HC_HERO } from "@/lib/constants/content/healthcare";
import { DEMO_HEALTHCARE_HREF } from "@/lib/constants/site";
import { PatientCall } from "./PatientCall";
import { VideoDialog } from "./VideoDialog";

export function HealthcareHero() {
  return (
    <section className="grain relative overflow-hidden pt-[calc(var(--header-h)+2.5rem)]">
      <div aria-hidden className="dot-grid mask-fade-b pointer-events-none absolute inset-0 opacity-40" />
      {/* Concentric "signal" rings — a quiet nod to the logo's circle */}
      <div aria-hidden className="pointer-events-none absolute right-[-12%] top-[-8%] hidden aspect-square w-[62vw] max-w-[980px] rounded-full border border-gold/10 lg:block">
        <div className="absolute inset-[12%] rounded-full border border-gold/10" />
        <div className="absolute inset-[26%] rounded-full border border-gold/15" />
        <div className="absolute inset-[40%] rounded-full bg-[radial-gradient(closest-side,rgb(212_175_55/0.18),transparent)]" />
      </div>

      <Container className="relative grid items-center gap-16 pb-20 pt-8 lg:grid-cols-12 lg:pb-28">
        <div className="lg:col-span-7">
          <p className="eyebrow flex animate-rise items-center gap-3 text-gold">
            <span className="h-px w-8 bg-gold/60" /> {HC_HERO.eyebrow}
          </p>
          <h1 className="display mt-8 animate-rise text-[clamp(3rem,6.6vw,6.6rem)] text-gold-100 [animation-delay:.1s]">
            Replace Legacy IVR with <em className="text-metal">Intelligent</em> Patient Engagement.
          </h1>
          <p className="mt-8 max-w-xl animate-rise text-lg leading-relaxed text-mist [animation-delay:.25s]">{HC_HERO.body}</p>
          <div className="mt-10 flex animate-rise flex-wrap items-center gap-4 [animation-delay:.35s]">
            <Button href={DEMO_HEALTHCARE_HREF} size="lg">
              Request a Healthcare Demo
            </Button>
            <VideoDialog />
          </div>
        </div>
        <div className="flex animate-rise justify-center [animation-delay:.3s] lg:col-span-5">
          <PatientCall />
        </div>
      </Container>
    </section>
  );
}
