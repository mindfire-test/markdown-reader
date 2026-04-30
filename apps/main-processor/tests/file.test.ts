import { vi, describe, expect, it, beforeAll, afterAll } from 'vitest';
import { writeFileSync, unlinkSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

import { readFile, watchFile, unWatchFile } from '../src/file';

const test_dir = join(tmpdir(), 'markdown reader tests');
const simple_file = join(test_dir, 'simple.md');
const empty_file = join(test_dir, 'empty.md');
const unicode_file = join(test_dir, 'unicode.md');

//create directory
beforeAll(() => {
  mkdirSync(test_dir, { recursive: true });
  writeFileSync(simple_file, '# Hello whats up\n\n This is test file', 'utf-8');
  writeFileSync(empty_file, 'utf-8');
  writeFileSync(unicode_file, '# こんにちは\n\nThis is emoji file', 'utf-8');
});

// clean directory
afterAll(() => {
  unlinkSync(simple_file);
  unlinkSync(empty_file);
  unlinkSync(unicode_file);
});
describe('readFile', () => {
  // test-1 :- it should check the existence of file
  it('shoul throw when the file does not exists', async () => {
    await expect(readFile('/this/path/does/not/exist.md')).rejects.toThrow('Could not read file');
  });

  // test-2 :- if the file path is wrong
  it('includes the file path in error message', async () => {
    const wrongPath = '/no/any/file.md';
    await expect(readFile(wrongPath)).rejects.toThrow(wrongPath);
  });
});

describe('File watcher', () => {
  const TEST_FILE = './test-file.md';

  it('should trigger the callback when I change the file', async () => {
    const cb = vi.fn();
    await watchFile(TEST_FILE, cb);
    await new Promise((r) => setTimeout(r, 100));
    writeFileSync(TEST_FILE, 'new content');
    await vi.waitFor(() => expect(cb).toHaveBeenCalled(), 1000);
    await unWatchFile(TEST_FILE);
  });

  it('should stop when I call unwatch file ', async () => {
    const cb = vi.fn();
    await watchFile(TEST_FILE, cb);
    await unWatchFile(TEST_FILE);
    writeFileSync(TEST_FILE, 'change after unwatch');
    await new Promise((r) => setTimeout(r, 200));
    expect(cb).not.toHaveBeenCalled();
  });

  it('should protect from double call', async () => {
    const cb = vi.fn();
    await watchFile(TEST_FILE, cb);
    await watchFile(TEST_FILE, cb);
    writeFileSync(TEST_FILE, 'checking for duplicates');
    await vi.waitFor(() => expect(cb).toHaveBeenCalledTimes(1), 1500);
    await unWatchFile(TEST_FILE);
  });

  it('should not crash if I unwatch a file which is not watched', async () => {
    await expect(unWatchFile('fake-file.txt')).resolves.toBeUndefined();
  });
});
