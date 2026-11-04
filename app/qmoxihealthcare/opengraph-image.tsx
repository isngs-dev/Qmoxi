import { OG_CONTENT_TYPE, OG_SIZE, renderOg } from "@/lib/seo/og";

export const alt = "Qmoxi Healthcare — AI-powered patient engagement";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({ eyebrow: "Qmoxi Healthcare", title: "Replace Legacy IVR with Intelligent Patient Engagement." });
}
