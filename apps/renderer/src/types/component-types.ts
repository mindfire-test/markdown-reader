import { APPTHEMES } from '../utils/app-themes';
export interface ErrorProps {
  message: string;
  onRetry: () => void;
}

export interface ReaderProps {
  html: string;
}

export interface WelcomeProps {
  onOpen: () => void;
}

export type Theme = (typeof APPTHEMES)[number];
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}
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
