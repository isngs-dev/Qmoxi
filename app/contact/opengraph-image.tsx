import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/seo/og";

export const alt = "Contact Qmoxi";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({ eyebrow: "Contact", title: "Let's Start a Conversation." });
}
