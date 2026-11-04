// One-off downloader for the original Qmoxi brand assets (hosted on Wix).
// Run with: node scripts/fetch-assets.mjs
// Originals are fetched without Wix transforms; Next.js <Image> handles resizing + AVIF/WebP.
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const BASE = "https://static.wixstatic.com/media/";

/** [wix media id, local path under public/images] */
const ASSETS = [
  ["d47ada_9dcc7984d252454f88b9bbc8cf238448~mv2.jpg", "brand/qmoxi-logo.jpg"],

  ["3dee42_ad4b36ad28df46fe98a2352307d68427~mv2.png", "team/mike-mallett.png"],
  ["3dee42_1ba259a173004e4d98ee8e662d4ee83a~mv2.png", "team/paul-schmelzer.png"],
  ["3dee42_3727b5a9292e47df85a201654afe6c52~mv2.png", "team/aaron-bostick.png"],
  ["3dee42_b80f43e55c19442c8b5f60005562a5ca~mv2.png", "team/colt-miller.png"],
  ["3dee42_2cfd70c9054149aa8fb4b8c19d95e259~mv2.png", "team/tony-felos.png"],
  ["d47ada_fa333c57844d43b4bb8d951fd9337214~mv2.png", "team/q-ai-agent.png"],
  ["d47ada_082dd01ef154431abfc3d71690b51a47~mv2.png", "team/amy-braley.png"],
  ["d47ada_9729e6f2e8504bcb8a65a760cb9a7725~mv2.png", "team/rodrigo-vieira.png"],
  ["d47ada_7be491c4edc648f594ce5eecefd59426~mv2.jpg", "team/marco-bukovac.jpg"],
  ["d47ada_cffb7f0304f84aec9146ca3637bffbb1~mv2.png", "team/matt-dechellis.png"],
  ["d47ada_61abb34ad9024e77901b8496c66f56e7~mv2.jpg", "team/tony-felos-jr.jpg"],
  ["d47ada_f45b2d64ecb3448caeb66079448cc36a~mv2.jpg", "team/rob-swalley.jpg"],

  ["3dee42_a8abf04ded9941fd8c6456f2a841c7fd~mv2.png", "retail/prestoshopper-app-screen.png"],
  ["d47ada_c93b7f36c7254459a9fed8a7e4d32a21~mv2.jpg", "retail/presto-mall-shopper.jpg"],
  ["d47ada_ad53b485e1ca4773be0c4a7b610e52c9~mv2.png", "retail/q-sdk-convenience-store.png"],
  ["d47ada_70e8f3cbd4c84cffa329311be60e43f0~mv2.jpg", "retail/end-brands.jpg"],

  ["3dee42_52549377998b416aa9ce5c7eed8363fc~mv2.png", "about/mission.png"],
  ["3dee42_1628dd00c99b4d619177456eedeaafab~mv2.png", "about/vision.png"],
];

const root = join(process.cwd(), "public", "images");

for (const [id, out] of ASSETS) {
  const res = await fetch(BASE + id);
  if (!res.ok) {
    console.error(`FAILED ${res.status} ${id}`);
    process.exitCode = 1;
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const dest = join(root, out);
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  console.log(`ok  ${out}  ${(buf.length / 1024).toFixed(0)} KB`);
}
