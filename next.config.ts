// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true, // ← was experimental.typedRoutes
  // if you load update photos from external domains, whitelist them:
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      // { protocol: "https", hostname: "your-cdn.example.com" },
    ],
  },
};

export default nextConfig;
