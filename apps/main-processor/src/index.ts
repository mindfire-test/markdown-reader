const STARTUP_START = Date.now();
import { WINDOW_CONSTANTS, STARTUP_TIME } from './utils/window-constants';
import { app, BrowserWindow } from 'electron';
import { registerIPCHandlers } from './ipc';
import { PATHS } from './utils/path-constants';
import { registerMenu } from './register-menu';
import { parseFilePathFromArgv } from './cli';

let mainWindow: BrowserWindow | null = null;
let pendingFilePath: string | null = null;

function sendFilePathToRenderer(filePath: string): void {
  if (!mainWindow) {
    pendingFilePath = filePath;
    return;
  }
  mainWindow.webContents.send('open-file-path', filePath);
}

// register all IPC before window is created
registerIPCHandlers();
//create electron window
function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: WINDOW_CONSTANTS.WIDTH,
    height: WINDOW_CONSTANTS.HEIGHT,
    minWidth: WINDOW_CONSTANTS.MIN_WIDTH,
    minHeight: WINDOW_CONSTANTS.MIN_HEIGHT,
    icon: PATHS.APP_ICON,
    show: false,
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
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();

    const elapsed = Date.now() - STARTUP_START;
    console.warn(`[PERF] Cold start: ${elapsed}ms`);

    if (elapsed > STARTUP_TIME.COLD_START_LIMIT_MS) {
      console.error(
        `[PERF] WARNING: Cold start exceeded ${STARTUP_TIME.COLD_START_LIMIT_MS}ms target (${elapsed}ms)`
      );
    }
  });

  mainWindow.webContents.once('did-finish-load', () => {
    const cliFilePath = parseFilePathFromArgv(process.argv);
    const filePathToOpen = pendingFilePath ?? cliFilePath;
    if (filePathToOpen) {
      sendFilePathToRenderer(filePathToOpen);
    }
    pendingFilePath = null;
  });
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('open-file', (event, filePath) => {
  event.preventDefault();
  sendFilePathToRenderer(filePath);
});
const hasSingleInstanceLock = app.requestSingleInstanceLock();
if (!hasSingleInstanceLock) {
  app.quit();
} else {
  app.on('second-instance', (_event, argv) => {
    const filePath = parseFilePathFromArgv(argv);
    if (!filePath) return;
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.focus();
      sendFilePathToRenderer(filePath);
    } else {
      pendingFilePath = filePath;
    }
  });

  // electron ready window
  app.whenReady().then(() => {
    registerMenu();
    createWindow();

    //re create window when dock icon clicked in macOs
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });
}

//quit when all windows closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
