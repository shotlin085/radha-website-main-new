"use client";

import { motion } from "motion/react";
import { useProgressRail } from "./ProgressRailContext";
import { useReducedMotion } from "./useReducedMotion";

const CHAPTERS = [1, 2, 3, 4, 5];

// Desktop-only wayfinding for the long homepage narrative: one tick per
// hero chapter. Each tick briefly pulses when its canvas sequence
// completes — the "verified" punctuation between chapters — then settles
// into a filled state. Purely decorative/supplementary — aria-hidden,
// since the page's real landmarks already provide structure for
// assistive tech.
export function VerifyProgressRail() {
  const rail = useProgressRail();
  const prefersReducedMotion = useReducedMotion();
  const completed = rail?.completed ?? new Set<number>();

  return (
    <div
      aria-hidden="true"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 rounded-full bg-surface/90 px-2 py-4 shadow-warm desktop:flex"
    >
      {CHAPTERS.map((chapter) => {
        const isComplete = completed.has(chapter);
        return (
          <motion.span
            key={chapter}
            initial={false}
            animate={
              isComplete && !prefersReducedMotion
                ? { scale: [1, 1.6, 1] }
                : { scale: 1 }
            }
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`block h-2 w-2 rounded-full border transition-colors duration-300 ${
              isComplete ? "border-brand-600 bg-brand-600" : "border-hairline bg-transparent"
            }`}
          />
        );
      })}
    </div>
  );
}
