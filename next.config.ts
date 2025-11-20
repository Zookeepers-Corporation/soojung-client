import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-5c340c05c27246498125f2571736821e.r2.dev",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pub-3f0ad8c5a9a246dc879c588ff0fbbd70.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
