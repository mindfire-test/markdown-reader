import { vi, describe, it, expect } from 'vitest';
vi.mock('electron', () => ({
  app: {
    isPackaged: false,
  },
}));
import { parseFilePathFromArgv } from '../src/cli';

describe('cli test', () => {
  it('should open the .md file from the vector', () => {
    expect(parseFilePathFromArgv(['node', 'electron', '/app', '/home/user/README.md'])).toBe(
      '/home/user/README.md'
    );
  });
  it('returns null when no .md file in argv', () => {
    expect(parseFilePathFromArgv(['node', 'electron', '/app', '/notes.markdown'])).toBe(
      '/notes.markdown'
    );
  });
  it('return null for non markdown file argument', () => {
    expect(parseFilePathFromArgv(['node', 'electron', '/app', 'config.json'])).toBeNull();
  });
  it('return null when no file without throwing error', () => {
    expect(parseFilePathFromArgv([])).toBeNull();
  });
});
