import { PhoneOutgoing } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { Emblem } from "@/components/shared/Logo";
import { Waveform } from "@/components/shared/Waveform";
import { HC_MEET_Q } from "@/lib/constants/content/healthcare";

const OUTBOUND = [
  { who: "Q", text: "Hello, this is Q calling on behalf of your care team about tomorrow's 9:00 appointment." },
  { who: "Patient", text: "Oh — I actually can't make it in the morning." },
  { who: "Q", text: "No problem. I can offer 2:30 tomorrow or 10:00 on Thursday." },
  { who: "Patient", text: "Thursday at 10 works." },
  { who: "Q", text: "Done. You're confirmed for Thursday at 10:00." },
];

export function MeetQHealthcare() {
  return (
    <section aria-labelledby="hc-meetq-title" className="on-light bg-ivory text-black">
      <Container className="grid gap-16 py-24 lg:grid-cols-12 lg:items-center lg:py-32">
        <div className="lg:col-span-6">
          <SectionLabel index="02" tone="dark" className="text-gold-800!">
            Meet Q
          </SectionLabel>
          <Reveal>
            <h2 id="hc-meetq-title" className="display mt-8 text-[clamp(2.6rem,5.5vw,5.2rem)]">
              Meet <em className="text-gold-800">Q</em> for Healthcare.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-black/75">{HC_MEET_Q.body}</p>
          </Reveal>
          <RevealGroup as="ul" className="mt-10 grid gap-x-8 sm:grid-cols-2">
            {HC_MEET_Q.items.map((item) => (
              <RevealItem as="li" key={item} className="flex gap-3 border-t border-black/15 py-3.5 text-[0.95rem]">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rotate-45 bg-gold-800" />
                {item}
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal variant="right" className="lg:col-span-6 lg:pl-8">
          <div className="relative rounded-[1.75rem] bg-black p-6 text-white shadow-[0_40px_80px_-40px_rgba(61,49,13,0.7)] sm:p-8">
            <div className="flex items-center justify-between gap-4 border-b border-gold/15 pb-5">
              <div className="flex items-center gap-3">
                <Emblem size={44} />
                <div>
                  <p className="text-sm font-semibold text-gold-100">Outbound call · Appointment confirmation</p>
                  <p className="eyebrow text-[0.58rem] text-smoke">Illustrative example</p>
                </div>
              </div>
              <PhoneOutgoing aria-hidden className="size-5 text-gold" />
            </div>
            <ol className="mt-6 space-y-4">
              {OUTBOUND.map((l, i) => (
                <li key={i} className="grid grid-cols-[4.5rem_1fr] gap-3">
                  <span className={`eyebrow pt-1 text-[0.6rem] ${l.who === "Q" ? "text-gold" : "text-smoke"}`}>{l.who}</span>
                  <span className={l.who === "Q" ? "text-gold-100" : "text-mist"}>{l.text}</span>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex items-center gap-4 rounded-2xl bg-white/[0.04] px-4 py-3">
              <Waveform bars={34} className="h-7 flex-1" />
              <span className="rounded-full bg-gold px-3 py-1 text-[0.7rem] font-semibold text-black">Rescheduled</span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
