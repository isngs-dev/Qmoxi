import type { Metadata } from "next";
import { SITE, SITE_URL } from "@/lib/constants/site";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

/** Per-page metadata: unique title/description, canonical, Open Graph and X cards. */
export function buildMetadata({ title, description, path, keywords }: PageSeo): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url,
      siteName: SITE.name,
      title,
      description,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export const PAGE_SEO = {
  home: {
    title: "Qmoxi | Intelligent AI Customer Engagement Solutions",
    description:
      "Intelligent customer service powered by Q, the conversational AI agent that replaces legacy IVR and automates customer engagement for healthcare and retail.",
    path: "/",
    keywords: [
      "intelligent customer service",
      "conversational AI",
      "IVR replacement",
      "customer engagement automation",
      "AI agent",
    ],
  },
  healthcare: {
    title: "Qmoxi Healthcare | AI-Powered Patient Engagement and Intelligent Telephony",
    description:
      "Replace legacy IVR with AI-powered patient engagement. Q automates patient calls, appointment scheduling, routing and intake with secure AI telephony.",
    path: "/qmoxihealthcare",
    keywords: [
      "AI-powered patient engagement",
      "healthcare automation",
      "AI telephony",
      "IVR replacement for healthcare",
      "patient access",
      "appointment scheduling AI",
    ],
  },
  retail: {
    title: "Qmoxi Retail | Mystery Shopping and Audit Management Software",
    description:
      "Mystery shopping software for MSPs and brands: program management, shopper scheduling, PrestoShopper mobile audits, payments and white-label platforms.",
    path: "/retail",
    keywords: [
      "mystery shopping software",
      "retail audit management",
      "shopper management software",
      "mystery shopping platform",
      "white-label mystery shopping software",
      "PrestoShopper",
    ],
  },
  about: {
    title: "About Qmoxi | Intelligent Technology and Software Innovation",
    description:
      "Founded in 2001, Qmoxi builds secure, scalable conversational AI and connected software for healthcare and retail. Meet the team behind Q and the Qmoxi platform.",
    path: "/aboutus",
    keywords: ["Qmoxi", "conversational AI company", "Findlay Ohio software company", "Qmoxi team"],
  },
  contact: {
    title: "Contact Qmoxi | Request a Product Demonstration",
    description:
      "Talk to Qmoxi about AI patient engagement, mystery shopping software or conversational AI. Request a personalized demo or reach our team in Findlay, Ohio.",
    path: "/contact",
    keywords: ["Qmoxi demo", "contact Qmoxi", "conversational AI demo", "mystery shopping software demo"],
  },
  privacy: {
    title: "Privacy Policy | Qmoxi",
    description: "How Qmoxi collects, uses, and protects information received from visitors to qmoxi.com.",
    path: "/privacy-policy",
  },
  accessibility: {
    title: "Accessibility Statement | Qmoxi",
    description:
      "Qmoxi's commitment to an accessible website, the standards we work toward, and how to request assistance.",
    path: "/accessibility-statement",
  },
} satisfies Record<string, PageSeo>;
