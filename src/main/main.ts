/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import package from '../../package.json';
console.log(`${package.name} ${package.version}`);

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;
let splashWindow: BrowserWindow | null = null;

// SEARCH LISTENERS
ipcMain.on('Search: InputChange', async (event, arg) => {
  console.log('Search: InputChange', arg);
  event.reply('Search: InputChange', arg);
});
ipcMain.on('Search: Submit', async (event, arg) => {
  console.log('Search: Submit', arg);
  event.reply('Search: Submit', arg);
});
// NAV BAR LISTENERS
ipcMain.on('package', async (event, arg) => {
  event.reply('package', package); // sends message to renderer
});
ipcMain.on('nav: mode: audio', async (event, arg) => {
  event.reply('nav: mode: audio', 'nav: mode: audio successful'); // sends message to renderer
});
ipcMain.on('nav: mode: video', async (event, arg) => {
  event.reply('nav: mode: video', 'nav: mode: video successful'); // sends message to renderer
});
ipcMain.on('nav: mode: warpstagram', async (event, arg) => {
  event.reply('nav: mode: warpstagram', 'nav: mode: warpstagram successful'); // sends message to renderer
});
// BROWSERBAR LISTENERS
ipcMain.on('BrowserBar: button: downloadAudio', async (event, arg) => {
  event.reply('BrowserBar: button: downloadAudio successful');
});
ipcMain.on('BrowserBar: button: downloadVideo', async (event, arg) => {
  event.reply('BrowserBar: button: downloadVideo successful'); // sends message to renderer
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createMainWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1600,
    height: 900,
    minWidth: 845,
    minHeight: 485,
    darkTheme: true,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};
const createSplashWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  splashWindow = new BrowserWindow({
    height: 400,
    width: 980,
    // x: 100,
    // y: 100,
    frame: false,
    transparent: true,
    // resizable: false,
    // movable: false,
    // minimizable: false,
    // maximizable: false,
    // icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  splashWindow.loadURL(resolveHtmlPath('index.html'));

  // splashWindow.on('ready-to-show', () => {
  //   if (!splashWindow) {
  //     throw new Error('"mainWindow" is not defined');
  //   }
  //   if (process.env.START_MINIMIZED) {
  //     splashWindow.minimize();
  //   } else {
  //     splashWindow.show();
  //   }
  // });

  splashWindow.on('ready', () => {
    // splashWindow.setSize(1500  ,500);
    // setTimeout(() =>     {
    // }, 1000);
  });
  // splashWindow.on('closed', () => {
  //   splashWindow = null;
  // });

  // const menuBuilder = new MenuBuilder(splashWindow);
  // menuBuilder.buildMenu();

  // Open urls in the user's browser
  splashWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  // new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    // createSplashWindow();
    //  splashWindow.setFullScreen(false);
    createMainWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createMainWindow();
    });
  })
  .catch(console.log);
