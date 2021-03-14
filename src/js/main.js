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

const youtubedl = require('youtube-dl');
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
////////////////////////////////////////////////////////////////////
// IPC LISTENERS
ipcMain.on('new-item', (e, itemURL, type) => {
    if (startup.downloadItemsTesting) {
        console.log(`Received ${itemURL}`);

        // readItem(itemURL, (item) => {
        // e.sender.send('new-item-success', item);
        // });

        // Will be called when the download starts.
        const video = youtubedl(
            itemURL, [
                // Optional arguments passed to youtube-dl.
                // '--format=302',
                // '--format=249',
            ]
            // Additional options can be given for calling `child_process.execFile()`.
        );
        let videoData = {
            title: '',
            duration: '',
            size: '',
            thumbnailURL: '',
        };

        // Will be called when the download starts.
        video.on('info', function(info) {
            console.log(info);
            console.log(
                `Download of title: "${info._filename}" starting... ${info.formats.length} formats available`
            );
            // videoData = {
            //     title = info.title,
            //     duration = info.duration,
            //     size = info.size,
            //     thumbnailURL = info.thumbnail,
            // }
            videoData.title = info.title;
            videoData.duration = info.duration;
            videoData.size = info.size;
            videoData.thumbnailURL = info.thumbnail;
            return videoData;

            // console.log(
            //     `'${info.title}': ${info.formats.length} formats, ${info.duration} minutes long, is ${info.filesize} large, and the thumbnail URL is '${info.thumbnail}'`
            // );

            // const data = JSON.stringify(info, null, 4);
            // WRITE DATA RETURNED TO FILE
            // fs.writeFile('./downloadInfo.json', data, 'utf8', (err) => {
            //     if (err) {
            //         console.log(`Error writing file: ${err}`);
            //     } else {
            //         console.log(`File is written successfully!`);
            //     }
            // });
        });
        // console.log(video.info);
        // dl.pipe(fs.createWriteStream(filepath));

        setTimeout(() => {
            // console.log(videoData);

            var filepath = path.join(
                fileController.dirVideoPath,
                `${videoData.title}.mp4`
            );
            video.pipe(fs.createWriteStream(filepath));
            console.log('Done!');
        }, 4000);
    } else if (!startup.downloadItems) {
        console.log('Dev mode: not currently downloading items');
    }
});

////////////////////////////////////////////////////////////////////
// CREATE WINDOW
function createWindow() {
    displays.discoverDisplay();
    console.log(`Height: ${displays.height}, width: ${displays.width}`);
    console.log(`X at ${displays.x}, Y at ${displays.y}`);
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

    createWindow(); // creates main app window
    if (startup.devModeBackendOnly) mainWindow.hide(); // devMode only
    // if (startup.devMode) startup.updateDevModeActiveTab();
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