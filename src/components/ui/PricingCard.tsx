import { Check } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export interface PricingTier {
  name: string;
  description: string;
  monthlyPrice: number;
  features: string[];
  highlighted?: boolean;
}

interface PricingCardProps {
  tier: PricingTier;
  yearly: boolean;
}

export function PricingCard({ tier, yearly }: PricingCardProps) {
  const price = yearly ? Math.round(tier.monthlyPrice * 0.8) : tier.monthlyPrice;

  return (
    <TiltCard
      className={`flex w-full flex-col p-6 ${
        // Deliberate asymmetry — the highlighted tier breaks out of the
        // 3-card grid line rather than normalizing all three to the same
        // size, per the frontend-design skill's "take one real aesthetic
        // risk" guidance and the mockup's own slightly-larger "Growth" card.
        tier.highlighted
          ? "border-brand-600 shadow-[0_8px_28px_rgba(154,52,18,0.14)] ring-2 ring-brand-600 tablet:-translate-y-3 tablet:scale-[1.03]"
          : ""
      }`}
    >
      {tier.highlighted ? (
        <Badge tone="brand" className="mb-3 w-fit">
          Most popular
        </Badge>
      ) : null}
      <h3 className="text-lg font-semibold text-ink">{tier.name}</h3>
      <p className="mt-1 text-sm text-ink-muted">{tier.description}</p>
      <p className="mt-5 font-mono text-4xl font-bold text-ink">
        ₹{price}
        <span className="text-base font-normal text-ink-muted">/month</span>
      </p>
      <ul className="mt-5 flex flex-col gap-2 text-sm text-ink-muted">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <Icon icon={Check} size={14} className="flex-shrink-0 text-success" />
            {feature}
          </li>
        ))}
      </ul>
      <Button
        href="/contact"
        variant={tier.highlighted ? "primary" : "secondary"}
        className="mt-6 w-full"
      >
        Start free trial
      </Button>
    </TiltCard>
  );
}
