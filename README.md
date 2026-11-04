# Qmoxi website

Marketing site for Qmoxi, built with Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4, Motion, Lucide, React Hook Form and Zod.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/qmoxihealthcare` | Qmoxi Healthcare |
| `/retail` | Qmoxi Retail |
| `/aboutus` | About Us |
| `/contact` | Contact (supports `?interest=demo`, `healthcare-demo`, `retail-demo`) |
| `/privacy-policy`, `/accessibility-statement` | Legal pages |

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in a delivery channel (see below)
npm run dev                  # http://localhost:3000
```

Production: `npm run build && npm run start`.

## Contact form setup (required for live submissions)

`POST /api/contact` validates input with the same Zod schema as the form (`lib/validation/contact.ts`). It also checks a honeypot field and a minimum fill time, and applies a best-effort per-IP rate limit. It then delivers the inquiry through whichever channels are configured:

- **Email (Resend):** set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (on a domain verified in Resend) and optionally `CONTACT_TO_EMAIL` (default `brad.holdgreve@qmoxi.com`). Reply-To is set to the visitor's address.
- **Webhook / CRM:** set `CONTACT_WEBHOOK_URL` (and optionally `CONTACT_WEBHOOK_SECRET`, sent as a Bearer token). The endpoint receives JSON with `fullName, email, company, phone, industry, interest, message, submittedAt, source`.

If **no** channel is configured, the endpoint returns `503 not_configured`, and the form shows visitors the phone number and email address instead. It never shows a fake success. The rate limiter keeps its counts in memory, so on multi-instance or serverless hosting it only limits each instance separately. Use a shared store such as Redis or Upstash if you need strict limits.

## Project structure

```
app/                 routes, metadata files (sitemap, robots, OG images, icons), API route
components/
  layout/            Container, SectionLabel
  navigation/        Header (sticky, animated active pill, accessible mobile menu)
  footer/            Footer
  home|healthcare|retail|about|contact/   page sections
  shared/            Button, Reveal, Counter, SignalLine, Waveform, DeviceFrames, CtaBand, JsonLd, Logo, LegalPage
lib/
  constants/         site facts, navigation, team, page content (content/*.ts)
  seo/               metadata builder, JSON-LD builders, OG renderer
  validation/        contact form schema
  utils/             cn, usePrefersReducedMotion
styles/globals.css   design tokens (CSS variables via Tailwind @theme) and base styles
public/images/       original Qmoxi brand, team and product assets
scripts/fetch-assets.mjs   re-downloads original assets from the current site
```

## Brand tokens

The colors come from the live qmoxi.com site: gold `#D4AF37` on black `#000`, plus the black→gold gradient. All tints are derived from that gold and defined in `styles/globals.css`. Typography uses Google-hosted fonts that are close to the original licensed faces: Cormorant (display), Manrope (text) and JetBrains Mono (labels).

## Content

All copy is in `lib/constants/content/*.ts`, the team is in `lib/constants/team.ts`, and contact details and external links are in `lib/constants/site.ts`. Published figures (150+ providers, 18,000+ companies, 3M+ shoppers, tens of millions of projects, $60M+ annual contractor payments) and compliance references (HIPAA, SOC 2 Type II, ISO 27001) are reproduced exactly as they appear on the current site.
