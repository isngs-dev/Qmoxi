import { NextResponse } from "next/server";
import { contactSchema, type ContactData, type ContactResponse } from "@/lib/validation/contact";
import { CONTACT } from "@/lib/constants/site";

/**
 * Contact / demo-request endpoint.
 *
 * Delivery is configured with environment variables (see .env.example):
 *  - RESEND_API_KEY (+ CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL) → sends an email via Resend
 *  - CONTACT_WEBHOOK_URL (+ optional CONTACT_WEBHOOK_SECRET) → POSTs JSON to a CRM / automation webhook
 * If neither is configured the endpoint returns 503 `not_configured` — it never pretends to succeed.
 */

const MIN_FILL_MS = 3000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
// Best-effort, per-instance rate limit. Use a shared store (e.g. Redis) for multi-instance deployments.
const hits = new Map<string, number[]>();

function json(body: ContactResponse, status: number) {
  return NextResponse.json(body, { status });
}

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function summary(d: ContactData) {
  return [
    ["Name", d.fullName],
    ["Email", d.email],
    ["Company", d.company],
    ["Phone", d.phone || "—"],
    ["Industry", d.industry],
    ["Area of interest", d.interest],
  ] as const;
}

async function sendEmail(d: ContactData) {
  const key = process.env.RESEND_API_KEY!;
  const to = process.env.CONTACT_TO_EMAIL || CONTACT.email;
  const from = process.env.CONTACT_FROM_EMAIL || "Qmoxi Website <onboarding@resend.dev>";
  const rows = summary(d);
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${d.message}`;
  const html = `<h2 style="font-family:sans-serif">New inquiry from qmoxi.com</h2><table style="font-family:sans-serif;font-size:14px">${rows
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td>${escape(v)}</td></tr>`)
    .join("")}</table><p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escape(d.message)}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      reply_to: d.email,
      subject: `${d.interest} — ${d.company} (${d.fullName})`,
      text,
      html,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}`);
}

async function sendWebhook(d: ContactData) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.CONTACT_WEBHOOK_SECRET) headers.Authorization = `Bearer ${process.env.CONTACT_WEBHOOK_SECRET}`;
  const res = await fetch(process.env.CONTACT_WEBHOOK_URL!, {
    method: "POST",
    headers,
    body: JSON.stringify({
      source: "qmoxi.com/contact",
      submittedAt: new Date().toISOString(),
      fullName: d.fullName,
      email: d.email,
      company: d.company,
      phone: d.phone,
      industry: d.industry,
      interest: d.interest,
      message: d.message,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, code: "invalid", message: "Invalid request." }, 400);
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    // A filled honeypot fails validation too; respond generically either way.
    return json({ ok: false, code: "invalid", message: "Please check the highlighted fields and try again." }, 400);
  }
  const data = parsed.data;

  if (Date.now() - data.startedAt < MIN_FILL_MS) {
    return json({ ok: false, code: "too_fast", message: "That was quick! Please take a moment to review the form and submit again." }, 422);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return json({ ok: false, code: "rate_limited", message: "Too many submissions. Please try again in a few minutes." }, 429);
  }

  const channels: Array<() => Promise<void>> = [];
  if (process.env.RESEND_API_KEY) channels.push(() => sendEmail(data));
  if (process.env.CONTACT_WEBHOOK_URL) channels.push(() => sendWebhook(data));

  if (channels.length === 0) {
    console.error("[contact] No delivery channel configured. Set RESEND_API_KEY and/or CONTACT_WEBHOOK_URL.");
    return json(
      {
        ok: false,
        code: "not_configured",
        message: `Online submissions aren't available right now. Please email ${CONTACT.email} or call ${CONTACT.phoneDisplay}.`,
      },
      503,
    );
  }

  const results = await Promise.allSettled(channels.map((send) => send()));
  results.forEach((r) => r.status === "rejected" && console.error("[contact] delivery failed:", r.reason));
  if (!results.some((r) => r.status === "fulfilled")) {
    return json(
      {
        ok: false,
        code: "delivery_failed",
        message: `We couldn't send your message. Please try again, or email ${CONTACT.email}.`,
      },
      502,
    );
  }
  return json({ ok: true }, 200);
}
