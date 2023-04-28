/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';

// import chalk from 'chalk';
// import fs from 'fs';
import {
  app,
  BrowserView,
  BrowserWindow,
  clipboard,
  dialog,
  // globalShortcut,
  // Menu,
  // nativeTheme,
  shell,
  ipcMain,
  screen,
  // Tray,
} from 'electron';

import ffmpegInit from '../ffmpeg/ffmpegController';
import GetUser from '../user/GetUser';
import GetUserDownloads from '../user/GetUserDownloads';

import AddUserDownload from '../user/AddUserDownload';
import UpgradeUser from '../user/UpgradeUser';

import * as time from '../util/Time';
import updater from './updater';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import BrowserQuery from './browserQuery';
import * as Paths from './paths';
import * as Downloads from '../downloaders/downloadsController';
import setTitle from './title';
import * as Prefs from './prefsController';
import PowerMonitor from './powerMonitor';
import ScreenClass from './Screen';
import * as Browser from '../Browser/browserController';
import * as Shortcuts from './Shortcuts';
// console.log(process.env.APPLE_ID);
import testUrls from '../downloaders/youtube/testURLS';

// console.log(dotenv);
// import createCustomer from '../user/payments/stripe/stripe';

const isSingleInstance = app.requestSingleInstanceLock();
if (!isSingleInstance) {
  app.quit();
}

const appRootDir = require('app-root-dir').get();
// test, just added apple id/pass to gh secrets
let prefs: object;
let user: object;
let browserPanelState = 'default';

