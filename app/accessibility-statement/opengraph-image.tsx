import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/seo/og";

export const alt = "Qmoxi — Accessibility Statement";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({ eyebrow: "Legal", title: "Accessibility Statement" });
}
