import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { RadhaWordmark } from "@/components/ui/RadhaWordmark";
import { Icon } from "@/components/ui/Icon";

const FOOTER_LINKS = [
  {
    heading: "Product",
    links: [
      { href: "/platform", label: "Features" },
      { href: "/pricing", label: "Pricing" },
      { href: "/showcase", label: "See RADHA in action" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { href: "/contact", label: "Help center" },
      { href: "/about", label: "Blog" },
      { href: "/platform", label: "Guides" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About us" },
      { href: "/contact", label: "Contact" },
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/terms", label: "Terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/8 bg-surface-muted">
      <Container className="grid gap-10 py-16 tablet:grid-cols-[1.4fr_1fr_1fr_1fr_1.1fr]">
        <div>
          <RadhaWordmark className="text-ink" />
          <p className="mt-4 max-w-xs text-sm text-ink-muted">
            Retail audits, expiry and store health — built for Indian retail
            operations.
          </p>
        </div>
        {FOOTER_LINKS.map((group) => (
          <nav key={group.heading} aria-label={group.heading}>
            <h2 className="mb-4 text-sm font-semibold text-ink">{group.heading}</h2>
            <ul className="flex flex-col">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-3 text-sm text-ink-muted hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div>
          <h2 className="mb-4 text-sm font-semibold text-ink">We&apos;re here to help</h2>
          <ul className="flex flex-col text-sm text-ink-muted">
            <li>
              <a href="tel:+18001237890" className="inline-flex items-center gap-2 py-3 hover:text-ink">
                <Icon icon={Phone} size={16} />
                1800 123 7890
              </a>
            </li>
            <li>
              <a href="mailto:hello@radha.app" className="inline-flex items-center gap-2 py-3 hover:text-ink">
                <Icon icon={Mail} size={16} />
                hello@radha.app
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <Container className="border-t border-ink/8 py-6">
        <p className="text-xs text-ink-muted">
          © {new Date().getFullYear()} RADHA. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
