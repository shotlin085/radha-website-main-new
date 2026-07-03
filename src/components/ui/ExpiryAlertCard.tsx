import { TiltCard } from "@/components/ui/TiltCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function ExpiryAlertCard() {
  return (
    <TiltCard className="w-full max-w-sm p-5">
      <div className="flex items-center justify-between">
        <Badge tone="danger">At risk</Badge>
        <span className="text-xs text-ink-muted">6 days left</span>
      </div>
      <p className="mt-3 text-sm font-semibold text-ink">Masala Noodles · Family Pack</p>
      <p className="text-xs text-ink-muted">Expires 20 May 2026</p>
      <dl className="mt-3 grid grid-cols-2 gap-y-1 text-xs">
        <dt className="text-ink-muted">Batch</dt>
        <dd className="text-right font-mono text-ink">125A</dd>
        <dt className="text-ink-muted">Stock</dt>
        <dd className="text-right font-mono text-ink">24 units</dd>
      </dl>
      <Button href="/platform#expiry-intelligence" className="mt-4 w-full text-xs">
        Take action
      </Button>
    </TiltCard>
  );
}
