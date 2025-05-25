/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ladies.local'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'ladies.local',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig; 