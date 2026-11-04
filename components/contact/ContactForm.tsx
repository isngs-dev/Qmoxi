"use client";

import { useEffect, useId, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, useWatch, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, m } from "motion/react";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import {
  INDUSTRIES,
  INTERESTS,
  contactSchema,
  type ContactData,
  type ContactInput,
  type ContactResponse,
  type Industry,
} from "@/lib/validation/contact";
import { CONTACT } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";

type Status = { kind: "idle" } | { kind: "success" } | { kind: "error"; message: string };

/** Module-level so the React Compiler does not treat it as render-time work. */
const now = () => Date.now();

const PRESETS: Record<string, { industry?: Industry; demo: boolean }> = {
  demo: { demo: true },
  "healthcare-demo": { industry: "healthcare", demo: true },
  "retail-demo": { industry: "retail", demo: true },
};

export function ContactForm() {
  const params = useSearchParams();
  const preset = PRESETS[params.get("interest") ?? ""];
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const uid = useId();
  const statusId = `${uid}-status`;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput, unknown, ContactData>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      phone: "",
      industry: preset?.industry,
      interest: preset?.industry ? INTERESTS[preset.industry][0] : "",
      message: "",
      website: "",
      startedAt: 1,
    },
  });

  // Time-trap: record when the form became interactive.
  useEffect(() => {
    setValue("startedAt", now());
  }, [setValue]);

  // React to a new ?interest= preset (e.g. the demo links further down this page).
  useEffect(() => {
    if (preset?.industry) {
      setValue("industry", preset.industry);
      setValue("interest", INTERESTS[preset.industry][0]);
    }
  }, [preset?.industry, setValue]);

  // Move focus to the outcome message once it has rendered.
  useEffect(() => {
    if (status.kind !== "idle") document.getElementById(statusId)?.focus();
  }, [status, statusId]);

  const industry = useWatch({ control, name: "industry" }) as Industry | undefined;
  const interestOptions = industry ? INTERESTS[industry] : [];

  const onIndustry = (value: Industry) => {
    setValue("industry", value, { shouldValidate: true });
    setValue("interest", preset?.demo ? INTERESTS[value][0] : "", { shouldValidate: false });
  };

  const onSubmit = async (data: ContactData) => {
    setStatus({ kind: "idle" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => null)) as ContactResponse | null;
      if (res.ok && body?.ok) {
        setStatus({ kind: "success" });
        reset();
        setValue("startedAt", now());
      } else {
        setStatus({
          kind: "error",
          message: body && !body.ok ? body.message : `Something went wrong. Please email ${CONTACT.email}.`,
        });
      }
    } catch {
      setStatus({ kind: "error", message: `We couldn't reach the server. Please check your connection or email ${CONTACT.email}.` });
    }
  };

  const onInvalid = (errs: FieldErrors<ContactInput>) => {
    const first = (["fullName", "email", "company", "phone", "industry", "interest", "message"] as const).find((k) => errs[k]);
    if (first && first !== "industry") setFocus(first);
  };

  if (status.kind === "success") {
    return (
      <m.div
        id={statusId}
        tabIndex={-1}
        role="status"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-[520px] flex-col items-start justify-center rounded-[1.75rem] border border-gold/30 bg-ink-900 p-8 outline-none sm:p-12"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-gold text-black">
          <CheckCircle2 aria-hidden className="size-7" />
        </span>
        <h2 className="display mt-8 text-5xl text-gold-100">Thank you — message received.</h2>
        <p className="mt-4 max-w-md leading-relaxed text-mist">
          A member of the Qmoxi team will be in touch shortly. If it&apos;s urgent, call us at{" "}
          <a href={CONTACT.phoneHref} className="text-gold underline-offset-4 hover:underline">
            {CONTACT.phoneDisplay}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-8 rounded-full border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold hover:bg-gold/10"
        >
          Send another message
        </button>
      </m.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      noValidate
      aria-describedby={`${uid}-req`}
      className="rounded-[1.75rem] border border-gold/20 bg-ink-900 p-6 sm:p-10"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-gold-100">Tell us about your organization</h2>
        {preset?.demo && (
          <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-black">Demo request</span>
        )}
      </div>
      <p id={`${uid}-req`} className="mt-2 text-sm text-smoke">
        Fields marked <span className="text-gold">*</span> are required.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Field id="fullName" label="Full Name" required error={errors.fullName?.message}>
          <input id="fullName" autoComplete="name" {...register("fullName")} {...aria(errors.fullName?.message, "fullName")} className={inputCls(errors.fullName)} />
        </Field>
        <Field id="email" label="Business Email" required error={errors.email?.message}>
          <input id="email" type="email" autoComplete="email" inputMode="email" {...register("email")} {...aria(errors.email?.message, "email")} className={inputCls(errors.email)} />
        </Field>
        <Field id="company" label="Company Name" required error={errors.company?.message}>
          <input id="company" autoComplete="organization" {...register("company")} {...aria(errors.company?.message, "company")} className={inputCls(errors.company)} />
        </Field>
        <Field id="phone" label="Phone Number" error={errors.phone?.message}>
          <input id="phone" type="tel" autoComplete="tel" inputMode="tel" {...register("phone")} {...aria(errors.phone?.message, "phone")} className={inputCls(errors.phone)} />
        </Field>
      </div>

      <fieldset className="mt-8" aria-describedby={errors.industry ? "industry-error" : undefined}>
        <legend className="text-sm font-medium text-gold-100">
          Industry <span className="text-gold">*</span>
        </legend>
        <div className="mt-3 grid grid-cols-3 gap-2 rounded-2xl border border-gold/20 p-1.5">
          {INDUSTRIES.map((opt) => {
            const checked = industry === opt.value;
            return (
              <label
                key={opt.value}
                className={cn(
                  "relative cursor-pointer rounded-xl px-3 py-3 text-center text-sm font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold",
                  checked ? "text-black" : "text-gold-100 hover:text-gold",
                )}
              >
                <input
                  type="radio"
                  value={opt.value}
                  checked={checked}
                  onChange={() => onIndustry(opt.value)}
                  name="industry"
                  className="sr-only"
                />
                {checked && <m.span layoutId={`${uid}-industry`} className="absolute inset-0 rounded-xl bg-gold" />}
                <span className="relative">{opt.label}</span>
              </label>
            );
          })}
        </div>
        <ErrorText id="industry-error" message={errors.industry?.message} />
      </fieldset>

      <div className="mt-6">
        <Field id="interest" label="Area of Interest" required error={errors.interest?.message}>
          <select
            id="interest"
            {...register("interest")}
            {...aria(errors.interest?.message, "interest")}
            disabled={!industry}
            className={cn(inputCls(errors.interest), "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 fill=%22none%22 stroke=%22%23D4AF37%22 stroke-width=%222%22><path d=%22M2 4l4 4 4-4%22/></svg>')] bg-[right_1rem_center] bg-no-repeat pr-10 disabled:opacity-50")}
          >
            <option value="">{industry ? "Select an option" : "Choose an industry first"}</option>
            {interestOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-6">
        <Field id="message" label="Message" required error={errors.message?.message}>
          <textarea id="message" rows={5} {...register("message")} {...aria(errors.message?.message, "message")} className={cn(inputCls(errors.message), "resize-y")} />
        </Field>
      </div>

      {/* Honeypot: hidden from people and assistive tech, tempting for bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div id={statusId} tabIndex={-1} aria-live="assertive" className="outline-none">
        <AnimatePresence>
          {status.kind === "error" && (
            <m.p
              role="alert"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 flex items-start gap-3 rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-gold-100"
            >
              <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" />
              {status.message}
            </m.p>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 flex flex-col-reverse items-start justify-between gap-5 sm:flex-row sm:items-center">
        <p className="max-w-sm text-xs leading-relaxed text-smoke">
          We use your details only to respond to your inquiry. See our{" "}
          <a href="/privacy-policy" className="text-gold underline-offset-4 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex h-14 items-center gap-3 rounded-full bg-gold px-7 font-semibold text-black transition-colors hover:bg-gold-300 disabled:cursor-wait disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 aria-hidden className="size-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              {preset?.demo ? "Request my demo" : "Send message"}
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function aria(error: string | undefined, id: string) {
  return { "aria-invalid": error ? true : undefined, "aria-describedby": error ? `${id}-error` : undefined };
}

function inputCls(error: unknown) {
  return cn(
    "mt-2 block w-full rounded-xl border bg-black/50 px-4 py-3.5 text-[0.95rem] text-gold-100 placeholder:text-smoke transition-colors focus:border-gold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
    error ? "border-gold" : "border-gold/20 hover:border-gold/40",
  );
}

function Field({ id, label, required, error, children }: { id: string; label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-gold-100">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      {children}
      <ErrorText id={`${id}-error`} message={error} />
    </div>
  );
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm text-gold-300">
      <AlertCircle aria-hidden className="size-3.5" /> {message}
    </p>
  );
}
