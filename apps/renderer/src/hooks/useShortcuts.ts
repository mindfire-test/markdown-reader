import { useEffect } from 'react';
import { UseShortcutsProps } from '../types/component-types';

export function useShortcuts({
  onOpenFile,
  onOpenFolder,
  onToggleFocusMode,
  onToggleTheme,
  onOpenSearch,
  onCloseSearch,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  onToggleSidebar,
  onToggleFileBrowser,
}: UseShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;

      if (mod && e.shiftKey && e.key.toLowerCase() === 'o') {
        e.preventDefault();
        onOpenFolder();
        return;
      }

      if (mod && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        onToggleFocusMode();
        return;
      }

      if (mod && e.key.toLowerCase() === 'o') {
        e.preventDefault();
        onOpenFile();
        return;
      }

      if (mod && e.key.toLowerCase() === 't') {
        e.preventDefault();
        onToggleTheme();
        return;
      }

      if (mod && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        onOpenSearch();
        return;
      }

      if (mod && (e.key === '=' || e.key === '+')) {
        e.preventDefault();
        onZoomIn();
        return;
      }

      if (mod && e.key === '-') {
        e.preventDefault();
        onZoomOut();
        return;
      }

      if (mod && e.key === '0') {
        e.preventDefault();
        onZoomReset();
        return;
      }

      if (e.key === '[') {
        onToggleSidebar();
        return;
      }

      if (e.key === '\\') {
        onToggleFileBrowser();
        return;
      }

      if (e.key === 'Escape') {
        onCloseSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    onOpenFile,
    onOpenFolder,
    onToggleFocusMode,
    onToggleTheme,
    onOpenSearch,
    onCloseSearch,
    onZoomIn,
    onZoomOut,
    onZoomReset,
    onToggleSidebar,
    onToggleFileBrowser,
  ]);
}
