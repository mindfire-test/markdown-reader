import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    exclude: ['dist/**', 'node_modules/**'],
  },
  resolve: {
    alias: {
      '@main': resolve(__dirname, './src'),
    },
  },
});
