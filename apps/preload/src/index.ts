import { contextBridge, ipcRenderer } from 'electron';
import { MarkdownReaderAPI } from '@package/shared-types';
import { IPC_CONSTANTS } from '@package/shared-constants';
import { BRIDGE_NAME } from '@package/shared-constants';
import { MENU_EVENT_LIST } from '@package/shared-constants';

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
  onFileChanged: (callback: (path: string) => void) =>
    ipcRenderer.on(IPC_CONSTANTS.FILE_CHANGED, (_event, path: string) => callback(path)),
  removeFileChangedListener: () => ipcRenderer.removeAllListeners(IPC_CONSTANTS.FILE_CHANGED),
  onMenuEvent: (event: string, callback: () => void) => ipcRenderer.on(event, () => callback()),
  removeMenuListeners: () =>
    MENU_EVENT_LIST.forEach((event) => {
      ipcRenderer.removeAllListeners(event);
    }),
  onOpenFilePath: (callback: (path: string) => void): void => {
    ipcRenderer.on(IPC_CONSTANTS.OPEN_FILE_PATH, (_event, path: string) => {
      callback(path);
    });
  },
  removeOpenFilePathListener: (): void => {
    ipcRenderer.removeAllListeners(IPC_CONSTANTS.OPEN_FILE_PATH);
  },
};

// bridge between renderer and main
contextBridge.exposeInMainWorld(BRIDGE_NAME.API, apiContract);
