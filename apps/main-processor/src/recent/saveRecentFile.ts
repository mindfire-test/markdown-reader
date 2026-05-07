import { RecentFile } from '@package/shared-types';
import { getRecentFilePath } from '../utils/helper/path-helper';
import { dirname } from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';

export async function saveRecentFile(files: RecentFile[]): Promise<void> {
  const filePath = getRecentFilePath();
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(files, null, 2), 'utf-8');
}
