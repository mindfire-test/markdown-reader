import { describe, it, expect } from 'vitest';
import { validateMarkdownFile, validatePath, validateSender } from '../src/utils/ipc-validation';

// mocking the url
function mockEvent(url: string) {
  return {
    senderFrame: { url },
  } as any;
}

describe('ipc - validation test', () => {
  // test 1:- to check blocked urls
  it('block unknow urls', () => {
    const event = mockEvent('http://hiii.com');
    expect(validateSender(event)).toBe(false);
  });

  //test 2:- to check empty urls
  it('return false when url is empty', () => {
    const event = mockEvent('');
    expect(validateSender(event)).toBe(false);
  });

  //test 3:- to check correct file path
  it('returns true for a valid file path string', () => {
    expect(validatePath('C:\\Users\\file.md')).toBe(true);
  });

  //test 4:- to check file extension
  it('return true for .md files', () => {
    expect(validateMarkdownFile('/docs/readme.md')).toBe(true);
  });
});
