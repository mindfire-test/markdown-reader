import type { MenuItemConstructorOptions } from 'electron';
import { MENU_EVENTS, MENU_LABELS, SHORTCUTS } from '@package/shared-constants';
import { createMenuSender } from './utils/helper/menu-helper';

export function buildMenuTemplate(): MenuItemConstructorOptions[] {
  const send = createMenuSender;

  return [
    {
      label: MENU_LABELS.FILE,
      submenu: [
        {
          label: MENU_LABELS.OPEN_FILE,
          accelerator: SHORTCUTS.OPEN_FILE,
          click: send(MENU_EVENTS.OPEN_FILE),
        },
        {
          label: MENU_LABELS.OPEN_FOLDER,
          accelerator: SHORTCUTS.OPEN_FOLDER,
          click: send(MENU_EVENTS.OPEN_FOLDER),
        },
        { type: 'separator' },
        {
          label: MENU_LABELS.CLOSE_TAB,
          accelerator: SHORTCUTS.CLOSE_TAB,
          click: send(MENU_EVENTS.CLOSE_TAB),
        },
        { type: 'separator' },
        { role: 'quit' },
      ],
    },
    {
      label: MENU_LABELS.VIEW,
      submenu: [
        {
          label: MENU_LABELS.TABLE_OF_CONTENTS,
          accelerator: SHORTCUTS.TOGGLE_TOC,
          click: send(MENU_EVENTS.TOGGLE_TOC),
        },
        {
          label: MENU_LABELS.FILE_BROWSER,
          accelerator: SHORTCUTS.TOGGLE_BROWSER,
          click: send(MENU_EVENTS.TOGGLE_BROWSER),
        },
        {
          label: MENU_LABELS.FOCUS_MODE,
          accelerator: SHORTCUTS.FOCUS_MODE,
          click: send(MENU_EVENTS.FOCUS_MODE),
        },
        { type: 'separator' },
        {
          label: MENU_LABELS.CYCLE_THEME,
          accelerator: SHORTCUTS.CYCLE_THEME,
          click: send(MENU_EVENTS.CYCLE_THEME),
        },
        { type: 'separator' },
        {
          label: MENU_LABELS.ZOOM_IN,
          accelerator: SHORTCUTS.ZOOM_IN,
          click: send(MENU_EVENTS.ZOOM_IN),
        },
        {
          label: MENU_LABELS.ZOOM_OUT,
          accelerator: SHORTCUTS.ZOOM_OUT,
          click: send(MENU_EVENTS.ZOOM_OUT),
        },
        {
          label: MENU_LABELS.RESET_ZOOM,
          accelerator: SHORTCUTS.RESET_ZOOM,
          click: send(MENU_EVENTS.ZOOM_RESET),
        },
        { type: 'separator' },
        { role: 'toggleDevTools' },
      ],
    },
    {
      label: MENU_LABELS.NAVIGATE,
      submenu: [
        {
          label: MENU_LABELS.NEXT_TAB,
          accelerator: SHORTCUTS.NEXT_TAB,
          click: send(MENU_EVENTS.NEXT_TAB),
        },
        {
          label: MENU_LABELS.PREVIOUS_TAB,
          accelerator: SHORTCUTS.PREVIOUS_TAB,
          click: send(MENU_EVENTS.PREVIOUS_TAB),
        },
        { type: 'separator' },
        {
          label: MENU_LABELS.SEARCH_DOCUMENT,
          accelerator: SHORTCUTS.SEARCH_DOCUMENT,
          click: send(MENU_EVENTS.SEARCH_DOCUMENT),
        },
      ],
    },
  ];
}
