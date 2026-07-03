import Link from "next/link";
import { type ReactNode } from "react";
import { MagneticButton } from "@/components/motion/MagneticButton";

interface BaseButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

interface ButtonAsButton extends BaseButtonProps {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
}

interface ButtonAsLink extends BaseButtonProps {
  href: string;
  onClick?: () => void;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const VARIANT_CLASSES: Record<NonNullable<BaseButtonProps["variant"]>, string> = {
  // Text-bearing solid fills use brand-700 (accent-deep), not the vivid
  // brand-600 — white/cream text on #EA580C only hits ~3.5:1, below AA's
  // 4.5:1 for normal text. brand-700 gives 7.3:1 and only improves on
  // hover/active as it darkens further.
  primary:
    "bg-brand-700 text-surface hover:bg-brand-800 active:bg-brand-900",
  secondary:
    "bg-surface-muted text-ink border border-ink/10 hover:bg-brand-50",
  ghost: "bg-transparent text-ink hover:bg-surface-muted",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2";

export function Button(props: ButtonProps) {
  const { children, variant = "primary", className = "" } = props;
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`;
  const content = variant === "primary" ? <MagneticButton>{children}</MagneticButton> : children;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes} onClick={props.onClick}>
        {content}
      </Link>
    );
  }

  const { onClick, type = "button" } = props as ButtonAsButton;
  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
