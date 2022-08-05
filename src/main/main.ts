/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import fs from 'fs';
import {
  app,
  BrowserView,
  BrowserWindow,
  desktopCapturer,
  dialog,
  shell,
  ipcMain,
  Tray,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import packageJSON from '../../package.json';
import prefs from '../storage/preferences';
import sources from '../storage/sources';
import downloads from '../storage/downloads';
// console.log(prefs);
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
const contextMenu = require('electron-context-menu');
contextMenu({});
const Store = require('electron-store');
const settings = new Store();
settings.set('downloads', downloads);
// settings.set('sources', sources);
settings.set('prefs', prefs);

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;
let splashWindow: BrowserWindow | null = null;
let browserWindow: BrowserWindow | null = null;
let mainWindowBounds = { x: 0, y: 0, width: 1600, height: 900 };
let browserWindowBounds = {
  x: mainWindowBounds.x + 8,
  y: mainWindowBounds.y + 183,
  width: mainWindowBounds.width / 2 - 250,
  height: mainWindowBounds.height - 250, // default
};
const updateSource = (updatedSource: any) => {
  // clear all active sources
  for (const key in sources) {
    if (sources[key].active === true) {
      sources[key].active = false;
    }
  }
  // set new active source
  sources[updatedSource].active = true;
  console.log(sources[updatedSource].URL);
  for (const key in sources) {
    if (sources[key].active === true) {
      console.log(sources[key].URL);
      browserWindow.loadURL(sources[key].URL);
    }
  }
  settings.set('sources', sources);
};
(function appListeners() {
  // MENU LISTENERS
  ipcMain.on('Menu: Shortcuts: Restart', async (event, arg) => {
    console.log('Menu: Shortcuts: Restart', arg);
    event.reply('Menu: Shortcuts: Restart', arg);
  });
  ipcMain.on('modal: preferences', async (event, arg) => {
    event.reply('modal: preferences', prefs);
  });
  // MENU LISTENERS
  ipcMain.on('Menu: Shortcuts: Restart', async (event, arg) => {
    console.log('Menu: Shortcuts: Restart', arg);
    event.reply('Menu: Shortcuts: Restart', arg);
  });
  ipcMain.on('modal: preferences', async (event, arg) => {
    // console.log('modal: preferences', arg);
    // console.log(prefs);

    event.reply('modal: preferences', prefs);
  });
  // NAV BAR LISTENERS
  ipcMain.on('package', async (event, arg) => {
    event.reply('package', packageJSON); // sends message to renderer
  });
  ipcMain.on('nav: mode: audio', async (event, arg) => {
    event.reply('nav: mode: audio', 'nav: mode: audio successful'); // sends message to renderer
    browserWindow.show();
  });
  ipcMain.on('nav: mode: video', async (event, arg) => {
    event.reply('nav: mode: video', 'nav: mode: video successful'); // sends message to renderer
    browserWindow.show();
  });
  ipcMain.on('nav: mode: warpstagram', async (event, arg) => {
    browserWindow.hide();
    event.reply('nav: mode: warpstagram', 'nav: mode: warpstagram successful'); // sends message to renderer
  });
  // BROWSERBAR DOWNLOAD SOURCE LISTENERS
  ipcMain.on('source: change', async (event, arg) => {
    // browserWindow.loadURL('https://www.facebook.com/');
    updateSource(arg);
  });
  // BROWSERBAR DOWNLOAD BUTTON LISTENERS
  ipcMain.on('BrowserBar: button: downloadAudio', async (event, arg) => {
    event.reply('BrowserBar: button: downloadAudio successful');
  });
  ipcMain.on('BrowserBar: button: downloadVideo', async (event, arg) => {
    event.reply('BrowserBar: button: downloadVideo successful'); // sends message to renderer
  });
  // FILTERBAR LISTENERS
  ipcMain.on('FilterBar: Warpstagram: FilterTypeAll', async (event, arg) => {
    event.reply('FilterBar: Warpstagram: FilterTypeAll successful'); // sends message to renderer
  });
  ipcMain.on('FilterBar: Warpstagram: FilterTypeUsers', async (event, arg) => {
    event.reply('FilterBar: Warpstagram: FilterTypeUsers successful'); // sends message to renderer
  });
  ipcMain.on(
    'FilterBar: Warpstagram: FilterTypeHashtags',
    async (event, arg) => {
      event.reply('FilterBar: Warpstagram: FilterTypeHashtags successful'); // sends message to renderer
    }
  );
  ipcMain.on(
    'FilterBar: Warpstagram: FilterTypeLocations',
    async (event, arg) => {
      event.reply('FilterBar: Warpstagram: FilterTypeLocations successful'); // sends message to renderer
    }
  );
})();

ipcMain.on('settings: request', async (event, arg) => {
  console.log('settings: request', arg);
  event.reply('settings-broadcast', settings); // sends message to renderer
});
(function browserWindowListeners() {
  ipcMain.on('browserWindowDimensions', async (event, arg) => {
    if (browserWindow) browserWindow.setResizable(true);
    browserWindowBounds.width = Math.round(arg.width);
    browserWindowBounds.height = Math.round(arg.height);
    if (browserWindow)
      browserWindow.setSize(
        browserWindowBounds.width,
        browserWindowBounds.height
      );
    if (browserWindow) browserWindow.setResizable(false);
    browserWindowHandler.setScreenshot();
  });
  ipcMain.on('browserHovered', async (event, arg) => {
    if (browserWindow) browserWindow.focus();
  });
  ipcMain.on('browserNotHovered', async (event, arg) => {
    if (browserWindow) browserWindow.blur();
  });
  ipcMain.on('prepareToHideBrowserWindow', async (event, arg) => {
    browserWindowHandler.setScreenshot();
    // mainWindow.webContents.send('request-browserDimensions');
  });
  ipcMain.on('hideBrowserWindow', async (event, arg) => {
    console.log('hideBrowserWindow');
    browserWindow.setAlwaysOnTop(false, 'screen');
    mainWindow.setAlwaysOnTop(true, 'screen');
    // stopUsingWhiteBackground;
    if (browserWindow.webContents.getURL().includes('pinterest')) {
      // mainWindow.webContents.send('stopUsingWhiteBackground');
      // browserWindow.webContents.on('did-finish-load', () => {
      browserWindow.webContents.insertCSS(
        'html, body { background-color: #fff; }'
      );
      // });
    }
  });
  ipcMain.on('showBrowserWindow', async (event, arg) => {
    console.log('showBrowserWindow');
    mainWindow.setAlwaysOnTop(false, 'screen');
    browserWindow.setAlwaysOnTop(true, 'screen');
    browserWindow.focus();
    if (browserWindow.webContents.getURL().includes('pinterest')) {
      browserWindow.webContents.insertCSS(
        'html, body { background-color: #fff; }'
      );
    }
  });
})();

const windowController = {
  createMainWindow: async function () {
    if (isDebug) {
      // await installExtensions();
    }

    const RESOURCES_PATH = app.isPackaged
      ? path.join(process.resourcesPath, 'assets')
      : path.join(__dirname, '../../assets');

    const getAssetPath = (...paths: string[]): string => {
      return path.join(RESOURCES_PATH, ...paths);
    };

    mainWindow = new BrowserWindow({
      show: false,
      width: mainWindowBounds.width,
      height: mainWindowBounds.height,
      x: mainWindowBounds.x,
      y: mainWindowBounds.y,
      minWidth: 850,
      minHeight: 500,
      show: false,
      darkTheme: true,
      // titleBarStyle: 'hidden',
      // titleBarOverlay: {
      //   color: '#1a1a1a',
      //   symbolColor: '#eee',
      //   height: 40,
      // },
      icon: getAssetPath('icon.png'),
      webPreferences: {
        preload: app.isPackaged
          ? path.join(__dirname, 'preload.js')
          : path.join(__dirname, '../../.erb/dll/preload.js'),
      },
    });

    mainWindow.loadURL(resolveHtmlPath('index.html'));

    const wc = mainWindow.webContents;
    wc.on('did-finish-load', (event, url) => {
      // console.log('mainWindow did-finish-load');
      // mainWindow.show();
    });
    wc.on('dom-ready', (event, url) => {
      // console.log('mainWindow dom-ready');
    });

    const menuBuilder = new MenuBuilder(mainWindow);
    menuBuilder.buildMenu();

    mainWindow.on('always-on-top-changed', () => {});
    mainWindow.on('app-command', () => {});
    mainWindow.on('blur', () => {});
    mainWindow.on('close', () => {});
    mainWindow.on('closed', () => (mainWindow = null));
    mainWindow.on('enter-full-screen', () => {});
    mainWindow.on('enter-html-full-screen', () => {});
    mainWindow.on('focus', () => browserWindowHandler.resize());
    mainWindow.on('hide', () => {});
    mainWindow.on('leave-full-screen', () => {});
    mainWindow.on('leave-html-full-screen', () => {});
    mainWindow.on('maximize', () => browserWindowHandler.resize());
    mainWindow.on('minimize', () => {
      if (browserWindow) browserWindow.minimize();
    });
    mainWindow.on('move', () => browserWindowHandler.resize());
    mainWindow.on('moved', () => browserWindowHandler.resize());
    mainWindow.on('new-window-for-tab', () => {});
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
    mainWindow.on('resize', () => {
      browserWindowHandler.resize();
    });
    mainWindow.on('resized', (e) => {
      browserWindowHandler.resize();
    });
    mainWindow.on('responsive', () => {});
    mainWindow.on('restore', () => {
      browserWindowHandler.resize();
    });
    mainWindow.on('session-end', () => {});
    mainWindow.on('sheet-begin', () => {});
    mainWindow.on('sheet-end', () => {});
    mainWindow.on('show', () => {
      browserWindowHandler.resize();
    });
    mainWindow.on('system-context-menu', () => {});
    mainWindow.on('unmaximize', () => {});
    mainWindow.on('unresponsive', () => {});
    mainWindow.on('will-move', () => {
      browserWindowHandler.resize();
    });
    mainWindow.on('will-resize', () => browserWindowHandler.resize());
  },
  createBrowserWindow: async function () {
    // if (isDebug) {
    //   await installExtensions();
    // }

    // const RESOURCES_PATH = app.isPackaged
    //   ? path.join(process.resourcesPath, 'assets')
    //   : path.join(__dirname, '../../assets');

    // const getAssetPath = (...paths: string[]): string => {
    //   return path.join(RESOURCES_PATH, ...paths);
    // };

    browserWindow = new BrowserWindow({
      height: browserWindowBounds.height,
      width: browserWindowBounds.width,
      x: browserWindowBounds.x,
      y: browserWindowBounds.y,
      // x: 100,
      // y: 100,
      frame: false,
      transparent: true,
      parent: mainWindow,
      hasShadow: false,
      isAlwaysOnTop: true,
      resizable: false,
      skipTaskbar: true,
      movable: false,
      // 'use-content-size': true,
      show: false,
      // minimizable: false,
      // maximizable: false,
      useContentSize: true,
      devTools: false,
      // icon: getAssetPath('icon.png'),
      webPreferences: {
        // preload: app.isPackaged
        //   ? path.join(__dirname, 'preload.js')
        //   : path.join(__dirname, '../../.erb/dll/preload.js'),
      },
    });
    let sources = settings.get('sources');

    for (const key in sources) {
      if (sources[key].active === true) {
        browserWindow.loadURL(sources[key].URL);
      }
    }
    browserWindow.setAlwaysOnTop(true, 'screen');

    browserWindow.once('ready-to-show', () => {
      console.log('browserWindow ready-to-show');
    });
    browserWindow.webContents.on('did-finish-load', () => {
      console.log('browserWindow did-finish-load');
      mainWindow.show();
      browserWindow.show();
      browserWindowHandler.setScreenshot();
    });
    browserWindow.webContents.on('will-navigate', () => {});
    browserWindow.on('blur', () => browserWindowHandler.setScreenshot());
    // browserWindow.on('close', () => console.log('browserWindow close'));
    browserWindow.on('closed', () => (browserWindow = null));
    browserWindow.on('enter-full-screen', () => {});
    browserWindow.on('focus', () => {});
    browserWindow.on('hide', () => {});
    browserWindow.on('maximize', () => {});
    browserWindow.on('minimize', () => {});
    browserWindow.on('move', () => {});
    browserWindow.on('moved', () => {});
    browserWindow.on('new-window-for-tab', () => {});
    browserWindow.on('ready-to-show', () => {});
    browserWindow.on('resize', () => {});
    browserWindow.on('resized', () => console.log('browserWindow resized'));
    browserWindow.on('responsive', () => {});
    browserWindow.on('restore', () => browserWindowHandler.resize());
    browserWindow.on('session-end', () => {});
    browserWindow.on('sheet-begin', () => {});
    browserWindow.on('sheet-end', () => {});
    browserWindow.on('show', () => {});
    browserWindow.on('system-context-menu', () => {});
    browserWindow.on('unmaximize', () => {});
    browserWindow.on('unresponsive', () => {});
    browserWindow.on('will-move', () => {});
    browserWindow.on('will-resize', () => {});
  },
  createSplashWindow: async function () {
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
      show: false,
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

    splashWindow.loadURL(resolveHtmlPath('splash.html'));

    splashWindow.webContents.setWindowOpenHandler((edata) => {
      shell.openExternal(edata.url);
      return { action: 'deny' };
    });

    // Remove this if your app does not use auto updates
  },
  // createSplashWindow();
  //  splashWindow.setFullScreen(false);
  // const win = new BrowserWindow({
  //   x: 400,
  //   y: 400,
  //   width: 800,
  //   height: 600,
  //   frame: false,
  //   skipTaskbar: true,
  // });

  // const view = new BrowserView();
  // win.setBrowserView(view);
  // view.setBounds({ x: 0, y: 0, width: 800, height: 800 });
};
const browserWindowHandler = {
  resize: async function (params: type) {
    mainWindow.getBounds();
    if (browserWindow) browserWindow.setResizable(true);
    mainWindowBounds = mainWindow.getBounds();
    browserWindowBounds.width = Math.round(mainWindowBounds.width / 2 - 9); //default/
    browserWindowBounds.height = Math.round(mainWindowBounds.height - 258); //default
    if (browserWindow)
      browserWindow.setSize(
        browserWindowBounds.width,
        browserWindowBounds.height
      );
    if (browserWindow)
      browserWindow.setPosition(
        mainWindowBounds.x + 8,
        mainWindowBounds.y + 183
      );
    if (browserWindow) browserWindow.setResizable(false);
  },
  setScreenshot: async function () {
    const RESOURCES_PATH = app.isPackaged
      ? path.join(process.resourcesPath, 'assets')
      : path.join(__dirname, '../../assets');

    const getAssetPath = (...paths: string[]): string => {
      return path.join(RESOURCES_PATH, ...paths);
    };

    if (browserWindow)
      browserWindow.webContents
        .capturePage({
          x: 0,
          y: 0,
          width: browserWindowBounds.width,
          height: browserWindowBounds.height,
        })
        .then((img) => {
          // let defaultPath: path.join(__dirname, '../assets/image.png');
          // console.log('captured');
          fs.writeFile(
            getAssetPath('screenshot.png'),
            img.toPNG(),
            'base64',
            function (err) {
              if (err) throw err;
              // console.log('Saved!');
            }
          );
        })
        .catch((err) => {
          console.log(err);
        });
    // browserWindow.setAlwaysOnTop(false, 'screen');
    // mainWindow.setAlwaysOnTop(true, 'screen');
  },
};
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    windowController.createMainWindow();
    windowController.createBrowserWindow();
    app.on('activate', () => {
      if (mainWindow === null) windowController.createMainWindow();
    });
  })
  .catch(console.log);
