const { Menu, shell } = require('electron');

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

                    accelerator: 'CmdOrCtrl+Shift+Q',

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
                    label: 'separator',
                    type: 'separator',
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
                    label: 'Smart Mode...',
                    click: () => {
                        appWin.send('Video: Tools: Smart Mode');
                    },
                },
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
                    label: 'Preferences',
                    click: () => {
                        appWin.send('Video: Tools: Preferences');
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