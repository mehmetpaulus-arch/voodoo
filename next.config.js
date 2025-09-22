/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  trailingSlash: true,
  distDir: 'out',
  // Disable Netlify Next.js plugin
  experimental: {
    outputFileTracingRoot: undefined,
  },
  // Force static export
  generateBuildId: async () => {
    return 'static-build'
  },
};

module.exports = nextConfig;
