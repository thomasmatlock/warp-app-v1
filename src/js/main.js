const { app, BrowserWindow, Menu, MenuItem } = require('electron');
const Nav = require('./models/Nav');
const ElectronController = require('./electron/electronController.js');
const navPrimaryView = require('./views/navPrimaryView.js');
const navSecondaryView = require('./views/navSecondaryView.js');
const listView = require('./views/listView.js');
const navTitles = require('./models/config.js');
// const elements = require('./views/base.js');
app.allowRendererProcessReuse = true;

const navController = new Nav();
const electronController = new ElectronController();
console.log(electronController.mainMenu.audio.File[1]);

const state = {};
state.nav = new Nav();
let nav_A_active = 'nav_A_0';

let mainWindow; // Keep a global reference of the window object, if you don't, the window will be closed automatically when the JavaScript object is garbage collected.

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1600,
        height: 900,
        x: 3200,
        y: 350,
        webPreferences: {
            nodeIntegration: true,
        },
        backgroundColor: '##ff8500', // use the same color as your html file is, the main window will display this until html fully loads. This is a little better than making your app hang for a second until the html loads, then displaying the window
    });

    mainWindow.loadFile('./main.html'); // Load index.html into the new BrowserWindow

    // mainWindow.webContents.openDevTools(); // Open DevTools - Remove for PRODUCTION!
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
    console.log('App is ready'); // Electron `app` is ready
    createWindow();
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
    if (mainWindow === null) createWindow(); // When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
});