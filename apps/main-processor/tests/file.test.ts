import { describe, expect, it, beforeAll, afterAll } from 'vitest';
import { writeFileSync, unlinkSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

import { readFile } from '../src/file';

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
