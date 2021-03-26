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
const ytdl = require('ytdl-core');
const DisplayController = require('./system/displayController');
const appMenuAudio = require('./menus/menuAudio');
const appMenuVideo = require('./menus/menuVideo');
const appMenuWarpstagram = require('./menus/menuWarpstagram');
const fileControllerReq = require('./system/fileController');
const fileController = new fileControllerReq();
const startupReq = require('./system/startup');
const startup = new startupReq();
const dlhandlerReq = require('./downloadHandler');
const items = require('../renderer/items');

let mainWindow, modalWindow, displays; // Keep a global reference of the window object, if you don't, the window will be closed automatically when the JavaScript object is garbage collected.
app.allowRendererProcessReuse = true; // not sure what this does but I added it for a reason

////////////////////////////////////////////////////////////////////
// IPC LISTENERS FOR EVENTS FROM APP.JS
ipcMain.on('new-item', (e, itemURL, avType) => {
    startup.nav_A_active = avType;
    if (logging) {
        console.log(
            `ipcMain.on, new-item, nav_A_active is ${startup.nav_A_active}`
        );
        console.log(`ipcMain.on, new-item, avType is ${avType}`);
    }
    if (startup.downloadItemsTesting) {
        // const items = new itemsReq();
        items.downloadItem(itemURL, avType);
        // let dlhandler = new dlhandlerReq(itemURL);
        // dlhandler.all(itemURL, avType);
        // dlhandler = null;
    }
});
ipcMain.on('menu-change', (e, menuType) => {
    if (menuType === 'audio') appMenuAudio(mainWindow.webContents); // sets audio menu if audio tab is clicked
    if (menuType === 'video') appMenuVideo(mainWindow.webContents); // sets video menu if video tab is clicked
    if (menuType === 'warpstagram') appMenuWarpstagram(mainWindow.webContents); // sets video menu if video tab is clicked
});
ipcMain.on('quit', () => {
    console.log('you quit');
    app.quit();
    mainWindow = null;
});

////////////////////////////////////////////////////////////////////
// CREATE WINDOW
function createWindow() {
    mainWindow = new BrowserWindow({
        height: displays.height,
        width: displays.width,
        minWidth: displays.minWidth,
        minHeight: displays.minHeight,
        x: displays.x,
        y: displays.y,

        darkTheme: false,
        // skipTaskbar: true,
        webPreferences: {
            nodeIntegration: true,
            worldSafeExecuteJavaScript: true,
        },
        // backgroundColor: '#0463db', // use the same color as your html file is, the main window will display this until html fully loads. This is a little better than making your app hang for a second until the html loads, then displaying the window
        // backgroundColor: '#ff8500', // use the same color as your html file is, the main window will display this until html fully loads. This is a little better than making your app hang for a second until the html loads, then displaying the window
    });
    // modalWindow = new BrowserWindow({
    //     parent: mainWindow,
    //     modal: true,
    //     show: false,
    //     transparent: true,
    //     // frame: false,
    // });
    // modalWindow.loadURL('https://warpdownload.com');
    // mainWindow.loadFile('./main.html'); // Load index.html into the new BrowserWindow
    // modalWindow.once('ready-to-show', () => {
    //     // modalWindow.show();
    // });

    // Create main app menu
    // appMenuAudio(mainWindow.webContents);
    // appMenuVideo(mainWindow.webContents);
    // if (startup.devMode) appMenu.append({ role: 'viewMenu' });

    mainWindow.loadFile('./main.html'); // Load index.html into the new BrowserWindow
    // secWindow.loadURL('https://www.youtube.com');
    if (startup.devModeDevTools) {
        mainWindow.webContents.openDevTools(); // Open DevTools - Remove for PRODUCTION!
    }

    const wc = mainWindow.webContents;
    wc.on('did-finish-load', () => {
        // console.log('ready');
    });
    wc.on('devtools-opened', () => {
        // console.log('ready');
    });

    // Listen for window being closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    mainWindow.on('resize', () => {
        wc.send('resize');
    });
    mainWindow.on('maximize', () => {
        // console.log('window maximize');
    });
    // send stuff to app.js
    wc.on('did-finish-load', (e) => {
        // console.log();
        wc.send('window-ready');
    });
}

////////////////////////////////////////////////////////////////////
// APP LISTENERS (main node process)
app.on('ready', () => {
    displays = new DisplayController(); // positions output window to display depending on single/multi-monitor
    fileController.init(); // checks for local directories and creates them if non existent
    startup.init(); // all startup checks, latest version, isOnline, hasFFmpeg etc
    displays.discoverDisplay(); // discovers which display to use, 3 dev mode displays or production
    createWindow(); // creates main app window
    if (startup.devModeBackendOnly) mainWindow.hide(); // devMode only
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