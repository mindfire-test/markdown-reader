import { ipcMain, dialog } from 'electron';
import { readFile, unWatchFile, watchFile } from './file';
import { getFolder } from './folder';
import {
  validateMarkdownFile,
  validatePath,
  validateSender,
} from './utils/constants/ipc-validation';
import { IPC_CONSTANTS } from '@package/shared-constants';
import { getRecentFiles } from './recent/getRecentFile';
import { addRecentFile } from './recent/addRecentFile';

//registers all IPC handlers for main process
export function registerIPCHandlers(): void {
  //returns text content of the file
  ipcMain.handle(IPC_CONSTANTS.READ_FILE, async (event, filePath: string) => {
    if (!validateSender(event)) {
      throw new Error('Untrusted sender');
    }
    if (!validatePath(filePath)) {
      throw new Error('Invalid file path');
    }

    if (!validateMarkdownFile(filePath)) {
      throw new Error('Only markdown files allowed');
    }
    return await readFile(filePath);
  });

  // opens the file path
  ipcMain.handle(IPC_CONSTANTS.OPEN_FILE_DIALOG, async (event) => {
    if (!validateSender(event)) {
      throw new Error('Untrusted sender');
    }
    const result = await dialog.showOpenDialog({
      title: 'Open Markdown File',
      filters: [
        { name: 'Markdown Files', extensions: ['md', 'markdown'] },
        { name: 'All Files', extensions: ['*'] },
      ],
      properties: ['openFile'],
    });
    if (result.canceled || result.filePaths.length === 0) {
      return null;
    }
    const selected = result.filePaths[0];
    if (!selected) return null;
    if (!validateMarkdownFile(selected)) {
      throw new Error('Only markdown files allowed');
    }
    return selected;
  });

  // watches a file
  ipcMain.handle(IPC_CONSTANTS.WATCH_FILE, async (event, filePath: string) => {
    if (!validateSender(event)) {
      throw new Error('Untrusted sender');
    }
    if (!validatePath(filePath)) {
      throw new Error('Invalid File Path');
    }
    await watchFile(filePath, () => {
      event.sender.send('file-changed', filePath);
    });
  });

  //un watch file
  ipcMain.handle(IPC_CONSTANTS.UNWATCH_FILE, async (event, filePath: string) => {
    if (!validateSender(event)) {
      throw new Error('Untrusted sender');
    }
    if (!validatePath(filePath)) {
      throw new Error('Invalid file path');
    }
    await unWatchFile(filePath);
  });

  //get recent files
  ipcMain.handle(IPC_CONSTANTS.GET_RECENT_FILES, async (event) => {
    if (!validateSender(event)) {
      throw new Error('Untrusted sender');
    }
    return await getRecentFiles();
  });

  // add recent files
  ipcMain.handle(IPC_CONSTANTS.ADD_RECENT_FILES, async (event, filePath: string) => {
    if (!validateSender(event)) {
      throw new Error('Untrusted sender');
    }
    if (!validatePath(filePath)) {
      throw new Error('Invalid file path');
    }
    await addRecentFile(filePath);
  });

  ipcMain.handle(IPC_CONSTANTS.OPEN_FOLDER_DIALOG, async (event) => {
    if (!validateSender(event)) {
      throw new Error('Untrusted sender');
    }

    const result = await dialog.showOpenDialog({
      title: 'Open Folder',
      properties: ['openDirectory'],
    });

    if (result.canceled || result.filePaths.length === 0) {
      return null;
    }

    return result.filePaths[0] ?? null;
  });

  ipcMain.handle(IPC_CONSTANTS.READ_FOLDER, async (event, folderPath: string) => {
    if (!validateSender(event)) {
      throw new Error('Untrusted sender');
    }

    if (!validatePath(folderPath)) {
      throw new Error('Invalid folder path');
    }
    return await getFolder(folderPath);
  });
}
