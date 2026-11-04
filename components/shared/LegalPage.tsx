import { Container } from "@/components/layout/Container";
import type { LegalBlock } from "@/lib/constants/content/legal";

const URL_RE = /(https?:\/\/[^\s]*[^\s.,)])/g;

function Linkify({ text }: { text: string }) {
  const parts = text.split(URL_RE);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("http://") || part.startsWith("https://") ? (
          <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="break-all text-gold-800 underline underline-offset-4">
            {part}
          </a>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

/** Simple editorial prose layout for policy pages. */
export function LegalPage({ eyebrow, title, meta, blocks }: { eyebrow: string; title: string; meta?: string; blocks: LegalBlock[] }) {
  return (
    <>
      <section className="pb-14 pt-[calc(var(--header-h)+4rem)]">
        <Container>
          <p className="eyebrow text-gold">{eyebrow}</p>
          <h1 className="display mt-6 text-[clamp(2.8rem,6vw,6rem)] text-gold-100">{title}</h1>
          {meta && <p className="mt-4 text-sm text-smoke">{meta}</p>}
        </Container>
      </section>
      <section className="on-light bg-ivory py-16 text-black lg:py-24">
        <Container>
          <article className="mx-auto max-w-3xl">
            {blocks.map((b, i) => (
              <div key={i} className={b.h ? "mt-12 first:mt-0" : "mt-5"}>
                {b.h && <h2 className="display text-3xl text-black">{b.h}</h2>}
                {b.p?.map((p, j) => (
                  <p key={j} className="mt-4 leading-relaxed text-black/80">
                    <Linkify text={p} />
                  </p>
                ))}
                {b.list && (
                  <ul className="mt-4 space-y-2 pl-5 text-black/80 [list-style:square]">
                    {b.list.map((li) => (
                      <li key={li} className="pl-1 marker:text-gold-800">
                        <Linkify text={li} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </article>
        </Container>
      </section>
    </>
  );
}
