import { join } from 'node:path';
import { app } from 'electron';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import type { RecentFile } from '@package/shared-types';
import { basename } from 'node:path';
import { getRecentFilePath } from './utils/helper/path-helper';
import { MAX_RECENT } from './utils/path-constants';

export async function getRecentFiles(): Promise<RecentFile[]> {
  try {
    const raw = await readFile(getRecentFilePath(), 'utf-8');
    return JSON.parse(raw) as RecentFile[];
  } catch {
    return [];
  }
}

export async function addRecentFile(filePath: string): Promise<void> {
  const existing = await getRecentFiles();
  const filtered = existing.filter((f) => f.path !== filePath);
  const updated: RecentFile[] = [
    { path: filePath, name: basename(filePath), openedAt: Date.now() },
    ...filtered,
  ].slice(0, MAX_RECENT);
  await mkdir(join(app.getPath('userData')), { recursive: true });
  await writeFile(getRecentFilePath(), JSON.stringify(updated, null, 2), 'utf-8');
}
