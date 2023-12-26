/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", process.env.VERCEL_URL],
  },
};

module.exports = nextConfig;
