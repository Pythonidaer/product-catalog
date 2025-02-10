import next from 'next';
const { defineConfig } = next;

export default defineConfig({
  experimental: {
    appDir: true,
  },
  output: 'standalone',
});
