import { RecentFile } from '@package/shared-types';
export function removeFromRecentList(files: RecentFile[], filePath: string): RecentFile[] {
  const remove = files.filter((file) => file.path !== filePath);
  return remove;
}
