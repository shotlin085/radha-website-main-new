import { type ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Overrides the default 1600px cap — e.g. "max-w-3xl" for narrow content blocks. */
  maxWidth?: string;
}

// Encodes the 4-tier gutter system from docs/RESPONSIVE_STRATEGY.md so no
// section hand-rolls its own horizontal padding.
export function Container({
  children,
  className = "",
  maxWidth = "max-w-[1600px]",
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full ${maxWidth} px-5 tablet:px-8 desktop:px-12 wide:px-16 ${className}`}
    >
      {children}
    </div>
  );
}
