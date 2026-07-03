import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export function FinalDemoCta() {
  return (
    <section
      id="final-cta"
      aria-labelledby="final-cta-heading"
      className="bg-brand-700 py-28 text-surface tablet:py-44"
    >
      <Container maxWidth="max-w-4xl" className="text-center">
        <ScrollReveal>
          <Image
            src="/assets/mor/hero-win.webp"
            alt="Mor, the RADHA peacock, celebrating with wings spread"
            width={1254}
            height={1254}
            className="mx-auto mb-4 h-32 w-32 object-contain tablet:h-40 tablet:w-40"
          />
          <h2
            id="final-cta-heading"
            className="text-4xl font-extrabold leading-tight tracking-tight tablet:text-6xl"
          >
            See RADHA on your own catalog
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/85 tablet:text-lg">
            Bring a handful of SKUs and we&rsquo;ll show you what verified product
            truth looks like end to end.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              href="/contact"
              variant="secondary"
              className="bg-surface text-brand-700 hover:bg-white"
            >
              Request a demo
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