// let tray;
let mWin: BrowserWindow | null;
let view: BrowserView | null = null;
let Screen: ScreenClass;
let activeURL: string;
const audioDownloads = Downloads.getAudioDownloads();
const videoDownloads = Downloads.getVideoDownloads();
const warpstagramDownloads = Downloads.getWarpstagramDownloads();
const viewBounds = {
  x: 0,
  y: 130,
};
const setActiveURL = () => {
  if (prefs.general.dropdowns[1].defaultValue.id.includes('facebook'))
    activeURL = 'http://facebook.com';
  if (prefs.general.dropdowns[1].defaultValue.id.includes('instagram'))
    activeURL = 'http://instagram.com';
  if (prefs.general.dropdowns[1].defaultValue.id.includes('pinterest'))
    activeURL = 'http://pinterest.com';
  if (prefs.general.dropdowns[1].defaultValue.id.includes('soundcloud'))
    activeURL = 'http://soundcloud.com';
  if (prefs.general.dropdowns[1].defaultValue.id.includes('snapchat'))
    activeURL = 'http://snapchat.com';
  if (prefs.general.dropdowns[1].defaultValue.id.includes('tiktok'))
    activeURL = 'http://tiktok.com';
  if (prefs.general.dropdowns[1].defaultValue.id.includes('twitch'))
    activeURL = 'http://twitch.com';
  if (prefs.general.dropdowns[1].defaultValue.id.includes('twitter'))
    activeURL = 'http://twitter.com';
  if (prefs.general.dropdowns[1].defaultValue.id.includes('vimeo'))
    activeURL = 'http://vimeo.com';
  if (prefs.general.dropdowns[1].defaultValue.id.includes('youtube'))
    activeURL = 'http://youtube.com';
  // if (prefs.general.dropdowns[1].defaultValue.id.includes('bandcamp'))      view.webContents.loadURL('https://bandcamp.com');
  // if (prefs.general.dropdowns[1].defaultValue.id.includes('mixer'))         view.webContents.loadURL('https://mixer.com');
  // if (prefs.general.dropdowns[1].defaultValue.id.includes('spotify'))       view.webContents.loadURL('https://spotify.com');
  // if (prefs.general.dropdowns[1].defaultValue.id.includes('reddit'))        view.webContents.loadURL('https://reddit.com');
  // if (prefs.general.dropdowns[1].defaultValue.id.includes('deviantart'))    view.webContents.loadURL('https://deviantart.com');
};
const windowController = {
  async createMainWin() {
    const RESOURCES_PATH = app.isPackaged
      ? path.join(process.resourcesPath, 'assets')
      : path.join(__dirname, '../../assets');

    const getAssetPath = (...paths: string[]): string => {
      return path.join(RESOURCES_PATH, ...paths);
    };

    mWin = new BrowserWindow({
      x: Screen.getScreenState().bounds.x,
      y: Screen.getScreenState().bounds.y,
      width: Screen.getScreenState().bounds.width,
      height: Screen.getScreenState().bounds.height,
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
      // if (nativeTheme.shouldUseDarkColors === true) {
      //   mWin.setBackgroundColor('#1a1a1a');
      // } else {
      //   mWin.setBackgroundColor('#fff');
      // }

      // nativeTheme.shouldUseDarkColors ? mWin.setBackgroundColor('#1a1a1a') : mWin.setBackgroundColor('#fff'),
      icon: getAssetPath('icon.png'),
      //  nativeTheme.shouldUseDarkColors
      // ? getAssetPath('icon.png')
      // : getAssetPath('icon.png'),
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
    ffmpegInit(mWin);
    mWin.on('closed', () => (mWin = null));
    mWin.on('enter-full-screen', () => {});
    mWin.on('enter-html-full-screen', () => {
      const displayBounds = screen.getAllDisplays()[0].bounds;
      if (mWin) mWin.menuBarVisible = false;
      if (view) view.setBounds(displayBounds);
    });
    mWin.on('blur', () => {
      // console.log('mWin blurred');

      Shortcuts.removeShortcuts();
      // Browser.resize(browserPanelState, mWin, view);
    });
    mWin.on('focus', () => {
      // console.log('mWin focused');

      Shortcuts.addShortcuts(mWin, view);

      Browser.resize(browserPanelState, mWin, view);
    });
    mWin.on('leave-full-screen', () => {});
    mWin.on('leave-html-full-screen', () => {
      if (mWin) mWin.menuBarVisible = true;
      if (view) Browser.showBrowser(mWin, view);
    });
    mWin.on('maximize', () => {
      Browser.resize(browserPanelState, mWin, view);
      Screen.setScreenState(mWin);
    });
    mWin.on('minimize', () => {});
    // if (isDebug) {
    //   // await installExtensions();
    // }
    mWin.on('ready-to-show', () => {
      if (mWin) mWin.webContents.send('ready-to-show');
      // setTimeout(() )
      // copilot

      // setTimeout(() => {
      // }, 1000);

      if (process.platform === 'win32' && mWin)
        mWin.webContents.send('platform', 'windows');
      if (process.platform === 'darwin' && mWin)
        mWin.webContents.send('platform', 'darwin');
      if (process.platform === 'linux' && mWin)
        mWin.webContents.send('platform', 'linux');
      if (!mWin) {
        throw new Error('"mWin" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        mWin.minimize();
      } else {
        // if (view) {
        // }
        mWin.show();
        setTitle(mWin, 'audio', user);

        if (Screen.screenState.isMaximized) mWin.maximize();
        // if (view === null) windowController.createbView();
        mWin.webContents.send('appVersion', app.getVersion());
        mWin.webContents.send('appRoot', appRootDir);
        mWin.webContents.send('main: prefs', prefs);
        mWin.webContents.send('main: audioDownloads', audioDownloads);
        mWin.webContents.send('main: videoDownloads', videoDownloads);
        mWin.webContents.send(
          'main: warpstagramDownloads',
          warpstagramDownloads
        );
      }
    });

    mWin.on('resize', () => {});
    mWin.on('moved', () => {
      Screen.setScreenState(mWin);
    });
    mWin.on('unmaximize', () => {
      Browser.resize(browserPanelState, mWin, view);
      Screen.setScreenState(mWin);
    });
    mWin.on('resized', () => {
      Browser.resize(browserPanelState, mWin, view);
      Screen.setScreenState(mWin);
    });
    mWin.on('restore', () => {
      Browser.resize(browserPanelState, mWin, view);
    });

    mWin.on('show', () => {
      Browser.resize(browserPanelState, mWin, view);
    });
  },
  // console.log('mWin', mWin);

  async createbView() {
    view = new BrowserView();
    if (mWin) mWin.setBrowserView(view);
    if (mWin)
      view.setBounds({
        x: viewBounds.x,
        y: viewBounds.y,
        width: Math.round(mWin.getContentBounds().width / 2),
        // width: mWin.getContentBounds().width / 2,
        height: mWin.getContentBounds().height - 192,
      });
    view.setAutoResize({ width: true, height: true });
    view.setBackgroundColor('#1a1a1a');
    // console.log(randomYoutubeURL);
    if (app.isPackaged) {
      view.webContents.loadURL('https://www.youtube.com');
    } else {
      view.webContents.loadURL(randomYoutubeURL);
    }
    view.webContents.insertCSS('scrollbar{    width: 100px;}');
    // view.webContents.loadURL('https://open.spotify.com/');
    view.webContents.on('did-navigate-in-page', (e, url) => {
      // console.log(url);

      if (mWin) mWin.webContents.send('browser-url-change', url);
    });
    view.webContents.on('ready-to-show', (e, url) => {
      if (mWin) {
        // mWin.show();
        updater(mWin);
        if (view)
          mWin.webContents.send(
            'bView ready-to-show',
            view.webContents.getURL()
          );
      }
    });
    view.webContents.on('did-finish-load', (e, url: string) => {
      if (mWin) {
        // mWin.show();
        mWin.webContents.send('bView ready-to-show', view.webContents.getURL());
        // mWin.webContents.send('bView ready-to-show', view.webContents.getURL());
      }
    });
  },
};

app
  .whenReady()
  .then(() => {
    PowerMonitor();
    // Prefs.resetPrefs();
    prefs = Prefs.getPrefs();
    // console.log(prefs);
    Screen = new ScreenClass(mWin);
    // console.log('Screen', Screen);

    setActiveURL();

    (async function init() {
      user = await GetUser();
      const url = 'https://www.youtube.com/watch?v=7t885JG9qNE';

      // AddUserDownload(url, 'audio', 'add');
      const email = 'hello@gmail.com';
      const moduleTypes = ['audio', 'video', 'warpstagram']; // audio, video, warpstagram, all

      const moduleEditions = ['free', 'personal', 'professional', 'developer']; // free, personal, professional, developer
      const action = 'upgrade'; // add, upgrade, downgrade, remove

      // user = await UpgradeUser(
      //   email,
      //   moduleTypes[0],
      //   moduleEditions[1],
      //   action
      // );

      const downloads = await GetUserDownloads();
      // console.log(downloads.audio.length, downloads.video.length);
      for (let i = 0; i < downloads.audio.length; i++) {
        const download = downloads.audio[i];
        // console.log(download);

        const withinLast24Hours = time.isTimestampInLast24Hours(
          download.createdAt
        );
        // console.log(withinLast24Hours);

        // if (withinLast24Hours) {
        //   console.log('within last 24 hours');
        //   // console.log(download);
        // }
        // if (!withinLast24Hours) {
        //   console.log('not within last 24 hours');
        //   // console.log(download);
        // }
      }

      // console.log('user', user);

      // console.log(typeof user);

      windowController.createMainWin();
    })();
    // createTray(mWin);
    // Shortcuts(view);
    // let tray = null;
    // console.log(app.getAppPath());

    app.on('activate', () => {
      // if (mWin === null) windowController.createMainWin();
    });
  })
  .catch(console.log);

let randomYoutubeURL =
  testUrls.youtube[Math.floor(Math.random() * testUrls.youtube.length)];

async function submitSearchQuery(currentURL: string, query: string) {
  // let joinedQuery: string;
  const joinedQuery = await BrowserQuery(currentURL, query);
  // console.log(joinedQuery);
  if (view) view.webContents.loadURL(joinedQuery);
}

// let activeURL: string;

const contextMenu = require('electron-context-menu');

contextMenu({});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  // require('electron-debug')(); // ENABLE FOR DEVTOOLS
}

// const installExtensions = async () => {
//   const installer = require('electron-devtools-installer');
//   const forceDownload = !!process.env.UPGRADE_EXTENSIONS;

//   const extensions = ['REACT_DEVELOPER_TOOLS'];

//   return installer
//     .default(
//       extensions.map((name) => installer[name]),
//       forceDownload
//     )
//     .catch(console.log);
// };

// class AppUpdater {
//   constructor() {
//     log.transports.file.level = 'info';
//     autoUpdater.logger = log;
//     autoUpdater.checkForUpdatesAndNotify();
//   }
// }

(function appListeners() {
  // MENU LISTENERS
  ipcMain.on('Menu: Shortcuts: Restart', async (event, arg) => {
    event.reply('Menu: Shortcuts: Restart', arg);
  });
  ipcMain.on('modal: preferences', async (event, arg) => {
    event.reply('modal: preferences', prefs);
  }); // nav listeners
  ipcMain.on('nav: mode: audio', async (event, arg) => {
    // if (mWin) mWin.webContents.send('count-downloads');
    // console.log(arg);
    setTitle(mWin, 'audio', user);
  });
  ipcMain.on('nav: mode: video', async (event, arg) => {
    // if (mWin) mWin.webContents.send('count-downloads');
    setTitle(mWin, 'video', user);
  });
  ipcMain.on('nav: mode: warpstagram', async (event, arg) => {
    // if (mWin) mWin.webContents.send('count-downloads');
    setTitle(mWin, 'warpstagram', user);
  });
  // SEARCH LISTENERS
  ipcMain.on('Search: InputChange', async (event, arg) => {
    // console.log('Search: InputChange', arg);
    // console.log('Menu: Shortcuts: Restart', arg);
    // event.reply('Search: InputChange', [arg]);
  });
  ipcMain.on('Search: Submit', async (event, arg) => {
    // console.log('Search: Submit', arg);

    // console.log('Search: Submit', arg);
    if (view) {
      submitSearchQuery(view.webContents.getURL(), arg);
    }
    // console.log('Menu: Shortcuts: Restart', arg);
    // event.reply('Search: Submit', [arg]);
  });
  // NAV BAR LISTENERS
  ipcMain.on('nav: mode: audio', async () => {
    Browser.showBrowser(mWin, view);
  });
  ipcMain.on('nav: mode: video', async () => {
    Browser.showBrowser(mWin, view);
  });
  ipcMain.on('nav: mode: warpstagram', async () => {
    Browser.hideBrowser(view);
  });
  // BROWSERBAR DOWNLOAD SOURCE LISTENERS
  ipcMain.on('loadActiveSource', async (arg) => {
    // console.log(arg);

    // if (view) view.webContents.loadURL(arg);
    if (view)
      if (view.webContents.getURL().includes('pinterest')) {
        view.webContents.insertCSS('html, body, { background-color: #fff;  }');
        view.webContents.insertCSS('scrollbar, {    width: 10px;}');
      }
  });
  ipcMain.on('source: change', async (event, arg) => {
    // console.log('source: change', arg);

    if (view) view.webContents.loadURL(arg);
    if (view)
      if (view.webContents.getURL().includes('pinterest')) {
        if (view)
          view.webContents.insertCSS(
            'html, body, { background-color: #fff;  }'
          );
      }
  });
  // BROWSERBAR DOWNLOAD BUTTON LISTENERS
  ipcMain.on('BrowserBar: button: downloadAudio', async (event, arg) => {
    const items = [];
    const item = { url: '' };

    if (view) item.url = view.webContents.getURL();
    items.push(item);
    Downloads.DownloadItems(mWin, items, prefs, 'audio');
    // event.reply('BrowserBar: button: downloadAudio successful');
  });
  ipcMain.on(
    'BrowserBar: button: downloadAudioPlaylist',
    async (event, arg) => {
      // if (view) console.log(view.webContents.getURL());

      Downloads.playlist(mWin, view.webContents.getURL(), prefs, 'audio');
      // event.reply('BrowserBar: button: downloadAudio successful');
    }
  );
  ipcMain.on('BrowserBar: button: downloadVideo', async (event, arg) => {
    const items = [];
    const item = { url: '' };

    if (view) item.url = view.webContents.getURL();
    items.push(item);
    Downloads.DownloadItems(mWin, items, prefs, 'video');
  });
  ipcMain.on('browserPanelSize', async (event, arg) => {
    browserPanelState = arg;
    Browser.resize(browserPanelState, mWin, view);
  });
  ipcMain.on('BrowserBar: button: goBack', async (event, arg) => {
    if (view) view.webContents.goBack();
  });
  ipcMain.on('BrowserBar: button: goForward', async (event, arg) => {
    if (view) view.webContents.goForward();
  });
  ipcMain.on('BrowserBar: button: reload', async (event, arg) => {
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
  // MODAL PREFS LISTENERS
  ipcMain.on('main: prefs', async (event, arg) => {
    prefs = arg;
    Prefs.setPrefs(prefs);
    event.reply('main: prefs', prefs);
    //  event.reply('FilterBar: Warpstagram: FilterTypeLocations successful'); // sends message to renderer
  });
  ipcMain.on(
    'main: prefs: chooseOutputFolder',
    async (event, outputFolderID) => {
      // console.log(outputFolderID);
      if (outputFolderID.toLowerCase().includes('audio')) {
        dialog
          .showOpenDialog(mWin, {
            buttonLabel: 'Confirm Audio Folder',
            properties: ['openDirectory'],
            defaultPath: Paths.getDefaultAudioPath(),
          })
          .then((result) => {
            if (!result.canceled) Prefs.setAudioPath(result.filePaths[0]);
            prefs = Prefs.getPrefs();
            mWin.webContents.send('main: prefs', prefs);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (outputFolderID.toLowerCase().includes('video')) {
        dialog
          .showOpenDialog(mWin, {
            buttonLabel: 'Confirm Video Folder',
            properties: ['openDirectory'],
            defaultPath: Paths.getDefaultVideoPath(),
          })
          .then((result) => {
            if (!result.canceled) Prefs.setVideoPath(result.filePaths[0]);
            prefs = Prefs.getPrefs();
            if (mWin) mWin.webContents.send('main: prefs', prefs);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (outputFolderID.toLowerCase().includes('warpstagram')) {
        dialog
          .showOpenDialog(mWin, {
            buttonLabel: 'Confirm Warpstagram Folder',
            properties: ['openDirectory'],
            defaultPath: Paths.getDefaultWarpstagramPath(),
          })
          .then((result) => {
            if (!result.canceled) Prefs.setWarpstagramPath(result.filePaths[0]);
            prefs = Prefs.getPrefs();
            if (mWin) mWin.webContents.send('main: prefs', prefs);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      // event.reply('main: prefs', prefs);
    }
  );
  ipcMain.on('item-download-progress', async (event, args) => {
    // console.log(args);
    // let id = args[0];
    const progress = args[1] / 100;

    // let { id, progress } = args;
    // console.log(id, progress);
    if (mWin) mWin.setProgressBar(progress);
    if (progress === 1) {
      if (mWin) mWin.setProgressBar(-1);
    }

    // console.log(matchingDownload);
    // shell.showItemInFolder(matchingDownload.path);
  });
  // CONTEXT MENU LISTENERS
  ipcMain.on('context: show_in_folder', async (event, matchingDownload) => {
    // console.log(matchingDownload);
    shell.showItemInFolder(matchingDownload.path);
  });
  ipcMain.on('context: copy_link_address', async (event, matchingDownload) => {
    let url = matchingDownload.video_url;
    clipboard.writeText(url);
  });
  ipcMain.on('context: open_in_browser', async (event, matchingDownload) => {
    console.log(matchingDownload);

    let url = matchingDownload.video_url;
    if (view) view.webContents.loadURL(url);
  });
  ipcMain.on('context: remove_item', async (_event, matchingDownload) => {
    Downloads.removeMatchingDownload(matchingDownload.id);
  });
  ipcMain.on('context: remove_all', async (event, matchingDownloadID) => {
    Downloads.removeAllDownloads(matchingDownloadID);
  });
  ipcMain.on('context: delete_file', async (event, downloadID) => {
    Downloads.deleteDownload(downloadID);
  });
})();

(function bWinListeners() {
  ipcMain.on('screenshot', async (event, arg) => {
    Browser.screenshot(mWin, view);
  });
  ipcMain.on('hideBrowser', async (event, arg) => {
    Browser.hideBrowser(view);
  });
  ipcMain.on('showBrowser', async (event, arg) => {
    Browser.showBrowser(mWin, view);
  });
})();

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
