const template = [{
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
                    appWin.send('nav_B_button_audio_preferences');
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

module.exports = template;