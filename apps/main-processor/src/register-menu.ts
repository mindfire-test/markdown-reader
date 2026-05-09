import { Menu } from 'electron';
import { buildMenuTemplate } from './menu';

export function registerMenu(): void {
  const menu = Menu.buildFromTemplate(buildMenuTemplate());
  Menu.setApplicationMenu(menu);
}
