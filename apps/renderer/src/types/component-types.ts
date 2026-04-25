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

export interface ThemeContextType {
  themeSource: string;
  toggleTheme: () => Promise<void>;
  resetToSystem: () => Promise<void>;
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
