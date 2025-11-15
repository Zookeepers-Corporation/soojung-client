import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-5c340c05c27246498125f2571736821e.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
