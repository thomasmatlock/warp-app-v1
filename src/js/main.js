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
} = require('electron');
const youtubedl = require('youtube-dl');
const config = require('../../dev/startup-config');
const DisplayController = require('./system/displayController');
const systemInfo = require('./system/system-info');
const fileController = require('./system/fileController');
const appMenu = require('./menus/menuAudio');
const Nav = require('./models/Nav');
const navController = new Nav();
const startupReq = require('./startup');
const startup = new startupReq();

let itemURL, mainWindow, displays; // Keep a global reference of the window object, if you don't, the window will be closed automatically when the JavaScript object is garbage collected.

app.allowRendererProcessReuse = true;

////////////////////////////////////////////////////////////////////
// IPC LISTENERS
ipcMain.on('new-item', (e, itemURL) => {
    if (config.dev.downloadItems) {
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
            // console.log('Download started');
            // console.log('filename: ' + info._filename);
            // console.log('size: ' + info.size);
            // console.log(`${info.formats.length} formats`);
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
                systemInfo.dirMainVideoPath,
                `${videoData.title}.mp4`
            );
            video.pipe(fs.createWriteStream(filepath));
            console.log('Done!');
        }, 4000);
    } else {
        console.log('Dev mode: not currently downloading items');
    }
});

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
        // backgroundColor: '#ff8500', // use the same color as your html file is, the main window will display this until html fully loads. This is a little better than making your app hang for a second until the html loads, then displaying the window
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
app.on('ready', () => {
    if (config) {
        // console.log(config.user);
    } else {
        console.log('Dev mode inactive');
        userAuthController.init();
    }
    displays = new DisplayController();
    fileController.init();

    startup.isDevMode();
    startup.isOnline();

    createWindow();
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