const { Menu, MenuItem, shell } = require('electron');
const defaultsReq = require('./defaults');
const defaults = new defaultsReq();
// Module function to create main app menu
module.exports = (appWin) => {
    // Menu template
    let template = [{
            label: 'File',
            submenu: [{
                    label: 'Import Download Links',
                    accelerator: 'CmdOrCtrl+Shift+O',
                    click: () => {
                        appWin.send('Audio: File: Import Download Links');
                    },
                },
                {
                    label: 'Export Download Links',
                    accelerator: 'CmdOrCtrl+Shift+S',
                    click: () => {
                        appWin.send('Audio: File: Export Download Links');
                    },
                },
                {
                    label: 'separator',
                    type: 'separator',
                },
                {
                    label: 'Quit',
                    accelerator: 'CmdOrCtrl+Q',
                    click: () => {
                        appWin.send('Quit');
                    },
                },
            ],
        },
        {
            label: 'Downloads',
            submenu: [{
                    label: 'Paste',
                    accelerator: 'CmdOrCtrl+V',
                    click: () => {
                        appWin.send('Audio: Downloads: Paste');
                    },
                },
                {
                    label: 'separator',
                    type: 'separator',
                },
                {
                    label: 'Pause All',
                    enabled: false,
                    click: () => {
                        appWin.send('Audio: Downloads: Pause All');
                    },
                },
                {
                    label: 'Resume All',
                    enabled: false,
                    click: () => {
                        appWin.send('Audio: Downloads: Resume All');
                    },
                },
                {
                    label: 'separator',
                    type: 'separator',
                },
                {
                    label: 'Remove All',
                    click: () => {
                        appWin.send('Audio: Downloads: Remove All');
                    },
                },
            ],
        },
        {
            label: 'Tools',
            submenu: [{
                    label: 'Check for updates...',
                    click: () => {
                        appWin.send('Check for update');
                    },
                },
                {
                    label: 'separator',
                    type: 'separator',
                },
                {
                    label: 'Manage license',
                    click: () => {
                        appWin.send('Audio: Tools: Manage license');
                    },
                },
                {
                    label: 'separator',
                    type: 'separator',
                },
                {
                    label: 'Preferences',
                    accelerator: 'CmdOrCtrl+P',
                    click: () => {
                        appWin.send('Audio: Tools: Preferences');
                    },
                },
            ],
        },
        {
            label: 'Help',
            submenu: [{
                    label: 'Restart Warp',
                    accelerator: 'CmdOrCtrl+R',
                    click: () => {
                        appWin.send('Restart');
                    },
                },
                {
                    label: 'Learn More',
                    click: () => {
                        shell.openExternal('https://warpdownload.com');
                    },
                },
            ],
        },
        // {
        //     role: 'viewMenu',
        // },

        // { role: 'viewMenu' },
    ];

    // Create Mac app menu
    // 'darwin', 'linux', 'win32', 'win64'
    if (process.platform === 'darwin') template.unshift({ role: 'appMenu' }); // appMenu is a complete role solution, like editMenu, to use OS default menu
    const devMenu = new MenuItem({
        label: 'Developer',
        submenu: [{
            label: 'Reset storage',
            click: () => {
                appWin.send('Reset-storage');
            },
        }, ],
    }); // create new menu item

    if (defaults.devMode) template.push(devMenu);
    // Build menu
    let menu = Menu.buildFromTemplate(template); // use template array

    // Set as main app menu
    Menu.setApplicationMenu(menu);
};