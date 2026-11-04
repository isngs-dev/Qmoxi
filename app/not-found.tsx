import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/shared/Button";
import { SignalLine } from "@/components/shared/SignalLine";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Qmoxi" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="grain relative overflow-hidden pb-28 pt-[calc(var(--header-h)+5rem)]">
      <Container>
        <p className="eyebrow text-gold">Error 404</p>
        <h1 className="display mt-6 text-[clamp(3rem,8vw,8rem)] text-gold-100">
          This line went <em className="text-metal">quiet.</em>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-mist">
          The page you’re looking for doesn’t exist or has moved. Let’s get you back to a connected conversation.
        </p>
        <SignalLine className="my-14" />
        <div className="flex flex-wrap gap-3">
          <Button href="/" size="lg">Back to home</Button>
          <Button href="/qmoxihealthcare" variant="outline" size="lg">Qmoxi Healthcare</Button>
          <Button href="/retail" variant="outline" size="lg">Qmoxi Retail</Button>
          <Button href="/contact" variant="ghost" size="lg">Contact us</Button>
        </div>
      </Container>
    </section>
  );
}
