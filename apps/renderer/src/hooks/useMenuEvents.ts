import { useEffect } from 'react';
import { MENU_EVENTS } from '@package/shared-constants';
import { UseMenuEventsProps } from '../types/component-types';

export function useMenuEvents({
  onOpenFile,
  onOpenFolder,
  onSearchDocument,
  onToggleToc,
  onToggleBrowser,
  onFocusMode,
  onCycleTheme,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  onNextTab,
  onPreviousTab,
  onCloseTab,
}: UseMenuEventsProps) {
  useEffect(() => {
    if (!window.api?.onMenuEvent) return;

    window.api.onMenuEvent(MENU_EVENTS.OPEN_FILE, onOpenFile);
    window.api.onMenuEvent(MENU_EVENTS.OPEN_FOLDER, onOpenFolder);
    window.api.onMenuEvent(MENU_EVENTS.SEARCH_DOCUMENT, onSearchDocument);
    window.api.onMenuEvent(MENU_EVENTS.TOGGLE_TOC, onToggleToc);
    window.api.onMenuEvent(MENU_EVENTS.TOGGLE_BROWSER, onToggleBrowser);
    window.api.onMenuEvent(MENU_EVENTS.FOCUS_MODE, onFocusMode);
    window.api.onMenuEvent(MENU_EVENTS.CYCLE_THEME, onCycleTheme);
    window.api.onMenuEvent(MENU_EVENTS.ZOOM_IN, onZoomIn);
    window.api.onMenuEvent(MENU_EVENTS.ZOOM_OUT, onZoomOut);
    window.api.onMenuEvent(MENU_EVENTS.ZOOM_RESET, onZoomReset);
    window.api.onMenuEvent(MENU_EVENTS.NEXT_TAB, onNextTab);
    window.api.onMenuEvent(MENU_EVENTS.PREVIOUS_TAB, onPreviousTab);
    window.api.onMenuEvent(MENU_EVENTS.CLOSE_TAB, onCloseTab);

    return () => {
      window.api.removeMenuListeners?.();
    };
  }, [
    onOpenFile,
    onOpenFolder,
    onSearchDocument,
    onToggleToc,
    onToggleBrowser,
    onFocusMode,
    onCycleTheme,
    onZoomIn,
    onZoomOut,
    onZoomReset,
    onNextTab,
    onPreviousTab,
    onCloseTab,
  ]);
}
