const { Menu, shell } = require('electron');
const startupReq = require('../startup');
const startup = new startupReq();
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
                    label: 'Quit',
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
                    label: 'Pause All',
                    enabled: false,
                    click: () => {
                        appWin.send('blank, TBD');
                    },
                },
                {
                    label: 'Resume All',
                    enabled: false,
                    click: () => {
                        appWin.send('blank, TBD');
                    },
                },
                {
                    label: 'Remove All',
                    click: () => {
                        appWin.send('blank, TBD');
                    },
                },
            ],
        },
        {
            label: 'Tools',
            submenu: [{
                    label: 'Check for updates...',
                    click: () => {
                        appWin.send('blank, TBD');
                    },
                },
                {
                    label: 'Preferences',
                    click: () => {
                        appWin.send('blank, TBD');
                    },
                },
            ],
        },
        {
            label: 'Help',
            submenu: [{
                label: 'Learn More',
                click: () => {
                    shell.openExternal('https://warpdownload.com');
                },
            }, ],
        },
        // {
        //     role: 'viewMenu',
        // },

        // { role: 'viewMenu' },
    ];

    // Create Mac app menu
    // 'darwin', 'linux', 'win32', 'win64'
    if (process.platform === 'darwin') template.unshift({ role: 'appMenu' }); // appMenu is a complete role solution, like editMenu, to use OS default menu

    // Build menu
    let menu = Menu.buildFromTemplate(template); // use template array

    // Set as main app menu
    Menu.setApplicationMenu(menu);
};