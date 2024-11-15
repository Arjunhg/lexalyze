import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/auth/:path*",
        destination: "https://lexalyze-8950.onrender.com/auth/:path*",
      },
      {
        source: "/contracts/:path*",
        destination: "https://lexalyze-8950.onrender.com/contracts/:path*",
      },
      {
        source: "/payment/:path*",
        destination: "https://lexalyze-8950.onrender.com/payment/:path*",
      },
    ];
  },
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_CLIENT_URL: process.env.NODE_ENV === 'production'
      ? 'https://lexalyze-rust.vercel.app'
      : 'http://localhost:3000',
  },
};

export default nextConfig;
