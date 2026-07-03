"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";

// Single source of truth for reduced-motion state, shared by the GSAP
// canvas engine, every Framer Motion wrapper, and the R3F hero scene.
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
