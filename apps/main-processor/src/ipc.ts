import { ipcMain, dialog } from 'electron';
import { readFile } from './file';
import { validateMarkdownFile, validatePath, validateSender } from './utils/ipc-validation';

//registers all IPC handlers for main process
export function registerIPCHandlers(): void {
  //returns text content of the file
  ipcMain.handle('readFile', async (event, filePath: string) => {
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
  ipcMain.handle('openFileDialog', async (event) => {
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
}
