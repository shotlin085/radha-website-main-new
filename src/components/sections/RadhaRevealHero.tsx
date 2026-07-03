"use client";

import Image from "next/image";
import { ScrollSequenceCanvas } from "@/components/motion/ScrollSequenceCanvas";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/motion/TextReveal";
import { useProgressRail } from "@/components/motion/ProgressRailContext";

export function RadhaRevealHero() {
  const rail = useProgressRail();

  return (
    <ScrollSequenceCanvas
      sequenceId="01-radha-reveal"
      id="radha-reveal"
      ariaLabelledBy="radha-reveal-heading"
      onSectionComplete={() => rail?.markComplete(1)}
      chapter={1}
    >
      <Container>
        <div className="mb-4 flex items-center gap-3">
          <Image
            src="/assets/mor/hero-splash.webp"
            alt="Mor, the RADHA peacock, waving in welcome"
            width={1254}
            height={1254}
            className="hidden h-12 w-12 object-contain tablet:block"
          />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">
            Introducing RADHA
          </p>
        </div>
        <TextReveal
          as="h1"
          id="radha-reveal-heading"
          className="max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight text-white tablet:text-7xl desktop:text-8xl"
        >
          The truth about every product, in one scan
        </TextReveal>
        <p className="mt-6 max-w-xl text-base text-white/80 tablet:text-lg">
          Every label, every shelf, every owner — reading from the same
          verified record. No guesswork, no conflicting copies.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/contact">Request a demo</Button>
          <Button href="/platform" variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
            Explore the platform
          </Button>
        </div>
      </Container>
    </ScrollSequenceCanvas>
  );
}
