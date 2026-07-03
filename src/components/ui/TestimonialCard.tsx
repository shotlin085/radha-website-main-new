import { Star } from "lucide-react";
import { Icon } from "@/components/ui/Icon";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
}

export function TestimonialCard({ quote, name, role }: TestimonialCardProps) {
  return (
    <div className="rounded-2xl border border-hairline bg-surface-raised p-6 shadow-warm">
      <div className="flex gap-0.5 text-brand-600" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <Icon key={i} icon={Star} size={14} className="fill-current" />
        ))}
      </div>
      <p className="mt-3 text-sm text-ink">&ldquo;{quote}&rdquo;</p>
      <p className="mt-4 text-sm font-medium text-ink">{name}</p>
      <p className="text-xs text-ink-muted">{role}</p>
    </div>
  );
}
