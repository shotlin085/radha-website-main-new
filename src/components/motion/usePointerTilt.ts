"use client";

import { useRef } from "react";
import { useMotionValue, useSpring, useTransform } from "motion/react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

// Shared pointer-reactive tilt + cursor-spotlight for every product-UI card
// (ScanResultCard, VerificationCard, GrnReceiptCard, TaskListCard,
// PricingCard). Mouse-only — touch never fires mousemove, so this is
// naturally a no-op on mobile. Under reduced motion, mouseX/mouseY simply
// never move off their 0.5/0.5 rest position, so rotation stays at 0
// without any conditional hook calls.
export function usePointerTilt(maxDegrees = 4) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [maxDegrees, -maxDegrees]), {
    stiffness: 180,
    damping: 26,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-maxDegrees, maxDegrees]), {
    stiffness: 180,
    damping: 26,
  });
  const background = useTransform([mouseX, mouseY], (values) => {
    const [x, y] = values as [number, number];
    return `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(234,88,12,0.08), transparent 60%)`;
  });

  function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width);
    mouseY.set((event.clientY - rect.top) / rect.height);
  }

  function onMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return { ref, rotateX, rotateY, background, onMouseMove, onMouseLeave };
}
