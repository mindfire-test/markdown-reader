import { RecentFile } from '@package/shared-types';
import { createRecentFile } from './createRecentFile';
import { getUniqueRecentFile } from './getUniqueRecentFile';

export function addToRecentList(files: RecentFile[], filePath: string): RecentFile[] {
  const nextFile = createRecentFile(filePath);
  const noDuplicate = files.filter((file) => file.path !== filePath);
  return getUniqueRecentFile([nextFile, ...noDuplicate]);
}
