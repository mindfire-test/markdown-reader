import { ipcMain, dialog } from 'electron';
import { readFile } from './file';

//registers all IPC handlers for main process
export function registerIPCHandlers(): void {
  //returns text content of the file
  ipcMain.handle('readFile', async (_event, filePath: string) => {
    return await readFile(filePath);
  });

  // opens the file path
  ipcMain.handle('openFileDialog', async () => {
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
    return result.filePaths[0];
  });
}
