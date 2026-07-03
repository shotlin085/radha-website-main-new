import type { Metadata } from "next";

const SITE_NAME = "RADHA";
const SITE_DESCRIPTION =
  "RADHA is the connected platform that turns every product scan into verified truth — from label intelligence to retail operations to private owner insight.";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://radha.example.com";

export function buildMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} — Connected Product Truth`,
      template: `%s — ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    openGraph: {
      siteName: SITE_NAME,
      type: "website",
      title: `${SITE_NAME} — Connected Product Truth`,
      description: SITE_DESCRIPTION,
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} — Connected Product Truth`,
      description: SITE_DESCRIPTION,
    },
    ...overrides,
  };
}

export { SITE_NAME, SITE_DESCRIPTION, SITE_URL };
