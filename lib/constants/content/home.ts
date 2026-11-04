// Home page copy. Source of truth: https://www.qmoxi.com/ (wording preserved or lightly tightened).

export const HOME_HERO = {
  eyebrow: "AI software innovator · Since 2001",
  lines: ["Intelligent Customer Service.", "Inspired by Innovation.", "Driven by Q."],
  body: "Qmoxi transforms customer and patient engagement through intelligent conversational AI, automation, and connected enterprise technology.",
  primary: { label: "Explore Our Solutions", href: "#solutions" },
  secondary: { label: "Discover Q", href: "#meet-q" },
  facts: [
    { k: "Founded", v: "2001" },
    { k: "Markets", v: "Healthcare & Retail" },
    { k: "Powered by", v: "Q, the AI agent" },
  ],
};

export const SOLUTIONS = {
  title: "One Intelligent Platform. Built for Healthcare and Retail.",
  intro: "Qmoxi is an AI-forward software platform built to serve both retail and healthcare markets.",
  healthcare: {
    name: "Qmoxi Healthcare",
    statement: "Replace legacy IVR. Improve access to care.",
    body: "Qmoxi Healthcare replaces legacy IVR and patient access systems with intelligent AI. Powered by Q, healthcare organizations can automate patient calls, improve access to care, and streamline operations while reducing administrative burden.",
    capabilities: [
      "Intelligent patient communication",
      "AI-powered call automation",
      "Appointment scheduling",
      "Patient access and engagement",
      "Healthcare system integrations",
    ],
    cta: { label: "Explore Healthcare", href: "/qmoxihealthcare" },
  },
  retail: {
    name: "Qmoxi Retail",
    statement: "Run the entire mystery shopping operation.",
    body: "Qmoxi Retail is mystery shopping and auditing software for MSPs and the brands they serve. Run programs, schedule shoppers, collect mobile audits, pay contractors, and brand the platform as your own.",
    upcoming: "AI scheduling and 24/7 agent support launching December 2026.",
    capabilities: [
      "Mystery shopping and auditing software",
      "Program management",
      "Shopper scheduling",
      "Mobile data collection",
      "Private-label platforms",
      "AI-powered retail operations",
    ],
    cta: { label: "Explore Retail", href: "/retail" },
  },
};

export const MEET_Q = {
  title: "Meet Q. The Intelligence Behind Every Interaction.",
  intro:
    "Q is the intelligent conversational agent powering the Qmoxi platform, designed to automate interactions and replace legacy engagement systems.",
  questions: [
    {
      q: "What if callers could simply speak instead of navigating phone menus?",
      a: "Q replaces outdated IVR systems with advanced AI that interprets user intent instantly and delivers precise, efficient responses.",
      stage: 1,
    },
    {
      q: "What if your systems could work together seamlessly?",
      a: "Q works seamlessly with your existing systems to access information and automate workflows in real time.",
      stage: 2,
    },
    {
      q: "What if routine calls could be handled automatically?",
      a: "Q answers questions, routes requests, and completes tasks without requiring manual intervention.",
      stage: 3,
    },
    {
      q: "What if every interaction was faster, smarter, and more efficient?",
      a: "Q improves access, reduces operational burden, and delivers better customer and patient experiences at scale.",
      stage: 4,
    },
  ],
  capabilities: [
    "Natural language conversations",
    "Intelligent call handling",
    "Automated customer interactions",
    "Intelligent routing",
    "Integration with existing business systems",
    "Workflow automation",
    "24/7 availability",
  ],
};

export const HOW_Q_WORKS = {
  title: "How Q Works",
  intro: "From the first word to a finished task — one continuous, connected flow.",
  steps: [
    {
      title: "A conversation begins",
      body: "A customer or patient calls and simply says what they need. No menus, no keypad trees, no waiting for the right option.",
    },
    {
      title: "Q understands the request",
      body: "Q interprets intent from natural language, asks clarifying questions when needed, and collects the details required to help.",
    },
    {
      title: "Q connects to your systems",
      body: "Q accesses the relevant information in your existing platforms — retrieving data and posting updates in real time.",
    },
    {
      title: "Q completes the action — or routes it",
      body: "Q completes the requested task, or directs the interaction to the right person or workflow with the context already captured.",
    },
    {
      title: "Your organization runs leaner",
      body: "Routine interactions are handled automatically, so teams spend their time where it matters most — a more efficient, streamlined workflow.",
    },
  ],
};

export const ENTERPRISE = {
  title: "Built for Reliability, Security, and Scale.",
  intro:
    "Qmoxi is designed for organizations that require secure, reliable, and scalable engagement solutions. Q works with your existing systems, eliminating time-consuming development and integrations.",
  pillars: [
    {
      title: "Secure and Reliable",
      body: "Qmoxi is built with enterprise-grade security and reliability at its core, ensuring customer and patient interactions are handled safely and consistently.",
    },
    {
      title: "Integrates with Your Systems",
      body: "Q connects directly with your existing platforms, allowing you to automate workflows, retrieve information, and improve efficiency without replacing your infrastructure.",
    },
    {
      title: "Scalable by Design",
      body: "From growing organizations to enterprise environments, Qmoxi scales effortlessly to handle high interaction volumes while maintaining speed and performance.",
    },
    {
      title: "Operational Efficiency",
      body: "Q handles routine interactions without manual intervention, reducing operational burden and freeing teams to focus on higher-value work.",
    },
  ],
};

export const BUSINESS_SOLUTIONS = {
  title: "Two markets. One intelligent platform.",
  items: [
    {
      index: "A",
      name: "Qmoxi Healthcare",
      href: "/qmoxihealthcare",
      audience: ["Hospitals", "Healthcare providers", "Medical organizations", "Patient access departments", "Healthcare administrators"],
      value:
        "Replace legacy IVR and patient access systems with Q — automate patient calls, improve access to care, and reduce administrative burden.",
    },
    {
      index: "B",
      name: "Qmoxi Retail",
      href: "/retail",
      audience: ["Mystery shopping providers", "Market research companies", "Retail brands", "Retail operations teams", "Customer experience teams", "Program managers"],
      value:
        "Run programs, schedule shoppers, collect mobile audits, pay contractors, and put your own brand on the entire experience.",
    },
  ],
};

export const HOME_CTA = {
  eyebrow: "Request a demo",
  title: "Ready to Transform the Way Your Organization Connects?",
  body: "See how Qmoxi and Q can transform customer and patient engagement. Our team will walk you through the platform and show how Q integrates with your existing systems to deliver faster, smarter engagement.",
};
