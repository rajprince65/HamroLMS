// next.config.ts  (or next.config.js)
// Add this to allow next/image to load images from the eSchool CDN
// and Unsplash (used in aboutData).

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "crestwood-academy.eschool-saas.wrteam.me",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;