"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

export function CinematicHero() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end start"],
  });
  const sceneY = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "16%"]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 1.08]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.25]);

  return (
    <div ref={sceneRef} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden bg-[#090908]">
      <motion.div
        className="absolute -inset-[8%]"
        style={{ y: sceneY, scale: sceneScale, opacity: sceneOpacity }}
      >
        <Image
          src="/assets/radha-ai/generated/hero-intelligence-field-v2.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,7,0.9)_0%,rgba(8,8,7,0.64)_42%,rgba(8,8,7,0.1)_76%),linear-gradient(180deg,rgba(8,8,7,0.2)_0%,rgba(8,8,7,0.52)_100%)]" />
      <div className="radha-hero-halo absolute left-[36%] top-[46%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#dda93f]/28 tablet:h-72 tablet:w-72" />
      <span className="radha-hero-signal absolute left-[36%] top-[46%] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f0bd58]" />
      {Array.from({ length: 18 }, (_, index) => (
        <span
          key={index}
          className="radha-hero-particle absolute h-1 w-1 rounded-full bg-[#e9b552]"
          style={{
            left: `${8 + ((index * 17) % 82)}%`,
            top: `${16 + ((index * 29) % 70)}%`,
            animationDelay: `${-index * 0.45}s`,
            animationDuration: `${4.6 + (index % 5) * 0.75}s`,
          }}
        />
      ))}
    </div>
  );
}
