import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Completely disable image optimization to avoid Vercel 402 errors
    unoptimized: process.env.NEXT_PUBLIC_DISABLE_IMAGE_OPTIMIZATION === 'true' || true,
    // Disable all image optimization features
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Remove remote patterns to force unoptimized mode
    remotePatterns: [],
    // Force disable all optimization
    formats: [],
    deviceSizes: [],
    imageSizes: [],
    minimumCacheTTL: 0,
  },
  // Add experimental features for better image handling
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Force cache invalidation
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },
  // Disable image optimization at build time
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;
