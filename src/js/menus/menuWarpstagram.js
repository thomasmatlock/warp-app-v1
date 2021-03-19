const { Menu, shell } = require('electron');

// Module function to create main app menu
module.exports = (appWin) => {
    // Menu template
    let template = [{
            label: 'File',
            submenu: [{
                    label: 'Import Subscriptions',
                    accelerator: 'CmdOrCtrl+O',
                    click: () => {
                        appWin.send('Video: File: Import Subscriptions');
                    },
                },
                {
                    label: 'Export Subscriptions',
                    accelerator: 'CmdOrCtrl+S',
                    click: () => {
                        appWin.send('Video: File: Export Subscriptions');
                    },
                },
                {
                    label: 'separator',
                    type: 'separator',
                },
                {
                    label: 'Export Posts...',
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

                    accelerator: 'CmdOrCtrl+Shift+Q',

                    click: () => {
                        appWin.send('Quit');
                    },
                },
            ],
        },
        {
            label: 'Edit',
            submenu: [{
                    label: 'Subscribe to ',
                    click: () => {
                        appWin.send('Video: Downloads: Paste');
                    },
                },
                {
                    label: 'Subscribe to my saved posts',
                    click: () => {
                        appWin.send('blank, TBD');
                    },
                },
                {
                    label: `Subscribe to accounts I'm following`,
                    click: () => {
                        appWin.send('blank, TBD');
                    },
                },
                {
                    label: 'separator',
                    type: 'separator',
                },
                {
                    label: 'Update pinned subscriptions',
                    click: () => {
                        appWin.send('blank, TBD');
                    },
                },
                {
                    label: 'Update all subscriptions',
                    click: () => {
                        appWin.send('blank, TBD');
                    },
                },
                {
                    label: 'Pause all subscriptions',
                    click: () => {
                        appWin.send('blank, TBD');
                    },
                },
                {
                    label: 'Remove all subscriptions',
                    click: () => {
                        appWin.send('blank, TBD');
                    },
                },
            ],
        },
        {
            label: 'Tools',
            submenu: [{
                    label: 'Login',
                    click: () => {
                        appWin.send('Warpstagram: Tools: Login');
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
                    label: 'Check for updates...',
                    click: () => {
                        appWin.send('Warpstagram: Tools: Check for update');
                    },
                },
                {
                    label: 'Preferences',
                    click: () => {
                        appWin.send('Warpstagram: Tools: Preferences');
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