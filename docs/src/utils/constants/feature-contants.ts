import { BookOpen, FileSearch, FolderOpen, Palette, RefreshCcw, ScanText } from 'lucide-react';

export const features = [
  {
    icon: BookOpen,
    title: 'Reader-first layout',
    text: 'Open Markdown like a document, with centered typography, a calm reading surface, and no editor clutter.',
  },
  {
    icon: ScanText,
    title: 'Full Markdown rendering',
    text: 'GFM tables, task lists, code blocks, local images, Mermaid diagrams, KaTeX math, and callout blocks.',
  },
  {
    icon: FileSearch,
    title: 'Search that feels native',
    text: 'Find text inside the current file, move between matches, and expand to folder-wide search when a folder is open.',
  },
  {
    icon: FolderOpen,
    title: 'Folders and tabs',
    text: 'Browse Markdown files from a folder, open multiple documents in tabs, and keep recent files close.',
  },
  {
    icon: RefreshCcw,
    title: 'Live reload',
    text: 'When another editor changes the file, Markdown Reader refreshes the view without losing your scroll position.',
  },
  {
    icon: Palette,
    title: 'Comfortable themes',
    text: 'Use GitHub Light, GitHub Dark, Notion, Nord, Minimal, or Dracula with zoom and reading width controls.',
  },
];
