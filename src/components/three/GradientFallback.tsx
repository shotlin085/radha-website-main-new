// Static stand-in for the WebGL accent — used on reduced-motion, mobile,
// and low-end devices, and as the pre-load state before the R3F chunk
// fetches. Never imports "three" or "@react-three/*".
export function GradientFallback() {
  return (
    <div
      aria-hidden="true"
      className="h-full w-full bg-[radial-gradient(circle_at_65%_35%,_rgba(234,88,12,0.22),_transparent_60%)]"
    />
  );
}
