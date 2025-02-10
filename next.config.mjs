import { defineConfig } from 'next';

const nextConfig = defineConfig({
  experimental: {
    appDir: true,
  },
  output: 'standalone', // Useful for Railway
});

export default nextConfig;
