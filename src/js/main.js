const { app, BrowserWindow, dialog, ipcMain, Menu, Tray } = require('electron');
const displayControllerReq = require('./displayController');
const appMenuAudio = require('./menuAudio');
const appMenuVideo = require('./menuVideo');
const appMenuWarpstagram = require('./menuWarpstagram');
const fileControllerReq = require('./fileController');
const fileController = new fileControllerReq();
const settings = require('../renderer/settings');
const defaultsReq = require('./defaults');
const defaults = new defaultsReq();

///////////////////////////////////   TRAY   /////////////////////////////////
let tray = null;
app.whenReady().then(() => {
    tray = new Tray(fileController.dirProjectPath + '/build/icon_tray.png');
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Open Warp' },
        { label: 'Quit Warp' },
    ]);
    tray.setToolTip('Warp Downloader');
    tray.setContextMenu(contextMenu);
    // console.log(tray);
});
///////////////////////////////////   TRAY   /////////////////////////////////
////////////////////////////////////////////////////////////////////
let mainWindow, splash, modalWindow, displayController, storageMain; // Keep a global reference of the window object, if you don't, the window will be closed automatically when the JavaScript object is garbage collected.
app.allowRendererProcessReuse = true; // not sure what this does but I added it for a reason
///////////////////////   defaults   ///////////////////////
(function init() {
    ipcMain.on('eula-agreement-accepted', (e) => {
        // console.log(storageMain);
        storageMain.user.acceptedEULA = true;
        modalEULAwindow.destroy();
        modalEULAwindow = null;

        mainFunctions.syncStorage();
    });
    ipcMain.on('new-item', (e, itemURL, avType, platform) => {
        defaults.updateActiveTab(avType); // sets nav A active
        e.reply('paste-new-url', itemURL, avType, platform); // send message to app js
    });
    ipcMain.on('prefsMarkup-loaded', (e, data) => {
        e.reply('prefsMarkup-loaded', data); // send message to app js
    });
    ipcMain.on('prefsMarkup-saved', (e, data) => {
        e.reply('prefsMarkup-saved', data); // send message to app js
    });
    ipcMain.on('menu-change', (e, menuType) => {
        mainFunctions.setMenu(menuType);
        e.reply('slide-change', menuType);
    });
    ipcMain.on('mainWindow-ready', () => {
        if (!storageMain.user.acceptedEULA)
            windowController.createModalEULAWindow();
    });
    ipcMain.on(
        'dialog-showOutputFolder',
        (e, outputFolderBtnID, storageReceived) => {
            // console.log(storageReceived);
            let outputFolderSelectedType, outputFolderSelectedPath;
            if (outputFolderBtnID.includes('audio')) {
                outputFolderSelectedType = 'audio';
                // outputFolderSelectedPath = app.getPath('music');
                outputFolderSelectedPath = storageReceived.user.prefs.pathAudio;
            }
            if (outputFolderBtnID.includes('video')) {
                outputFolderSelectedType = 'video';
                // outputFolderSelectedPath = app.getPath('videos');
                outputFolderSelectedPath = storageReceived.user.prefs.pathVideo;
            }
            if (outputFolderBtnID.includes('warpstagram')) {
                outputFolderSelectedType = 'Warpstagram';
                // outputFolderSelectedPath = app.getPath('pictures');
                outputFolderSelectedPath =
                    storageReceived.user.prefs.pathWarpstagram;
            }
            storageMain = storageReceived;
            // DIALOG
            // // to make a dialog window as its own standalone window, simply specify the window as arg1. otherwise, its a child to the parent window
            // // IMPORTANT, course has a callback? but its a then/catch block
            // // please note all the stuff in course DOES NOT  work without then/catch blocks. he uses callbacks, but none of them worked
            //
            //////////////////////////CHOOSE FILE DIALOG ////////////////////////////////
            dialog
                .showOpenDialog(
                    mainWindow, // attached to window/app
                    {
                        // defaultPath: app.getPath('desktop'),
                        defaultPath: outputFolderSelectedPath,
                        // defaultPath: app.getPath(`${userDocumentsPath}`),
                        buttonLabel: `Choose ${outputFolderSelectedType} destination folder`,
                        properties: [
                            // 'multiSelections',
                            // 'createDirectory',
                            // 'openFile',
                            'openDirectory',
                        ],
                    }
                )
                .then((result) => {
                    if (result.canceled) {
                        // console.log('Dialog canceled');
                    } else {
                        // console.log(result.filePaths);
                        e.reply(
                            'dialog-outputFolderSelected',
                            result.filePaths,
                            outputFolderSelectedType
                        );
                        // console.log(result.canceled);
                    }
                })
                .catch((err) => console.log(err));
            // dialog.showOpenDialogSync(mainWindow, {
            //     properties: ['openFile', 'openDirectory'],
            // });

            //////////////////////////////////////////////////////////
            // dialog.showSaveDialog({}, (filename) => {
            //     console.log(filename);
            // });
            //////////////////////////////////////////////////////////
            //
            // const answers = ['Yeah', 'Naw', 'Maybe'];
            // dialog
            //     .showMessageBox({
            //         title: 'The Big Message Box Title',
            //         message: 'This is a message',
            //         detail: 'Message details',
            //         buttons: answers,
            //     })
            //     .then((response) => {
            //         const res = answers[response.response];
            //         console.log(res);
            //     })
            //     .catch((err) => console.log(err));
            //////////////////////////////////////////////////////////
        }
    );
    ipcMain.on('quit', () => {
        app.quit();
        mainWindow = null;
    });

    ipcMain.on('storage-sync-request', (e, storageObj, avType) => {
        fileController.settingsSave('settings', storageObj);
        e.reply('storage-sync-success', storageObj);
    });
    ipcMain.on('reset-storage', (e, storageObj) => {
        fileController.settingsReset();
        (async() => {
            mainWindow.destroy();
            mainWindow = null;
            splash.destroy();
            splash = null;
        })();
        // mainWindow.destroy();
        // mainWindow = null;
        // splash.destroy();
        // splash = null;
        app.relaunch();
        app.quit();
    });
    ipcMain.on('restart-app', () => {
        mainWindow.destroy();
        mainWindow = null;
        app.relaunch();
        app.quit();
    });
    ipcMain.on('load-storage', (e) => {
        e.reply('load-storage-success', storageMain);
    });
    ipcMain.on('close-app', (e) => {
        console.log('closing app...');
        app.quit();
    });
    const { app, globalShortcut } = require('electron');

    // app.whenReady().then(() => {
    //     globalShortcut.register('Alt+CommandOrControl+I', () => {
    //         console.log('Electron loves global shortcuts!');
    //     });
    // });
    // .then(createWindow);
})();
///////////////////////   IPC LISTENERS FOR EVENTS FROM APP.JS   ///////////////////////
(function appListeners() {
    app.on('ready', () => {
        if (defaults.dev.splashScreen) windowController.createSplashWindow();

        displayController = new displayControllerReq(); // positions output window to display depending on single/multi-monitor
        defaults.init(); // all defaults checks, latest version, isOnline, hasFFmpeg etc
        fileController.init(defaults); // checks for local directories and creates them if non existent
        displayController.discoverDisplay(); // discovers which display to use, 3 dev mode displayController or production
        let storageAwaited, modalPrefsMarkup;
        (async() => {
            storageAwaited = await mainFunctions.load();
            storageMain = storageAwaited;
            // console.log('storageAwaited', storageAwaited.user.prefs);
            // console.log('storageMain', storageMain.user.prefs);
            if (storageAwaited.user.prefs.prefsMarkup === '') {
                // console.log(`no markup present`);
                modalPrefsMarkup = await mainFunctions.loadModalPrefsMarkupSource();
                // console.log(modalPrefsMarkup);
            }

            windowController.createWindow(defaults.env.theme, modalPrefsMarkup); // creates main app window
            mainFunctions.setMenu(defaults.env.nav_A_active);
        })();
        // if (defaults.dev.backendOnly) mainWindow.hide(); // devMode only
    });
    app.on('before-quit', (event) => {
        // event.preventDefault(); //
    });
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit();
    });
    app.on('activate', () => {
        if (mainWindow === null) windowController.createWindow(); // When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
    });
})();
///////////////////////   MAIN FUNCTIONS   ///////////////////////
const mainFunctions = {
    setMenu: function(menuType) {
        if (menuType === 'audio') {
            appMenuAudio(mainWindow.webContents); // sets audio menu if audio tab is clicked
        }
        if (menuType === 'video') {
            appMenuVideo(mainWindow.webContents); // sets audio menu if audio tab is clicked
        }
        if (menuType === 'warpstagram') {
            appMenuWarpstagram(mainWindow.webContents); // sets audio menu if audio tab is clicked
        }
    },
    loadHtml: function(menuType) {
        mainWindow.loadFile(`./src/renderer/html/${menuType}.html`);
    },
    load: async function() {
        const result = await fileController.settingsLoad();
        return result;
    },
    loadPrefs: async function() {
        const result = await settings.settingsLoad();
        return result;
    },
    loadModalPrefsMarkupSource: async function() {
        const result = await settings.loadMarkupSource();
        return result;
    },
    syncStorage: function() {
        fileController.settingsSave('settings', storageMain);
        mainWindow.webContents.send('storage-sync-success', storageMain);
    },
};
///////////////////////   WINDOW HANDLER   ///////////////////////
const windowController = {
    createWindow: function(theme, modalPrefsMarkup) {
        mainWindow = new BrowserWindow({
            // height: displayController.height,
            width: displayController.width,
            minWidth: displayController.minWidth,
            minHeight: displayController.minHeight,
            x: displayController.x,
            y: displayController.y,
            height: 2200,
            // width: 1900,
            // x: 0,
            // y: 0,
            // icon: __dirname + '/icon.ico',
            // icon: __dirname + '/icon.png',
            // icon: 'C:\\Users\\Tommy\\Documents\\GitHub\\Warp-App\\icon.png',
            // icon: fileController.dirProjectPath + '/icon_black_hole.png',
            // icon: fileController.dirProjectPath + '/icon_black_gradient.png',
            // icon: fileController.dirProjectPath + '/22968-200.png',
            icon: fileController.dirProjectPath + '/build/icon_taskbar.png',
            // icon: fileController.dirProjectPath + '/build/149360.png',
            // icon: fileController.dirProjectPath + '/vortex.png',
            // icon: fileController.dirProjectPath +
            // '/vortex-clipart-transparent-1.png',
            // icon: fileController.dirProjectPath + '/icon_black_to_white_gradient.png',
            // icon: '../../build/icon.ico',
            darkTheme: true,
            vibrancy: 'dark',
            // skipTaskbar: true,
            webPreferences: {
                nodeIntegration: true,
                worldSafeExecuteJavaScript: true,
            },
            backgroundColor: '#1f2029',
        });

        mainFunctions.loadHtml(defaults.env.nav_A_active);

        mainWindow.loadFile('./src/renderer/main.html'); // Load index.html into the new BrowserWindow
        // mainWindow.loadFile('./main.html'); // Load index.html into the new BrowserWindow

        if (defaults.dev.devTools) {
            mainWindow.webContents.openDevTools(); // Open DevTools - Remove for PRODUCTION!
        }

        const wc = mainWindow.webContents;
        // send stuff to app.js
        wc.on('did-finish-load', () => {
            wc.send('window-ready', storageMain, modalPrefsMarkup);
            if (defaults.dev.splashScreen) splash.destroy();
        });
        wc.on('devtools-opened', () => {});

        // Listen for window being closed
        mainWindow.on('closed', () => {
            mainWindow = null;
        });
        mainWindow.on('resize', () => {
            wc.send('resize');
        });
        mainWindow.on('move', () => {});
        mainWindow.on('maximize', () => {});
    },
    createSplashWindow: function() {
        splash = new BrowserWindow({
            height: 300,
            width: 400,
            // x: 100,
            // y: 100,
            frame: false,
            webPreferences: {},
        });
        splash.loadFile('./src/renderer/splash.html'); // Load index.html into the new BrowserWindow
    },
    // createModalWindow: function() {
    //     modalWindow = new BrowserWindow({
    //         // parent: mainWindow,
    //         // modal: true,
    //         show: true,
    //         // transparent: true,
    //         frame: false,
    //         // resizable: false,
    //         // movable: false,
    //         // minimizable: false,
    //         // maximizable: false,
    //         // alwaysOnTop: true,
    //         // transparent: false,
    //         // setPosition;
    //         // getPosition;
    //         // setSize;
    //         // getSize;
    //     });
    //     modalWindow.loadFile('./src/renderer/modal1.html'); // Load index.html into the new BrowserWindow

    //     modalWindow.once('ready-to-show', () => {
    //         modalWindow.show();
    //     });
    // },
    createModalEULAWindow: function() {
        modalEULAwindow = new BrowserWindow({
            parent: mainWindow,
            modal: true,
            show: true,
            // transparent: true,
            frame: false,
            resizable: false,
            movable: false,
            minimizable: false,
            maximizable: false,
            alwaysOnTop: true,
            // transparent: false,
            // setPosition;
            // getPosition;
            // setSize;
            // getSize;
            webPreferences: {
                nodeIntegration: true,
                worldSafeExecuteJavaScript: true,
            },
        });
        modalEULAwindow.loadFile('./src/renderer/modalEULA.html');
        // modalEULAwindow.webContents.openDevTools(); // Open DevTools - Remove for PRODUCTION!
        modalEULAwindow.once('ready-to-show', () => {
            // console.log('showing modal');
            modalEULAwindow.show();
        });
        const md = modalEULAwindow.webContents;
        // send stuff to app.js
        md.on('did-finish-load', () => {
            // md.send('modal-window-ready');
        });
    },
};