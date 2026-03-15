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
  // 优化构建
  swcMinify: true,
  // 减少构建输出大小
  compress: true,
  // 禁用source map以减小体积
  productionBrowserSourceMaps: false,
  // 优化包大小
  webpack: (config, { isServer }) => {
    // 优化客户端包
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
