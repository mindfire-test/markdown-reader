import { contextBridge, ipcRenderer } from 'electron';
import { MarkdownReaderAPI } from '@package/shared-types';

const apiContract: MarkdownReaderAPI = {
  readFile: (path) => ipcRenderer.invoke('readFile', path),
  openFileDialog: () => ipcRenderer.invoke('openFileDialog'),
  openFolderDialog: () => ipcRenderer.invoke('openFolderDialog'),
  readFolder: (path) => ipcRenderer.invoke('readFolder', path),
  getRecentFiles: () => ipcRenderer.invoke('getRecentFiles'),
  addRecentFile: (path) => ipcRenderer.invoke('addRecentFile', path),
  clearRecentFiles: () => ipcRenderer.invoke('clearRecentFiles'),
  getSettings: () => ipcRenderer.invoke('getSettings'),
  saveSettings: (settings) => ipcRenderer.invoke('saveSettings', settings),
  getAppVersion: () => ipcRenderer.invoke('getAppVersion'),
  watchFile: (path) => ipcRenderer.invoke('watchFile', path),
  unWatchFile: (path) => ipcRenderer.invoke('unWatchFile', path),
};

// bridge between renderer and main
contextBridge.exposeInMainWorld('api', apiContract);
