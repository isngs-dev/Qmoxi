import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/seo/og";

export const alt = "About Qmoxi";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({ eyebrow: "About Qmoxi", title: "Built on Experience. Focused on the Future." });
}
