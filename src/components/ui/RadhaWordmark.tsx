// Text-based stand-in for the brand's SVG logo, which has not been
// delivered yet (see docs/ASSET_AUDIT.md). Swap for an <svg>/<Image> once
// the real mark arrives — call sites don't need to change.
// Color is supplied by the caller (header uses white + blend-difference to
// stay legible over the photographic hero; footer uses plain ink).
export function RadhaWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-sans text-xl font-extrabold tracking-tight ${className}`}>
      RADHA
    </span>
  );
}
