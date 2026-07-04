"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

interface CinematicFrameProps {
  src: string;
  alt: string;
  focalX?: number;
  priority?: boolean;
  className?: string;
  overlay?: ReactNode;
}

export function CinematicFrame({
  src,
  alt,
  focalX = 0.5,
  priority = false,
  className = "",
  overlay,
}: CinematicFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-18, 18]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], prefersReducedMotion ? [1, 1, 1] : [1.05, 1, 1.04]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: prefersReducedMotion ? 0 : 18 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-2xl border border-hairline bg-surface-muted shadow-warm ${className}`}
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          loading={priority ? undefined : "eager"}
          quality={92}
          sizes="(min-width: 1180px) 90vw, (min-width: 768px) 92vw, 150vw"
          className="object-cover"
          style={{ objectPosition: `${focalX * 100}% 50%` }}
        />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,251,245,0.04),rgba(28,25,23,0.10))]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-6 top-5 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent"
      />
      {overlay}
    </motion.div>
  );
}
