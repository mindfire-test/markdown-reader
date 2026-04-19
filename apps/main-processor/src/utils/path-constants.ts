import { join } from 'node:path';

export const PATHS = {
  PRELOAD: join(__dirname, '../preload/index.js'),
  RENDERER_HTML: join(__dirname, '../renderer/index.html'),
} as const;
