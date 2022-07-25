const template = [{
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

module.exports = template;