/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable one-var */
const {
    app,
    BrowserView,
    BrowserWindow,
    Menu,
    MenuItem,
    shell,
} = require('electron');
const fs = require('fs');
const path = require('path');
const youtubedl = require('youtube-dl');
const Nav = require('./models/Nav');
const ElectronController = require('./electron/electronController.js');
const DisplayController = require('./system/displayController');
const fileController = require('./system/fileController');
const userAuthController = require('./utils/userAuth');
const networkController = require('./utils/network');
const appMenu = require('./menus/menuAudio');

app.allowRendererProcessReuse = true;

const navController = new Nav();
const electronController = new ElectronController();
// console.log(electronController.mainMenu.audio.File[1]);

let testUrlYoutube = 'https://www.youtube.com/watch?v=7mCktSlyETw&t';
const devMode = true;

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
        // skipTaskbar: true,
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

    mainWindow.on('ready', () => {
        console.log('ready');
    });

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
    if (devMode) {
        console.log('Dev mode active');
    } else {
        console.log('Dev mode inactive');
        userAuthController.init();
    }
    displays = new DisplayController();
    fileController.init();
    networkController.init();
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

// youtube-dl
// const video = youtubedl(
//     // 'http://www.youtube.com/watch?v=90AiXO1pAiA',
//     'https://www.youtube.com/watch?v=sb6WlQiaJeM',
//     // Optional arguments passed to youtube-dl.
//     ['--format=18'],
//     // Additional options can be given for calling `child_process.execFile()`.
//     { cwd: __dirname }
// );

// // Will be called when the download starts.
// video.on('info', function(info) {
//     // console.log('Download started');
//     // console.log('filename: ' + info._filename);
//     // console.log('size: ' + info.size);
//     console.log(info.formats.length);
// });

// video.pipe(fs.createWriteStream('myvideo.mp4'));

// console.log(process.platform);
// console.log(path.dirname());
// console.log(shell);