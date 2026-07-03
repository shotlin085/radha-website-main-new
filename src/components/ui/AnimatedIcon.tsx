"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

// A generic "traces itself in" reveal for any icon — a clip-path wipe
// rather than per-path stroke-dashoffset (icons vary in path
// count/structure, so a wipe is the robust technique that still reads as
// "drawing in" without per-icon tuning). Takes the already-rendered icon
// as children (not a component reference) so Server Components can use
// it without crossing the RSC boundary with a non-serializable prop.
export function AnimatedIcon({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.span
      className="inline-block"
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
    >
      {children}
    </motion.span>
  );
}
