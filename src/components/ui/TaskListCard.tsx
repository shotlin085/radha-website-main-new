"use client";

import { motion } from "motion/react";
import { TiltCard } from "@/components/ui/TiltCard";
import { Badge } from "@/components/ui/Badge";

const TASKS = [
  { label: "Shelf audit — Aisle 3", assignee: "Anita", status: "In progress" as const },
  { label: "Expiry check — Dairy", assignee: "Ramesh", status: "Pending" as const },
  { label: "Price update — Snacks", assignee: "Sohail", status: "Done" as const },
];

const STATUS_TONE = {
  "In progress": "warn",
  Pending: "neutral",
  Done: "success",
} as const;

export function TaskListCard() {
  return (
    <TiltCard className="w-full max-w-sm p-5">
      <span className="text-xs font-medium uppercase tracking-[0.08em] text-ink-muted">
        Today&apos;s tasks
      </span>
      <ul className="mt-3 flex flex-col gap-2">
        {TASKS.map((task, index) => (
          <motion.li
            key={task.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.3 }}
            className="flex items-center justify-between rounded-xl bg-surface-muted px-3 py-2.5"
          >
            <div>
              <p className="text-sm text-ink">{task.label}</p>
              <p className="text-xs text-ink-muted">{task.assignee}</p>
            </div>
            <Badge tone={STATUS_TONE[task.status]}>{task.status}</Badge>
          </motion.li>
        ))}
      </ul>
    </TiltCard>
  );
}
