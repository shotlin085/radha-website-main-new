"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MotionConfig } from "motion/react";
import { SmoothScroll } from "./SmoothScroll";

let registered = false;

function registerGsapPlugins() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  registered = true;
}

if (typeof window !== "undefined") {
  registerGsapPlugins();
}

// Mounted once in the root layout. Guarantees ScrollTrigger is registered
// before any section's useGSAP runs, without re-registering per section.
//
// MotionConfig reducedMotion="user" is the other half of the story: every
// bare Framer Motion animation (whileInView, spring, stagger — the ones
// that don't manually branch on useReducedMotion()) is automatically
// forced to its end state with ~0 duration when the OS setting is on. The
// global CSS animation-duration override in globals.css only catches CSS
// transitions/animations, not Framer's JS-driven ones, so this is required
// — not redundant with it.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerGsapPlugins();
    return () => {
      // Full-page unmount only (e.g. HMR) — individual sections clean up
      // their own ScrollTriggers via useGSAP's automatic revert.
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      {children}
    </MotionConfig>
  );
}
