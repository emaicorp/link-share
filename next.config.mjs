/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['res.cloudinary.com'], // 👈 Add Cloudinary domain
  },
};

export default nextConfig;
