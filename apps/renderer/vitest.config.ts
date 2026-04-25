import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './setup.ts',
  },
  resolve: {
    alias: {
      '@renderer': resolve(__dirname, './src'),
    },
  },
});
