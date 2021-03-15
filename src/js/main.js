/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable one-var */

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

// const youtubedl = require('youtube-dl');
const youtubedl = require('youtube-dl-exec');

const DisplayController = require('./system/displayController');
const appMenu = require('./menus/menuAudio');
const Nav = require('./models/Nav');
const navController = new Nav();
const fileControllerReq = require('./system/fileController');
const fileController = new fileControllerReq();
const startupReq = require('./startup');
const startup = new startupReq();
// console.log(DisplayController);
let itemURL, mainWindow, displays; // Keep a global reference of the window object, if you don't, the window will be closed automatically when the JavaScript object is garbage collected.
// console.log(startup.downloadItems);
app.allowRendererProcessReuse = true;
// hello
////////////////////////////////////////////////////////////////////
// IPC LISTENERS
ipcMain.on('new-item', (e, itemURL, type) => {
    if (startup.downloadItemsTesting) {
        console.log(`Received ${itemURL}`);
        console.clear();
        // YOUTUBEDL
        youtubedl(itemURL, {
            dumpJson: true,
            noWarnings: true,
            noCallHome: true,
            noCheckCertificate: true,
            preferFreeFormats: true,
            youtubeSkipDashManifest: true,
            referer: itemURL,
        }).then((output) => console.log(output));
    }
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
        // backgroundColor: '#ff8500', // use the same color as your html file is, the main window will display this until html fully loads. This is a little better than making your app hang for a second until the html loads, then displaying the window
    });

    // Create main app menu
    appMenu(mainWindow.webContents);
    // if (startup.devMode) appMenu.append({ role: 'viewMenu' });

    mainWindow.loadFile('./main.html'); // Load index.html into the new BrowserWindow
    // secWindow.loadURL('https://www.youtube.com');

    mainWindow.webContents.openDevTools(); // Open DevTools - Remove for PRODUCTION!

    mainWindow.webContents.on('did-finish-load', () => {
        // console.log('ready');
    });

    // Listen for window being closed
    mainWindow.on('closed', () => {
        mainWindow = null;
        console.log('window closed');
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