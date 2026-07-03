import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-hairline bg-surface-raised p-6 shadow-warm transition-all duration-200 motion-safe:hover:-translate-y-1 hover:shadow-md tablet:p-8 ${className}`}
    >
      {children}
    </div>
  );
}
