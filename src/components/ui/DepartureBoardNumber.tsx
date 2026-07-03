"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

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
// a precision instrument. Shared by BusinessPulse-style stat sections and
// PreventLosses' expiry count. The reel stack is decorative/aria-hidden;
// the plain formatted number is the one real accessible text source.
export function DepartureBoardNumber({
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
