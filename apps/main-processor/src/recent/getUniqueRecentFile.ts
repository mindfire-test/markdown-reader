import { RecentFile } from '@package/shared-types';
import { MAX_RECENT } from '../utils/path-constants';

export function getUniqueRecentFile(files: RecentFile[]): RecentFile[] {
  const seen = new Set<string>();
  const unique = files
    .filter((file) => {
      if (seen.has(file.path)) {
        return false;
      }
      seen.add(file.path);
      return true;
    })
    .slice(0, MAX_RECENT);
  return unique;
}
