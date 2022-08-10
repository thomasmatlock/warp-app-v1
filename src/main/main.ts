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
  screen,
  Tray,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import Title from './title';
import { resolveHtmlPath } from './util';
import packageJSON from '../../package.json';
import prefs from '../storage/preferences';
// import sources from '../storage/sources';
// import downloads from '../storage/downloadsContext';
// console.log(prefs);
if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  // require('electron-debug')(); // ENABLE FOR DEVTOOLS
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  // console.log(process.env.UPGRADE_EXTENSIONS);

  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    // 'cjpalhdlnbpafiamejdnhcphjbkeiagm',
  ];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

let allWindowsBlur = {
  main: false,
  browser: false,
};
const contextMenu = require('electron-context-menu');
contextMenu({});
const Store = require('electron-store');
const settings = new Store();
// settings.set('downloads', downloads);
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
let browserPanelState = 'default';
// const updateSource = (updatedSource: any) => {
//   // clear all active sources
//   for (const key in sources) {
//     if (sources[key].active === true) {
//       sources[key].active = false;
//     }
//   }
//   // set new active source
//   sources[updatedSource].active = true;
//   console.log(sources[updatedSource].URL);
//   for (const key in sources) {
//     if (sources[key].active === true) {
//       console.log(sources[key].URL);
//       browserWindow.loadURL(sources[key].URL);
//     }
//   }
//   settings.set('sources', sources);
// };
(function appListeners() {
  // MENU LISTENERS
  ipcMain.on('Menu: Shortcuts: Restart', async (event, arg) => {
    // console.log('Menu: Shortcuts: Restart', arg);
    event.reply('Menu: Shortcuts: Restart', arg);
  });
  ipcMain.on('modal: preferences', async (event, arg) => {
    event.reply('modal: preferences', prefs);
  });
  // SEARCH LISTENERS
  ipcMain.on('Search: InputChange', async (event, arg) => {
    // console.log('Search: InputChange', arg);
    // console.log('Menu: Shortcuts: Restart', arg);
    event.reply('Search: InputChange', [arg]);
  });
  // NAV BAR LISTENERS
  ipcMain.on('package', async (event, arg) => {
    app.getVersion();
    event.reply('package', packageJSON); // sends message to renderer
  });
  ipcMain.on('nav: mode: audio', async (event, arg) => {
    mainWindow.webContents.send('count-downloads', arg);
    event.reply('nav: mode: audio', 'nav: mode: audio successful'); // sends message to renderer
    if (browserWindow) browserWindow.show();
  });
  ipcMain.on('nav: mode: video', async (event, arg) => {
    event.reply('nav: mode: video', 'nav: mode: video successful'); // sends message to renderer
    if (browserWindow) browserWindow.show();
  });
  ipcMain.on('nav: mode: warpstagram', async (event, arg) => {
    console.log('nav: mode: warpstagram');

    if (browserWindow) browserWindow.hide();
    event.reply('nav: mode: warpstagram', 'nav: mode: warpstagram successful'); // sends message to renderer
  });
  // BROWSERBAR DOWNLOAD SOURCE LISTENERS
  ipcMain.on('source: change', async (event, arg) => {
    // console.log('source: change', arg);
    if (browserWindow) browserWindow.loadURL(arg);
    // updateSource(arg);
  });
  // BROWSERBAR DOWNLOAD BUTTON LISTENERS
  ipcMain.on('BrowserBar: button: downloadAudio', async (event, arg) => {
    event.reply('BrowserBar: button: downloadAudio successful');
  });
  ipcMain.on('BrowserBar: button: downloadVideo', async (event, arg) => {
    event.reply('BrowserBar: button: downloadVideo successful'); // sends message to renderer
  });
  ipcMain.on('browserPanelSize', async (event, arg) => {
    // console.log('browserPanelSize', arg);
    browserPanelState = arg;
    browserWindowHandler.resize(arg);
    setTimeout(() => {
      browserWindowHandler.setScreenshot();
      if (arg != 'collapse' && browserWindow) browserWindow.focus();
    }, 500);

    // event.reply('BrowserBar: button: downloadVideo successful'); // sends message to renderer
  });
  ipcMain.on('BrowserBar: button: goBack', async (event, arg) => {
    console.log('BrowserBar: button: goBack');
    browserWindow.webContents.goBack();

    // event.reply('BrowserBar: button: downloadVideo successful'); // sends message to renderer
  });
  ipcMain.on('BrowserBar: button: goForward', async (event, arg) => {
    console.log('BrowserBar: button: goForward');
    browserWindow.webContents.goForward();

    // event.reply('BrowserBar: button: downloadVideo successful'); // sends message to renderer
  });
  ipcMain.on('BrowserBar: button: reload', async (event, arg) => {
    console.log('BrowserBar: button: reload');
    browserWindow.webContents.reload();
    browserWindowHandler.setScreenshot();

    // event.reply('BrowserBar: button: downloadVideo successful'); // sends message to renderer
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
    // let opacity = browserWindow.getOpacity();
    // console.log('hideBrowserWindow', opacity);
    // browserWindow.setOpacity(0);
    if (browserWindow) browserWindow.setAlwaysOnTop(false);
    mainWindow.setAlwaysOnTop(true);
    // mainWindow.focus();
  });
  ipcMain.on('showBrowserWindow', async (event, arg) => {
    // browserWindow.setOpacity(1);
    if (browserWindow) browserWindow.setAlwaysOnTop(true);
    mainWindow.setAlwaysOnTop(false);
    if (browserWindow) browserWindow.focus();
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
      x: mainWindowBounds.x,
      y: mainWindowBounds.y,
      width: mainWindowBounds.width,
      height: mainWindowBounds.height,
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
    wc.on('blur', (event, url) => {
      // console.log('mainWindow webContents blur');
    });
    wc.on('focus', (event, url) => {
      // console.log('mainWindow webContents focus');
    });

    const menuBuilder = new MenuBuilder(mainWindow);
    menuBuilder.buildMenu();

    mainWindow.on('always-on-top-changed', () => {});
    mainWindow.on('app-command', () => {
      // console.log('mainWindow app-command');
    });
    mainWindow.on('blur', () => {
      // console.log('mainWindow blur');
      // allWindowsBlur.main = true;
      // checkWindowsBlur();
    });
    mainWindow.on('close', () => {});
    mainWindow.on('closed', () => (mainWindow = null));
    mainWindow.on('enter-full-screen', () => {});
    mainWindow.on('enter-html-full-screen', () => {});
    mainWindow.on('focus', () => {
      // console.log('mainWindow focus');
      // console.log('mainWindow focus');

      browserWindowHandler.resize(browserPanelState);
    });
    mainWindow.on('hide', () => {
      console.log('mainWindow hide');
    });
    mainWindow.on('leave-full-screen', () => {});
    mainWindow.on('leave-html-full-screen', () => {});
    mainWindow.on('maximize', () =>
      browserWindowHandler.resize(browserPanelState)
    );
    mainWindow.on('minimize', () => {
      if (browserWindow) browserWindow.minimize();
    });
    mainWindow.on('move', () => browserWindowHandler.resize(browserPanelState));
    mainWindow.on('moved', () =>
      browserWindowHandler.resize(browserPanelState)
    );
    mainWindow.on('new-window-for-tab', () => {});
    mainWindow.on('ready-to-show', () => {
      mainWindow.webContents.send('ready-to-show');
      if (process.platform === 'win32') {
        mainWindow.webContents.send('platform', 'windows');
        // Title.setWindowsTitle();
        mainWindow.setTitle(
          `${app.getName()} | Download Anything | Windows Version ${app.getVersion()} | Professional Audio Edition`
        );
      }
      if (process.platform === 'darwin') {
        mainWindow.webContents.send('platform', 'darwin');
        mainWindow.setTitle(
          `${app.getName()} | Download Anything | MacOS Version ${app.getVersion()} | Professional Audio Edition`
        );
      }
      if (process.platform === 'linux') {
        mainWindow.webContents.send('platform', 'linux');
        mainWindow.setTitle(
          `${app.getName()} | Download Anything | Linux Version ${app.getVersion()} | Professional Audio Edition`
        );
      }
      if (!mainWindow) {
        throw new Error('"mainWindow" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        mainWindow.minimize();
      } else {
        mainWindow.show();
      }
      mainWindow.webContents.send('package', packageJSON);
    });
    mainWindow.on('resize', () => {
      browserWindowHandler.resize(browserPanelState);
    });
    mainWindow.on('resized', (e) => {
      browserWindowHandler.resize(browserPanelState);
    });
    mainWindow.on('responsive', () => {
      console.log('mainWindow responsive');
    });
    mainWindow.on('restore', () => {
      browserWindowHandler.resize(browserPanelState);
    });
    mainWindow.on('session-end', () => {});
    mainWindow.on('sheet-begin', () => {});
    mainWindow.on('sheet-end', () => {});
    mainWindow.on('show', () => {
      browserWindowHandler.resize(browserPanelState);
    });
    mainWindow.on('system-context-menu', () => {
      console.log('system-context-menu');
    });
    mainWindow.on('unmaximize', () => {});
    mainWindow.on('unresponsive', () => {
      console.log('unresponsive');
    });
    mainWindow.on('will-move', () => {
      browserWindowHandler.resize(browserPanelState);
    });
    mainWindow.on('will-resize', () =>
      browserWindowHandler.resize(browserPanelState)
    );
  },
  createBrowserWindow: async function () {
    // if (isDebug) {
    // await installExtensions();
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
      isAlwaysOnTop: false,
      resizable: false,
      skipTaskbar: true,
      movable: false,
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

    browserWindow.on('ready-to-show', () => {
      console.log('browserWindow ready-to-show');
      mainWindow.maximize();
    });
    browserWindow.webContents.on('did-finish-load', () => {
      console.log('browserWindow did-finish-load');

      mainWindow.show();
      mainWindow.maximize();
      browserWindow.show();
      setTimeout(() => {
        browserWindowHandler.setScreenshot();
      }, 250);
    });
    browserWindow.webContents.on('did-navigate-in-page', () => {
      let currentURL = browserWindow.webContents.getURL();
      console.log('currentURL', currentURL);
      setTimeout(() => {
        browserWindowHandler.setScreenshot();
      }, 1500);
    });
    browserWindow.on('always-on-top-changed', () => {});
    browserWindow.on('blur', () => {
      // console.log('browserWindow blur');
      setTimeout(() => {
        browserWindowHandler.setScreenshot();
      }, 250);
      // allWindowsBlur.browser = true;
      // checkWindowsBlur();
    });
    // browserWindow.on('close', () => console.log('browserWindow close'));
    browserWindow.on('closed', () => (browserWindow = null));
    browserWindow.on('enter-full-screen', () => {});
    browserWindow.on('focus', () => {
      // console.log('browserWindow focus');
    });
    browserWindow.on('hide', () => {
      console.log('browserWindow hide');
    });
    browserWindow.on('maximize', () => {});
    browserWindow.on('minimize', () => {
      // console.log('browserWindow minimize');
    });
    browserWindow.on('move', () => {});
    browserWindow.on('moved', () => {});
    browserWindow.on('new-window-for-tab', () => {});
    browserWindow.on('ready-to-show', () => {});
    browserWindow.on('resize', () => {});
    browserWindow.on('resized', () => console.log('browserWindow resized'));
    browserWindow.on('responsive', () => {
      console.log('browserWindow responsive');
    });
    browserWindow.on('restore', () =>
      browserWindowHandler.resize(browserPanelState)
    );
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
      // installExtensions('YOUR_ID_HERE');
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
      show: true,
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
  resize: async function (browserWidth) {
    // console.log(browserWidth);

    if (browserWindow) {
      if (browserWindow.webContents.getURL().includes('pinterest')) {
        browserWindow.webContents.insertCSS(
          'html, body { background-color: #fff; }'
        );
      }
    }
    // mainWindow.getBounds();
    let defaultWidthDifference = mainWindowBounds.width / 2 - 9;
    let collapsedWidthDifference = 72;
    let expandedWidthDifference = mainWindowBounds.width - 91;
    if (browserWindow) browserWindow.setResizable(true);
    mainWindowBounds = mainWindow.getBounds();
    browserWindowBounds.height = Math.round(mainWindowBounds.height - 251);
    if (browserWidth === 'collapse')
      browserWindowBounds.width = Math.round(collapsedWidthDifference); // collapsed view
    if (browserWidth === 'expand')
      browserWindowBounds.width = Math.round(expandedWidthDifference); // collapsed view
    if (browserWidth === 'default' || browserWidth === undefined)
      browserWindowBounds.width = Math.round(defaultWidthDifference); // split view
    // if (browserWidth === undefined)
    //   browserWindowBounds.width = Math.round(defaultWidthDifference); // split view
    if (browserWindow)
      browserWindow.setSize(
        browserWindowBounds.width,
        browserWindowBounds.height
      );
    if (browserWindow)
      browserWindow.setPosition(
        mainWindowBounds.x + 8, // default
        mainWindowBounds.y + 181 // default
        // mainWindowBounds.y + 283 // testing
      );
    if (browserWindow) browserWindow.setResizable(false);
  },
  setScreenshot: async function () {
    if (browserWindow)
      if (browserWindow.webContents.getURL().includes('pinterest')) {
        browserWindow.webContents.insertCSS(
          'html, body, { background-color: #fff;  }'
        );
      }
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
          // console.log('capturePage');

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
    let display = screen.getAllDisplays()[0].workArea;
    // console.log(display);

    mainWindowBounds.x = display.x;
    mainWindowBounds.y = display.y;
    mainWindowBounds.width = display.width;
    mainWindowBounds.height = display.height; // default
    // mainWindowBounds.height = display.height - 100; // testing
    // console.log(mainWindowBounds);

    // windowController.createSplashWindow();
    // windowController.createBrowserWindow();
    windowController.createMainWindow();
    app.on('activate', () => {
      if (mainWindow === null) windowController.createMainWindow();
    });
  })
  .catch(console.log);
