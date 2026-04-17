import { MarkdownReaderAPI } from '@package/shared-types';

declare global {
  interface Window {
    api: MarkdownReaderAPI;
  }
}

export {};
