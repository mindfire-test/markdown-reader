import { app, BrowserWindow } from 'electron';
import { registerIPCHandlers } from './ipc';
import { WINDOW_CONSTANTS } from './utils/window-constants';
import { PATHS } from './utils/path-constants';

// register all IPC before window is created
registerIPCHandlers();

//create electron window
function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: WINDOW_CONSTANTS.WIDTH,
    height: WINDOW_CONSTANTS.HEIGHT,
    minWidth: WINDOW_CONSTANTS.MIN_WIDTH,
    minHeight: WINDOW_CONSTANTS.MIN_HEIGHT,
    webPreferences: {
      preload: PATHS.PRELOAD,
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    mainWindow.loadFile(PATHS.RENDERER_HTML);
  }
}

// electron ready window
app.whenReady().then(() => {
  createWindow();

  //re create window when dock icon clicked in macOs
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

//quit when all windows closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
