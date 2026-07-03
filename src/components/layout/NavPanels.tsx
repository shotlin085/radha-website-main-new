import Link from "next/link";
import Image from "next/image";
import {
  Activity,
  PackageCheck,
  Clock,
  ShieldCheck,
  Boxes,
  ListChecks,
  LineChart,
  Bell,
  ClipboardCheck,
} from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

interface MegaMenuItem {
  label: string;
  description: string;
  icon: typeof Activity;
  href: string;
}

const CORE: MegaMenuItem[] = [
  { label: "Store Health", description: "Track your store score and improve every day.", icon: Activity, href: "/platform#store-health" },
  { label: "GRN", description: "Record goods received and match with confidence.", icon: PackageCheck, href: "/platform#grn" },
  { label: "Expiry Intelligence", description: "Reduce expiry losses before they hurt.", icon: Clock, href: "/platform#expiry-intelligence" },
  { label: "EAN Verification", description: "Verify every product, instantly.", icon: ShieldCheck, href: "/platform#ean-verification" },
];

const OPERATIONS: MegaMenuItem[] = [
  { label: "Inventory", description: "Lightweight inventory, easy to trust.", icon: Boxes, href: "/platform#inventory" },
  { label: "Tasks", description: "Assign work and get things done.", icon: ListChecks, href: "/platform#tasks" },
];

const VISIBILITY: MegaMenuItem[] = [
  { label: "Reports", description: "See what matters, decide faster.", icon: LineChart, href: "/platform#reports" },
  { label: "Alerts", description: "Stay on top of risk, in real time.", icon: Bell, href: "/platform#alerts" },
  { label: "Audit Ready", description: "Be inspection ready, every day.", icon: ClipboardCheck, href: "/platform#audit-ready" },
];

function MegaMenuColumn({ heading, items }: { heading: string; items: MegaMenuItem[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted">{heading}</h3>
      <ul className="mt-3 flex flex-col gap-1">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="group flex items-start gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-surface-muted"
            >
              <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-100">
                <Icon icon={item.icon} size={16} />
              </span>
              <span>
                <span className="block text-sm font-medium text-ink">{item.label}</span>
                <span className="block text-xs text-ink-muted">{item.description}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// The one full mega-menu called for in the mockup — Product's 3-column
// layout plus a promo tile that deliberately points at /showcase, reusing
// the existing cinematic sequence viewer as the "see it in action" demo
// rather than building a second, redundant preview.
export function ProductMegaPanel() {
  return (
    <div className="grid w-[min(90vw,44rem)] grid-cols-[1fr_1fr_1fr_1.1fr] gap-8">
      <MegaMenuColumn heading="Core" items={CORE} />
      <MegaMenuColumn heading="Operations" items={OPERATIONS} />
      <MegaMenuColumn heading="Visibility" items={VISIBILITY} />
      <div className="rounded-xl bg-surface-muted p-5">
        <Image
          src="/assets/mor/search-think.webp"
          alt="Mor, the RADHA peacock, holding a magnifying glass"
          width={1254}
          height={1254}
          className="h-14 w-14 object-contain"
        />
        <h3 className="mt-3 text-sm font-semibold text-ink">See RADHA in action</h3>
        <p className="mt-1 text-xs text-ink-muted">
          Watch how a real store goes from shelf chaos to store control.
        </p>
        <Button href="/showcase" variant="secondary" className="mt-4 w-full text-xs">
          Book demo
        </Button>
      </div>
    </div>
  );
}

const RESOURCES_LINKS = [
  { label: "Help center", href: "/contact" },
  { label: "Blog", href: "/about" },
  { label: "Guides", href: "/platform" },
  { label: "Showcase", href: "/showcase" },
];

const COMPANY_LINKS = [
  { label: "About us", href: "/about" },
  { label: "Careers", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/legal/privacy" },
];

function SimpleLinkPanel({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="flex w-44 flex-col gap-1">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className="block rounded-lg px-2 py-2 text-sm text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function ResourcesPanel() {
  return <SimpleLinkPanel links={RESOURCES_LINKS} />;
}

export function CompanyPanel() {
  return <SimpleLinkPanel links={COMPANY_LINKS} />;
}
