import Image from "next/image";
import { Camera, CheckCircle2, ClipboardList, Clock, DollarSign, MapPin, Star, Upload } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Button } from "@/components/shared/Button";
import { PhoneFrame } from "@/components/shared/DeviceFrames";
import { Reveal } from "@/components/shared/Reveal";
import { RT_PRESTO } from "@/lib/constants/content/retail";
import { EXTERNAL } from "@/lib/constants/site";
import { PhoneRail } from "./PhoneRail";

const SCREENS = [
  { step: "Find assignments", caption: "Browse nearby shops by location" },
  { step: "View shop details", caption: "Requirements, window and pay at a glance" },
  { step: "Complete the evaluation", caption: "Guided questions, photos and timestamps" },
  { step: "Submit results", caption: "Upload from the phone, right after the visit" },
  { step: "Manage activity", caption: "Track jobs and contractor payments" },
];

export function PrestoShopperApp() {
  return (
    <section aria-labelledby="presto-title" className="relative overflow-hidden py-24 lg:py-36">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="02">Mobile</SectionLabel>
            <Reveal>
              <h2 id="presto-title" className="display mt-8 text-[clamp(2.6rem,5.6vw,5.4rem)] text-gold-100">
                {RT_PRESTO.title}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.08} className="lg:col-span-5">
            <p className="leading-relaxed text-mist">{RT_PRESTO.body}</p>
            <div className="mt-6">
              <Button href={EXTERNAL.prestoShopper} external variant="outline">
                Explore PrestoShopper
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Horizontal phone sequence */}
      <div className="mt-16 lg:mt-24">
        <PhoneRail label="PrestoShopper app walkthrough">
          {SCREENS.map((s, i) => (
            <li key={s.step} className="shrink-0 snap-start">
              <Reveal delay={i * 0.08}>
                <PhoneFrame label={s.step} className="w-[230px] sm:w-[250px]">
                  <Screen index={i} />
                </PhoneFrame>
                <p className="eyebrow mt-6 text-gold">0{i + 1} · {s.step}</p>
                <p className="mt-2 max-w-[250px] text-sm text-mist">{s.caption}</p>
              </Reveal>
            </li>
          ))}
        </PhoneRail>
      </div>
    </section>
  );
}

/* Coded screens (illustrative). The first is the real PrestoShopper screenshot. */
function Screen({ index }: { index: number }) {
  if (index === 0)
    return (
      <Image
        src="/images/retail/prestoshopper-app-screen.png"
        alt="PrestoShopper assignment list"
        fill
        sizes="250px"
        className="object-cover object-top"
      />
    );

  const shell = "flex h-full flex-col bg-white px-4 pb-5 pt-11 text-[#1a1a1a]";
  if (index === 1)
    return (
      <div className={shell}>
        <div className="h-24 rounded-xl bg-gradient-to-br from-[#e9f3fb] to-[#cfe5f5] p-3">
          <MapPin className="size-5 text-[#1d7fc1]" aria-hidden />
          <p className="mt-6 text-xs font-semibold">0.4 mi away</p>
        </div>
        <p className="mt-4 text-base font-bold">Downtown Café Visit</p>
        <p className="text-[0.7rem] text-black/55">Dine-in evaluation · approx. 45 min</p>
        <dl className="mt-4 space-y-2.5 text-[0.72rem]">
          {[
            [Clock, "Window", "Mon – Fri · 11am–2pm"],
            [ClipboardList, "Questions", "32 + photos"],
            [DollarSign, "Pay", "$18.00 + reimbursement"],
          ].map(([Icon, k, v]) => {
            const I = Icon as typeof Clock;
            return (
              <div key={k as string} className="flex items-center gap-2.5 rounded-lg bg-black/[0.04] px-3 py-2">
                <I aria-hidden className="size-3.5 text-[#1d7fc1]" />
                <dt className="font-semibold">{k as string}</dt>
                <dd className="ml-auto text-black/60">{v as string}</dd>
              </div>
            );
          })}
        </dl>
        <span className="mt-auto rounded-full bg-[#1d7fc1] py-2.5 text-center text-xs font-semibold text-white">Claim this shop</span>
      </div>
    );
  if (index === 2)
    return (
      <div className={shell}>
        <p className="text-[0.65rem] font-semibold text-black/50">Question 12 of 32</p>
        <div className="mt-2 h-1 rounded-full bg-black/10">
          <div className="h-full w-[38%] rounded-full bg-[#1d7fc1]" />
        </div>
        <p className="mt-5 text-sm font-bold leading-snug">Were you greeted within 30 seconds of entering?</p>
        <div className="mt-4 space-y-2 text-xs">
          {["Yes", "No"].map((o, i) => (
            <div key={o} className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 ${i === 0 ? "border-[#1d7fc1] bg-[#e9f3fb]" : "border-black/10"}`}>
              <span className={`size-3.5 rounded-full border-2 ${i === 0 ? "border-[#1d7fc1] bg-[#1d7fc1]" : "border-black/25"}`} />
              {o}
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs font-semibold">Overall cleanliness</p>
        <div className="mt-2 flex gap-1 text-[#f2b705]">
          {[0, 1, 2, 3, 4].map((s) => (
            <Star key={s} aria-hidden className={`size-5 ${s < 4 ? "fill-current" : ""}`} />
          ))}
        </div>
        <div className="mt-5 flex items-center gap-2 rounded-lg border border-dashed border-black/20 px-3 py-3 text-xs text-black/55">
          <Camera aria-hidden className="size-4" /> Add receipt photo
        </div>
      </div>
    );
  if (index === 3)
    return (
      <div className={`${shell} items-center text-center`}>
        <div className="mt-10 flex size-20 items-center justify-center rounded-full bg-[#e9f3fb]">
          <Upload aria-hidden className="size-8 text-[#1d7fc1]" />
        </div>
        <p className="mt-6 text-base font-bold">Ready to submit</p>
        <p className="mt-1 text-xs text-black/55">32 answers · 4 photos · 1 receipt</p>
        <div className="mt-6 w-full space-y-2 text-left text-xs">
          {["Answers complete", "Photos attached", "Visit time recorded"].map((t) => (
            <p key={t} className="flex items-center gap-2">
              <CheckCircle2 aria-hidden className="size-4 text-[#1f9d55]" /> {t}
            </p>
          ))}
        </div>
        <span className="mt-auto w-full rounded-full bg-[#1d7fc1] py-2.5 text-xs font-semibold text-white">Submit evaluation</span>
      </div>
    );
  return (
    <div className={shell}>
      <p className="text-base font-bold">My activity</p>
      <div className="mt-3 rounded-xl bg-[#1d7fc1] p-4 text-white">
        <p className="text-[0.65rem] opacity-80">Pending payments</p>
        <p className="mt-1 text-2xl font-bold">$54.00</p>
      </div>
      <ul className="mt-4 space-y-2 text-[0.72rem]">
        {[
          ["Downtown Café Visit", "Submitted"],
          ["Fuel station audit", "Approved"],
          ["Pharmacy check", "Scheduled"],
          ["Grocery price audit", "Paid"],
        ].map(([n, st]) => (
          <li key={n} className="flex items-center justify-between rounded-lg bg-black/[0.04] px-3 py-2.5">
            <span className="font-medium">{n}</span>
            <span className="text-black/55">{st}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
