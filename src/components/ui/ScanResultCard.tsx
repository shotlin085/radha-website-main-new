import { Package, Check } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function ScanResultCard() {
  return (
    <TiltCard className="w-full max-w-sm p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-[0.08em] text-ink-muted">Scan result</span>
        <Badge tone="success">
          <Icon icon={Check} size={12} />
          Scanned
        </Badge>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
          <Icon icon={Package} size={22} />
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">Wheat Atta · 5kg</p>
          <p className="font-mono text-xs text-ink-muted">EAN 8901234567890</p>
        </div>
      </div>
      <div className="mt-4 rounded-xl bg-surface-muted px-4 py-3">
        <p className="font-mono text-2xl font-bold text-ink">₹265.00</p>
        <p className="text-xs text-ink-muted">MRP, 5kg pack</p>
      </div>
      <Button href="/platform#ean-verification" variant="secondary" className="mt-4 flex min-h-11 w-full items-center justify-center text-xs">
        View details
      </Button>
    </TiltCard>
  );
}
