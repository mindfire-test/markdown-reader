import { join } from 'node:path';
import { app } from 'electron';
export function getRecentFilePath(): string {
  return join(app.getPath('userData'), 'recent.json');
}
