/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "funny-smile-ef21835ece.media.strapiapp.com",
      },
    ],
  },
};

module.exports = nextConfig;
