"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

export function SmoothScroll() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      return;
    }

    const lenis = new Lenis({
      anchors: { offset: 0, duration: 0.9 },
      gestureOrientation: "vertical",
      lerp: 0.082,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
    });
    lenisRef.current = lenis;

    const unsubscribe = lenis.on("scroll", () => ScrollTrigger.update());
    let rafId = 0;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);
    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(rafId);
      unsubscribe();
      lenis.destroy();
      if (lenisRef.current === lenis) {
        lenisRef.current = null;
      }
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    let frameId = 0;

    const scrollToRouteDestination = (immediate: boolean) => {
      const hash = window.location.hash;
      const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;

      if (prefersReducedMotion) {
        if (target) target.scrollIntoView({ block: "start", behavior: "auto" });
        else window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        ScrollTrigger.refresh();
        return;
      }

      const lenis = lenisRef.current;
      if (!lenis) {
        if (target) target.scrollIntoView({ block: "start", behavior: "auto" });
        else window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        ScrollTrigger.refresh();
        return;
      }
      if (target) lenis.scrollTo(target, { offset: 0, immediate });
      else lenis.scrollTo(0, { immediate });
      ScrollTrigger.refresh();
    };

    frameId = requestAnimationFrame(() => scrollToRouteDestination(true));
    const handleHashChange = () => scrollToRouteDestination(false);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [pathname, prefersReducedMotion]);

  return null;
}
