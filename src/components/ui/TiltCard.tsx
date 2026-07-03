"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { usePointerTilt } from "@/components/motion/usePointerTilt";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

// Shared shell for every product-UI mockup card (scan result, verification,
// GRN receipt, task list, pricing) — the pointer-tilt + cursor-spotlight
// treatment that separates a static mockup port from something that feels
// like a built, interactive product. See usePointerTilt for the mechanics.
export function TiltCard({ children, className = "" }: TiltCardProps) {
  const { ref, rotateX, rotateY, background, onMouseMove, onMouseLeave } = usePointerTilt();
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={`relative overflow-hidden rounded-2xl border border-hairline bg-surface-raised shadow-warm ${className}`}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ background }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
