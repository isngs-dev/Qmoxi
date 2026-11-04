import { z } from "zod";

export const INDUSTRIES = [
  { value: "healthcare", label: "Healthcare" },
  { value: "retail", label: "Retail" },
  { value: "other", label: "Other" },
] as const;

export type Industry = (typeof INDUSTRIES)[number]["value"];

/** Area-of-interest options per industry. The first option of each list is the demo request. */
export const INTERESTS: Record<Industry, string[]> = {
  healthcare: [
    "Healthcare demo",
    "Replacing legacy IVR",
    "Appointment scheduling",
    "Smart triage and routing",
    "Patient intake",
    "Healthcare system integrations",
    "Something else",
  ],
  retail: [
    "Retail demo",
    "Qmoxi Platform (SASSIE + modern web)",
    "PrestoShopper",
    "Private Platform (white-label)",
    "Q SDK",
    "AI scheduling and 24/7 agent support",
    "Something else",
  ],
  other: ["Product demo", "Enterprise conversational AI", "Partnership", "General inquiry"],
};

export const contactSchema = z
  .object({
    fullName: z.string().trim().min(2, "Please enter your full name.").max(100, "That name is too long."),
    email: z.string().trim().min(1, "Please enter your business email.").email("Please enter a valid email address."),
    company: z.string().trim().min(2, "Please enter your company name.").max(120, "That company name is too long."),
    phone: z
      .string()
      .trim()
      .max(25, "That phone number is too long.")
      .refine((v) => v === "" || /^[+()\d\s.\-x]{7,25}$/.test(v), "Please enter a valid phone number.")
      .optional()
      .default(""),
    industry: z.enum(["healthcare", "retail", "other"], { error: "Please choose an industry." }),
    interest: z.string().min(1, "Please choose an area of interest."),
    message: z
      .string()
      .trim()
      .min(10, "Please tell us a little more (at least 10 characters).")
      .max(2000, "Please keep your message under 2,000 characters."),
    /** Honeypot — must stay empty. */
    website: z.string().max(0).optional().default(""),
    /** Time the form was rendered (ms epoch) — used as a time-trap. */
    startedAt: z.number().int().positive(),
  })
  .refine((d) => INTERESTS[d.industry].includes(d.interest), {
    path: ["interest"],
    message: "Please choose an area of interest.",
  });

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;

export type ContactResponse =
  | { ok: true }
  | { ok: false; code: "invalid" | "too_fast" | "rate_limited" | "not_configured" | "delivery_failed"; message: string };
