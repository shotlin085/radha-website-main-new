import type { ReactNode } from "react";

interface DeviceFrameProps {
  variant: "laptop" | "phone";
  children: ReactNode;
  className?: string;
}

// CSS-only laptop/phone chrome — no screenshot asset needed, matches the
// plan's "no new binary assets" constraint while still reading clearly as
// a device mockup.
export function DeviceFrame({ variant, children, className = "" }: DeviceFrameProps) {
  if (variant === "laptop") {
    return (
      <div className={`overflow-hidden rounded-xl border border-hairline shadow-warm ${className}`}>
        <div className="flex items-center gap-1.5 bg-ink px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/30" />
          <span className="h-2 w-2 rounded-full bg-white/30" />
          <span className="h-2 w-2 rounded-full bg-white/30" />
        </div>
        <div className="bg-surface-muted p-4">{children}</div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-[1.75rem] border-4 border-ink bg-surface-muted shadow-warm ${className}`}>
      <div className="flex justify-center bg-ink py-1.5">
        <span className="h-1 w-10 rounded-full bg-white/40" />
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}
