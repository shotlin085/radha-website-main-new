import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SEQUENCES } from "@/lib/sequences";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Showcase",
  description: "A quick look at what each stage of RADHA resolves — from unscanned to verified.",
});

// Maps each sequence to its homepage anchor and reuses the exact hero
// copy already written for that section — no new marketing claims here,
// just a different, quicker-to-scan format than the full scroll narrative.
const SHOWCASE_ITEMS = [
  {
    sequenceId: "01-radha-reveal",
    anchor: "radha-reveal",
    eyebrow: "RADHA Reveal",
    caption: "The truth about every product, in one scan.",
  },
  {
    sequenceId: "02-scan-product-truth",
    anchor: "scan-product-truth",
    eyebrow: "Scan to Product Truth",
    caption: "One scan. One truth. No exceptions.",
  },
  {
    sequenceId: "03-retail-operations",
    anchor: "retail-operations",
    eyebrow: "Retail Operations Engine",
    caption: "The shelf finally agrees with the system.",
  },
  {
    sequenceId: "04-private-owner-dashboard",
    anchor: "private-by-design",
    eyebrow: "Private by Design",
    caption: "Owner data stays the owner’s.",
  },
  {
    sequenceId: "05-complete-ecosystem",
    anchor: "complete-ecosystem",
    eyebrow: "Complete RADHA Ecosystem",
    caption: "One system, every stakeholder.",
  },
] as const;

export default function ShowcasePage() {
  return (
    <main id="main-content">
      <section className="bg-surface-muted py-24 pt-36 tablet:pb-20 tablet:pt-44">
        <Container maxWidth="max-w-2xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-ink tablet:text-6xl desktop:text-7xl">
            From unscanned to verified
          </h1>
          <p className="mt-4 text-base text-ink-muted tablet:text-lg">
            Five moments from the RADHA story, side by side. Want the full
            cinematic version?{" "}
            <Link href="/" className="text-brand-700 underline underline-offset-2">
              Scroll the homepage
            </Link>
            .
          </p>
        </Container>
      </section>

      <div className="flex flex-col divide-y divide-hairline">
        {SHOWCASE_ITEMS.map((item) => {
          const sequence = SEQUENCES[item.sequenceId];
          return (
            <section
              key={item.sequenceId}
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
                  {/* Before/after comparison — stacked snap-scroll on mobile,
                      side by side from tablet up. */}
                  <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 tablet:grid tablet:grid-cols-2 tablet:overflow-visible tablet:pb-0">
                    <figure className="w-[85%] flex-shrink-0 snap-center tablet:w-auto tablet:flex-shrink">
                      <div className="relative aspect-video overflow-hidden rounded-2xl border border-hairline">
                        <Image
                          src={sequence.posterInitial}
                          alt={`${item.eyebrow}: unscanned starting point`}
                          fill
                          sizes="(min-width: 768px) 50vw, 85vw"
                          className="object-cover"
                        />
                      </div>
                      <figcaption className="mt-2 text-sm text-ink-muted">Unscanned</figcaption>
                    </figure>
                    <figure className="w-[85%] flex-shrink-0 snap-center tablet:w-auto tablet:flex-shrink">
                      <div className="relative aspect-video overflow-hidden rounded-2xl border border-hairline">
                        <Image
                          src={sequence.posterFinal}
                          alt={`${item.eyebrow}: verified result`}
                          fill
                          sizes="(min-width: 768px) 50vw, 85vw"
                          className="object-cover"
                        />
                      </div>
                      <figcaption className="mt-2 text-sm font-medium text-brand-700">Verified</figcaption>
                    </figure>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.15}>
                  <Link
                    href={`/#${item.anchor}`}
                    className="group mt-3 inline-flex items-center gap-1.5 py-3 text-sm font-medium text-brand-700"
                  >
                    See it in motion
                    <Icon icon={ArrowRight} size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </ScrollReveal>
              </Container>
            </section>
          );
        })}
      </div>
    </main>
  );
}
