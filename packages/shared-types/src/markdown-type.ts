import { FileType } from './file-types';
import { RecentFile } from './recentfile-type';
import { Settings } from './settings-type';

// markdown reader api
export type MarkdownReaderAPI = {
  readFile(path: string): Promise<string>;
  watchFile(path: string): Promise<void>;
  unWatchFile(path: string): Promise<void>;
  openFileDialog(): Promise<string | null>;
  openFolderDialog(): Promise<string | null>;
  readFolder(path: string): Promise<FileType | null>;
  getRecentFiles(): Promise<RecentFile[]>;
  addRecentFile(path: string): Promise<void>;
  clearRecentFiles(): Promise<void>;
  getSettings(): Promise<Settings>;
  saveSettings(settings: Settings[]): Promise<void>;
  getAppVersion(): Promise<string>;
  onFileChanged: (callback: (path: string) => void) => void;
  removeFileChangedListener: () => void;
};

// initial setting
export const DEFAULT_SETTINGS: Settings = {
  theme: 'github-light',
  fontSize: 16,
  readingWidth: 'default',
  showLineNumbers: false,
};
