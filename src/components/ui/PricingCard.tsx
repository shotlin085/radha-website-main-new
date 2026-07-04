import { Check } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export interface PricingTier {
  name: string;
  description: string;
  monthlyPrice: number;
  dailyPrice: number;
  dailyDescription: string;
  features: string[];
  dailyFeatures: string[];
  highlighted?: boolean;
}

interface PricingCardProps {
  tier: PricingTier;
  billingMode: "daily" | "monthly" | "yearly";
}

export function PricingCard({ tier, billingMode }: PricingCardProps) {
  const daily = billingMode === "daily";
  const yearly = billingMode === "yearly";
  const price = daily ? tier.dailyPrice : yearly ? Math.round(tier.monthlyPrice * 0.8) : tier.monthlyPrice;
  const displayName = daily ? `${tier.name} Day Pass` : tier.name;
  const description = daily ? tier.dailyDescription : tier.description;
  const features = daily ? tier.dailyFeatures : tier.features;
  const suffix = daily ? "/day" : "/month";

  return (
    <TiltCard
      className={`flex w-full flex-col p-6 ${
        tier.highlighted
          ? "border-brand-600 shadow-[0_8px_28px_rgba(154,52,18,0.14)] ring-2 ring-brand-600 tablet:-translate-y-3 tablet:scale-[1.03]"
          : ""
      }`}
    >
      {tier.highlighted ? (
        <Badge tone="brand" className="mb-3 w-fit">
          {daily ? "Popular" : "Most popular"}
        </Badge>
      ) : null}
      <h3 className="text-lg font-semibold text-ink">{displayName}</h3>
      <p className="mt-1 text-sm text-ink-muted">{description}</p>
      {daily ? <p className="mt-3 text-sm font-medium text-brand-700">24-hour access</p> : null}
      <p className="mt-5 font-mono text-4xl font-bold text-ink">
        {"\u20B9"}
        {price}
        <span className="text-base font-normal text-ink-muted">{suffix}</span>
      </p>
      <ul className="mt-5 flex flex-col gap-2 text-sm text-ink-muted">
        {features.map((feature) => (
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
        {daily ? `Get ${tier.name} for 1 day` : "Start free trial"}
      </Button>
    </TiltCard>
  );
}
