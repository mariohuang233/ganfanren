/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  // 启用 instrumentation
  experimental: {
    instrumentationHook: true,
  },
};

export default nextConfig;
