import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    qualities: [70, 75, 92],
  },
};

export default nextConfig;
