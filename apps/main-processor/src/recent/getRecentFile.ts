import { readFile } from 'node:fs/promises';
import type { RecentFile } from '@package/shared-types';
import { getRecentFilePath } from '../utils/helper/path-helper';
import { getUniqueRecentFile } from './getUniqueRecentFile';

export async function getRecentFiles(): Promise<RecentFile[]> {
  try {
    const raw = await readFile(getRecentFilePath(), 'utf-8');
    const files = JSON.parse(raw) as RecentFile[];
    return getUniqueRecentFile(files);
  } catch {
    return [];
  }
}
