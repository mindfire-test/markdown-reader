import { BrowserWindow, BaseWindow, MenuItem, KeyboardEvent } from 'electron';

export function createMenuSender(eventName: string) {
  return (_menuItem: MenuItem, window: BaseWindow | undefined, _event: KeyboardEvent): void => {
    if (window instanceof BrowserWindow) {
      window.webContents.send(eventName);
    }
  };
}
