const { app, BrowserWindow, dialog, ipcMain, Menu, Tray } = require('electron');

let mainWindow, splashWindow;

app.on('ready', () => {
    // console.log('App is now ready');

    mainWindow = new BrowserWindow({
        height: 900,
        width: 1600,
        webPreferences: { backgroundThrottling: false },  // Keeps running when not focused on the app
        // icon: fileController.dirProjectPath + '/build/icon_taskbar.png',
        _darkTheme: true,
        // get darkTheme() {
        //     return this._darkTheme;
        // },
        // set darkTheme(value) {
        //     this._darkTheme = value;
        // },
        vibrancy: 'dark',
        // skipTaskbar: true,
        webPreferences: {
            nodeIntegration: true,
            worldSafeExecuteJavaScript: true,
        },
        backgroundColor: '#1f2029',
    });

    // mainWindow.loadURL("http:\\www.google.com");
    mainWindow.loadFile('./src/renderer/main.html'); // Load index.html into the new BrowserWindow

    // mainWindow.loadURL(`file://${__dirname}/src/index.html`);  //ES6 template string
    // mainWindow.on('closed', () => app.quit());  // add this to turn off all child windows


    //    shell.openItem( 'C://Program Files (x86)//NCH Software//ExpressBurn.exe');

});