import type { ReactNode } from "react";

type BadgeTone = "brand" | "success" | "warn" | "danger" | "neutral" | "teal";

const TONE_CLASSES: Record<BadgeTone, string> = {
  brand: "bg-brand-100 text-brand-700",
  success: "bg-success/10 text-success",
  warn: "bg-warn/10 text-warn",
  danger: "bg-danger/10 text-danger",
  neutral: "bg-surface-muted text-ink-muted",
  teal: "bg-teal/10 text-teal",
};

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}

export function Badge({ children, tone = "neutral", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${TONE_CLASSES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
