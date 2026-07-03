"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DepartureBoardNumber } from "@/components/ui/DepartureBoardNumber";

const SEGMENTS = [
  { label: "0-15 days · High risk", items: 8, share: 67, color: "var(--color-danger)" },
  { label: "15-30 days · Medium risk", items: 4, share: 33, color: "var(--color-warn)" },
  { label: "30+ days · Low risk", items: 0, share: 0, color: "var(--color-success)" },
];

// Chapter 4 of 8 — first full-width visual break (inverted background,
// like the old BusinessPulse section), giving the scroll rhythm a beat of
// contrast between the two card-chapter duos. Motion: timeline bar grows
// left-to-right + odometer count-up, reusing the same digit-reel pattern
// as any other stat treatment on the site.
export function PreventLosses() {
  return (
    <section
      id="prevent-losses"
      aria-labelledby="prevent-losses-heading"
      className="bg-surface-inverted py-24 text-surface tablet:py-32"
    >
      <Container className="grid items-center gap-12 tablet:grid-cols-2 tablet:gap-16">
        <SectionHeading
          id="prevent-losses-heading"
          eyebrow="Prevent Losses"
          title="Spot expiry risk early. Act before it's lost."
          description="Expiry intelligence that protects your margins."
          invert
        />

        <div>
          <div className="flex items-baseline gap-6">
            <div>
              <p className="font-mono text-5xl font-bold tabular-nums text-surface">
                <DepartureBoardNumber target={12} suffix="" />
              </p>
              <p className="mt-1 text-sm text-white/60">items at risk</p>
            </div>
            <div>
              <p className="font-mono text-2xl font-semibold tabular-nums text-white/85">
                <DepartureBoardNumber target={4320} suffix="" />
              </p>
              <p className="mt-1 text-sm text-white/60">₹ potential loss</p>
            </div>
          </div>

          <div className="mt-8 flex h-2 w-full overflow-hidden rounded-full bg-white/10">
            {SEGMENTS.map((segment) => (
              <motion.span
                key={segment.label}
                initial={{ width: 0 }}
                whileInView={{ width: `${segment.share}%` }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ backgroundColor: segment.color }}
              />
            ))}
          </div>
          <dl className="mt-4 flex flex-col gap-2">
            {SEGMENTS.map((segment) => (
              <div key={segment.label} className="flex items-center justify-between text-xs text-white/70">
                <dt className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: segment.color }}
                  />
                  {segment.label}
                </dt>
                <dd className="font-mono">{segment.items} items</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
