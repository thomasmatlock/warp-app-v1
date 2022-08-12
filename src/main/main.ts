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
  globalShortcut,
  shell,
  ipcMain,
  screen,
  Tray,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import prefs from '../storage/preferences';
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
// const Store = require('electron-store');
// const settings = new Store();
// settings.set('downloads', downloads);
// settings.set('sources', sources);
// settings.set('prefs', prefs);

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}
let mWin: BrowserWindow | null = null;
let splashWindow: BrowserWindow | null = null;
let view: BrowserView | null = null;
let mWinBounds = { x: 0, y: 0, width: 1600, height: 900 };
const hideView = () => {
  if (view) view.setBounds({ x: 0, y: 0, width: 0, height: 0 });
};
const showView = () => {
  if (view)
    view.setBounds({
      x: viewBounds.x,
      y: viewBounds.y,
      width: mWin.getContentBounds().width / 2,
      height: mWin.getContentBounds().height - 192,
    });
};
let viewBounds = {
  x: 0,
  y: 130,
  // width: mWinBounds.width / 2 + 150,
  // height: mWinBounds.height - 350, // default
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
    // event.reply('Search: InputChange', [arg]);
  });
  ipcMain.on('Search: Submit', async (event, arg) => {
    // console.log('Search: Submit', arg);
    // console.log('Menu: Shortcuts: Restart', arg);
    // event.reply('Search: Submit', [arg]);
  });
  // NAV BAR LISTENERS
  ipcMain.on('nav: mode: audio', async (event, arg) => {
    mWin.webContents.send('count-downloads', arg);
    event.reply('nav: mode: audio', 'nav: mode: audio successful'); // sends message to renderer
    showView();
  });
  ipcMain.on('nav: mode: video', async (event) => {
    showView();
    event.reply('nav: mode: video', 'nav: mode: video successful'); // sends message to renderer
  });
  ipcMain.on('nav: mode: warpstagram', async (event) => {
    console.log('nav: mode: warpstagram');
    hideView();
    event.reply('nav: mode: warpstagram', 'nav: mode: warpstagram successful'); // sends message to renderer
  });
  // BROWSERBAR DOWNLOAD SOURCE LISTENERS
  ipcMain.on('loadActiveSource', async () => {
    if (view)
      if (view.webContents.getURL().includes('pinterest')) {
        view.webContents.insertCSS('html, body, { background-color: #fff;  }');
      }
  });
  ipcMain.on('source: change', async (event, arg) => {
    if (view) if (view) view.webContents.loadURL(arg);
    if (view.webContents.getURL().includes('pinterest')) {
      view.webContents.insertCSS('html, body, { background-color: #fff;  }');
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
    browserPanelState = arg;
    bWinHandler.resize(arg);
  });
  ipcMain.on('BrowserBar: button: goBack', async (event, arg) => {
    console.log('BrowserBar: button: goBack');
    if (view) view.webContents.goBack();
  });
  ipcMain.on('BrowserBar: button: goForward', async (event, arg) => {
    console.log('BrowserBar: button: goForward');
    if (view) view.webContents.goForward();
  });
  ipcMain.on('BrowserBar: button: reload', async (event, arg) => {
    console.log('BrowserBar: button: reload');
    if (view) view.webContents.reload();
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
  ipcMain.on('screenshot', async (event, arg) => {
    bWinHandler.setScreenshot();
  });
  ipcMain.on('hidebWin', async (event, arg) => {
    hideView();
  });
  ipcMain.on('showbWin', async (event, arg) => {
    showView();
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

    const menuBuilder = new MenuBuilder(mWin);
    menuBuilder.buildMenu();

    mWin.on('closed', () => (mWin = null));
    mWin.on('enter-full-screen', () => {});
    mWin.on('enter-html-full-screen', () => {
      let displayBounds = screen.getAllDisplays()[0].bounds;
      if (mWin) mWin.menuBarVisible = false;
      if (view) view.setBounds(displayBounds);
    });
    mWin.on('focus', () => {
      bWinHandler.resize(browserPanelState);
    });
    mWin.on('leave-full-screen', () => {});
    mWin.on('leave-html-full-screen', () => {
      if (mWin) mWin.menuBarVisible = true;
      if (view) showView();
    });
    mWin.on('maximize', () => bWinHandler.resize(browserPanelState));
    mWin.on('minimize', () => {});
    mWin.on('ready-to-show', () => {
      if (mWin) mWin.webContents.send('ready-to-show');
      if (process.platform === 'win32' && mWin) {
        mWin.webContents.send('platform', 'windows');
        // Title.setWindowsTitle();
        mWin.setTitle(`${app.getName()} | Professional Audio Edition`);
      }
      if (process.platform === 'darwin' && mWin) {
        mWin.webContents.send('platform', 'darwin');
        mWin.setTitle(`${app.getName()} | Professional Audio Edition`);
      }
      if (process.platform === 'linux' && mWin) {
        mWin.webContents.send('platform', 'linux');
        mWin.setTitle(`${app.getName()} | Professional Audio Edition`);
      }
      if (!mWin) {
        throw new Error('"mWin" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        mWin.minimize();
      } else {
        mWin.show();
        if (view) mWin.maximize();
        mWin.webContents.send('appVersion', app.getVersion());
      }
    });
    mWin.on('resize', () => {});
    mWin.on('resized', () => {
      bWinHandler.resize(browserPanelState);
    });
    mWin.on('restore', () => {
      bWinHandler.resize(browserPanelState);
    });
    mWin.on('show', () => {
      bWinHandler.resize(browserPanelState);
    });
  },
  createbView: async function () {
    view = new BrowserView();
    mWin.setBrowserView(view);
    view.setBounds({
      x: viewBounds.x,
      y: viewBounds.y,
      width: mWin.getContentBounds().width / 2,
      height: mWin.getContentBounds().height - 192,
    });

    view.setAutoResize({ width: true, height: true });
    view.setBackgroundColor('#1a1a1a');
    view.webContents.loadURL('https://youtube.com');
    view.webContents.on('did-navigate-in-page', (e, url) => {
      mWin.webContents.send('did-navigate-in-page', url);
    });
  },
};
const bWinHandler = {
  resize: async function (browserWidth) {
    let defaultWidthDifference = mWin.getContentBounds().width / 2;
    let collapsedWidthDifference = 72;
    let expandedWidthDifference = mWin.getContentBounds().width - 72;
    // COLLAPSED VIEW
    if (browserWidth === 'collapse') {
      if (view && mWin)
        view.setBounds({
          x: viewBounds.x,
          y: viewBounds.y,
          width: collapsedWidthDifference,
          height: mWin.getContentBounds().height - 192,
        });
    }
    // EXPANDED VIEW
    if (browserWidth === 'expand') {
      if (view && mWin)
        view.setBounds({
          x: viewBounds.x,
          y: viewBounds.y,
          width: expandedWidthDifference,
          height: mWin.getContentBounds().height - 192,
        });
    }
    // DEFAULT SPLIT VIEW
    if (browserWidth === 'default' || browserWidth === undefined) {
      if (view && mWin)
        view.setBounds({
          x: viewBounds.x,
          y: viewBounds.y,
          width: defaultWidthDifference,
          height: mWin.getContentBounds().height - 192,
        });
    }

    setTimeout(() => {
      bWinHandler.setScreenshot();
    }, 1000);
  },
  setScreenshot: async function () {
    if (view)
      if (view)
        view.webContents
          .capturePage({
            x: 0,
            y: 0,
            width: mWin.getContentBounds().width / 2,
            height: mWin.getContentBounds().height - 192,
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
    windowController.createmWin();
    windowController.createbView();
    // Register a 'CommandOrControl+X' shortcut listener.
    globalShortcut.register('Alt+Left', () => {
      if (view) view.webContents.goBack();
    });
    globalShortcut.register('Alt+Right', () => {
      if (view) view.webContents.goForward();
    });
    app.on('activate', () => {
      if (mWin === null) windowController.createmWin();
    });
  })
  .catch(console.log);
