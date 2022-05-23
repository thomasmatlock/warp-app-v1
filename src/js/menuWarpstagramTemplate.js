const template = [{
        label: 'File',
        submenu: [{
                label: 'Import Subscriptions',
                accelerator: 'CmdOrCtrl+O',
                click: () => {
                    appWin.send('Warpstagram: File: Import Subscriptions');
                },
            },
            {
                label: 'Export Subscriptions',
                accelerator: 'CmdOrCtrl+S',
                click: () => {
                    appWin.send('Warpstagram: File: Export Subscriptions');
                },
            },
            {
                label: 'separator',
                type: 'separator',
            },
            {
                label: 'Export Posts...',
                click: () => {
                    appWin.send('Warpstagram: File: Export Posts');
                },
            },
            {
                label: 'separator',
                type: 'separator',
            },
            {
                label: 'Quit',

                accelerator: 'CmdOrCtrl+W',

                click: () => {
                    appWin.send('Quit');
                },
            },
        ],
    },
    {
        label: 'Subscriptions',
        submenu: [{
                label: 'Subscribe to ',
                submenu: [
                    { label: 'My Account' },
                    {
                        label: 'My Saved Posts',
                        click: () => {
                            appWin.send(
                                'Warpstagram: Edit: Subscribe to My Saved Posts'
                            );
                        },
                    },
                    {
                        label: `Accounts I'm Following`,
                        click: () => {
                            appWin.send(
                                'Warpstagram: Edit: Sub to Accts I Follow'
                            );
                        },
                    },
                    {
                        label: `Stories Of Accounts I'm Following`,
                        click: () => {
                            appWin.send(
                                'Warpstagram: Edit: Sub to Stories Of Accts I Follow'
                            );
                        },
                    },
                ],
            },

            {
                label: 'separator',
                type: 'separator',
            },
            {
                label: 'Update pinned subscriptions',
                click: () => {
                    appWin.send(
                        'Warpstagram: Edit: Update pinned subscriptions'
                    );
                },
            },
            {
                label: 'Update all subscriptions',
                click: () => {
                    appWin.send(
                        'Warpstagram: Edit: Update all subscriptions'
                    );
                },
            },
            {
                label: 'Pause all subscriptions',
                click: () => {
                    appWin.send(
                        'Warpstagram: Edit: Pause all subscriptions'
                    );
                },
            },
            {
                label: 'Remove all subscriptions',
                click: () => {
                    appWin.send(
                        'Warpstagram: Edit: Remove all subscriptions'
                    );
                },
            },
        ],
    },
    {
        label: 'Tools',
        submenu: [{
                label: 'Login',
                accelerator: 'CmdOrCtrl+L',
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
                    appWin.send('Check for update');
                },
            },
            {
                label: 'Preferences',
                accelerator: 'CmdOrCtrl+P',
                click: () => {
                    appWin.send('Warpstagram: Tools: Preferences');
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


module.exports = template;