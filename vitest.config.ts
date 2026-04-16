import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react({})],
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.{test,spec}.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@shared': resolve(__dirname, 'apps/shared/src'),
      '@renderer': resolve(__dirname, 'apps/renderer/src'),
      '@main': resolve(__dirname, 'apps/main-processor/src'),
    },
  },
});
