import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { Story } from "@/components/about/Story";
import { MissionVision } from "@/components/about/MissionVision";
import { PoweredByQ } from "@/components/about/PoweredByQ";
import { WhyChoose } from "@/components/about/WhyChoose";
import { Team } from "@/components/about/Team";
import { CtaBand } from "@/components/shared/CtaBand";
import { JsonLd } from "@/components/shared/JsonLd";
import { AB_CTA } from "@/lib/constants/content/about";
import { buildMetadata, PAGE_SEO } from "@/lib/seo/metadata";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata(PAGE_SEO.about);

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Story />
      <MissionVision />
      <PoweredByQ />
      <WhyChoose />
      <Team />
      <CtaBand
        variant="ivory"
        eyebrow="Qmoxi"
        title={AB_CTA.title}
        body={AB_CTA.body}
        primary={{ label: "Explore Qmoxi Solutions", href: "/#solutions" }}
        secondary={{ label: "Contact us", href: "/contact" }}
      />
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "About Us", path: "/aboutus" }]),
          webPageSchema("AboutPage", { name: PAGE_SEO.about.title, description: PAGE_SEO.about.description, path: "/aboutus" }),
        ]}
      />
    </>
  );
}
