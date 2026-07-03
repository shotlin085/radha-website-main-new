import { PlayCircle, Smartphone } from "lucide-react";
import { Icon } from "@/components/ui/Icon";

// Static, deterministic pseudo-QR pattern — visual only (not a real
// scannable code), generated inline as SVG rather than an external image.
// Store badges are labeled buttons, not scraped Google Play / App Store
// logo assets, to avoid trademark-asset issues while still reading clearly
// as store links.
const QR_CELLS: [number, number][] = [
  [0, 0], [1, 0], [2, 0], [6, 0], [7, 0], [8, 0],
  [0, 1], [2, 1], [6, 1], [8, 1],
  [0, 2], [1, 2], [2, 2], [4, 2], [6, 2], [7, 2], [8, 2],
  [1, 4], [3, 4], [5, 4], [7, 4],
  [0, 5], [2, 5], [4, 5], [6, 5], [8, 5],
  [0, 6], [1, 6], [2, 6], [6, 6], [7, 6], [8, 6],
  [0, 7], [2, 7], [4, 7], [6, 7], [8, 7],
  [0, 8], [1, 8], [2, 8], [4, 8], [6, 8], [7, 8], [8, 8],
];

export function AppDownloadBlock() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-xl border border-hairline bg-surface-raised p-2">
        <svg viewBox="0 0 90 90" className="h-full w-full" aria-hidden="true">
          <rect width="90" height="90" fill="white" />
          {QR_CELLS.map(([x, y]) => (
            <rect key={`${x}-${y}`} x={x * 10} y={y * 10} width="9" height="9" fill="#1C1917" />
          ))}
        </svg>
      </div>
      <div className="flex flex-col gap-2">
        <a
          href="#"
          className="flex min-h-11 items-center gap-2 rounded-lg border border-hairline bg-surface-raised px-4 text-xs font-medium text-ink transition-colors hover:bg-surface-muted"
        >
          <Icon icon={PlayCircle} size={16} />
          Get it on Google Play
        </a>
        <a
          href="#"
          className="flex min-h-11 items-center gap-2 rounded-lg border border-hairline bg-surface-raised px-4 text-xs font-medium text-ink transition-colors hover:bg-surface-muted"
        >
          <Icon icon={Smartphone} size={16} />
          Download on the App Store
        </a>
      </div>
    </div>
  );
}
