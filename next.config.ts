import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "frontend-test-api.digitalcreative.cn" },
    ],
  },
};

export default nextConfig;
