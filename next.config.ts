import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  eslint: {
    dirs: ["pages", "utils"], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
    ignoreDuringBuilds: true, // Disable ESLint errors during production builds
  },
  typescript: {
    ignoreBuildErrors: true, // Disable TypeScript type checking during production builds
  },
};
export default nextConfig;
