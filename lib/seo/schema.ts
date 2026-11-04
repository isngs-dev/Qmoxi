import { CONTACT, SITE, SITE_URL } from "@/lib/constants/site";

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    url: SITE_URL,
    logo: `${SITE_URL}${SITE.logo}`,
    description: SITE.description,
    foundingDate: String(SITE.foundingYear),
    email: CONTACT.email,
    telephone: CONTACT.phoneE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.street,
      addressLocality: CONTACT.city,
      addressRegion: CONTACT.region,
      postalCode: CONTACT.postalCode,
      addressCountry: CONTACT.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: CONTACT.phoneE164,
      email: CONTACT.email,
      areaServed: "US",
      availableLanguage: "English",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    name: SITE.name,
    url: SITE_URL,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? SITE_URL : `${SITE_URL}${item.path}`,
    })),
  };
}

export function softwareApplicationSchema(app: {
  name: string;
  description: string;
  path: string;
  category: string;
  operatingSystem?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.description,
    url: `${SITE_URL}${app.path}`,
    applicationCategory: app.category,
    operatingSystem: app.operatingSystem ?? "Web",
    publisher: { "@id": ORG_ID },
  };
}

export function webPageSchema(type: "AboutPage" | "ContactPage", page: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name: page.name,
    description: page.description,
    url: `${SITE_URL}${page.path}`,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
  };
}
