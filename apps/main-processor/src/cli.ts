import { MARKDOWN_FILE_PATTERN } from './utils/path-constants';

export function parseFilePathFromArgv(argv: string[]): string | null {
  for (let i = argv.length - 1; i >= 0; i--) {
    const value = argv[i];
    if (value && MARKDOWN_FILE_PATTERN.test(value)) {
      return value;
    }
  }
  return null;
}
