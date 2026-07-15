import type { Metadata } from "next";

const SITE_NAME = "RADHA AI";
const SITE_DESCRIPTION =
  "RADHA AI is an Indian artificial intelligence company building focused products for retail intelligence, meaningful human conversations, and interactive learning.";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://radha-website-main-new.vercel.app";

const SITE_KEYWORDS = [
  "RADHA AI",
  "Indian artificial intelligence company",
  "RADHA ISHA",
  "RADHA VANI",
  "RADHA YUGA",
  "AI retail intelligence",
  "AI companion",
  "interactive learning platform",
  "responsible artificial intelligence",
  "computer vision India",
];

export function buildMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} - AI that understands work and people`,
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
      title: `${SITE_NAME} - AI that understands work and people`,
      description: SITE_DESCRIPTION,
      images: [
        {
          url: "/assets/radha/cinematic-v2/webp/12-about-mission.webp",
          width: 1680,
          height: 945,
          alt: "RADHA AI building useful intelligence from real operational experience",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} - AI that understands work and people`,
      description: SITE_DESCRIPTION,
      images: ["/assets/radha/cinematic-v2/webp/12-about-mission.webp"],
    },
    ...overrides,
  };
}

export { SITE_NAME, SITE_DESCRIPTION, SITE_URL };
