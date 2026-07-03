"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

// Illustrative figures — replace with the real, audited numbers once
// available. Structure is what matters here, not the specific values.
const STATS = [
  { target: 2400000, suffix: "+", label: "Scans verified" },
  { target: 150, suffix: "+", label: "Retail partners" },
  { target: 99.98, suffix: "%", label: "Platform uptime", decimals: 2 },
  { target: 40, suffix: "%", label: "Faster recall response" },
];

function DigitReel({ digit, delay }: { digit: number; delay: number }) {
  return (
    <span className="relative inline-block h-[1em] w-[0.65em] overflow-hidden align-top">
      <motion.span
        className="absolute left-0 top-0 flex flex-col"
        initial={{ y: 0 }}
        whileInView={{ y: `-${digit}em` }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {Array.from({ length: 10 }, (_, n) => (
          <span key={n} className="h-[1em] leading-[1em]">
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

// Departure-board / odometer treatment: each digit is its own reel that
// spins to the final value, rather than a plain count-up tween — reads as
// a precision instrument rather than the now-common "number ticks up"
// pattern. The reel stack (0-9 per digit) is decorative/aria-hidden since
// it would otherwise read every digit in the stack to a screen reader;
// the plain formatted number is the one real accessible text source.
function DepartureBoardNumber({
  target,
  suffix,
  decimals = 0,
}: {
  target: number;
  suffix: string;
  decimals?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const formatted = target.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  const fullText = `${formatted}${suffix}`;

  if (prefersReducedMotion) {
    return <span>{fullText}</span>;
  }

  // Each digit's ordinal position (for stagger delay), derived without any
  // mutable counter — just the digit's rank among digit-only positions.
  const chars = formatted.split("");
  const digitPositions = chars
    .map((char, i) => (/\d/.test(char) ? i : null))
    .filter((i): i is number => i !== null);

  return (
    <span className="relative inline-block">
      <span aria-hidden="true" className="inline-flex items-baseline">
        {chars.map((char, i) =>
          /\d/.test(char) ? (
            <DigitReel key={i} digit={Number(char)} delay={digitPositions.indexOf(i) * 0.04} />
          ) : (
            <span key={i} className="inline-block">
              {char}
            </span>
          )
        )}
        <span className="ml-0.5">{suffix}</span>
      </span>
      <span className="sr-only">{fullText}</span>
    </span>
  );
}

export function BusinessPulse() {
  return (
    <section
      id="business-pulse"
      aria-labelledby="business-pulse-heading"
      className="bg-surface-inverted py-24 text-surface tablet:py-32"
    >
      <Container>
        <ScrollReveal>
          <SectionHeading
            id="business-pulse-heading"
            eyebrow="Business Pulse"
            title="The pulse of the network, at a glance"
            align="center"
            invert
            description="Scans, partners, and uptime — the vitals your team already tracks."
          />
        </ScrollReveal>

        <dl className="mt-14 grid gap-10 tablet:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="order-2 mt-2 text-sm text-white/60">{stat.label}</dt>
              <dd className="order-1 font-mono text-4xl font-semibold tabular-nums tablet:text-5xl">
                <DepartureBoardNumber target={stat.target} suffix={stat.suffix} decimals={stat.decimals} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
