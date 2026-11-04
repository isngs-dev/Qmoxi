import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants/site";

// Bump when page content changes materially.
const LAST_MODIFIED = "2026-11-04";

const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/qmoxihealthcare", priority: 0.9, changeFrequency: "monthly" },
  { path: "/retail", priority: 0.9, changeFrequency: "monthly" },
  { path: "/aboutus", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/accessibility-statement", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({
    url: r.path === "/" ? SITE_URL : `${SITE_URL}${r.path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
