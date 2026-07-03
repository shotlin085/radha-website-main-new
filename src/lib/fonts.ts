import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";

// Stand-ins for the brand's custom fonts, which have not been delivered yet
// (see docs/ASSET_AUDIT.md). Same families, loaded via next/font/google.
export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
