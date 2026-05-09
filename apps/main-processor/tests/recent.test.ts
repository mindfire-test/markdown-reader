import { vi, describe, it, expect } from 'vitest';
vi.mock('electron', () => ({
  app: {
    isPackaged: false,
  },
}));
import { RecentFile } from '@package/shared-types';
import { addToRecentList } from '../src/recent/addToRecentList';
import { getUniqueRecentFile } from '../src/recent/getUniqueRecentFile';
import { removeFromRecentList } from '../src/recent/removeFromRecentList';

const mk = (path: string): RecentFile => ({
  path,
  name: path.split('/').pop() ?? path,
  openedAt: Date.now(),
});

describe('recent list functions', () => {
  it('addToRecentList puts new file at the front', () => {
    const r = addToRecentList([mk('/b.md')], '/a.md');
    expect(r[0]?.path).toBe('/a.md');
  });

  it('addToRecentList moves existing file to front without duplicating', () => {
    const r = addToRecentList([mk('/a.md'), mk('/b.md')], '/b.md');
    expect(r[0]?.path).toBe('/b.md');
    expect(r).toHaveLength(2);
  });

  it('getUniqueRecetFiles list at 20 items', () => {
    const big = Array.from({ length: 25 }, (_, i) => mk(`/f${i}.md`));
    expect(getUniqueRecentFile(big)).toHaveLength(20);
  });

  it('getUniqueRecentFiles removes duplicate paths', () => {
    const r = getUniqueRecentFile([mk('/a.md'), mk('/b.md'), mk('/a.md')]);
    expect(r.filter((f) => f.path === '/a.md')).toHaveLength(1);
  });

  it('removeFromRecentList removes specified path', () => {
    const r = removeFromRecentList([mk('/a.md'), mk('/b.md')], '/a.md');
    expect(r.find((f) => f.path === '/a.md')).toBeUndefined();
  });

  it('addToRecentList on empty list creates a one-item list', () => {
    const r = addToRecentList([], '/first.md');
    expect(r).toHaveLength(1);
    expect(r[0]?.path).toBe('/first.md');
  });
});
