import { contextBridge, ipcRenderer } from 'electron';
import { MarkdownReaderAPI, ThemeType } from '@package/shared-types';
import { IPC_CONSTANTS } from '@package/shared-constants';
import { BRIDGE_NAME } from '@package/shared-constants';

const apiContract: MarkdownReaderAPI = {
  readFile: (path) => ipcRenderer.invoke(IPC_CONSTANTS.READ_FILE, path),
  openFileDialog: () => ipcRenderer.invoke(IPC_CONSTANTS.OPEN_FILE_DIALOG),
  openFolderDialog: () => ipcRenderer.invoke(IPC_CONSTANTS.OPEN_FOLDER_DIALOG),
  readFolder: (path) => ipcRenderer.invoke(IPC_CONSTANTS.READ_FOLDER, path),
  getRecentFiles: () => ipcRenderer.invoke(IPC_CONSTANTS.GET_RECENT_FILES),
  addRecentFile: (path) => ipcRenderer.invoke(IPC_CONSTANTS.ADD_RECENT_FILES, path),
  clearRecentFiles: () => ipcRenderer.invoke(IPC_CONSTANTS.CLEAR_RECENT_FILES),
  getSettings: () => ipcRenderer.invoke(IPC_CONSTANTS.GET_SETTINGS),
  saveSettings: (settings) => ipcRenderer.invoke(IPC_CONSTANTS.SAVE_SETTINGS, settings),
  getAppVersion: () => ipcRenderer.invoke(IPC_CONSTANTS.GET_APP_VERSION),
  watchFile: (path) => ipcRenderer.invoke(IPC_CONSTANTS.WATCH_FILE, path),
  unWatchFile: (path) => ipcRenderer.invoke(IPC_CONSTANTS.UNWATCH_FILE, path),
};

const themeContract: ThemeType = {
  toggle: () => ipcRenderer.invoke(IPC_CONSTANTS.TOGGLE_MODE),
  reset: () => ipcRenderer.invoke(IPC_CONSTANTS.SYSTEM_MODE),
};

// bridge between renderer and main
contextBridge.exposeInMainWorld(BRIDGE_NAME.API, apiContract);

//theme bridge
contextBridge.exposeInMainWorld(BRIDGE_NAME.THEME, themeContract);
