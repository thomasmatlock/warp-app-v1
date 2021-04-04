/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable one-var */

const logging = false;
const os = require('os');
const fs = require('fs');
const path = require('path');
const {
    app,
    BrowserView,
    BrowserWindow,
    ipcMain,
    Menu,
    MenuItem,
    shell,
    webContents,
} = require('electron');
const displayControllerReq = require('./system/displayController');
const appMenuAudio = require('./menus/menuAudio');
const appMenuVideo = require('./menus/menuVideo');
const appMenuWarpstagram = require('./menus/menuWarpstagram');
const fileControllerReq = require('./system/fileController');
const fileController = new fileControllerReq();
const startupReq = require('./system/startup');
const startup = new startupReq();
const storage = require('./storage');

////////////////////////////////////////////////////////////////////
let mainWindow, splash, modalWindow, displayController, storageMain; // Keep a global reference of the window object, if you don't, the window will be closed automatically when the JavaScript object is garbage collected.
app.allowRendererProcessReuse = true; // not sure what this does but I added it for a reason

////////////////////////////////////////////////////////////////////
// IPC LISTENERS FOR EVENTS FROM APP.JS
ipcMain.on('new-item', (e, itemURL, avType, platform) => {
    startup.updateActiveTab(avType); // sets nav A active
    e.reply('paste-new-url', itemURL, avType, platform); // send message to app js
});
ipcMain.on('menu-change', (e, menuType) => {
    if (menuType === 'audio') appMenuAudio(mainWindow.webContents); // sets audio menu if audio tab is clicked
    if (menuType === 'video') appMenuVideo(mainWindow.webContents); // sets video menu if video tab is clicked
    if (menuType === 'warpstagram') appMenuWarpstagram(mainWindow.webContents); // sets video menu if video tab is clicked
});
ipcMain.on('quit', () => {
    app.quit();
    mainWindow = null;
});
ipcMain.on('storage-save', (e, storageObj, avType) => {
    storage.save('settings', storageObj);
    // console.log('saving');
    let storageAwaited;
    (async() => {
        storageAwaited = await load();
        e.reply('storage-save-success', storageAwaited);
    })();
    // console.log(storageAwaited);
});
ipcMain.on('reset-storage', (e, storageObj) => {
    storage.reset();
    storage.save('settings', storageObj); // #fix, wrong arg1 save name, should be 'settings'
});
const load = async() => {
    const result = await storage.load();
    return result;
};

////////////////////////////////////////////////////////////////////////////////////
ipcMain.on('load-storage', (e) => {
    e.reply('load-storage-success', storageMain);
});
ipcMain.on('close-app', (e) => {
    console.log('closing app...');
    app.quit();
});

////////////////////////////////////////////////////////////////////
// WINDOW CREATION
function createWindow() {
    mainWindow = new BrowserWindow({
        height: displayController.height,
        width: displayController.width,
        minWidth: displayController.minWidth,
        minHeight: displayController.minHeight,
        x: displayController.x,
        y: displayController.y,
        // x: 2285,
        // y: 412,
        // icon: __dirname + '/icon.ico',
        // icon: __dirname + '/icon.png',
        // icon: 'C:\\Users\\Tommy\\Documents\\GitHub\\Warp-App\\icon.png',
        icon: fileController.dirProjectPath + '/icon.png',
        // icon: '../../build/icon.ico',
        darkTheme: true,
        vibrancy: 'dark',
        // skipTaskbar: true,
        webPreferences: {
            nodeIntegration: true,
            worldSafeExecuteJavaScript: true,
        },
        // backgroundColor: '#0463db', // use the same color as your html file is, the main window will display this until html fully loads. This is a little better than making your app hang for a second until the html loads, then displaying the window
        // backgroundColor: '#ff8500', // use the same color as your html file is, the main window will display this until html fully loads. This is a little better than making your app hang for a second until the html loads, then displaying the window
    });

    mainWindow.loadFile('./src/renderer/main.html'); // Load index.html into the new BrowserWindow
    // mainWindow.loadFile('./main.html'); // Load index.html into the new BrowserWindow
    if (startup.dev.devTools) {
        mainWindow.webContents.openDevTools(); // Open DevTools - Remove for PRODUCTION!
    }

    const wc = mainWindow.webContents;
    // send stuff to app.js
    wc.on('did-finish-load', () => {
        // console.log('did-finish-load');
        // console.log(storageMain);
        wc.send('window-ready', storageMain);
        splash.destroy();
    });
    wc.on('devtools-opened', () => {});

    // Listen for window being closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    mainWindow.on('resize', () => {
        wc.send('resize');
    });
    mainWindow.on('move', () => {
        // console.log('window moved');
        // console.log(`Size ${mainWindow.getSize()}`);
        // console.log(`Position ${mainWindow.getPosition()}`);
    });
    mainWindow.on('maximize', () => {});
}

function createSplashWindow() {
    splash = new BrowserWindow({
        height: 300,
        width: 400,
        // x: 100,
        // y: 100,
        frame: false,
        webPreferences: {},
    });
    splash.loadFile('./src/renderer/splash.html'); // Load index.html into the new BrowserWindow
}

function createModalWindow() {
    modalWindow = new BrowserWindow({
        // parent: mainWindow,
        // modal: true,
        show: true,
        transparent: true,
        frame: false,
        resizable: false,
        movable: false,
        minimizable: false,
        maximizable: false,
        alwaysOnTop: true,
        transparent: false,
        // setPosition;
        // getPosition;
        // setSize;
        // getSize;
    });
    // modalWindow.loadURL('https://warpdownload.com');
    modalWindow.loadURL('https://www.youtube.com');
    // mainWindow.loadFile('./main.html'); // Load index.html into the new BrowserWindow
    modalWindow.once('ready-to-show', () => {
        modalWindow.show();
    });
}

////////////////////////////////////////////////////////////////////
// APP LISTENERS (monitoring main node process)
app.on('ready', () => {
    createSplashWindow();
    displayController = new displayControllerReq(); // positions output window to display depending on single/multi-monitor
    startup.init(); // all startup checks, latest version, isOnline, hasFFmpeg etc
    fileController.init(startup); // checks for local directories and creates them if non existent
    displayController.discoverDisplay(); // discovers which display to use, 3 dev mode displayController or production
    let storageAwaited;
    // console.log(startup.settings);
    (async() => {
        storageAwaited = await load();
        // console.log('ready');
        // console.log(storageAwaited);
        storageMain = storageAwaited;
        createWindow(); // creates main app window
    })();
    if (startup.dev.backendOnly) mainWindow.hide(); // devMode only
});
app.on('before-quit', (event) => {
    // event.preventDefault(); //
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
    if (mainWindow === null) createWindow(); // When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
});