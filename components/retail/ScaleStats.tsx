import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Counter } from "@/components/shared/Counter";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { RT_STATS } from "@/lib/constants/content/retail";

/** Published PrestoShopper scale figures, reproduced exactly. */
export function ScaleStats() {
  return (
    <section aria-labelledby="stats-title" className="on-gold relative overflow-hidden bg-gold text-black">
      <Container className="py-24 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-black/70">PrestoShopper · By the numbers</p>
            <h2 id="stats-title" className="display mt-6 text-[clamp(2.6rem,5.6vw,5.4rem)]">
              {RT_STATS.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="leading-relaxed text-black/80">{RT_STATS.intro}</p>
          </Reveal>
        </div>

        <RevealGroup as="dl" className="mt-16 grid grid-cols-2 border-t border-black/25 md:grid-cols-3 lg:grid-cols-5" stagger={0.1}>
          {RT_STATS.items.map((s) => (
            <RevealItem key={s.label} className="flex flex-col border-b border-black/25 py-8 pr-4 md:border-r md:px-6 md:first:pl-0 lg:border-b-0 lg:last:border-r-0">
              <dt className="eyebrow order-2 mt-3 text-[0.62rem] text-black/75">{s.label}</dt>
              <dd className="display -order-1 text-[clamp(2.6rem,4.6vw,4.4rem)] leading-none tabular-nums">
                {"text" in s ? (
                  <span className="block text-[0.62em] leading-[1.05]">{s.text}</span>
                ) : (
                  <Counter value={s.value} prefix={"prefix" in s ? s.prefix : ""} suffix={s.suffix} />
                )}
              </dd>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-20">
          {/* Two logo strips sliced from the original brand wall; top drifts right, bottom drifts left.
              Pauses on keyboard focus; the global reduced-motion rule stops it entirely. */}
          <figure
            tabIndex={0}
            aria-label="End brands that utilize our software (scrolling logos pause while focused)"
            className="group overflow-hidden rounded-[1.75rem] bg-[#0a0a0a] py-12 sm:py-16"
          >
            <figcaption className="px-6 text-center">
              <span className="eyebrow block text-gold">End brands that utilize our software</span>
              <span className="mt-2 block text-sm tracking-wide text-gold/80">(over 26,000 end clients utilize Q software)</span>
            </figcaption>
            <div className="mt-10 space-y-6 sm:mt-12">
              {(
                [
                  ["top", "[animation-direction:reverse]", "Amazon, Apple, Walmart, Google, Microsoft, Samsung, Toyota, Volkswagen, Ford, Honda, BMW, Mercedes-Benz, Hyundai, Audi, Porsche, Tesla, GM, Nissan, McDonald's, Starbucks, Subway, Burger King, KFC, Coca-Cola, Pepsi, Nike, Adidas, H&M, IKEA, The Home Depot, Target, Costco, Best Buy, 7-Eleven, CVS Pharmacy, Walgreens, Bank of America, Chase, Wells Fargo, Visa, Mastercard, American Express, AT&T, Verizon, T-Mobile, Marriott, Hilton, Hyatt Place, The Walt Disney Company, Louis Vuitton"],
                  ["bottom", "", "Gucci, Chanel, Cartier, Rolex, Tiffany & Co., Sephora, L'Oréal, Estée Lauder, Hard Rock Cafe, Planet Fitness, Uber, Chipotle, Wendy's, Dunkin', Panda Express, Buffalo Wild Wings, Domino's, Pizza Hut, Shell, BP, Chevron, FedEx, UPS, Sony, Dell, Lenovo, LG, Ferrari, Lamborghini, Lexus, Volvo, Kia, Mazda, Four Seasons, Ritz-Carlton, Capital One, TD Bank, Vodafone, Lidl, Aldi, Decathlon, Skechers, Puma, Under Armour, New Balance, Nespresso, Swarovski, Gold's Gym, John Deere, PayPal"],
                ] as const
              ).map(([row, direction, brands]) => (
                <div key={row} className="mask-fade-x overflow-hidden">
                  <div
                    className={`flex w-max animate-marquee [animation-duration:90s] group-focus-visible:[animation-play-state:paused] ${direction}`}
                  >
                    {[0, 1].map((copy) => (
                      <Image
                        key={copy}
                        src={`/images/retail/end-brands-${row}.webp`}
                        alt={copy === 0 ? brands : ""}
                        aria-hidden={copy === 1 || undefined}
                        width={6200}
                        height={92}
                        unoptimized
                        className="h-16 w-auto max-w-none sm:h-20"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
