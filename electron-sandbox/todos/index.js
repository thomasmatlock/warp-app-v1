const electron = require('electron');


/*Menu allows us access to the file, edit, view, window, system menus*/
const {
    app,
    BrowserWindow,
    Menu,
    ipcMain
} = electron;

let mainWindow;
let addWindow;

/*app.on is a eventListener*/
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1600,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
        }
    });
    console.log(`file://${__dirname}/main.html`);
    mainWindow.loadURL(`file://${__dirname}/src/main.html`);
    //mainWindow.loadURL(`https://www.youtube.com/`);
    mainWindow.on('closed', () => app.quit()); // if user hits close btn on mainWindow, entire app shuts down
    //mainWindow.setMenuBarVisibility(false);

    /*
    build a menu from scratch, then set it
    this whole 2-step menu thing is great because it allows you to have dynamic, changing menus, as need be, construct as many as you want,
    and set them at will
IMPORTANT: this breaks all the custom keybindings, like Ctrl R for reload
This is good to remove developer console from users
    */
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

    //createAddWindow(); //TESTING, loads new todo window at launch

});



function createAddWindow() {
    addWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        title: 'Add New Todo',
        webPreferences: {
            nodeIntegration: true
        }
    });
    //addWindow.loadURL(`https://www.soundcloud.com/`);
    //addWindow.loadURL(`https://www.youtube.com/`);
    addWindow.loadURL(`file://${__dirname}/add.html`);
    addWindow.setPosition(920, 270);
    // when we close addWindow, it we simply make it reference null, so it doesn't stay in RAM eating memory or something
    addWindow.on('closed', () => addWindow = null);
    console.log('Youtube');
}

// ipc event listener for receiving ipcRenderer.send that sends us the add todo input
ipcMain.on('todo:add', (event, todo) => {
    // SENDS
    mainWindow.webContents.send('todo:add', todo);
    addWindow.close();
});

/*
menu are array of labels, each pbject we add corresponds to one of the primary menu labels, ie File, Edit etc
notice we
we will do an OS-check to toggle displaying an empty 1st menu object.
an empty object for the 1st item makes windows error,
while mac obsorbs it into the application name menu ie Electron, or Warp

lastly, role: 'quit' as 2nd prop under label Quit will exit app
accelerator properties add on hotkey functionality, like Ctrl W (closes active window)
accelerator: 'CommandOrControl+W', works fine, but dumbass wants an iife
well we did a ternary instead
*/
const menuTemplate = [{
    label: 'File',
    submenu: [{
            label: 'New Todo',
            accelerator: 'n',
            click() {
                createAddWindow();
            }
        }, {
            label: 'Clear Todos',
            click() {
                // SELECTS MAIN WINDOW, SENDS THE THING TO WATCH FOR (TODO CLEAR)
                mainWindow.webContents.send('todo:clear');
                console.log('You cleared the shit');
            }
        },
        {
            label: `Quit`,
            accelerator: process.platform === 'darwin' ? 'Command+W' : 'Control+W',
            click() {
                app.quit();
            }
        }
    ]
}];



/*appends empty object at beginning of menuTemplate is OS is mac cuz mac uses different menu labeling*/
if (process.platform === 'darwin') {
    menuTemplate.unshift({});
}


/*
node_env usually has production, development, staging, test modes.
This checks if we are not in production, then enables dev console
*/
if (process.env.NODE_ENV !== 'production') {
    menuTemplate.push({
        label: `DEVELOPER`,
        submenu: [{
                role: 'reload'
            },
            {
                label: 'Toggle developer console',
                accelerator: process.platform === 'darwin' ? 'Command+Alt+W' : 'Control+Shift+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });
}