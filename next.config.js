/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ladies.local', 'kal.cse.mybluehost.me'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kal.cse.mybluehost.me',
        port: '',
        pathname: '/wp-content/**',
      },
      {
        protocol: 'http',
        hostname: 'ladies.local',
        port: '',
        pathname: '/wp-content/**',
      },
    ],
  },
};

module.exports = nextConfig; 