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
  clipboard,
  dialog,
  globalShortcut,
  Menu,
  nativeTheme,
  shell,
  ipcMain,
  screen,
  // Tray,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import BrowserQuery from './browserQuery';
import User from './User';
import Paths from './paths';
import Downloads from '../downloaders/downloadsController';
import Title from './Title';
import Prefs from './prefsController';
import PowerMonitor from './powerMonitor';
import Screen from './screen';
import Browser from './browserController';
import { faker } from '@faker-js/faker';
// or, if using CommonJS
// const { faker } = require('@faker-js/faker');

const randomName = faker.name.fullName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
// import {Prisma} from './prisma';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function getUsers() {
  // const test = await prisma.user.findMany({ take: 100 });
  try {
    ///////////////////////////////////////////////////////////////////
    // const user = await prisma.user.findUnique({
    //   where: {
    //     // id: '41d3a920-3c2e-4031-8f83-96e51553161c',
    //     // name: 'Tom',
    //     // name: 'Nikki Matlock',
    //     email: 'metaphorps@gmail.com',
    //     // email: 'nxtlvlnikki@gmail.com',
    //   },
    // });
    // console.log(user);

    ///////////////////////////////////////////////////////////////////
    const user = await prisma.user.create({
      data: {
        email: `${randomEmail}`,
        audio: 'personal',
      },
    });
    console.log(user);
    ///////////////////////////////////////////////////////////////////
  } catch (error) {}
}
getUsers();

// import got from 'got';
// import got from 'got';
// const got = require('got');

// import createTray from './tray';
// import Shortcuts from './Shortcuts';
const fs = require('fs');

// console.log('got', got);
let prefs;
let user;
// let tray;
let mWin: BrowserWindow | null = null;
let view: BrowserView | null = null;
let testURL =
  'https://rr2---sn-5ualdnll.googlevideo.com/videoplayback?expire=1662024457&ei=qCYQY7-eMOKgj-8PqeqEKA&ip=97.80.132.152&id=o-ANslxuWl_67HYy3j7wJ2-6TnR7YPuNt-KCIx8lWcxXbJ&itag=248&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&vprv=1&mime=video%2Fwebm&ns=76RZEM-BnMITv3VZTtXMIj8H&gir=yes&clen=28268014&dur=136.720&lmt=1605368706823811&keepalive=yes&fexp=24001373,24007246&c=WEB&rbqsm=fr&txp=5432434&n=-_E0Ss5aLMFUg3oHfS&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAOrKiuM-isqDVUPD77rCALzYvD_Yq3WdkTKMjLSl_a9DAiEA7nQ7lK000dk-BKIzlBO04RUEykqmlbgkpXhcv2h8Zyc%3D&redirect_counter=1&rm=sn-5uae777l&req_id=245aafa0128ca3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=vK&mip=2600:6c5a:477f:4b73:183b:8d5b:deb2:d84a&mm=31&mn=sn-5ualdnll&ms=au&mt=1662002729&mv=m&mvi=2&pl=32&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRgIhAI3q7mu_JtybgOz5xlfpUHNqp4rkww8Ehz0G1eKKRNAFAiEAiuAMrhZ9EHqWYHVTH8w9vBWT_vmOMEzf6I6Gl00ndWQ%3D';
// m3u8stream(testURL).pipe(fs.createWriteStream('videofile.mp4'));
app
  .whenReady()
  .then(() => {
    PowerMonitor();
    // Prefs.resetPrefs();
    prefs = Prefs.getPrefs();
    setActiveURL();

    // User.upgradeUserModule('audio', 'free');
    // User.resetUser();
    // console.log(User.canUserDownloadAudio());
    // console.log(User.canUserDownloadVideo());
    // console.log(User.canUserDownloadWarpstagram());

    user = User.getUser();

    // Screen.resetScreenState();
    // windowController.createmWin();
    // createTray(mWin);
    // Shortcuts(view);
    // let tray = null;
    // console.log(app.getAppPath());

    app.on('activate', () => {
      // if (mWin === null) windowController.createmWin();
    });
  })
  .catch(console.log);

