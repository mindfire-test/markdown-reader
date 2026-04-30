import { APPTHEMES } from '../utils/constants/theme-constants';
import { RecentFile } from '@package/shared-types/dist/src/recentfile-type';
export interface ErrorProps {
  message: string;
  onRetry: () => void;
}

export interface ReaderProps {
  html: string;
  getHiglightedHtml: (html: string) => string;
}

export interface WelcomeProps {
  onOpen: () => void;
  recentFiles: RecentFile[];
  onOpenRecent?: (path: string) => void;
}

export type Theme = (typeof APPTHEMES)[number];
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export type BuiltThemeType =
  | 'github-light'
  | 'github-dark'
  | 'notion'
  | 'nord'
  | 'minimal'
  | 'dracula';
export interface HeadingProps {
  text: string;
  depth: number;
}
export interface TOCType {
  id: string;
  text: string;
  level: 1 | 2 | 3;
}

export interface SidebarProps {
  tocItems: TOCType[];
  activeId: string;
  onSelect: (id: string) => void;
  isVisible?: boolean;
}

export interface ToastProps {
  message: string;
  show: boolean;
  onDone: () => void;
  duration?: number;
}

export interface UseSearchProps {
  query: string;
  currentMatch: number;
  matchCount: number;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  setQuery: (q: string) => void;
  goToNextMatch: () => void;
  goToPrevMatch: () => void;
  getHiglightedHtml: (html: string) => string;
}

export interface SearchBarProps {
  query: string;
  matchCount: number;
  currentMatch: number;
  onQueryChange: (q: string) => void;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
}

export type ReadingWidth = 'narrow' | 'default' | 'wide' | 'full';

export const FONT_SISE = {
  DEFAULT: 16,
  MIN: 12,
  MAX: 24,
  INCREMENT: 2,
};

export const WIDTH_MAP: Record<ReadingWidth, string> = {
  narrow: '640px',
  default: '768px',
  wide: '1024px',
  full: '100%',
};
export interface StatusBarProps {
  filePath: string;
  theme: string;
  fontSize: number;
}
