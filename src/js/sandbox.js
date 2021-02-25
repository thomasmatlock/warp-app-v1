let showModal = document.getElementById('show-modal'),
    closeModal = document.getElementById('close-modal'),
    modal = document.getElementById('modal'),
    addItem = document.getElementById('add-item'),
    itemURL = document.getElementById('url');
search = document.getElementById('search');

// Open modal from menu
ipcRenderer.on('menu-show-modal', () => {
    showModal.click();
});

// leftover from mainWindow
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