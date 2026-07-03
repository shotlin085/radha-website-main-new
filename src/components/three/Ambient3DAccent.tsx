"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { GradientFallback } from "./GradientFallback";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";

const HeroScene = dynamic(() => import("./HeroScene").then((m) => m.HeroScene), {
  ssr: false,
});

// Gates the R3F chunk behind reduced-motion / mobile / low-end-device
// checks so it's never fetched for those users, and pauses the render
// loop when scrolled out of view. See docs/PERFORMANCE_BUDGET.md.
export function Ambient3DAccent({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [isNearViewport, setIsNearViewport] = useState(false);

  const lowEndDevice =
    typeof navigator !== "undefined" && Boolean(navigator.hardwareConcurrency) &&
    navigator.hardwareConcurrency <= 4;

  const shouldRender3D = !prefersReducedMotion && !isMobile && !lowEndDevice;

  useEffect(() => {
    if (!shouldRender3D) return;
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldRender3D]);

  return (
    <div ref={containerRef} aria-hidden="true" className={`pointer-events-none ${className}`}>
      {shouldRender3D && isNearViewport ? (
        <HeroScene isInView={isNearViewport} />
      ) : (
        <GradientFallback />
      )}
    </div>
  );
}
