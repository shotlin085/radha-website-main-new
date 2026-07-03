"use client";

import { ScrollSequenceCanvas } from "@/components/motion/ScrollSequenceCanvas";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/motion/TextReveal";
import { useProgressRail } from "@/components/motion/ProgressRailContext";

export function CompleteEcosystem() {
  const rail = useProgressRail();

  return (
    <ScrollSequenceCanvas
      sequenceId="05-complete-ecosystem"
      id="complete-ecosystem"
      ariaLabelledBy="complete-ecosystem-heading"
      onSectionComplete={() => rail?.markComplete(5)}
      chapter={5}
    >
      <Container>
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-white/70">
          Complete RADHA Ecosystem
        </p>
        <TextReveal
          as="h2"
          id="complete-ecosystem-heading"
          className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white tablet:text-6xl"
        >
          One system, every stakeholder
        </TextReveal>
        <p className="mt-6 max-w-xl text-base text-white/80 tablet:text-lg">
          Brands, retailers, and owners finally read from the same source of
          truth — from the first scan to the last mile.
        </p>
        <div className="mt-8">
          <Button href="/contact">See it end to end</Button>
        </div>
      </Container>
    </ScrollSequenceCanvas>
  );
}
