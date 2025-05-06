import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  },
};

export default nextConfig;
