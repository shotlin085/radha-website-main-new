"use client";

import { useEffect, useRef, useState } from "react";
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
  const [productWorld, setProductWorld] = useState<"default" | "isha" | "vani" | "yuga">("default");
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();
  const overHero = pathname === "/" && !scrolled;
  const darkNavigation = overHero || productWorld === "vani";

  useEffect(() => {
    const handleProductWorld = (event: Event) => {
      const nextWorld = (event as CustomEvent<{ world: "default" | "isha" | "vani" | "yuga" }>).detail.world;
      setProductWorld(nextWorld);
    };

    window.addEventListener("radha:product-world", handleProductWorld);
    return () => window.removeEventListener("radha:product-world", handleProductWorld);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const nextScrolled = latest > 8;
    setScrolled((current) => (current === nextScrolled ? current : nextScrolled));
  });

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-300 ${
          scrolled
            ? productWorld === "vani"
              ? "border-b border-white/10 bg-[#090908]/94 backdrop-blur-xl"
              : productWorld === "isha"
                ? "border-b border-black/10 bg-[#e9e2d3]/94 backdrop-blur-xl"
                : productWorld === "yuga"
                  ? "border-b border-black/10 bg-[#cfc5aa]/94 backdrop-blur-xl"
                  : "border-b border-black/10 bg-[#f7f7f5]/94 backdrop-blur-xl"
            : overHero
              ? "border-b border-transparent bg-black/18 backdrop-blur-md"
              : "border-b border-transparent bg-[#f7f7f5]/76 backdrop-blur-md"
        }`}
      >
        <Container className="flex h-20 items-center justify-between py-3">
          <Link href="/" aria-label="RADHA AI home" className="inline-flex items-center gap-3 py-2.5">
            <RadhaWordmark className={darkNavigation ? "text-white" : "text-ink"} />
            {productWorld !== "default" ? (
              <span className={`hidden border-l pl-3 text-[10px] font-semibold tracking-[0.12em] tablet:inline ${darkNavigation ? "border-white/18 text-[#e0b65d]" : "border-black/16 text-[#795317]"}`}>
                {productWorld.toUpperCase()}
              </span>
            ) : null}
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-6 desktop:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={link.href === "/" && pathname === "/" ? "page" : undefined}
                className={`relative py-2 text-sm font-medium transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-[#e8ba5a] after:transition-transform hover:after:scale-x-100 ${
                  darkNavigation ? "text-white/70 hover:text-white aria-[current=page]:text-white" : "text-black/62 hover:text-black aria-[current=page]:text-black"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 desktop:flex">
            <Button href="/#contact" variant="ghost" className={darkNavigation ? "px-4 text-white hover:bg-white/10" : "px-4"}>
              Get early access
            </Button>
            <Button href="/#contact" className={darkNavigation ? "bg-[#e4ad42] text-[#171510] hover:bg-[#f0c76f]" : ""}>Join beta</Button>
          </div>

          <button
            ref={menuTriggerRef}
            type="button"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-nav"
            className={`rounded-full p-3 desktop:hidden ${darkNavigation ? "text-white" : "text-ink"}`}
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
