// Retail page copy. Source of truth: https://www.qmoxi.com/retail
// Published figures are reproduced exactly — do not change them.

export const RT_HERO = {
  eyebrow: "Qmoxi Retail",
  tagline: "Mystery shopping and auditing software. Built for the people who run the programs.",
  title: "Run Smarter Mystery Shopping Programs. From One Connected Platform.",
  body: "Manage programs, schedule shoppers, collect field data, process payments, and deliver actionable insights through a connected retail research ecosystem.",
  context:
    "Qmoxi is the platform mystery shopping providers and retail program owners use to schedule work, collect field data, pay shoppers, report results, and — if they want — put their own brand on the entire experience.",
};

export const RT_COMPONENTS = [
  {
    id: "platform",
    letter: "A",
    name: "Qmoxi Platform",
    sub: "SASSIE + modern web",
    body: "The operating system for mystery shopping and audits: project setup, shopper eligibility, assignment, surveys, editing, reporting, and client delivery. Built so staff can start with little or no retraining.",
    pipeline: ["Project setup", "Shopper eligibility", "Assignment management", "Surveys", "Editing", "Reporting", "Client delivery"],
    notes: [
      { k: "Exclusive", v: "Custom work stays exclusive to that organization." },
      { k: "< 30 days", v: "Most enhancement requests complete in under 30 days." },
      { k: "Familiar", v: "Staff can start with little or no retraining." },
    ],
  },
  {
    id: "presto",
    letter: "B",
    name: "PrestoShopper",
    sub: "Mobile app for shoppers",
    body: "The mobile app used across the mystery shopping industry. Shoppers sign up, claim work, complete visits, and get paid from the phone. Supports high-volume, shorter evaluations and mapped full shops.",
    steps: ["Shopper registration", "Discover available assignments", "Claim shops", "Complete visits", "Mobile data collection", "Contractor payments"],
  },
  {
    id: "private",
    letter: "C",
    name: "Private Platform",
    sub: "White-label, powered by Qmoxi",
    body: "Your branded mystery shopping platform, powered by Qmoxi. Your logo, colors, domain, and company name sit in front. Promote it as your solution to win and keep clients.",
    yours: ["Custom company logo", "Custom colors", "Custom domain", "Branded shopper experience"],
    ours: ["Hosting", "Security", "Updates", "Presto payments", "Shopper support", "AI operations", "Technical infrastructure"],
    split: "Qmoxi runs the technical stack. You run clients and growth.",
  },
] as const;

export const RT_STATS = {
  title: "Trusted at industry scale.",
  intro:
    "PrestoShopper is used by over 150 mystery shopping and retail providers, 18,000 companies, and 3 million shoppers — supporting tens of millions of projects and over $60M annually in independent contractor payments.",
  items: [
    { value: 150, suffix: "+", label: "Mystery shopping & retail providers" },
    { value: 18000, suffix: "+", label: "Companies" },
    { value: 3, suffix: "M+", label: "Shoppers" },
    { text: "Tens of millions", label: "Projects supported" },
    { value: 60, prefix: "$", suffix: "M+", label: "Annual contractor payments" },
  ],
};

export const RT_PRESTO = {
  title: "PrestoShopper App",
  body: "Used by over 150 mystery shopping and retail providers, 18,000 companies, and 3 million shoppers — supporting tens of millions of projects and over $60M annually in independent contractor payments.",
};

export const RT_SDK = {
  title: "Q SDK",
  body: "Put Presto-like collection inside your own branded mobile app.",
  detail:
    "Bring PrestoShopper-style field data collection into an app your organization already owns, so shoppers and auditors stay inside your brand.",
};

export const RT_FEATURES = {
  title: "Retail Features Powered by Q",
  intro:
    "Explore the capabilities that enable Qmoxi Retail to power global research programs, automate customer engagement, and streamline retail operations through intelligent AI and enterprise SaaS platforms.",
  items: [
    { id: "geo", title: "Global Geofencing Technology", body: "Real-time location-based data collection across markets worldwide." },
    { id: "pm", title: "Mystery Shopping Program Management", body: "Comprehensive management tools for global mystery shopping initiatives." },
    { id: "lang", title: "Multilingual Deployment", body: "Deploy research and engagement programs across regions and languages." },
    { id: "analytics", title: "Real-Time Analytics", body: "Advanced dashboards and actionable data insights." },
  ],
} as const;

export const RT_AI = {
  title: "AI-Powered Retail Operations",
  body: "The mystery shopping and audit platform used by 150+ providers is now being extended with AI scheduling and the Q Agent — bringing the intelligence behind Qmoxi Healthcare to retail operations.",
  items: [
    {
      title: "AI scheduling",
      body: "Intelligent automation for matching and scheduling shoppers across programs.",
      status: "Launching December 2026",
    },
    {
      title: "24/7 agent support",
      body: "Q answers shopper and program questions around the clock.",
      status: "Launching December 2026",
    },
    {
      title: "AI operations",
      body: "Included with the Private Platform, alongside hosting, security, updates and shopper support.",
      status: "Part of Private Platform",
    },
  ],
};

export const RT_CTA = {
  eyebrow: "Qmoxi Retail",
  title: "Your Mystery Shopping Operations. Connected, Simplified, and Scalable.",
  body: "See the Qmoxi Platform, PrestoShopper and Private Platform working together — and how your programs could run on them.",
};
