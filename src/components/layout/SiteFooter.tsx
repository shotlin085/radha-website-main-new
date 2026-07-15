import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { RadhaWordmark } from "@/components/ui/RadhaWordmark";
import { Icon } from "@/components/ui/Icon";

const FOOTER_LINKS = [
  {
    heading: "Products",
    links: [
      { href: "/platform", label: "RADHA ISHA" },
      { href: "/#products", label: "RADHA VANI" },
      { href: "/#products", label: "RADHA YUGA" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/#about", label: "About" },
      { href: "/#vision", label: "Vision" },
      { href: "/contact", label: "Careers" },
      { href: "/contact", label: "Press" },
      { href: "/#contact", label: "Contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { href: "/about", label: "Blogs" },
      { href: "/platform", label: "Documentation" },
      { href: "/contact", label: "Help Center" },
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/terms", label: "Terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-[#f7f7f5]">
      <Container className="grid gap-12 py-16 tablet:py-20 desktop:grid-cols-[1.45fr_0.8fr_0.8fr_0.95fr] desktop:gap-16">
        <div>
          <RadhaWordmark className="text-ink" />
          <p className="mt-5 max-w-sm text-sm leading-6 text-ink-muted">
            Building intelligent products inspired by timeless wisdom, for businesses, people, and the
            knowledge we carry forward.
          </p>
          <div className="mt-7 flex flex-col text-sm text-ink-muted">
            <a href="mailto:hello@radha.app" className="inline-flex items-center gap-2 py-2 hover:text-ink">
              <Icon icon={Mail} size={16} />
              hello@radha.app
            </a>
            <a href="tel:+18001237890" className="inline-flex items-center gap-2 py-2 hover:text-ink">
              <Icon icon={Phone} size={16} />
              1800 123 7890
            </a>
          </div>
        </div>

        {FOOTER_LINKS.map((group) => (
          <nav key={group.heading} aria-label={group.heading}>
            <h2 className="mb-3 text-sm font-semibold text-ink">{group.heading}</h2>
            <ul className="flex flex-col">
              {group.links.map((link) => (
                <li key={`${group.heading}-${link.label}`}>
                  <Link href={link.href} className="block py-2.5 text-sm text-ink-muted hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      <Container className="flex flex-col gap-3 border-t border-black/10 py-6 text-xs text-ink-muted tablet:flex-row tablet:items-center tablet:justify-between">
        <p>Copyright {new Date().getFullYear()} RADHA AI. All rights reserved.</p>
        <p>Meaningful intelligence, built responsibly in India.</p>
      </Container>
    </footer>
  );
}
