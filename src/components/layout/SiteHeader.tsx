"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScroll, useMotionValueEvent } from "motion/react";
import { Menu } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { RadhaWordmark } from "@/components/ui/RadhaWordmark";
import { MobileNav } from "@/components/layout/MobileNav";
import { NavDropdown } from "@/components/layout/NavDropdown";
import { ProductMegaPanel, ResourcesPanel, CompanyPanel } from "@/components/layout/NavPanels";

// Flattened link set MobileNav renders (no mega-menu on mobile — the
// mockup's own mobile nav panel is a plain link list, not a nested menu).
export const NAV_LINKS = [
  { href: "/platform", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/showcase", label: "See RADHA in action" },
  { href: "/about", label: "Company" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const nextScrolled = latest > 8;
    setScrolled((current) => (current === nextScrolled ? current : nextScrolled));
  });

  return (
    <>
      {/* Solid header at all times — the mockup's SaaS nav bar is never a
          transparent hero overlay, unlike the old cinematic header. A
          hairline + shadow appear once scrolled for depth; nothing hides
          or auto-contrasts, since a mega-menu needs a stable, predictable
          bar to open against. */}
      <header
        className={`fixed inset-x-0 top-0 z-40 bg-surface/95 backdrop-blur-sm transition-shadow duration-200 ${
          scrolled ? "border-b border-hairline shadow-warm" : "border-b border-transparent"
        }`}
      >
        <Container className="flex h-20 items-center justify-between py-3">
          <Link href="/" aria-label="RADHA home" className="inline-flex items-center py-2.5">
            <RadhaWordmark className="text-ink" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 desktop:flex">
            <NavDropdown label="Product" panel={<ProductMegaPanel />} />
            <Link
              href="/platform"
              aria-current={pathname === "/platform" ? "page" : undefined}
              className="text-sm font-medium text-ink-muted transition-colors hover:text-ink aria-[current=page]:text-ink"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              aria-current={pathname === "/pricing" ? "page" : undefined}
              className="text-sm font-medium text-ink-muted transition-colors hover:text-ink aria-[current=page]:text-ink"
            >
              Pricing
            </Link>
            <NavDropdown label="Resources" panel={<ResourcesPanel />} />
            <NavDropdown label="Company" panel={<CompanyPanel />} />
          </nav>

          <div className="hidden items-center gap-3 desktop:flex">
            <Button href="/contact">Start with RADHA</Button>
          </div>

          <button
            ref={menuTriggerRef}
            type="button"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-nav"
            className="rounded-full p-3 text-ink desktop:hidden"
          >
            <Icon icon={Menu} size={24} />
          </button>
        </Container>
      </header>

      <div id="mobile-nav">
        <MobileNav
          open={mobileNavOpen}
          onClose={() => setMobileNavOpen(false)}
          links={NAV_LINKS}
          triggerRef={menuTriggerRef}
        />
      </div>
    </>
  );
}
