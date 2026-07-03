import type { LucideIcon } from "lucide-react";
import { Icon } from "@/components/ui/Icon";

interface KpiMetricCardProps {
  label: string;
  value: string;
  trend?: string;
  icon: LucideIcon;
}

export function KpiMetricCard({ label, value, trend, icon }: KpiMetricCardProps) {
  return (
    <div className="rounded-2xl border border-hairline bg-surface-raised p-5 shadow-warm">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
        <Icon icon={icon} size={18} />
      </span>
      <p className="mt-3 font-mono text-2xl font-bold text-ink">{value}</p>
      <p className="text-xs text-ink-muted">{label}</p>
      {trend ? <p className="mt-1 text-xs font-medium text-success">{trend}</p> : null}
    </div>
  );
}
