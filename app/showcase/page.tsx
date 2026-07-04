import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Showcase",
  description:
    "A cinematic look at how RADHA turns scanning, expiry, GRN, team tasks, and store health into one retail operations story.",
});

const SHOWCASE_ITEMS = [
  {
    anchor: "radha-reveal",
    eyebrow: "RADHA Reveal",
    caption: "The truth about every product, in one scan.",
    before: "/assets/radha/cinematic-v2/webp/01-hero-opening.webp",
    after: "/assets/radha/cinematic-v2/webp/02-scan-instantly.webp",
  },
  {
    anchor: "scan-product-truth",
    eyebrow: "Scan to Product Truth",
    caption: "One scan. One truth. No exceptions.",
    before: "/assets/radha/cinematic-v2/webp/02-scan-instantly.webp",
    after: "/assets/radha/cinematic-v2/webp/03-verify-confidence.webp",
  },
  {
    anchor: "retail-operations",
    eyebrow: "Retail Operations Engine",
    caption: "The shelf finally agrees with the system.",
    before: "/assets/radha/cinematic-v2/webp/05-grn-matched.webp",
    after: "/assets/radha/cinematic-v2/webp/06-tasks-done.webp",
  },
  {
    anchor: "store-health",
    eyebrow: "Measure and Improve",
    caption: "Owner insight becomes daily store health.",
    before: "/assets/radha/cinematic-v2/webp/04-prevent-losses.webp",
    after: "/assets/radha/cinematic-v2/webp/07-store-health.webp",
  },
  {
    anchor: "complete-ecosystem",
    eyebrow: "Complete RADHA Ecosystem",
    caption: "One system, every stakeholder.",
    before: "/assets/radha/cinematic-v2/webp/07-store-health.webp",
    after: "/assets/radha/cinematic-v2/webp/08-final-ecosystem.webp",
  },
] as const;

export default function ShowcasePage() {
  return (
    <main id="main-content">
      <section className="relative overflow-hidden bg-surface-inverted py-24 pt-36 tablet:pb-28 tablet:pt-44">
        <Image
          src="/assets/radha/cinematic-v2/webp/08-final-ecosystem.webp"
          alt=""
          aria-hidden="true"
          fill
          priority
          quality={92}
          sizes="(max-width: 767px) 220vw, 100vw"
          className="object-cover"
          style={{ objectPosition: "64% 50%" }}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-ink/20" />
        <Container maxWidth="max-w-3xl" className="relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-white tablet:text-6xl desktop:text-7xl">
            RADHA, as a cinematic retail operations story.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 tablet:text-lg">
            Five moments from the new visual system, designed to feel premium,
            trustworthy, and clear enough to build from.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Scroll the homepage
            <Icon icon={ArrowRight} size={16} />
          </Link>
        </Container>
      </section>

      <div className="flex flex-col divide-y divide-hairline">
        {SHOWCASE_ITEMS.map((item) => (
          <section
            key={item.anchor}
            id={item.anchor}
            aria-labelledby={`${item.anchor}-showcase-heading`}
            className="bg-surface py-16 tablet:py-24"
          >
            <Container>
              <ScrollReveal>
                <SectionHeading
                  id={`${item.anchor}-showcase-heading`}
                  eyebrow={item.eyebrow}
                  title={item.caption}
                />
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 tablet:grid tablet:grid-cols-2 tablet:overflow-visible tablet:pb-0">
                  <figure className="w-[85%] flex-shrink-0 snap-center tablet:w-auto tablet:flex-shrink">
                    <div className="relative aspect-video overflow-hidden rounded-2xl border border-hairline bg-surface-muted">
                      <Image
                        src={item.before}
                        alt={`${item.eyebrow}: operational scene`}
                        fill
                        quality={92}
                        sizes="(min-width: 768px) 50vw, 120vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="mt-2 text-sm text-ink-muted">Operational moment</figcaption>
                  </figure>
                  <figure className="w-[85%] flex-shrink-0 snap-center tablet:w-auto tablet:flex-shrink">
                    <div className="relative aspect-video overflow-hidden rounded-2xl border border-hairline bg-surface-muted">
                      <Image
                        src={item.after}
                        alt={`${item.eyebrow}: RADHA resolved state`}
                        fill
                        quality={92}
                        sizes="(min-width: 768px) 50vw, 120vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="mt-2 text-sm font-medium text-brand-700">RADHA layer</figcaption>
                  </figure>
                </div>
              </ScrollReveal>
            </Container>
          </section>
        ))}
      </div>
    </main>
  );
}
