import { join } from 'node:path';
import { app } from 'electron';
export function getRecentFilePath(): string {
  return join(app.getPath('userData'), 'recent.json');
}

export function isMarkdownFile(fileName: string): boolean {
  return /\.(md|markdown)$/i.test(fileName);
}
