"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotion } from "./useReducedMotion";

const MAX_DISPLACEMENT = 8;
const PULL_STRENGTH = 0.3;

// Wraps primary-CTA content with a subtle pointer-tracked pull, snapping
// back on leave. Mouse-only (pointerType check) so it's inert on touch,
// and fully disabled under reduced motion.
export function MagneticButton({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  function handlePointerMove(event: PointerEvent<HTMLSpanElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-MAX_DISPLACEMENT, Math.min(MAX_DISPLACEMENT, relX * PULL_STRENGTH)));
    y.set(Math.max(-MAX_DISPLACEMENT, Math.min(MAX_DISPLACEMENT, relY * PULL_STRENGTH)));
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  if (prefersReducedMotion) {
    return <span className="inline-flex">{children}</span>;
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x: springX, y: springY }}
      className="inline-flex"
    >
      {children}
    </motion.span>
  );
}
