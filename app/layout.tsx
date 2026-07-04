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

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "RADHA",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Android, iOS, Web",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  offers: {
    "@type": "Offer",
    category: "SaaS subscription",
  },
  audience: {
    "@type": "Audience",
    audienceType: "Indian retail store owners and retail operations teams",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          id="radha-software-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
      </body>
    </html>
  );
}
