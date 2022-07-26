const { app, BrowserWindow, dialog, ipcMain, Menu, Tray } = require('electron');
const path = require('path');
const package = require('../../package.json');
// console.log(package.version);
// console.log(__dirname);
let mainWindow, splashWindow;
const windowController = {

    createMainWindow: function (markupModalPrefs, markupDownloadItemAudio, markupDownloadItemVideo) {
        let windowPercentage = 1;
        mainWindow = new BrowserWindow({
            backgroundColor: '#1A1A1A',
            // height: displayController.height,
            // width: displayController.width,
            // minWidth: displayController.minWidth,
            // minHeight: displayController.minHeight,
            // x:0 displayController.x,
            // y:0 displayController.y,
            // x: 0,
            // y: 0,
            height: 900 * windowPercentage,
            width: 1600 * windowPercentage,
            // x: 0,
            // y: 0,
            // icon: __dirname + '/icon.ico',
            // icon: __dirname + '/icon.png',
            icon: 'C:\\Users\\Tommy\\Documents\\GitHub\\Warp-App\\src\\assets\\3rdparty\\flaticon\\4927615-space\\png\\008-blackhole-white.png',
            // icon: 'C:\\Users\\Tommy\\Documents\\GitHub\\Warp-App\\src\\assets\\3rdparty\\flaticon\\4927615-space\\svg\\008-blackhole.svg',
            // icon: fileController.dirProjectPath + '/icon_black_hole.png',
            // icon: fileController.dirProjectPath + '/icon_black_gradient.png',
            // icon: fileController.dirProjectPath + '/22968-200.png',
            // icon: fileController.dirProjectPath + '/build/icon_taskbar.png', // DEFAULT`
            // icon: fileController.dirProjectPath + '/build/icon v2 200x200.png',
            // icon: fileController.dirProjectPath + '/build/icon_taskbar.png',
            // console.log(`file://${path.join(__dirname, '/build/icon_taskbar.png`),
            // icon: `file://${path.join(__dirname, '/build/icon_taskbar.png')}`,
            //    `file://${path.join(__dirname, '../build/index.html')}`
            _darkTheme: true,
            // get darkTheme() {
            //     return this._darkTheme;
            // },
            // set darkTheme(value) {
            //     this._darkTheme = value;
            // },
            // vibrancy: 'dark',
            // skipTaskbar: true,
            webPreferences: {
                nodeIntegration: true,
                worldSafeExecuteJavaScript: true,
            },
        });

        // mainFunctions.loadHtml(defaults.env.nav_A_active);
        // mainWindow.loadURL('www.google.com')
        // mainWindow.loadFile('./src/renderer/main.html'); // Load index.html into the new BrowserWindow
        mainWindow.loadURL('http://localhost:3000');
        // mainWindow.webContents.openDevTools(); // Open DevTools - Remove for PRODUCTION!
        // win.loadURL(
        //   isDev
        //     ? 'http://localhost:3000'
        //     : `file://${path.join(__dirname, '../build/index.html')}`
        // )
        const wc = mainWindow.webContents;
        // send stuff to app.js
        wc.on('did-finish-load', () => {
            //     storageMain.markups = {};
            //     storageMain.markups.modals = {};
            //     storageMain.markups.downloadItems = {};

            //     // console.log(storageMain);
            //     storageMain.markups.modals.prefs = markupModalPrefs;
            //     storageMain.markups.modals.login = markupModalLogin;
            //     storageMain.markups.downloadItems.audio = markupDownloadItemAudio;
            //     storageMain.markups.downloadItems.video = markupDownloadItemVideo;
            //     wc.send('window-ready', storageMain);
            // splashWindow.destroy();
            //     // }, 2000);
        });
        wc.on('devtools-opened', () => { });

        // Listen for window being closed
        mainWindow.on('closed', () => {
            mainWindow = null;
        });
        mainWindow.on('resize', () => {
            wc.send('resize');
        });
        mainWindow.on('move', () => { });
        mainWindow.on('maximize', () => {
            // splashWindow.hide();
        });
    },
    createSplashWindow: function () {
        splashWindow = new BrowserWindow({
            height: 400,
            width: 980,
            // x: 100,
            // y: 100,
            frame: false,
            transparent: true,
            resizable: false,
            movable: false,
            minimizable: false,
            maximizable: false,
            // icon: fileController.dirProjectPath + '/build/icon_taskbar.png',

            webPreferences: {
                nodeIntegration: true,
                worldSafeExecuteJavaScript: true,
            },
        });
        // splash.loadFile('./src/renderer/splash.html'); // Load index.html into the new BrowserWindow
        splashWindow.loadFile('./src/renderer/SplashScreen/splash.html'); // Load index.html into the new BrowserWindow
        // splashWindow.webContents.openDevTools(); // Open DevTools - Remove for PRODUCTION!

        const swwc = splashWindow.webContents;
        swwc.on('ready-to-show', () => {
            setTimeout(() => {

                setTimeout(() => {
                    splashWindow.destroy();
                }, 3000) // default
                // }, 10000) // testing
            }, 3000);
        });
    },
};
app.on('ready', () => {
    windowController.createMainWindow();
    // windowController.createSplashWindow();

});