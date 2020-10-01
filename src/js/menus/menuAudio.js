const { Menu, shell } = require('electron');

// Module function to create main app menu
module.exports = (appWin) => {
    // Menu template
    let template = [{
            label: 'File',
            submenu: [{
                    label: 'Import Download Links',
                    accelerator: 'CmdOrCtrl+Shift+O',
                    click: () => {
                        appWin.send('menu-show-modal');
                    },
                },
                {
                    label: 'Export Download Links',
                    accelerator: 'CmdOrCtrl+Shift+S',
                    click: () => {
                        appWin.send('menu-show-modal');
                    },
                },
                {
                    label: 'Quit',
                    click: () => {
                        appWin.send('menu-show-modal');
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
                        appWin.send('menu-show-modal');
                    },
                },
                {
                    label: 'Pause All',
                    enabled: false,
                    click: () => {
                        appWin.send('menu-show-modal');
                    },
                },
                {
                    label: 'Resume All',
                    enabled: false,
                    click: () => {
                        appWin.send('menu-show-modal');
                    },
                },
                {
                    label: 'Remove All',
                    click: () => {
                        appWin.send('menu-show-modal');
                    },
                },
            ],
        },
        {
            label: 'Tools',
            submenu: [{
                    label: 'Check for updates...',
                    click: () => {
                        appWin.send('menu-show-modal');
                    },
                },
                {
                    label: 'Preferences',
                    click: () => {
                        appWin.send('menu-show-modal');
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
        {
            role: 'viewMenu',
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