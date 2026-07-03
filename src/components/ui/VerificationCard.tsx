"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";
import { TiltCard } from "@/components/ui/TiltCard";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";

export function VerificationCard() {
  return (
    <TiltCard className="w-full max-w-sm p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-[0.08em] text-ink-muted">Verification</span>
        <Badge tone="success">
          <Icon icon={Check} size={12} />
          Match
        </Badge>
      </div>
      <p className="mt-4 text-sm font-semibold text-ink">
        Wheat Atta <span className="font-normal text-ink-muted">· 5kg · Whole Wheat Flour</span>
      </p>
      <dl className="mt-3 grid grid-cols-2 gap-y-2 text-xs">
        <dt className="text-ink-muted">EAN</dt>
        <dd className="text-right font-mono text-ink">8901234567890</dd>
        <dt className="text-ink-muted">MRP</dt>
        <dd className="text-right font-mono text-ink">₹265.00</dd>
        <dt className="text-ink-muted">Brand</dt>
        <dd className="text-right text-ink">Golden Fields</dd>
      </dl>
      {/* The mockup's literal "green success pulse" annotation — a soft
          expanding ring around the verified pill, once, on scroll into
          view. Respects reduced motion via MotionConfig's global
          reducedMotion="user" (see MotionProvider) rather than a local
          branch here. */}
      <motion.div
        initial={{ boxShadow: "0 0 0 0 rgba(22,163,74,0.35)" }}
        whileInView={{ boxShadow: "0 0 0 10px rgba(22,163,74,0)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-success/10 py-3 text-sm font-medium text-success"
      >
        <Icon icon={Check} size={16} />
        Verified
      </motion.div>
    </TiltCard>
  );
}
