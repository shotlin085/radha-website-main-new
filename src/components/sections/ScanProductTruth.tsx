"use client";

import Image from "next/image";
import { ScrollSequenceCanvas } from "@/components/motion/ScrollSequenceCanvas";
import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/motion/TextReveal";
import { useProgressRail } from "@/components/motion/ProgressRailContext";

export function ScanProductTruth() {
  const rail = useProgressRail();

  return (
    <ScrollSequenceCanvas
      sequenceId="02-scan-product-truth"
      id="scan-product-truth"
      ariaLabelledBy="scan-product-truth-heading"
      onSectionComplete={() => rail?.markComplete(2)}
      chapter={2}
    >
      <Container>
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-white/70">
          Scan to Product Truth
        </p>
        <TextReveal
          as="h2"
          id="scan-product-truth-heading"
          className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white tablet:text-6xl"
        >
          One scan. One truth. No exceptions.
        </TextReveal>
        <p className="mt-6 max-w-xl text-base text-white/80 tablet:text-lg">
          A single scan pulls verified label data, sourcing history, and
          safety signals into one record — no guesswork, no conflicting
          copies of the truth.
        </p>
      </Container>
      <Image
        src="/assets/mor/scanning.webp"
        alt="Mor, the RADHA peacock, scanning a product label with a phone"
        width={1254}
        height={1254}
        className="pointer-events-none absolute bottom-8 right-8 hidden h-40 w-40 object-contain desktop:block"
      />
    </ScrollSequenceCanvas>
  );
}
