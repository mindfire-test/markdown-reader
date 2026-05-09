import { basename } from 'node:path';
import { RecentFile } from '@package/shared-types';

export function createRecentFile(filePath: string): RecentFile {
  return {
    path: filePath,
    name: basename(filePath),
    openedAt: Date.now(),
  };
}
