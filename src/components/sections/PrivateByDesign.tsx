"use client";

import { ScrollSequenceCanvas } from "@/components/motion/ScrollSequenceCanvas";
import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/motion/TextReveal";
import { useProgressRail } from "@/components/motion/ProgressRailContext";

export function PrivateByDesign() {
  const rail = useProgressRail();

  return (
    <ScrollSequenceCanvas
      sequenceId="04-private-owner-dashboard"
      id="private-by-design"
      ariaLabelledBy="private-by-design-heading"
      onSectionComplete={() => rail?.markComplete(4)}
      chapter={4}
    >
      <Container>
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-white/70">
          Private by Design
        </p>
        <TextReveal
          as="h2"
          id="private-by-design-heading"
          className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white tablet:text-6xl"
        >
          Owner data stays the owner&rsquo;s
        </TextReveal>
        <p className="mt-6 max-w-xl text-base text-white/80 tablet:text-lg">
          The private owner dashboard surfaces personal insight without
          exposing personal data — encrypted at rest, visible only to the
          person it belongs to.
        </p>
      </Container>
    </ScrollSequenceCanvas>
  );
}