import testUrls from '../downloaders/youtube/testURLS';
// import { v4 as uuidv4 } from 'uuid';
import createCustomer from '../payments/stripe';
let randomYoutubeURL =
  testUrls.youtube[Math.floor(Math.random() * testUrls.youtube.length)];
let randomYoutubePlaylistURL =
  testUrls.youtubePlaylists[
    Math.floor(Math.random() * testUrls.youtubePlaylists.length)
  ];
//////////////////////////////////////////////////////

let audioDownloads = Downloads.getAudioDownloads();
let videoDownloads = Downloads.getVideoDownloads();
let warpstagramDownloads = Downloads.getWarpstagramDownloads();

async function submitSearchQuery(currentURL, query) {
  let joinedQuery = await BrowserQuery(currentURL, query);
  // console.log(joinedQuery);
  if (view) view.webContents.loadURL(joinedQuery);
}

let activeURL: string;
const setActiveURL = () => {
  // console.log(prefs.general.dropdowns[1].defaultValue);

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

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let browserPanelState = 'default';
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

    Title.setTitle(mWin, 'audio');
  });
  ipcMain.on('nav: mode: video', async (event, arg) => {
    // if (mWin) mWin.webContents.send('count-downloads');
    Title.setTitle(mWin, 'video');
  });
  ipcMain.on('nav: mode: warpstagram', async (event, arg) => {
    // if (mWin) mWin.webContents.send('count-downloads');
    Title.setTitle(mWin, 'warpstagram');
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
        // view.webContents.insertCSS('::-webkit-scrollbar, {    width: 10px;}');
      }
  });
  ipcMain.on('source: change', async (event, arg) => {
    // console.log('source: change', arg);

    if (view) view.webContents.loadURL(arg);
    if (view.webContents.getURL().includes('pinterest')) {
      if (view)
        view.webContents.insertCSS('html, body, { background-color: #fff;  }');
    }
  });
  // BROWSERBAR DOWNLOAD BUTTON LISTENERS
  ipcMain.on('BrowserBar: button: downloadAudio', async (event, arg) => {
    let items = [];
    let item = { url: '' };

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
    let items = [];
    let item = { url: '' };

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
            mWin.webContents.send('main: prefs', prefs);
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
            mWin.webContents.send('main: prefs', prefs);
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
    let id = args[0];
    let progress = args[1] / 100;

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
  ipcMain.on('context: remove_item', async (event, matchingDownload) => {
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
let viewBounds = {
  x: 0,
  y: 130,
};
const windowController = {
  createmWin: async function () {
    if (isDebug) {
      await installExtensions();
    }

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
      icon: nativeTheme.shouldUseDarkColors
        ? getAssetPath('iconDarkTheme.png')
        : getAssetPath('iconLightTheme.png'),
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
    mWin.on('ready-to-show', () => {
      if (mWin) mWin.webContents.send('ready-to-show');

      Title.setTitle(mWin, 'audio');
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
        mWin.show();

        if (Screen.isMaximized) mWin.maximize();
        // if (view === null) windowController.createbView();
        mWin.webContents.send('appVersion', app.getVersion());
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
  createbView: async function () {
    view = new BrowserView();
    if (mWin) mWin.setBrowserView(view);
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

    view.webContents.loadURL(randomYoutubeURL);
    // view.webContents.insertCSS('scrollbar{    width: 100px;}');
    // view.webContents.loadURL('https://open.spotify.com/');
    view.webContents.on('did-navigate-in-page', (e, url) => {
      console.log(url);

      if (mWin) mWin.webContents.send('browser-url-change', url);
    });
    view.webContents.on('ready-to-show', (e, url) => {
      if (mWin)
        mWin.webContents.send('bView ready-to-show', view.webContents.getURL());
    });
  },
};
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
