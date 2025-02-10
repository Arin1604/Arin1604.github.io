/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static export
  images: {
    unoptimized: true, // Needed because Next.js Image Optimization doesn't work with static export
  },
};

module.exports = nextConfig;
