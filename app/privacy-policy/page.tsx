import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/LegalPage";
import { JsonLd } from "@/components/shared/JsonLd";
import { PRIVACY } from "@/lib/constants/content/legal";
import { buildMetadata, PAGE_SEO } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata(PAGE_SEO.privacy);

export default function PrivacyPolicyPage() {
  return (
    <>
      <LegalPage eyebrow="Legal" title={PRIVACY.title} meta={PRIVACY.updated} blocks={PRIVACY.blocks} />
      <JsonLd data={breadcrumbSchema([{ name: "Privacy Policy", path: "/privacy-policy" }])} />
    </>
  );
}
