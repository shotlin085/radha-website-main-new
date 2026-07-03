import { Check } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";

export function GrnReceiptCard() {
  return (
    <TiltCard className="w-full max-w-sm p-5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-ink-muted">GRN-2026-05-17-001</span>
        <Badge tone="success">
          <Icon icon={Check} size={12} />
          Matched
        </Badge>
      </div>
      <p className="mt-3 text-xs text-ink-muted">Supplier</p>
      <p className="text-sm font-medium text-ink">Sharma Distributors</p>
      <p className="mt-1 font-mono text-xs text-ink-muted">Invoice INV-7789</p>
      <dl className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-surface-muted p-3 text-center">
        <div>
          <dt className="text-[10px] uppercase tracking-[0.06em] text-ink-muted">Items</dt>
          <dd className="font-mono text-lg font-semibold text-ink">24</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[0.06em] text-ink-muted">Qty</dt>
          <dd className="font-mono text-lg font-semibold text-ink">156</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[0.06em] text-ink-muted">Value</dt>
          <dd className="font-mono text-lg font-semibold text-ink">₹24,560</dd>
        </div>
      </dl>
    </TiltCard>
  );
}
