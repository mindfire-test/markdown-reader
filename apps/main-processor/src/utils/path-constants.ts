import { join } from 'node:path';

export const PATHS = {
  PRELOAD: join(__dirname, '../preload/index.js'),
  RENDERER_HTML: join(__dirname, '../renderer/index.html'),
} as const;

export const MAX_RECENT = 20;

export const MARKDOWN_FILE_PATTERN = /\.(md|markdown)$/i;
