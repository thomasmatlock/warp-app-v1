const devMenu = new MenuItem({
    label: 'Electron test menu item',
    submenu: [{
            label: 'Item 1',
        },
        {
            label: 'Item 2',
            submenu: [{
                    label: 'Sub-item A',
                },
                {
                    label: 'Sub-item B',
                },
            ],
        },
        {
            label: 'Item 3',
        },
    ],
}); // create new menu item
appMenuAudio.append(devMenu); // add new menu item to newly created menu
appMenuVideo.append(devMenu); // add new menu item to newly created menu
appMenuWarpstagram.append(devMenu); // add new menu item to newly created menu