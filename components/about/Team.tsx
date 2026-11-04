import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Reveal } from "@/components/shared/Reveal";
import { TEAM, type TeamMember } from "@/lib/constants/team";
import { cn } from "@/lib/utils/cn";

export function Team() {
  const leaders = TEAM.filter((t) => t.leadership);
  const rest = TEAM.filter((t) => !t.leadership);
  return (
    <section aria-labelledby="team-title" className="py-24 lg:py-36">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <SectionLabel index="04">Leadership & team</SectionLabel>
            <Reveal>
              <h2 id="team-title" className="display mt-8 text-[clamp(2.4rem,5vw,4.8rem)] text-gold-100">
                Our Team
              </h2>
            </Reveal>
          </div>
          <p className="max-w-sm text-mist">The people — and the AI agent — building Qmoxi Healthcare and Qmoxi Retail.</p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20">
          {leaders.map((m, i) => (
            <Reveal as="li" key={m.name} delay={i * 0.08}>
              <Profile member={m} large />
            </Reveal>
          ))}
        </ul>
        <ul className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {rest.map((m, i) => (
            <Reveal as="li" key={m.name} delay={(i % 5) * 0.06}>
              <Profile member={m} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function Profile({ member, large }: { member: TeamMember; large?: boolean }) {
  return (
    <figure className="group relative">
      <div
        className={cn(
          "relative overflow-hidden rounded-[1.25rem] bg-ink-800",
          large ? "aspect-[5/4] sm:aspect-[4/3]" : "aspect-[4/5]",
          member.agent && "ring-1 ring-gold",
        )}
      >
        <Image
          src={member.photo}
          alt={`${member.name}, ${member.role}`}
          fill
          sizes={large ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw"}
          className="object-cover transition-transform duration-700 ease-[var(--ease-quint)] group-hover:scale-[1.04]"
          style={{ objectPosition: member.focus ?? "50% 25%" }}
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
        <span
          aria-hidden
          className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[var(--ease-quint)] group-hover:scale-x-100"
        />
        {member.agent && (
          <span className="eyebrow absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-[0.55rem] text-black">AI agent</span>
        )}
      </div>
      <figcaption className="mt-4">
        <p className={cn("font-medium text-gold-100", large ? "display text-4xl" : "text-base")}>{member.name}</p>
        <p className={cn("mt-1 text-smoke", large ? "eyebrow text-gold" : "text-sm")}>{member.role}</p>
      </figcaption>
    </figure>
  );
}
