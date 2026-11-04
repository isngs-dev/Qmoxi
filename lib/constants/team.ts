// Team as published on https://www.qmoxi.com/aboutus — names, roles and photos unchanged.

export type TeamMember = {
  name: string;
  role: string;
  photo: string;
  width: number;
  height: number;
  /** CSS object-position for consistent head framing */
  focus?: string;
  leadership?: boolean;
  agent?: boolean;
};

export const TEAM: TeamMember[] = [
  { name: "Mike Mallett", role: "CEO", photo: "/images/team/mike-mallett.png", width: 880, height: 880, leadership: true },
  { name: "Paul Schmelzer", role: "President", photo: "/images/team/paul-schmelzer.png", width: 880, height: 880, leadership: true },
  { name: "Aaron Bostick", role: "Director of AI Strategies", photo: "/images/team/aaron-bostick.png", width: 880, height: 880 },
  { name: "Colt Miller", role: "IT Support Analyst", photo: "/images/team/colt-miller.png", width: 700, height: 500 },
  { name: "Tony Felos", role: "CISO", photo: "/images/team/tony-felos.png", width: 1663, height: 1188 },
  { name: "Q", role: "AI Agent", photo: "/images/team/q-ai-agent.png", width: 1225, height: 875, agent: true },
  { name: "Amy Braley", role: "Forward Development Engineer", photo: "/images/team/amy-braley.png", width: 1024, height: 1024 },
  { name: "Rodrigo Vieira", role: "Senior Cloud and Platform Engineer", photo: "/images/team/rodrigo-vieira.png", width: 1231, height: 1277 },
  { name: "Marco Bukovac", role: "VP Software Development", photo: "/images/team/marco-bukovac.jpg", width: 1408, height: 1408 },
  { name: "Matt DeChellis", role: "Forward Development Engineer", photo: "/images/team/matt-dechellis.png", width: 1200, height: 1600, focus: "50% 20%" },
  { name: "Tony Felos Jr.", role: "Forward Development Engineer", photo: "/images/team/tony-felos-jr.jpg", width: 1408, height: 1408 },
  { name: "Rob Swalley", role: "Director of Global Support Operations", photo: "/images/team/rob-swalley.jpg", width: 1184, height: 1664, focus: "50% 20%" },
];
