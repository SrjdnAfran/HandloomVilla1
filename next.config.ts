import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',  // allows any path on unsplash (including query params like ?w=800)
      },
    ],
  },
};

export default nextConfig;
