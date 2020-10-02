/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable one-var */
const { app, BrowserView, BrowserWindow, Menu, MenuItem } = require('electron');
const fs = require('fs');
const Nav = require('./models/Nav');
const ElectronController = require('./electron/electronController.js');
const DisplayController = require('./system/displayController');
const appMenu = require('./menus/menuAudio');

app.allowRendererProcessReuse = true;

const navController = new Nav();
const electronController = new ElectronController();
// console.log(electronController.mainMenu.audio.File[1]);

let testUrlYoutube = 'https://www.youtube.com/watch?v=7mCktSlyETw&t';

let mainWindow, displays; // Keep a global reference of the window object, if you don't, the window will be closed automatically when the JavaScript object is garbage collected.

function createWindow() {
    mainWindow = new BrowserWindow({
        width: displays.coords.width,
        height: displays.coords.height,
        minWidth: 450,
        minHeight: 300,
        x: displays.coords.x,
        y: displays.coords.y,

        darkTheme: false,
        webPreferences: {
            nodeIntegration: true,
            worldSafeExecuteJavaScript: true,
        },
        backgroundColor: '##ff8500', // use the same color as your html file is, the main window will display this until html fully loads. This is a little better than making your app hang for a second until the html loads, then displaying the window
    });

    // const secWindow = new BrowserWindow({ width: 800, height: 600 });

    // secWindow
    // secWindow = new BrowserWindow({
    //     // width: displays.coords.width,
    //     // height: displays.coords.height,
    //     minWidth: 450,
    //     minHeight: 300,
    //     x: displays.coords.x,
    //     y: displays.coords.y,

    //     darkTheme: false,
    //     webPreferences: {
    //         nodeIntegration: true,
    //         worldSafeExecuteJavaScript: true,
    //     },
    //     backgroundColor: '##ff8500', // use the same color as your html file is, the main window will display this until html fully loads. This is a little better than making your app hang for a second until the html loads, then displaying the window
    // });

    // const view = new BrowserView();
    // secWindow.setBrowserView(view);
    // view.setBounds({
    //     x: 0,
    //     y: 0,
    //     width: displays.coords.width / 2,
    //     height: displays.coords.height / 2,
    //     frame: false,
    //     setAutoResize: { width: true, height: true },
    // });
    // // view.webContents.loadURL('https://electronjs.org');
    // view.webContents.loadURL('https://youtube.com');
    // secWindow

    // Create main app menu
    appMenu(mainWindow.webContents);

    mainWindow.loadFile('./main.html'); // Load index.html into the new BrowserWindow
    // secWindow.loadURL('https://www.youtube.com');

    mainWindow.webContents.openDevTools(); // Open DevTools - Remove for PRODUCTION!
    // Menu.setApplicationMenu(mainMenu); // set the menu object we created to the menu

    // Listen for window being closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}
////////////////////////////////////////////////////////////////////
// APP LISTENERS (main node process)
app.on('before-quit', (event) => {
    // event.preventDefault(); //
});
app.on('ready', () => {
    // console.log('App is ready'); // Electron `app` is ready
    displays = new DisplayController();
    createWindow();
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
    if (mainWindow === null) createWindow(); // When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
});

// Returns object length
Object.size = function(obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};