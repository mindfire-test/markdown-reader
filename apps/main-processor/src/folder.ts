import { readdir } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { FileType } from '@package/shared-types';
import { isMarkdownFile } from './utils/helper/path-helper';

export async function getFolder(folderPath: string): Promise<FileType> {
  const entries = await readdir(folderPath, { withFileTypes: true });
  const children: FileType[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;

    const fullPath = join(folderPath, entry.name);

    if (entry.isDirectory()) {
      children.push(await getFolder(fullPath));
      continue;
    }

    if (isMarkdownFile(entry.name)) {
      children.push({
        name: entry.name,
        path: fullPath,
        isDir: false,
      });
    }
  }

  return {
    name: basename(folderPath),
    path: folderPath,
    isDir: true,
    children,
  };
}
