import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { Reveal } from "@/components/shared/Reveal";
import { BUSINESS_SOLUTIONS } from "@/lib/constants/content/home";

/** Two oversized typographic entry points — the row itself is the link. */
export function BusinessSolutions() {
  return (
    <section aria-labelledby="business-title" className="relative py-24 lg:py-36">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <SectionLabel index="05">Solutions</SectionLabel>
            <Reveal>
              <h2 id="business-title" className="display mt-8 text-[clamp(2.6rem,5.5vw,5.2rem)] text-gold-100">
                {BUSINESS_SOLUTIONS.title}
              </h2>
            </Reveal>
          </div>
          <p className="max-w-sm text-mist">Choose the path that matches your organization. Each solution is powered by Q.</p>
        </div>

        <ul className="mt-16 border-t border-gold/20">
          {BUSINESS_SOLUTIONS.items.map((item) => (
            <li key={item.href} className="border-b border-gold/20">
              <Reveal>
                <Link
                  href={item.href}
                  className="group relative grid gap-8 overflow-hidden py-12 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-16"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-0 origin-left scale-x-0 bg-gold/[0.06] transition-transform duration-700 ease-[var(--ease-quint)] group-hover:scale-x-100"
                  />
                  <div className="relative lg:col-span-5">
                    <span className="eyebrow text-smoke">For {item.index === "A" ? "healthcare organizations" : "retail research & operations"}</span>
                    <h3 className="display mt-4 flex items-baseline gap-5 text-[clamp(2.75rem,6vw,5.5rem)] text-white transition-colors duration-500 group-hover:text-gold">
                      <span className="text-outline text-[0.6em] not-italic">{item.index}</span>
                      {item.name}
                    </h3>
                  </div>
                  <div className="relative lg:col-span-4">
                    <span className="block leading-relaxed text-mist">{item.value}</span>
                    <span className="mt-5 flex flex-wrap gap-2">
                      {item.audience.map((a) => (
                        <span key={a} className="rounded-full border border-gold/20 px-3 py-1 text-xs text-gold-100">
                          {a}
                        </span>
                      ))}
                    </span>
                  </div>
                  <span className="relative flex lg:col-span-3 lg:justify-end">
                    <span className="flex size-20 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-black lg:size-28">
                      <ArrowRight aria-hidden className="size-7 transition-transform duration-500 group-hover:-rotate-45" />
                    </span>
                    <span className="sr-only">Explore {item.name}</span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
