import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { Solutions } from "@/components/home/Solutions";
import { MeetQ } from "@/components/home/MeetQ";
import { HowQWorks } from "@/components/home/HowQWorks";
import { EnterpriseReady } from "@/components/home/EnterpriseReady";
import { BusinessSolutions } from "@/components/home/BusinessSolutions";
import { CtaBand } from "@/components/shared/CtaBand";
import { SignalLine } from "@/components/shared/SignalLine";
import { Container } from "@/components/layout/Container";
import { HOME_CTA } from "@/lib/constants/content/home";
import { DEMO_HREF } from "@/lib/constants/site";
import { buildMetadata, PAGE_SEO } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata(PAGE_SEO.home);

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Container>
        <SignalLine />
      </Container>
      <Solutions />
      <MeetQ />
      <HowQWorks />
      <EnterpriseReady />
      <BusinessSolutions />
      <CtaBand
        variant="white"
        eyebrow={HOME_CTA.eyebrow}
        title={HOME_CTA.title}
        body={HOME_CTA.body}
        primary={{ label: "Request a Demo", href: DEMO_HREF }}
      />
    </>
  );
}
