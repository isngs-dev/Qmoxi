import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/seo/og";

export const alt = "Qmoxi Retail — mystery shopping and audit management software";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({ eyebrow: "Qmoxi Retail", title: "Run Smarter Mystery Shopping Programs. From One Connected Platform." });
}
