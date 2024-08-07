/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "dubassets.com",
      },
      {
        hostname: "api.dicebear.com",
      },
    ],
  },
};

export default nextConfig;
