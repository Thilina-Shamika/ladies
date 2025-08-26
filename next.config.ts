import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Completely disable image optimization to avoid Vercel 402 errors
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kal.cse.mybluehost.me',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'kal.cse.mybluehost.me',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ladies.local',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'ladies.local',
        port: '',
        pathname: '/**',
      },
    ],
    // Add fallback for when Vercel image optimization fails
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Add experimental features for better image handling
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
