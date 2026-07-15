"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMotionValueEvent, useScroll } from "motion/react";
import { Menu } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { RadhaWordmark } from "@/components/ui/RadhaWordmark";
import { MobileNav } from "@/components/layout/MobileNav";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#products", label: "Products" },
  { href: "/#vision", label: "Vision" },
  { href: "/#technology", label: "Technology" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
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
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-300 ${
          scrolled
            ? "border-b border-black/10 bg-[#f7f7f5]/94 backdrop-blur-xl"
            : "border-b border-transparent bg-[#f7f7f5]/76 backdrop-blur-md"
        }`}
      >
        <Container className="flex h-20 items-center justify-between py-3">
          <Link href="/" aria-label="RADHA AI home" className="inline-flex items-center py-2.5">
            <RadhaWordmark className="text-ink" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-6 desktop:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={link.href === "/" && pathname === "/" ? "page" : undefined}
                className="relative py-2 text-sm font-medium text-black/62 transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-[#9a6818] after:transition-transform hover:text-black hover:after:scale-x-100 aria-[current=page]:text-black"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 desktop:flex">
            <Button href="/#contact" variant="ghost" className="px-4">
              Get started
            </Button>
            <Button href="/#contact">Join beta</Button>
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
