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
                    accelerator: 'CmdOrCtrl+O',
                    click: () => {
                        appWin.send('Video: File: Import Download Links');
                    },
                },
                {
                    label: 'Export Download Links',
                    accelerator: 'CmdOrCtrl+S',
                    click: () => {
                        appWin.send('Video: File: Export Download Links');
                    },
                },
                {
                    label: 'separator',
                    type: 'separator',
                },
                {
                    label: 'Import Subscriptions',
                    click: () => {
                        appWin.send('Video: File: Import Subscriptions');
                    },
                },
                {
                    label: 'Export Subscriptions',
                    click: () => {
                        appWin.send('Video: File: Export Subscriptions');
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
                        appWin.send('Video: Downloads: Paste');
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
                        appWin.send('Video: Downloads: Pause All');
                    },
                },
                {
                    label: 'Resume All',
                    enabled: false,
                    click: () => {
                        appWin.send('Video: Downloads: Resume All');
                    },
                },
                {
                    label: 'separator',
                    type: 'separator',
                },
                {
                    label: 'Remove All',
                    click: () => {
                        appWin.send('Video: Downloads: Remove All');
                    },
                },
            ],
        },
        {
            label: 'Tools',
            submenu: [
                // {
                //     label: 'Smart Mode...',
                //     click: () => {
                //         appWin.send('Video: Tools: Smart Mode');
                //     },
                // },
                {
                    label: 'Subscriptions...',
                    click: () => {
                        appWin.send('Video: Tools: Subscriptions');
                    },
                },
                {
                    label: 'separator',
                    type: 'separator',
                },

                {
                    label: 'Check for updates...',
                    click: () => {
                        appWin.send('Video: Tools: Check for update');
                    },
                },
                {
                    label: 'separator',
                    type: 'separator',
                },
                {
                    label: 'Manage license',
                    click: () => {
                        appWin.send('Warpstagram: Tools: Manage license');
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
                        appWin.send('nav_B_button_video_preferences');
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
            }, {
                label: 'Learn More',
                click: () => {
                    shell.openExternal('https://warpdownload.com');
                },
            }, ],
        },

        // { role: 'viewMenu' },
    ];

    // Create Mac app menu
    // 'darwin', 'linux', 'win32', 'win64'
    if (process.platform === 'darwin') template.unshift({ role: 'appMenu' }); // appMenu is a complete role solution, like editMenu, to use OS default menu

    const devMenu = new MenuItem({
        label: 'Developer',
        submenu: [{
                label: 'Restart',
                accelerator: 'CmdOrCtrl+R',

                click: () => {
                    appWin.send('Restart');
                },
            },
            {
                label: 'Reset storage',
                click: () => {
                    appWin.send('Reset-storage');
                },
            },
            // {
            //     label: 'Item 2',
            //     submenu: [{
            //             label: 'Sub-item A',
            //         },
            //         {
            //             label: 'Sub-item B',
            //         },
            //     ],
            // },
        ],
    }); // create new menu item

    if (defaults.devMode) template.push(devMenu);
    // Build menu
    let menu = Menu.buildFromTemplate(template); // use template array

    // menu.append(devMenu); // add new menu item to newly created menu

    // Set as main app menu
    Menu.setApplicationMenu(menu);
};