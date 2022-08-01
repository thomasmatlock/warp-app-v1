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
console.log(prefs);

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
// SEARCH LISTENERS
ipcMain.on('Search: InputChange', async (event, arg) => {
  // console.log('Search: InputChange', arg);
  event.reply('Search: InputChange', arg);
});
ipcMain.on('Search: Submit', async (event, arg) => {
  console.log('Search: Submit', arg);
  event.reply('Search: Submit', arg);
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
ipcMain.on('FilterBar: Warpstagram: FilterTypeHashtags', async (event, arg) => {
  event.reply('FilterBar: Warpstagram: FilterTypeHashtags successful'); // sends message to renderer
});
ipcMain.on(
  'FilterBar: Warpstagram: FilterTypeLocations',
  async (event, arg) => {
    event.reply('FilterBar: Warpstagram: FilterTypeLocations successful'); // sends message to renderer
  }
);
ipcMain.on('settings: request', async (event, arg) => {
  console.log('settings: request', arg);

  event.reply('settings-broadcast', settings); // sends message to renderer
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
  const wc = mainWindow.webContents;

  // Open urls in the user's browser
  wc.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
  wc.on('did-finish-load', () => {
    wc.send('window-ready', prefs);
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
