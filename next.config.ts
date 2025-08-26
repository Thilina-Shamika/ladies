import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Completely disable image optimization to avoid Vercel 402 errors
    unoptimized: true,
    // Disable all image optimization features
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Remove remote patterns to force unoptimized mode
    remotePatterns: [],
  },
  // Add experimental features for better image handling
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Force cache invalidation
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },
};

export default nextConfig;
