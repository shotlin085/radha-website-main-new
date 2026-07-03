import type { LucideIcon, LucideProps } from "lucide-react";

// Thin wrapper around lucide-react — the placeholder icon set until the
// brand's custom icon library is delivered (see docs/ASSET_AUDIT.md).
// Keeping every icon usage funneled through this file means swapping the
// underlying icon library later is a one-file change.
interface IconProps extends LucideProps {
  icon: LucideIcon;
}

export function Icon({ icon: LucideIconComponent, size = 20, strokeWidth = 1.75, ...rest }: IconProps) {
  return <LucideIconComponent size={size} strokeWidth={strokeWidth} aria-hidden="true" {...rest} />;
}
