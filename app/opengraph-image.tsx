import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/seo/og";

export const alt = "Qmoxi — Intelligent AI customer engagement";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({ eyebrow: "Intelligent customer service", title: "Intelligent Customer Service. Inspired by Innovation. Driven by Q." });
}
