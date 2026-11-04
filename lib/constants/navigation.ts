export type NavItem = { label: string; href: string };

export const MAIN_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Healthcare", href: "/qmoxihealthcare" },
  { label: "Retail", href: "/retail" },
  { label: "About Us", href: "/aboutus" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_NAV: { title: string; items: NavItem[] }[] = [
  {
    title: "Solutions",
    items: [
      { label: "Qmoxi Healthcare", href: "/qmoxihealthcare" },
      { label: "Qmoxi Retail", href: "/retail" },
      { label: "Meet Q", href: "/#meet-q" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/aboutus" },
      { label: "Contact", href: "/contact" },
      { label: "Request a Demo", href: "/contact?interest=demo" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Accessibility Statement", href: "/accessibility-statement" },
    ],
  },
];

export function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
