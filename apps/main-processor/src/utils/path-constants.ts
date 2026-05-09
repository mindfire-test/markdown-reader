import { app } from 'electron';
import { join } from 'node:path';

export const PATHS = {
  PRELOAD: join(__dirname, '../preload/index.js'),
  RENDERER_HTML: join(__dirname, '../renderer/index.html'),
  APP_ICON: app.isPackaged
    ? join(process.resourcesPath, 'assets/icon.ico')
    : join(process.cwd(), 'assets/icon.ico'),
} as const;

export const MAX_RECENT = 20;

export const MARKDOWN_FILE_PATTERN = /\.(md|markdown)$/i;
