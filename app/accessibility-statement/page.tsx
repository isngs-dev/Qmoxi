import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/LegalPage";
import { JsonLd } from "@/components/shared/JsonLd";
import { ACCESSIBILITY } from "@/lib/constants/content/legal";
import { buildMetadata, PAGE_SEO } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata(PAGE_SEO.accessibility);

export default function AccessibilityStatementPage() {
  return (
    <>
      <LegalPage eyebrow="Legal" title={ACCESSIBILITY.title} blocks={ACCESSIBILITY.blocks} />
      <JsonLd data={breadcrumbSchema([{ name: "Accessibility Statement", path: "/accessibility-statement" }])} />
    </>
  );
}
