import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT } from "@/lib/constants/site";

/** Address, phone and email, plus an embedded Google Map of the office. */
export function BusinessInfo() {
  return (
    <aside aria-labelledby="business-info-title" className="space-y-5">
      <div className="rounded-[1.75rem] border border-gold/20 bg-black p-7 sm:p-9">
        <h2 id="business-info-title" className="eyebrow text-gold">
          Business Information
        </h2>
        <address className="mt-8 space-y-7 not-italic">
          <div className="flex gap-4">
            <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-gold" />
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-smoke">Location</p>
              <p className="mt-1.5 text-lg text-gold-100">
                {CONTACT.street}
                <br />
                {CONTACT.city}, {CONTACT.region} {CONTACT.postalCode}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Phone aria-hidden className="mt-1 size-5 shrink-0 text-gold" />
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-smoke">Phone</p>
              <a href={CONTACT.phoneHref} className="link-underline mt-1.5 inline-block text-lg text-gold-100 hover:text-gold">
                {CONTACT.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            <Mail aria-hidden className="mt-1 size-5 shrink-0 text-gold" />
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.18em] text-smoke">Email</p>
              <a href={`mailto:${CONTACT.email}`} className="link-underline mt-1.5 inline-block break-all text-lg text-gold-100 hover:text-gold">
                {CONTACT.email}
              </a>
            </div>
          </div>
        </address>
      </div>

      <figure className="overflow-hidden rounded-[1.75rem] border border-gold/20 bg-ink-900">
        {/* Google Maps embed (no API key); lazy-loaded so it doesn't affect initial page load */}
        <iframe
          src={CONTACT.mapsEmbedUrl}
          title="Map showing Qmoxi at 401 S Main St., Findlay, Ohio 45840"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block aspect-[4/3] w-full border-0 bg-ink-800 sm:aspect-[16/11]"
          allowFullScreen
        />
        <figcaption className="flex items-center justify-between gap-4 px-5 py-4 text-sm">
          <span className="text-gold-100">
            {CONTACT.street}, {CONTACT.city}, {CONTACT.region}
          </span>
          <a
            href={CONTACT.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-1.5 font-semibold text-gold hover:text-gold-300"
          >
            Open in Google Maps
            <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </figcaption>
      </figure>
    </aside>
  );
}
