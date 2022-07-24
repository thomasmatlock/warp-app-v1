const { Menu, MenuItem, shell } = require('electron');
const defaultsReq = require('./defaults');
const menuVideoTemplate = require('./menuVideoTemplate');

const defaults = new defaultsReq();

// Module function to create main app menu
module.exports = (appWin) => {
    // Menu template
    let template = menuVideoTemplate;

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