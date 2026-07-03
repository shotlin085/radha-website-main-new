"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

interface StoreHealthGaugeProps {
  score: number;
  label?: string;
  size?: number;
  className?: string;
}

// Ring color thresholds mirror the mockup's Good/Fair/Poor gauge language.
function ringColor(score: number) {
  if (score >= 75) return "var(--color-success)";
  if (score >= 50) return "var(--color-brand-600)";
  return "var(--color-danger)";
}

export function StoreHealthGauge({
  score,
  label = "Good",
  size = 120,
  className = "",
}: StoreHealthGaugeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const stroke = size * 0.09;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);

  return (
    <div
      ref={ref}
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-hairline)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={ringColor(score)}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={inView ? { strokeDashoffset: offset } : undefined}
          transition={{ duration: prefersReducedMotion ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-mono font-bold text-ink" style={{ fontSize: size * 0.28 }}>
          {score}
        </span>
        <span className="text-ink-muted" style={{ fontSize: size * 0.12 }}>
          {label}
        </span>
      </div>
    </div>
  );
}
