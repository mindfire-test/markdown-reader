import { resolve } from 'path';
import { defineConfig } from 'electron-vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  main: {
    build: {
      externalizeDeps: true,
      lib: {
        entry: resolve(__dirname, 'apps/main-processor/src/index.ts'),
      },
    },
  },
  preload: {
    build: {
      externalizeDeps: true,
      lib: {
        entry: resolve(__dirname, 'apps/preload/src/index.ts'),
      },
    },
  },
  renderer: {
    root: resolve(__dirname, 'apps/renderer'),
    plugins: [tailwindcss(), react({})],
    build: {
      rollupOptions: {
        input: resolve(__dirname, 'apps/renderer/index.html'),
      },
    },
  },
});
