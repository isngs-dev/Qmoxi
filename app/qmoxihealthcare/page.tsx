import type { Metadata } from "next";
import { HealthcareHero } from "@/components/healthcare/HealthcareHero";
import { Benefits } from "@/components/healthcare/Benefits";
import { Challenges } from "@/components/healthcare/Challenges";
import { MeetQHealthcare } from "@/components/healthcare/MeetQHealthcare";
import { FeaturesBento } from "@/components/healthcare/FeaturesBento";
import { SchedulingFlow } from "@/components/healthcare/SchedulingFlow";
import { TriageFlow } from "@/components/healthcare/TriageFlow";
import { SecurityCompliance } from "@/components/healthcare/SecurityCompliance";
import { CtaBand } from "@/components/shared/CtaBand";
import { JsonLd } from "@/components/shared/JsonLd";
import { HC_CTA } from "@/lib/constants/content/healthcare";
import { DEMO_HEALTHCARE_HREF } from "@/lib/constants/site";
import { buildMetadata, PAGE_SEO } from "@/lib/seo/metadata";
import { breadcrumbSchema, softwareApplicationSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata(PAGE_SEO.healthcare);

export default function HealthcarePage() {
  return (
    <>
      <HealthcareHero />
      <Benefits />
      <Challenges />
      <MeetQHealthcare />
      <FeaturesBento />
      <SchedulingFlow />
      <TriageFlow />
      <SecurityCompliance />
      <CtaBand
        variant="signal"
        eyebrow={HC_CTA.eyebrow}
        title={HC_CTA.title}
        body={HC_CTA.body}
        primary={{ label: "Schedule a Healthcare Demo", href: DEMO_HEALTHCARE_HREF }}
        secondary={{ label: "Explore Qmoxi Retail", href: "/retail" }}
      />
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Qmoxi Healthcare", path: "/qmoxihealthcare" }]),
          softwareApplicationSchema({
            name: "Qmoxi Healthcare",
            description:
              "AI-powered patient engagement and intelligent telephony that replaces legacy IVR: automated patient calls, appointment scheduling, triage and routing, and patient intake, powered by Q.",
            path: "/qmoxihealthcare",
            category: "BusinessApplication",
          }),
        ]}
      />
    </>
  );
}
