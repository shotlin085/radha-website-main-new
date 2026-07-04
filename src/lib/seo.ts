import type { Metadata } from "next";

const SITE_NAME = "RADHA";
const SITE_DESCRIPTION =
  "RADHA helps Indian retail teams scan products, verify EANs, prevent expiry loss, manage GRN, assign tasks, and improve store health from one mobile-first audit platform.";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://radha-website-main-new.vercel.app";

const SITE_KEYWORDS = [
  "RADHA",
  "Indian retail audit software",
  "store health platform",
  "expiry management",
  "EAN verification",
  "GRN app",
  "retail task management",
  "inventory audit app",
  "kirana store operations",
];

export function buildMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} - Retail audits, expiry and store health`,
      template: `%s - ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    keywords: SITE_KEYWORDS,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      siteName: SITE_NAME,
      type: "website",
      url: SITE_URL,
      title: `${SITE_NAME} - Retail audits, expiry and store health`,
      description: SITE_DESCRIPTION,
      images: [
        {
          url: "/assets/radha/posters/01-radha-reveal-final.jpg",
          width: 1200,
          height: 675,
          alt: "RADHA retail audit platform for Indian stores",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} - Retail audits, expiry and store health`,
      description: SITE_DESCRIPTION,
      images: ["/assets/radha/posters/01-radha-reveal-final.jpg"],
    },
    ...overrides,
  };
}

export { SITE_NAME, SITE_DESCRIPTION, SITE_URL };
