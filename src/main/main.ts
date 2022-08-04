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
const contextMenu = require('electron-context-menu');

// console.log(`${package.name} ${package.version}`);

contextMenu({
  // inspect: true,
});
const Store = require('electron-store');

const settings = new Store();
// console.log(store);
settings.set('downloads', {
  audio: [],
  video: [],
  warpstagram: { subscribed: [], pinned: [] },
});
settings.set('prefs', {
  audio: {
    dropdowns: [
      {
        title: 'Audio Quality',
        selectID: 'audioQuality',
        options: [
          {
            visible: true,
            enabled: true,
            id: 'audioQuality_best',
            value: 'audioQuality_best',
            label: 'Best Available',
          },
          {
            visible: true,
            enabled: false,
            id: 'audioQuality_high',
            value: 'audioQuality_high',
            label: 'High quality (320kbps)',
          },
          {
            visible: true,
            enabled: false,
            id: 'audioQuality_medium',
            value: 'audioQuality_medium',
            label: 'Medium quality (256kbps)',
          },
          {
            visible: true,
            enabled: false,
            id: 'audioQuality_low',
            value: 'audioQuality_low',
            label: 'Low quality (128kbps)',
          },
        ],
      },

      {
        title: 'Audio Format',
        selectID: 'audioFormat',
        options: [
          {
            visible: true,
            enabled: true,
            id: 'audioFormat_MP3',
            value: 'audioFormat_MP3',
            label: 'MP3 (default)',
          },
          {
            visible: true,
            enabled: false,
            id: 'audioFormat_M4A',
            value: 'audioFormat_M4A',
            label: 'M4A',
          },
          {
            visible: true,
            enabled: false,
            id: 'audioFormat_WAV',
            value: 'audioFormat_WAV',
            label: 'WAV',
          },
          {
            visible: true,
            enabled: false,
            id: 'audioFormat_OGG',
            value: 'audioFormat_OGG',
            label: 'OGG',
          },
        ],
      },
    ],
  },
  video: {
    dropdowns: [
      {
        title: 'Video Quality',
        selectID: 'videoQuality',
        options: [
          {
            enabled: true,
            visible: true,
            id: 'videoQuality_best',
            value: 'videoQuality_best',
            label: 'Best Available',
          },
          {
            enabled: false,
            visible: true,
            id: 'videoQuality_8k_60fps',
            value: 'videoQuality_8k_60fps',
            label: '8k 60fps',
          },

          {
            enabled: false,
            visible: true,
            id: 'videoQuality_8k',
            value: 'videoQuality_8k',
            label: '8k',
          },
          {
            enabled: false,
            visible: true,
            id: 'videoQuality_4k_60fps',
            value: 'videoQuality_4k_60fps',
            label: '4k 60fps',
          },
          {
            enabled: false,
            visible: true,
            id: 'videoQuality_4k',
            value: 'videoQuality_4k',
            label: '4k',
          },
          {
            enabled: false,
            visible: true,
            id: 'videoQuality_1080p_60fps',
            value: 'videoQuality_1080p_60fps',
            label: '1080p 60fps',
          },
          {
            enabled: false,
            visible: true,
            id: 'videoQuality_1080p',
            value: 'videoQuality_1080p',
            label: '1080p',
          },
          {
            enabled: false,
            visible: true,
            id: 'videoQuality_720p_60fps',
            value: 'videoQuality_720p_60fps',
            label: '720p 60fps',
          },
          {
            enabled: false,
            visible: true,
            id: 'videoQuality_720p',
            value: 'videoQuality_720p',
            label: '720p',
          },
          {
            enabled: false,
            visible: true,
            id: 'videoQuality_480p',
            value: 'videoQuality_480p',
            label: '480p',
          },
          {
            enabled: false,
            visible: true,
            id: 'videoQuality_360p',
            value: 'videoQuality_360p',
            label: '360p',
          },
          {
            enabled: false,
            visible: true,
            id: 'videoQuality_240p',
            value: 'videoQuality_240p',
            label: '240p',
          },
        ],
      },
      {
        title: 'Video Format',
        selectID: 'videoFormat',
        options: [
          {
            enabled: true,
            visible: true,
            id: 'videoFormat_MP4',
            value: 'videoFormat_MP4',
            label: 'MP4 (default)',
          },
          {
            enabled: false,
            visible: true,
            id: 'videoFormat_MKV',
            value: 'videoFormat_MKV',
            label: 'MKV',
          },

          {
            enabled: false,
            visible: true,
            id: 'videoFormat_MOV',
            value: 'videoFormat_MOV',
            label: 'MOV',
          },
        ],
      },
    ],
  },
  warpstagram: {
    dropdowns: [
      {
        title: 'Auto update',
        selectID: 'warpstagram_updateSelected',
        options: [
          {
            enabled: true,
            visible: true,
            id: 'warpstagram_updateSelected_all',
            value: 'warpstagram_updateSelected_all',
            label: 'Update All',
          },
          {
            enabled: false,
            visible: true,
            id: 'warpstagram_updateSelected_pinned',
            value: 'warpstagram_updateSelected_pinned',
            label: 'Update Pinned',
          },
          {
            enabled: false,
            visible: true,
            id: 'warpstagram_updateSelected_disabled',
            value: 'warpstagram_updateSelected_disabled',
            label: 'Disabled',
          },
        ],
      },
      {
        title: 'Post sorting',
        selectID: 'warpstagram_postSorting',
        options: [
          {
            enabled: true,
            visible: true,
            id: 'warpstagram_postSorting_default',
            value: 'warpstagram_postSorting_default',
            label: 'Default',
          },
          {
            enabled: false,
            visible: true,
            id: 'warpstagram_postSorting_new_to_old',
            value: 'warpstagram_postSorting_new_to_old',
            label: 'Newest to oldest',
          },
          {
            enabled: false,
            visible: true,
            id: 'warpstagram_postSorting_old_to_new',
            value: 'warpstagram_postSorting_old_to_new',
            label: 'Oldest to newest',
          },
          {
            enabled: false,
            visible: true,
            id: 'warpstagram_postSorting_AZ',
            value: 'warpstagram_postSorting_AZ',
            label: 'A to Z',
          },
          {
            enabled: false,
            visible: true,
            id: 'warpstagram_postSorting_ZA',
            value: 'warpstagram_postSorting_ZA',
            label: 'Z to A',
          },
        ],
      },
      {
        title: 'Auto update frequency',
        selectID: 'warpstagram_autoUpdateFrequency',
        options: [
          {
            enabled: true,
            visible: true,
            id: 'warpstagram_autoUpdateFrequency_24',
            value: 'warpstagram_autoUpdateFrequency_24',
            label: 'Daily',
          },
          {
            enabled: false,
            visible: true,
            id: 'warpstagram_autoUpdateFrequency_12',
            value: 'warpstagram_autoUpdateFrequency_12',
            label: '12 hours',
          },
          {
            enabled: false,
            visible: true,
            id: 'warpstagram_autoUpdateFrequency_6',
            value: 'warpstagram_autoUpdateFrequency_6',
            label: '6 hours',
          },
        ],
      },
    ],
  },
  general: {
    checkboxes: [{ autostartWarp: false }, { minimizeToTrayOnClose: false }],
    dropdowns: [
      {
        title: 'Theme',
        selectID: 'general_theme',
        options: [
          {
            enabled: true,
            visible: true,
            id: 'general_theme_dark',
            value: 'general_theme_dark',
            label: 'Dark theme (default theme of Warp)',
          },
          {
            enabled: false,
            visible: true,
            id: 'general_theme_light',
            value: 'general_theme_light',
            label: 'Light theme',
          },
        ],
      },
      {
        title: 'Startup mode on launch',
        selectID: 'general_startupTab',
        options: [
          {
            enabled: true,
            visible: true,
            id: 'general_startupTab_audio',
            value: 'general_startupTab_audio',
            label: 'Audio (default startup mode)',
          },
          {
            enabled: false,
            visible: true,
            id: 'general_startupTab_video',
            value: 'general_startupTab_video',
            label: 'Video',
          },
          {
            enabled: false,
            visible: true,
            id: 'general_startupTab_warpstagram',
            value: 'general_startupTab_warpstagram',
            label: 'Warpstagram',
          },
          {
            enabled: false,
            visible: true,
            id: 'general_startupTab_recent',
            value: 'general_startupTab_recent',
            label: 'Most recently used mode',
          },
        ],
      },
    ],
  },

  // pathMain: 'C:\\Users\\Tommy\\Documents\\Warp Downloader',
  // pathAudio: 'C:\\Users\\Tommy\\Documents\\Warp Downloader\\Audio',
  // pathVideo: 'C:\\Users\\Tommy\\Documents\\Warp Downloader\\Video',
  // pathWarpstagram: 'C:\\Users\\Tommy\\Documents\\Warp Downloader\\Warpstagram',
});
// console.log(settings.get('downloads'));
// console.log(settings.get('prefs.audio[1]'));
let prefs = settings.get('prefs');
// console.log(prefs);
let tray = null;
app.whenReady().then(() => {
  tray = new Tray('/path/to/my/icon');
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' },
  ]);
  tray.setToolTip('This is my application.');
  tray.setContextMenu(contextMenu);
});
// store.set('foo.bar', true);
// store.delete('unicorn');

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
// let windowBounds = {
//   main: { x: 200, y: 0, width: 1600, height: 900 },
//   splash: { x: 400, y: 400, width: 400, height: 400 },
//   browser: {
//     // x: this.main.x + 10,
//     // y: this.main.y + 180,
//     // width: this.main.width / 2 - 250,
//     // height: this.main.height - 250, // default
//   },
// };
let mainWindowBounds = { x: 200, y: 0, width: 1600, height: 900 };
let browserWindowBounds = {
  x: mainWindowBounds.x + 8,
  y: mainWindowBounds.y + 183,
  width: mainWindowBounds.width / 2 - 250,
  height: mainWindowBounds.height - 250, // default
  // height: mainWindowBounds.height - 300, // testing
};

