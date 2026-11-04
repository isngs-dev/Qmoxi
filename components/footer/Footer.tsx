import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Emblem } from "@/components/shared/Logo";
import { FOOTER_NAV } from "@/lib/constants/navigation";
import { CONTACT, SITE } from "@/lib/constants/site";

/** Gold footer — carries the original site's gold ground forward, with an editorial structure. */
export function Footer() {
  return (
    <footer className="on-gold relative overflow-hidden bg-gold text-black" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Qmoxi site footer
      </h2>
      <Container className="relative pb-10 pt-20 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4">
              <Emblem size={64} alt="Qmoxi emblem" className="ring-1 ring-black/20" />
              <div>
                <p className="display text-4xl leading-none">Qmoxi</p>
                <p className="eyebrow mt-1 text-black/70">{SITE.tagline}</p>
              </div>
            </div>
            <p className="mt-8 max-w-md text-[0.95rem] leading-relaxed text-black/80">
              {SITE.shortDescription} Building software since {SITE.foundingYear}.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5">
            {FOOTER_NAV.map((group) => (
              <div key={group.title}>
                <p className="eyebrow text-black/70">{group.title}</p>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="link-underline text-[0.92rem] font-medium">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <address className="not-italic lg:col-span-3">
            <p className="eyebrow text-black/70">Contact</p>
            <div className="mt-5 space-y-3 text-[0.92rem] font-medium">
              <p>
                {CONTACT.street}
                <br />
                {CONTACT.city}, {CONTACT.region} {CONTACT.postalCode}
              </p>
              <p>
                <a href={CONTACT.phoneHref} className="link-underline">
                  {CONTACT.phoneDisplay}
                </a>
              </p>
              <p>
                <a href={`mailto:${CONTACT.email}`} className="link-underline break-all">
                  {CONTACT.email}
                </a>
              </p>
              <p>
                <a
                  href={CONTACT.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-black/70 hover:text-black"
                >
                  Get directions <ArrowUpRight aria-hidden className="size-3.5" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </p>
            </div>
          </address>
        </div>

        {/* Oversized wordmark — the brand's own line, set as typography */}
        <div aria-hidden className="mt-20 select-none border-t border-black/20 pt-6">
          <p className="display whitespace-nowrap text-[clamp(4.5rem,16vw,15rem)] leading-[0.85] tracking-[-0.04em] text-black">
            Driven by <span className="italic">Q</span>.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-black/20 pt-6 text-xs text-black/75 sm:flex-row sm:items-center sm:justify-between">
          <p>{SITE.copyright}</p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy-policy" className="link-underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/accessibility-statement" className="link-underline">
                Accessibility Statement
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
