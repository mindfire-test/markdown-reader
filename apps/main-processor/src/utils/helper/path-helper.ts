import { join } from 'node:path';
import { app } from 'electron';
import { MARKDOWN_FILE_PATTERN } from '../path-constants';
export function getRecentFilePath(): string {
  return join(app.getPath('userData'), 'recent.json');
}

export function isMarkdownFile(fileName: string): boolean {
  return MARKDOWN_FILE_PATTERN.test(fileName);
}
