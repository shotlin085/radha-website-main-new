"use client";

import { useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { Icon } from "@/components/ui/Icon";

type AlertTone = "warn" | "danger" | "success";

const TONE_CLASSES: Record<AlertTone, string> = {
  warn: "border-warn/25 bg-warn/8 text-warn",
  danger: "border-danger/25 bg-danger/8 text-danger",
  success: "border-success/25 bg-success/8 text-success",
};

interface AlertBannerProps {
  tone: AlertTone;
  children: ReactNode;
  className?: string;
}

export function AlertBanner({ tone, children, className = "" }: AlertBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-xl border px-4 py-3 text-sm ${TONE_CLASSES[tone]} ${className}`}
    >
      <span className="text-ink">{children}</span>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="flex-shrink-0 rounded-full p-1.5 hover:bg-ink/5"
      >
        <Icon icon={X} size={14} />
      </button>
    </div>
  );
}
