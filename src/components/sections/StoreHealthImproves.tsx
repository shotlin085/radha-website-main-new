"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StoreHealthGauge } from "@/components/ui/StoreHealthGauge";
import { Icon } from "@/components/ui/Icon";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

const SCORE_FACTORS = [
  { label: "Availability", value: 90 },
  { label: "Expiry", value: 70 },
  { label: "Planogram", value: 85 },
  { label: "Tasks", value: 78 },
];

// Simple, hand-authored trend-line path (7 points, roughly upward) — no
// charting library needed for one illustrative line.
const TREND_PATH = "M0,42 L20,38 L40,44 L60,28 L80,32 L100,14 L120,8";

function TrendLine() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg ref={ref} viewBox="0 0 120 50" className="h-12 w-full max-w-[10rem]" aria-hidden="true">
      <motion.path
        d={TREND_PATH}
        fill="none"
        stroke="var(--color-success)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : undefined}
        transition={{ duration: prefersReducedMotion ? 0 : 1, ease: "easeInOut", delay: 0.3 }}
      />
    </svg>
  );
}

// Chapter 7 of 8 — second full-width visual break, giving the "store
// health improved" payoff room to breathe as the section's actual
// centerpiece rather than a small card, matching the emotional weight of
// "the score got better."
export function StoreHealthImproves() {
  return (
    <section
      id="store-health-improves"
      aria-labelledby="store-health-improves-heading"
      className="bg-surface-muted py-24 tablet:py-32"
    >
      <Container className="flex flex-col items-center text-center">
        <SectionHeading
          id="store-health-improves-heading"
          eyebrow="Store Health Improves"
          title="One score. Complete picture."
          description="Measure what matters. Improve every day."
          align="center"
        />

        <div className="mt-12 flex flex-col items-center gap-8 tablet:flex-row tablet:gap-16">
          <StoreHealthGauge score={82} size={220} />

          <div className="flex flex-col items-center gap-6 tablet:items-start">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-3 text-left">
              {SCORE_FACTORS.map((factor) => (
                <div key={factor.label} className="flex items-center justify-between gap-6">
                  <dt className="text-sm text-ink-muted">{factor.label}</dt>
                  <dd className="font-mono text-sm font-semibold text-ink">{factor.value}</dd>
                </div>
              ))}
            </dl>
            <TrendLine />
            <p className="text-sm font-medium text-success">▲ 8 vs last week — keep it up!</p>
          </div>
        </div>

        {/* Contextual mid-scroll conversion nudge — shortens the path to
            pricing for a visitor already convinced by this point, without
            adding a second full CTA block. */}
        <Link
          href="/pricing"
          className="group mt-8 inline-flex items-center gap-1.5 py-3 text-sm font-medium text-brand-700"
        >
          Simple pricing, see plans
          <Icon icon={ArrowRight} size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </Container>
    </section>
  );
}
