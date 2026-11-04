import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { BusinessInfo } from "@/components/contact/BusinessInfo";
import { JsonLd } from "@/components/shared/JsonLd";
import { Reveal } from "@/components/shared/Reveal";
import { CONTACT, DEMO_HEALTHCARE_HREF, DEMO_RETAIL_HREF } from "@/lib/constants/site";
import { buildMetadata, PAGE_SEO } from "@/lib/seo/metadata";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata(PAGE_SEO.contact);

export default function ContactPage() {
  return (
    <>
      <section className="grain relative overflow-hidden pb-16 pt-[calc(var(--header-h)+4rem)] lg:pb-20">
        <div aria-hidden className="hairline-grid mask-fade-b pointer-events-none absolute inset-0 opacity-60" />
        <Container className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow flex animate-rise items-center gap-3 text-gold">
              <span className="h-px w-8 bg-gold/60" /> Contact
            </p>
            <h1 className="display mt-8 animate-rise text-[clamp(3.2rem,8vw,8rem)] text-gold-100 [animation-delay:.1s]">
              Let’s Start a <em className="text-metal">Conversation.</em>
            </h1>
          </div>
          <div className="animate-rise space-y-6 [animation-delay:.2s] lg:col-span-4">
            <p className="text-lg leading-relaxed text-mist">
              Whether you’re exploring Qmoxi for healthcare, retail, or enterprise AI solutions, our team is ready to help.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <a href={CONTACT.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-2 text-gold-100 hover:border-gold">
                <Phone aria-hidden className="size-4 text-gold" /> {CONTACT.phoneDisplay}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-2 text-gold-100 hover:border-gold">
                <Mail aria-hidden className="size-4 text-gold" /> Email us
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section id="form" aria-label="Contact form and business information" className="pb-24 lg:pb-32">
        <Container className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="min-h-[760px] rounded-[1.75rem] border border-gold/20 bg-ink-900" />}>
              <ContactForm />
            </Suspense>
          </div>
          <div className="lg:col-span-5">
            <BusinessInfo />
          </div>
        </Container>
      </section>

      {/* Alternative: go straight to a demo request */}
      <section aria-labelledby="demo-title" className="on-gold bg-gold text-black">
        <Container className="grid gap-10 py-20 lg:grid-cols-12 lg:items-center lg:py-24">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-black/70">Prefer to see it live?</p>
            <h2 id="demo-title" className="display mt-5 text-[clamp(2.4rem,5vw,4.6rem)]">
              Request a product demonstration.
            </h2>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-6">
            {[
              { href: `${DEMO_HEALTHCARE_HREF}#form`, title: "Healthcare demo", body: "Q for patient calls, scheduling, triage and intake." },
              { href: `${DEMO_RETAIL_HREF}#form`, title: "Retail demo", body: "Platform, PrestoShopper and Private Platform." },
            ].map((d) => (
              <Link
                key={d.title}
                href={d.href}
                scroll={false}
                className="group flex flex-col justify-between gap-8 rounded-2xl bg-black p-6 text-gold-100 transition-transform duration-500 hover:-translate-y-1"
              >
                <span>
                  <span className="block text-xl font-semibold text-gold">{d.title}</span>
                  <span className="mt-2 block text-sm text-mist">{d.body}</span>
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-semibold">
                  Start request <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Contact", path: "/contact" }]),
          webPageSchema("ContactPage", { name: PAGE_SEO.contact.title, description: PAGE_SEO.contact.description, path: "/contact" }),
        ]}
      />
    </>
  );
}
