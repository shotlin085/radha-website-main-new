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
  primary: "bg-[#171510] text-white hover:bg-[#2a271f] active:bg-black",
  secondary: "border border-black/16 bg-transparent text-ink hover:bg-black/5",
  ghost: "bg-transparent text-ink hover:bg-black/5",
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
