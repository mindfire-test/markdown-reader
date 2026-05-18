import { describe, it, expect } from 'vitest';
import { extractDroppedMdpath } from '../../src/renderer/drag-drop';

const makeTransfer = (files: { name: string; path: string }[]) =>
  ({
    files: {
      length: files.length,
      item: (i: number) => files[i] ?? null,
    },
  }) as unknown as DataTransfer;

describe('extract dropped md file path', () => {
  it('it should return path of a dropped .md file', () => {
    expect(extractDroppedMdpath(makeTransfer([{ name: 'README.md', path: '/p/README.md' }]))).toBe(
      '/p/README.md'
    );
  });
  it('should return null for a non markdown file path', () => {
    expect(extractDroppedMdpath(makeTransfer([{ name: 'img.png', path: '/img.png' }]))).toBeNull();
  });
  it('it should return null for empty drop', () => {
    expect(extractDroppedMdpath(makeTransfer([]))).toBeNull();
  });
  it('it should return first .md file when multiple files dropped', () => {
    const dt = makeTransfer([
      { name: 'img.png', path: '/i/png' },
      { name: 'README.md', path: '/r.md' },
    ]);
    expect(extractDroppedMdpath(dt)).toBe('/r.md');
  });
});
