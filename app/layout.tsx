import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { plusJakartaSans, jetbrainsMono } from "@/lib/fonts";
import { buildMetadata, SITE_DESCRIPTION, SITE_URL } from "@/lib/seo";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SkipLink } from "@/components/layout/SkipLink";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageTransition } from "@/components/layout/PageTransition";

export const metadata: Metadata = buildMetadata();

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RADHA AI",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  foundingLocation: {
    "@type": "Country",
    name: "India",
  },
  slogan: "AI that understands work and people",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "RADHA AI products",
    itemListElement: [
      {
        "@type": "Offer",
        availability: "https://schema.org/PreOrder",
        itemOffered: {
          "@type": "SoftwareApplication",
          name: "RADHA ISHA",
          applicationCategory: "BusinessApplication",
          description: "AI retail intelligence for inventory, expiry, barcode intelligence, OCR, audits, and analytics.",
        },
      },
      {
        "@type": "Offer",
        availability: "https://schema.org/PreOrder",
        itemOffered: {
          "@type": "SoftwareApplication",
          name: "RADHA VANI",
          applicationCategory: "LifestyleApplication",
          description: "A personal AI companion designed for meaningful conversation, reflection, and growth.",
        },
      },
      {
        "@type": "Offer",
        availability: "https://schema.org/PreOrder",
        itemOffered: {
          "@type": "SoftwareApplication",
          name: "RADHA YUGA",
          applicationCategory: "EducationalApplication",
          description: "Interactive learning through stories, challenges, quests, and reflective gameplay.",
        },
      },
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <MotionProvider>
          <SkipLink />
          <SiteHeader />
          <PageTransition>{children}</PageTransition>
          <SiteFooter />
        </MotionProvider>
        <Script
          id="radha-ai-organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
