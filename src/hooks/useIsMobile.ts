"use client";

import { useMediaQuery } from "./useMediaQuery";

// "Mobile" for motion purposes means the tablet-and-below tier from
// docs/RESPONSIVE_STRATEGY.md (<1180px) — pinning 300-frame canvases on
// touch devices in this range is exactly the scroll-trapping the
// Motion Architecture doc prohibits.
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 1179px)");
}
