const { app, BrowserWindow, dialog, ipcMain, Menu, Tray } = require('electron');

let mainWindow, splashWindow;
const windowController = {

    createMainWindow: function (markupModalPrefs, markupDownloadItemAudio, markupDownloadItemVideo) {
        mainWindow = new BrowserWindow({
            // height: displayController.height,
            // width: displayController.width,
            // minWidth: displayController.minWidth,
            // minHeight: displayController.minHeight,
            // x:0 displayController.x,
            // y:0 displayController.y,
            // x: 0,
            // y: 0,
            height: 900 * 0.75,
            width: 1600 * 0.75,
            // x: 0,
            // y: 0,
            // icon: __dirname + '/icon.ico',
            // icon: __dirname + '/icon.png',
            // icon: 'C:\\Users\\Tommy\\Documents\\GitHub\\Warp-App\\icon.png',
            // icon: fileController.dirProjectPath + '/icon_black_hole.png',
            // icon: fileController.dirProjectPath + '/icon_black_gradient.png',
            // icon: fileController.dirProjectPath + '/22968-200.png',
            // icon: fileController.dirProjectPath + '/build/icon_taskbar.png', // DEFAULT`
            // icon: fileController.dirProjectPath + '/build/icon v2 200x200.png',
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
            backgroundColor: '#1A1A1A',
        });

        // mainFunctions.loadHtml(defaults.env.nav_A_active);

        mainWindow.loadFile('./src/renderer/main.html'); // Load index.html into the new BrowserWindow
        // mainWindow.webContents.openDevTools(); // Open DevTools - Remove for PRODUCTION!

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
        swwc.once('ready-to-show', () => {
            setTimeout(() => {

                windowController.createMainWindow();
                setTimeout(() => {
                    splashWindow.destroy();
                }, 5000) // default
                // }, 10000) // testing
            }, 3000);
        });
    },
};
app.on('ready', () => {
    windowController.createSplashWindow();

});