"use client";

import { ScrollSequenceCanvas } from "@/components/motion/ScrollSequenceCanvas";
import { Container } from "@/components/ui/Container";
import { TextReveal } from "@/components/motion/TextReveal";
import { useProgressRail } from "@/components/motion/ProgressRailContext";

export function RetailOperationsEngine() {
  const rail = useProgressRail();

  return (
    <ScrollSequenceCanvas
      sequenceId="03-retail-operations"
      id="retail-operations"
      ariaLabelledBy="retail-operations-heading"
      onSectionComplete={() => rail?.markComplete(3)}
      chapter={3}
    >
      <Container>
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-white/70">
          Retail Operations Engine
        </p>
        <TextReveal
          as="h2"
          id="retail-operations-heading"
          className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white tablet:text-6xl"
        >
          The shelf finally agrees with the system
        </TextReveal>
        <p className="mt-6 max-w-xl text-base text-white/80 tablet:text-lg">
          Inventory, compliance, and recall status flow straight from the
          scan layer into retail operations — so every location acts on the
          same live picture.
        </p>
      </Container>
    </ScrollSequenceCanvas>
  );
}
