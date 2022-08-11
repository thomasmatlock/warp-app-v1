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
const windowsVisibilityManager = () => {
  console.log('/////////////////////////////////////////////////////////////');

  // browserWindow
  if (bWin && bWin.isFocused() === true) {
    // console.log('bWin focused');
  } else {
    // console.log('bWin not focused');
  }
  if (bWin && bWin.isVisible() === true) {
    // console.log('bWin visible');
  } else {
    // console.log('bWin not visible');
  }
  if (bWin && bWin.isMaximized() === true) {
    // console.log('bWin maximized');
  } else {
    // console.log('bWin not maximized');
  }
  if (bWin && bWin.isMinimized() === true) {
    // console.log('bWin minimized');
  } else {
    // console.log('bWin not minimized');
  }
  if (bWin && bWin.isAlwaysOnTop() === true) {
    // console.log('bWin always on top');
  } else {
    // console.log('bWin not always on top');
  }
  if (bWin && bWin.isVisibleOnAllWorkspaces() === true) {
    // console.log('bWin visible on all workspaces');
  } else {
    // console.log('bWin not visible on all workspaces');
  }
  if (bWin && bWin.isResizable() === true) {
    // console.log('bWin resizable');
  } else {
    // console.log('bWin not resizable');
  }

  // mWin
  if (mWin.isFocused() === true) {
    console.log('mWin focused');
  } else {
    console.log('mWin not focused');
  }
  if (mWin.isVisible() === true) {
    console.log('mWin visible');
  } else {
    console.log('mWin not visible');
  }
  if (mWin.isMaximized() === true) {
    // console.log('mWin maximized');
  } else {
    // console.log('mWin not maximized');
  }
  if (mWin.isMinimized() === true) {
    // console.log('mWin minimized');
  } else {
    // console.log('mWin not minimized');
  }
  if (mWin.isAlwaysOnTop() === true) {
    console.log('mWin always on top');
  } else {
    console.log('mWin not always on top');
  }
  if (mWin.isVisibleOnAllWorkspaces() === true) {
    console.log('bWin visible on all workspaces');
  } else {
    console.log('mWin not visible on all workspaces');
  }
  if (mWin.isResizable() === true) {
    // console.log('mWin resizable');
  } else {
    // console.log('mWin not resizable');
  }
  let focusedWindow = BrowserWindow.getFocusedWindow();
  console.log(BrowserWindow.getFocusedWindow());
  if (focusedWindow !== null) {
    console.log('focusedWindow is null');
    // bWin.moveTop();
    // bWin.restore();
    // mWin.getBounds
  } else {
    // bWin.minimize();
    console.log('focusedWindow is not null');
  }
  // mWin.webContents.on('')
};
let mWin: BrowserWindow | null = null;
let splashWindow: BrowserWindow | null = null;
let view: BrowserView | null = null;
let bWin: BrowserWindow | null = null;
let mWinBounds = { x: 0, y: 0, width: 1600, height: 900 };
let bWinBounds = {
  x: mWinBounds.x + 8,
  y: mWinBounds.y + 183,
  width: mWinBounds.width / 2 - 250,
  height: mWinBounds.height - 250, // default
};
let browserPanelState = 'default';
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
    mWin.webContents.send('count-downloads', arg);
    event.reply('nav: mode: audio', 'nav: mode: audio successful'); // sends message to renderer
    if (bWin) bWin.show();
  });
  ipcMain.on('nav: mode: video', async (event, arg) => {
    event.reply('nav: mode: video', 'nav: mode: video successful'); // sends message to renderer
    if (bWin) bWin.show();
  });
  ipcMain.on('nav: mode: warpstagram', async (event, arg) => {
    console.log('nav: mode: warpstagram');

    if (bWin) bWin.hide();
    event.reply('nav: mode: warpstagram', 'nav: mode: warpstagram successful'); // sends message to renderer
  });
  // BROWSERBAR DOWNLOAD SOURCE LISTENERS
  ipcMain.on('loadActiveSource', async (event, arg) => {
    if (bWin) bWin.loadURL(arg);
    if (bWin.webContents.getURL().includes('pinterest')) {
      bWin.webContents.insertCSS('html, body, { background-color: #fff;  }');
    }
  });
  ipcMain.on('source: change', async (event, arg) => {
    if (bWin) bWin.loadURL(arg);
    if (bWin.webContents.getURL().includes('pinterest')) {
      bWin.webContents.insertCSS('html, body, { background-color: #fff;  }');
    }
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
    bWinHandler.resize(arg);
    setTimeout(() => {
      // bWinHandler.setScreenshot();
      if (arg != 'collapse' && bWin) bWin.focus();
    }, 500);

    // event.reply('BrowserBar: button: downloadVideo successful'); // sends message to renderer
  });
  ipcMain.on('BrowserBar: button: goBack', async (event, arg) => {
    console.log('BrowserBar: button: goBack');
    if (bWin) bWin.webContents.goBack();

    // event.reply('BrowserBar: button: downloadVideo successful'); // sends message to renderer
  });
  ipcMain.on('BrowserBar: button: goForward', async (event, arg) => {
    console.log('BrowserBar: button: goForward');
    if (bWin) bWin.webContents.goForward();

    // event.reply('BrowserBar: button: downloadVideo successful'); // sends message to renderer
  });
  ipcMain.on('BrowserBar: button: reload', async (event, arg) => {
    console.log('BrowserBar: button: reload');
    if (bWin) bWin.webContents.reload();
    // bWinHandler.setScreenshot();

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
(function bWinListeners() {
  ipcMain.on('bWinDimensions', async (event, arg) => {
    if (bWin) bWin.setResizable(true);
    bWinBounds.width = Math.round(arg.width);
    bWinBounds.height = Math.round(arg.height);
    if (bWin) bWin.setSize(bWinBounds.width, bWinBounds.height);
    if (bWin) bWin.setResizable(false);
    // bWinHandler.setScreenshot();
  });
  ipcMain.on('browserHovered', async (event, arg) => {
    if (bWin) bWin.focus();
  });
  ipcMain.on('browserNotHovered', async (event, arg) => {
    if (bWin) bWin.blur();
  });
  ipcMain.on('prepareToHidebWin', async (event, arg) => {
    bWinHandler.setScreenshot();
    // mWin.webContents.send('request-browserDimensions');
  });
  ipcMain.on('hidebWin', async (event, arg) => {
    console.log('hidebWin');

    // let opacity = bWin.getOpacity();
    // console.log('hidebWin', opacity);
    // bWin.setOpacity(0);
    // view.setOpacity(0);
    // view.setOpacity(0);
    // view.hide();
    view.setBounds({ x: 0, y: 0, width: 0, height: 0 });
    // if (view) view.setAlwaysOnTop(false);
    if (bWin) bWin.setAlwaysOnTop(false);
    // togglebWinOnTop();
    // togglebWinOnTop();
    mWin.setAlwaysOnTop(true);
    mWin.focus();
  });
  ipcMain.on('showbWin', async (event, arg) => {
    // bWin.setOpacity(1);
    // view.show();
    // view.setBounds({ x: 0, y: 0, width: 800, height: 0 });
    view.setBounds({ x: 0, y: 132, width: 800, height: 550 });
    // view.setOpacity(1);
    // if (view) view.setAlwaysOnTop(true);
    if (bWin) bWin.setAlwaysOnTop(true);
    // togglebWinOnTop();
    mWin.setAlwaysOnTop(false);
    if (bWin) bWin.focus();
  });
})();

const windowController = {
  createmWin: async function () {
    if (isDebug) {
      // await installExtensions();
    }

    const RESOURCES_PATH = app.isPackaged
      ? path.join(process.resourcesPath, 'assets')
      : path.join(__dirname, '../../assets');

    const getAssetPath = (...paths: string[]): string => {
      return path.join(RESOURCES_PATH, ...paths);
    };

    mWin = new BrowserWindow({
      x: mWinBounds.x,
      y: mWinBounds.y,
      width: mWinBounds.width,
      height: mWinBounds.height,
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

    mWin.loadURL(resolveHtmlPath('index.html'));

    const wc = mWin.webContents;
    wc.on('did-finish-load', (event, url) => {
      // console.log('mWin did-finish-load');
      // mWin.show();
    });
    wc.on('dom-ready', (event, url) => {
      // console.log('mWin dom-ready');
    });
    wc.on('blur', (event, url) => {
      windowsVisibilityManager();
    });
    wc.on('focus', (event, url) => {
      windowsVisibilityManager();
    });

    const menuBuilder = new MenuBuilder(mWin);
    menuBuilder.buildMenu();

    mWin.on('always-on-top-changed', () => {});
    mWin.on('app-command', () => {
      // console.log('mWin app-command');
    });
    mWin.on('blur', () => {
      windowsVisibilityManager();
    });
    mWin.on('close', () => {});
    mWin.on('closed', () => (mWin = null));
    mWin.on('enter-full-screen', () => {});
    mWin.on('enter-html-full-screen', () => {});
    mWin.on('focus', () => {
      windowsVisibilityManager();
      bWinHandler.resize(browserPanelState);
    });
    mWin.on('hide', () => {});
    mWin.on('leave-full-screen', () => {});
    mWin.on('leave-html-full-screen', () => {});
    mWin.on('maximize', () => bWinHandler.resize(browserPanelState));
    mWin.on('minimize', () => {
      if (bWin) bWin.minimize();
    });
    mWin.on('move', () => bWinHandler.resize(browserPanelState));
    mWin.on('moved', () => bWinHandler.resize(browserPanelState));
    mWin.on('new-window-for-tab', () => {});
    mWin.on('ready-to-show', () => {
      mWin.webContents.send('ready-to-show');
      if (process.platform === 'win32') {
        mWin.webContents.send('platform', 'windows');
        // Title.setWindowsTitle();
        mWin.setTitle(
          `${app.getName()} | Download Anything | Windows Version ${app.getVersion()} | Professional Audio Edition`
        );
      }
      if (process.platform === 'darwin') {
        mWin.webContents.send('platform', 'darwin');
        mWin.setTitle(
          `${app.getName()} | Download Anything | MacOS Version ${app.getVersion()} | Professional Audio Edition`
        );
      }
      if (process.platform === 'linux') {
        mWin.webContents.send('platform', 'linux');
        mWin.setTitle(
          `${app.getName()} | Download Anything | Linux Version ${app.getVersion()} | Professional Audio Edition`
        );
      }
      if (!mWin) {
        throw new Error('"mWin" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        mWin.minimize();
      } else {
        mWin.show();
      }
      mWin.webContents.send('package', packageJSON);
    });
    mWin.on('resize', () => {
      bWinHandler.resize(browserPanelState);
    });
    mWin.on('resized', (e) => {
      bWinHandler.resize(browserPanelState);
    });
    mWin.on('responsive', () => {
      console.log('mWin responsive');
    });
    mWin.on('restore', () => {
      bWinHandler.resize(browserPanelState);
    });
    mWin.on('session-end', () => {});
    mWin.on('sheet-begin', () => {});
    mWin.on('sheet-end', () => {});
    mWin.on('show', () => {
      bWinHandler.resize(browserPanelState);
    });
    mWin.on('system-context-menu', () => {
      console.log('system-context-menu');
    });
    mWin.on('unmaximize', () => {});
    mWin.on('unresponsive', () => {
      console.log('unresponsive');
    });
    mWin.on('will-move', () => {
      bWinHandler.resize(browserPanelState);
    });
    mWin.on('will-resize', () => bWinHandler.resize(browserPanelState));
  },
  createbWin: async function () {
    // if (isDebug) {
    // await installExtensions();
    // }

    // const RESOURCES_PATH = app.isPackaged
    //   ? path.join(process.resourcesPath, 'assets')
    //   : path.join(__dirname, '../../assets');

    // const getAssetPath = (...paths: string[]): string => {
    //   return path.join(RESOURCES_PATH, ...paths);
    // };

    bWin = new BrowserWindow({
      height: bWinBounds.height,
      width: bWinBounds.width,
      x: bWinBounds.x,
      y: bWinBounds.y,
      // x: 100,
      // y: 100,
      frame: false,
      transparent: true,
      parent: mWin,
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

    bWin.on('ready-to-show', () => {});
    bWin.webContents.on('did-finish-load', () => {
      console.log('bWin did-finish-load');

      mWin.show();
      // mWin.maximize();
      bWin.show();
    });
    bWin.webContents.on('did-navigate-in-page', () => {
      let currentURL = bWin.webContents.getURL();
      mWin.webContents.send('did-navigate-in-page', currentURL);
    });
    bWin.on('always-on-top-changed', () => {});
    bWin.on('blur', () => {
      windowsVisibilityManager();
    });
    bWin.webContents.on('blur', () => {
      windowsVisibilityManager();
    });
    bWin.on('close', () => {});
    bWin.on('closed', () => (bWin = null));
    bWin.on('enter-full-screen', () => {});
    bWin.on('focus', () => {
      windowsVisibilityManager();
    });
    bWin.webContents.on('focus', () => {
      windowsVisibilityManager();
    });
    bWin.on('hide', () => {});
    bWin.on('maximize', () => {});
    bWin.on('minimize', () => {});
    bWin.on('move', () => {});
    bWin.on('moved', () => {});
    bWin.on('new-window-for-tab', () => {});
    bWin.on('ready-to-show', () => {});
    bWin.on('resize', () => {});
    bWin.on('resized', () => {});
    bWin.on('responsive', () => {});
    bWin.on('restore', () => bWinHandler.resize(browserPanelState));
    bWin.on('session-end', () => {});
    bWin.on('sheet-begin', () => {});
    bWin.on('sheet-end', () => {});
    bWin.on('show', () => {});
    bWin.on('system-context-menu', () => {});
    bWin.on('unmaximize', () => {});
    bWin.on('unresponsive', () => {});
    bWin.on('will-move', () => {});
    bWin.on('will-resize', () => {});
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
};
const bWinHandler = {
  resize: async function (browserWidth) {
    // console.log(browserWidth);

    if (bWin) {
      if (bWin.webContents.getURL().includes('pinterest')) {
        bWin.webContents.insertCSS('html, body { background-color: #fff; }');
      }
    }
    // mWin.getBounds();
    let defaultWidthDifference = mWinBounds.width / 2 - 8;
    let collapsedWidthDifference = 72;
    let expandedWidthDifference = mWinBounds.width - 88;
    if (bWin) bWin.setResizable(true);
    mWinBounds = mWin.getBounds();
    bWinBounds.height = Math.round(mWinBounds.height - 251);
    if (browserWidth === 'collapse')
      bWinBounds.width = Math.round(collapsedWidthDifference); // collapsed view
    if (browserWidth === 'expand')
      bWinBounds.width = Math.round(expandedWidthDifference); // collapsed view
    if (browserWidth === 'default' || browserWidth === undefined)
      bWinBounds.width = Math.round(defaultWidthDifference); // split view
    // if (browserWidth === undefined)
    //   bWinBounds.width = Math.round(defaultWidthDifference); // split view
    if (bWin) bWin.setSize(bWinBounds.width, bWinBounds.height);
    if (bWin)
      bWin.setPosition(
        mWinBounds.x + 8, // default
        mWinBounds.y + 181 // default
        // mWinBounds.y + 283 // testing
      );
    if (bWin) bWin.setResizable(false);
    setTimeout(() => {
      bWinHandler.setScreenshot();
    }, 100);
  },
  setScreenshot: async function () {
    if (bWin)
      if (bWin)
        bWin.webContents
          .capturePage({
            x: 0,
            y: 0,
            width: bWinBounds.width,
            height: bWinBounds.height,
          })
          .then((img) => {
            mWin.webContents.send('capturePage', [img.toDataURL()]);
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

    mWinBounds.x = display.x;
    mWinBounds.y = display.y;
    mWinBounds.width = display.width;
    // mWinBounds.height = display.height; // default
    mWinBounds.height = display.height - 250; // testing
    // console.log(mWinBounds);

    // const win = new BrowserWindow({
    //   x: 0,
    //   y: 0,
    //   width: 800,
    //   height: 600,
    //   frame: false,
    //   parent: mWin,
    //   skipTaskbar: true,
    //   // alwaysOnTop: true,
    // });

    // const view = new BrowserView();
    // win.setBrowserView(view);
    // view.setBounds({ x: 0, y: 0, width: 800, height: 800 });

    // windowController.createSplashWindow();
    windowController.createbWin();
    windowController.createmWin();
    view = new BrowserView();
    mWin.setBrowserView(view);
    view.setBounds({ x: 0, y: 132, width: 800, height: 550 });
    view.setAutoResize({ width: true, height: true });
    view.webContents.loadURL('https://electronjs.org');
    app.on('activate', () => {
      if (mWin === null) windowController.createmWin();
    });
  })
  .catch(console.log);
