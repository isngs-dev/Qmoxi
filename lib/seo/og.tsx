import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/** Branded Open Graph card: black ground, gold emblem, page title. */
export async function renderOg({ eyebrow, title }: { eyebrow: string; title: string }) {
  const emblem = await readFile(join(process.cwd(), "public/images/brand/qmoxi-emblem.png"));
  const src = `data:image/png;base64,${emblem.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000",
          backgroundImage: "linear-gradient(90deg, #000 55%, rgba(212,175,55,0.35) 100%)",
          padding: "64px 72px",
          color: "#F6EDD0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img src={src} width={92} height={92} style={{ borderRadius: 999 }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 40, color: "#D4AF37" }}>Qmoxi</span>
            <span style={{ fontSize: 18, letterSpacing: 4, color: "#BDB8AA", textTransform: "uppercase" }}>AI software innovator</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 22, letterSpacing: 5, color: "#D4AF37", textTransform: "uppercase" }}>{eyebrow}</span>
          <span style={{ fontSize: 64, lineHeight: 1.08, marginTop: 18, maxWidth: 980 }}>{title}</span>
        </div>
        <div style={{ display: "flex", height: 2, width: "100%", background: "linear-gradient(90deg, #D4AF37, rgba(212,175,55,0))" }} />
      </div>
    ),
    OG_SIZE,
  );
}
