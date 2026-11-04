import type { Metadata } from "next";
import { RetailHero } from "@/components/retail/RetailHero";
import { HowRetailWorks } from "@/components/retail/HowRetailWorks";
import { ScaleStats } from "@/components/retail/ScaleStats";
import { PrestoShopperApp } from "@/components/retail/PrestoShopperApp";
import { QSdk } from "@/components/retail/QSdk";
import { RetailFeatures } from "@/components/retail/RetailFeatures";
import { AiRetailOps } from "@/components/retail/AiRetailOps";
import { CtaBand } from "@/components/shared/CtaBand";
import { JsonLd } from "@/components/shared/JsonLd";
import { RT_CTA } from "@/lib/constants/content/retail";
import { DEMO_RETAIL_HREF, EXTERNAL } from "@/lib/constants/site";
import { buildMetadata, PAGE_SEO } from "@/lib/seo/metadata";
import { breadcrumbSchema, softwareApplicationSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata(PAGE_SEO.retail);

export default function RetailPage() {
  return (
    <>
      <RetailHero />
      <HowRetailWorks />
      <ScaleStats />
      <PrestoShopperApp />
      <QSdk />
      <RetailFeatures />
      <AiRetailOps />
      <CtaBand
        variant="frame"
        eyebrow={RT_CTA.eyebrow}
        title={RT_CTA.title}
        body={RT_CTA.body}
        primary={{ label: "Book a Retail Demo", href: DEMO_RETAIL_HREF }}
        secondary={{ label: "Explore PrestoShopper", href: EXTERNAL.prestoShopper, external: true }}
      />
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Qmoxi Retail", path: "/retail" }]),
          softwareApplicationSchema({
            name: "Qmoxi Retail",
            description:
              "Mystery shopping and audit management software for MSPs and brands: program management, shopper scheduling, mobile data collection, contractor payments and white-label Private Platforms.",
            path: "/retail",
            category: "BusinessApplication",
          }),
          {
            ...softwareApplicationSchema({
              name: "PrestoShopper",
              description:
                "Mobile app for mystery shoppers to sign up, claim work, complete visits, collect field data and get paid from the phone.",
              path: "/retail",
              category: "BusinessApplication",
              operatingSystem: "Mobile",
            }),
            sameAs: EXTERNAL.prestoShopper,
          },
        ]}
      />
    </>
  );
}
