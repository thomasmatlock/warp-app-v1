const { Menu, shell } = require('electron');

// Module function to create main app menu
module.exports = (appWin) => {
    // Menu template
    let template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Import Download Links',
                    accelerator: 'CmdOrCtrl+O',
                    click: () => {
                        appWin.send('menu-show-modal');
                    },
                },
                {
                    label: 'Export Download Links',
                    accelerator: 'CmdOrCtrl+O',
                    click: () => {
                        appWin.send('menu-show-modal');
                    },
                },
                {
                    label: 'Import Subscriptions',
                    accelerator: 'CmdOrCtrl+O',
                    click: () => {
                        appWin.send('menu-show-modal');
                    },
                },
                {
                    label: 'Export Subscriptions',
                    accelerator: 'CmdOrCtrl+O',
                    click: () => {
                        appWin.send('menu-show-modal');
                    },
                },
                {
                    label: 'Quit',
                    accelerator: 'CmdOrCtrl+O',
                    click: () => {
                        appWin.send('menu-show-modal');
                    },
                },
            ],
        },
        {
            label: 'Downloads',
            submenu: [
                {
                    label: 'Import Download Links',
                    accelerator: 'CmdOrCtrl+O',
                    click: () => {
                        appWin.send('menu-show-modal');
                    },
                },
                {
                    label: 'Export Download Links',
                    accelerator: 'CmdOrCtrl+O',
                    click: () => {
                        appWin.send('menu-show-modal');
                    },
                },
                {
                    label: 'Quit',
                    accelerator: 'CmdOrCtrl+O',
                    click: () => {
                        appWin.send('menu-show-modal');
                    },
                },
            ],
        },
        {
            label: 'Tools',
            submenu: [
                {
                    label: 'Import Download Links',
                    accelerator: 'CmdOrCtrl+O',
                    click: () => {
                        appWin.send('menu-show-modal');
                    },
                },
                {
                    label: 'Export Download Links',
                    accelerator: 'CmdOrCtrl+O',
                    click: () => {
                        appWin.send('menu-show-modal');
                    },
                },
                {
                    label: 'Quit',
                    accelerator: 'CmdOrCtrl+O',
                    click: () => {
                        appWin.send('menu-show-modal');
                    },
                },
            ],
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'Learn More',
                    click: () => {
                        shell.openExternal('https://warpdownload.com');
                    },
                },
            ],
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