(function appListeners() {
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
  ipcMain.on('screenshotting', async (event, arg) => {
    // setBrowserScreenshot(event, arg);
  });
  ipcMain.on('browserWindowDimensions', async (event, arg) => {
    browserWindowBounds.width = Math.round(arg.width);
    browserWindowBounds.height = Math.round(arg.height);
    // console.log(browserWindowBounds);
  });
  ipcMain.on('browserHovered', async (event, arg) => {
    browserWindow.focus();
  });
  ipcMain.on('browserNotHovered', async (event, arg) => {
    browserWindow.blur();
  });
  ipcMain.on('prepareToHideBrowserWindow', async (event, arg) => {
    // setBrowserScreenshot();
  });
  ipcMain.on('hideBrowserWindow', async (event, arg) => {
    browserWindow.setAlwaysOnTop(false, 'screen');
    mainWindow.setAlwaysOnTop(true, 'screen');
  });
  ipcMain.on('showBrowserWindow', async (event, arg) => {
    console.log('showBrowserWindow');
    mainWindow.setAlwaysOnTop(false, 'screen');
    if (browserWindow) browserWindow.setAlwaysOnTop(true, 'screen');
    if (browserWindow) browserWindow.focus();
  });
})();

const setBrowserScreenshot = () => {
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };
  // console.log('setBrowserScreenshot');
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
};
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

  const resizeBrowserWindow = (e) => {
    if (browserWindow) browserWindow.setResizable(true);
    mainWindowBounds = mainWindow.getBounds();
    // console.log('mainWindowBounds', mainWindowBounds);
    // console.log('browserWindowBounds', browserWindowBounds);
    // browserWindowBounds.width = Math.round(mainWindowBounds.width / 2 - 10);
    // browserWindowBounds.width = 1;
    // browserWindowBounds.height = Math.round(mainWindowBounds.height - 270); //default
    // browserWindowBounds.height = 1; //default
    // browserWindowBounds.height = Math.round(mainWindowBounds.height - 300); //testing
    // browserWindowBounds.width = Math.round(mainWindowBounds.width / 2 - 10);//default/
    // browserWindowBounds.height = Math.round(mainWindowBounds.height - 255); //default
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
    // if (browserWindow) browserWindow.setResizable(false);
  };
  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  mainWindow.on('always-on-top-changed', () => {
    // console.log('mainWindow always-on-top-changed');
  });
  mainWindow.on('app-command', () => {
    console.log('mainWindow app-command');
  });
  mainWindow.on('blur', () => {
    console.log('mainWindow blur');
  });
  mainWindow.on('close', () => {
    console.log('mainWindow close');
  });
  mainWindow.on('closed', () => {
    console.log('mainWindow closed');
    mainWindow = null;
  });
  mainWindow.on('enter-full-screen', () => {
    console.log('mainWindow enter-full-screen');
  });
  mainWindow.on('enter-html-full-screen', () => {
    console.log('mainWindow enter-html-full-screen');
  });
  mainWindow.on('focus', () => {
    wc.send('request-browserDimensions');
    console.log('mainWindow focus');
    // setBrowserScreenshot();
  });
  mainWindow.on('hide', () => {
    console.log('mainWindow hide');
  });
  mainWindow.on('leave-full-screen', () => {
    console.log('mainWindow leave-full-screen');
  });
  mainWindow.on('leave-html-full-screen', () => {
    console.log('mainWindow leave-html-full-screen');
  });
  mainWindow.on('maximize', () => {
    // console.log('mainWindow maximize');
    wc.send('request-browserDimensions');
    resizeBrowserWindow();
    // setBrowserScreenshot();
  });
  mainWindow.on('minimize', () => {
    console.log('mainWindow minimize');
    if (browserWindow) browserWindow.minimize();
    // if (browserWindow) browserWindow.hide();
    // wc.send('will-resize');
  });
  mainWindow.on('move', (e) => {
    wc.send('request-browserDimensions');
    // console.log('mainWindow move');
    resizeBrowserWindow();
  });
  mainWindow.on('moved', () => {
    wc.send('request-browserDimensions');
    // console.log('mainWindow moved');
    resizeBrowserWindow();

    // browserWindow.setSize(1, 1);
    // setBrowserScreenshot();
    // if (browserWindow) browserWindow.setResizable(false);
    // if (browserWindow) browserWindow.show();
    // wc.send('moved');
  });
  mainWindow.on('new-window-for-tab', () => {
    console.log('mainWindow new-window-for-tab');
  });
  mainWindow.on('ready-to-show', () => {
    console.log('mainWindow ready-to-show');
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
    // console.log('mainWindow resize');
    wc.send('request-browserDimensions');
    resizeBrowserWindow();

    // if (browserWindow) resizeBrowserWindow();
  });
  mainWindow.on('resized', (e) => {
    resizeBrowserWindow();
    wc.send('request-browserDimensions');

    // console.log('mainWindow resized');
  });
  mainWindow.on('responsive', () => {
    console.log('mainWindow responsive');
  });
  mainWindow.on('restore', () => {
    // console.log('mainWindow restore');
    wc.send('request-browserDimensions');
    // mainWindow.restore();
    // setBrowserScreenshot();
    if (browserWindow) browserWindow.restore();
    resizeBrowserWindow();

    // if (browserWindow) resizeBrowserWindow();
    // if (browserWindow) browserWindow.show();
    // browserWindow.hide();
  });
  mainWindow.on('session-end', () => {
    console.log('mainWindow session-end');
  });
  mainWindow.on('sheet-begin', () => {
    console.log('mainWindow sheet-begin');
  });
  mainWindow.on('sheet-end', () => {
    console.log('mainWindow sheet-end');
  });
  mainWindow.on('show', () => {
    console.log('mainWindow show');
  });
  mainWindow.on('system-context-menu', () => {
    console.log('mainWindow system-context-menu');
  });
  mainWindow.on('unmaximize', () => {
    console.log('mainWindow unmaximize');
    resizeBrowserWindow();
  });
  mainWindow.on('unresponsive', () => {
    console.log('mainWindow unresponsive');
  });
  mainWindow.on('will-move', (e) => {
    wc.send('request-browserDimensions');
    // console.log('mainWindow will-move');
    resizeBrowserWindow();

    // if (browserWindow) browserWindow.setResizable(true);
    // browserWindow.setSize(1, 1);
    // resizeBrowserWindow();
    // browserWindow.hide();
  });
  mainWindow.on('will-resize', () => {
    // console.log('mainWindow will-resize');
    wc.send('request-browserDimensions');
    resizeBrowserWindow();

    // wc.send('will-resize');
  });
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
  // splashWindow.loadFile('splash.html');

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
const createBrowserWindow = async () => {
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
  // browserWindow.loadURL('https://github.com');
  // browserWindow.loadURL('https://soundcloud.com');
  // browserWindow.loadURL('https://pinterest.com');
  // browserWindow.loadURL('https://tiktok.com');
  // browserWindow.loadURL('https://twitter.com');
  // browserWindow.loadURL('https://youtube.com');
  browserWindow.loadURL('https://youtube.com');
  // browserWindow.loadURL('www.youtube.com');
  // browserWindow.loadFile('splash.html');

  // browserWindow.on('ready-to-show', () => {
  //   if (!browserWindow) {
  //     throw new Error('"mainWindow" is not defined');
  //   }
  //   if (process.env.START_MINIMIZED) {
  //     browserWindow.minimize();
  //   } else {
  //     browserWindow.show();
  //   }
  // });
  browserWindow.setAlwaysOnTop(true, 'screen');

  browserWindow.once('ready-to-show', () => {
    console.log('browserWindow ready-to-show');
    // setBrowserScreenshot();
    browserWindow.show();
  });
  browserWindow.on('always-on-top-changed', () => {
    console.log('browserWindow always-on-top-changed');
  });
  browserWindow.on('app-command', () => {
    // console.log('browserWindow app-command');
  });
  browserWindow.on('blur', () => {
    // setBrowserScreenshot();
    console.log('browserWindow blur');
  });
  browserWindow.on('close', () => {
    console.log('browserWindow close');
  });
  browserWindow.on('closed', () => {
    console.log('browserWindow closed');
    browserWindow = null;
  });
  browserWindow.on('enter-full-screen', () => {
    console.log('browserWindow enter-full-screen');
  });
  browserWindow.on('enter-html-full-screen', () => {
    console.log('browserWindow enter-html-full-screen');
  });
  browserWindow.on('focus', () => {
    console.log('browserWindow focus');
  });
  browserWindow.on('hide', () => {
    console.log('browserWindow hide');
  });
  browserWindow.on('leave-full-screen', () => {
    console.log('browserWindow leave-full-screen');
  });
  browserWindow.on('leave-html-full-screen', () => {
    console.log('browserWindow leave-html-full-screen');
  });
  browserWindow.on('maximize', () => {
    console.log('browserWindow maximize');
  });
  browserWindow.on('minimize', () => {
    // console.log('browserWindow minimize');
  });
  browserWindow.on('move', (e) => {
    // console.log('browserWindow move');
  });
  browserWindow.on('moved', () => {
    // console.log('browserWindow moved');
  });
  browserWindow.on('new-window-for-tab', () => {
    console.log('browserWindow new-window-for-tab');
  });
  browserWindow.on('ready-to-show', () => {
    console.log('browserWindow ready-to-show');
  });
  browserWindow.on('resize', () => {
    // console.log('browserWindow resize');
  });
  browserWindow.on('resized', (e) => {
    // console.log('browserWindow resized');
  });
  browserWindow.on('responsive', () => {
    console.log('browserWindow responsive');
  });
  browserWindow.on('restore', () => {
    console.log('browserWindow restore');
  });
  browserWindow.on('session-end', () => {
    console.log('browserWindow session-end');
  });
  browserWindow.on('sheet-begin', () => {
    console.log('browserWindow sheet-begin');
  });
  browserWindow.on('sheet-end', () => {
    console.log('browserWindow sheet-end');
  });
  browserWindow.on('show', () => {
    console.log('browserWindow show');
  });
  browserWindow.on('system-context-menu', () => {
    console.log('browserWindow system-context-menu');
  });
  browserWindow.on('unmaximize', () => {
    console.log('browserWindow unmaximize');
  });
  browserWindow.on('unresponsive', () => {
    console.log('browserWindow unresponsive');
  });
  browserWindow.on('will-move', (e) => {
    console.log('browserWindow will-move');
  });
  browserWindow.on('will-resize', () => {
    // console.log('browserWindow will-resize');
  });
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

// var screenshot = document.getElementById('screenshot');
// screenshot.addEventListener('click', (event) => {
//   mainWindow.webContents
//     .capturePage({
//       x: 0,
//       y: 0,
//       width: 800,
//       height: 600,
//     })
//     .then((img) => {
//       dialog
//         .showSaveDialog({
//           title: 'Select the File Path to save',

//           // Default path to assets folder
//           defaultPath: path.join(__dirname, '../assets/image.png'),

//           // defaultPath: path.join(__dirname,
//           // '../assets/image.jpeg'),
//           buttonLabel: 'Save',

//           // Restricting the user to only Image Files.
//           filters: [
//             {
//               name: 'Image Files',
//               extensions: ['png', 'jpeg', 'jpg'],
//             },
//           ],
//           properties: [],
//         })
//         .then((file) => {
//           // Stating whether dialog operation was
//           // cancelled or not.
//           console.log(file.canceled);
//           if (!file.canceled) {
//             console.log(file.filePath.toString());

//             // Creating and Writing to the image.png file
//             // Can save the File as a jpeg file as well,
//             // by simply using img.toJPEG(100);
//             fs.writeFile(
//               file.filePath.toString(),
//               img.toPNG(),
//               'base64',
//               function (err) {
//                 if (err) throw err;
//                 console.log('Saved!');
//               }
//             );
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

app
  .whenReady()
  .then(() => {
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
    // view.webContents.loadURL('https://youtube.com');
    createBrowserWindow();
    createMainWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createMainWindow();
    });
  })
  .catch(console.log);
