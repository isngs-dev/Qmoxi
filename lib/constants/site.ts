export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.qmoxi.com").replace(/\/$/, "");

export const SITE = {
  name: "Qmoxi",
  legalName: "Qmoxi",
  tagline: "AI software innovator",
  foundingYear: 2001,
  description:
    "Qmoxi is an AI-forward software company building intelligent conversational agents that replace outdated IVR systems and transform customer and patient engagement across healthcare and retail.",
  shortDescription:
    "An AI-forward software platform serving healthcare and retail — powered by Q, the intelligent conversational agent that replaces legacy IVR.",
  copyright: "© 2001 - 2026 Qmoxi. All Rights Reserved.",
  logo: "/images/brand/qmoxi-logo-lockup.jpg",
  emblem: "/images/brand/qmoxi-emblem.png",
} as const;

export const CONTACT = {
  street: "401 S Main St.",
  city: "Findlay",
  region: "OH",
  postalCode: "45840",
  country: "US",
  phoneDisplay: "(419) 306-5532",
  phoneHref: "tel:+14193065532",
  phoneE164: "+1-419-306-5532",
  email: "brad.holdgreve@qmoxi.com",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=401+S+Main+St+Findlay+OH+45840",
  mapsEmbedUrl: "https://maps.google.com/maps?q=401%20S%20Main%20St%2C%20Findlay%2C%20OH%2045840&z=16&output=embed",
} as const;

export const EXTERNAL = {
  prestoShopper: "https://liveshopper.com/prestoshopper-app/",
  qSdk: "https://liveshopper.wpengine.com/?page_id=32",
  soc2: "https://liveshopper.com/soc-2-compliance/",
  iso27001: "https://liveshopper.com/liveshopper-is-officially-iso-27001-certified/",
  confusedCallerVideo: "https://player.vimeo.com/video/1226394946?h=a6b50474dd#t=165s",
} as const;

export const DEMO_HREF = "/contact?interest=demo";
export const DEMO_HEALTHCARE_HREF = "/contact?interest=healthcare-demo";
export const DEMO_RETAIL_HREF = "/contact?interest=retail-demo";
