const { Menu, MenuItem, shell } = require('electron');
const menuAudioTemplate = require('./menuAudioTemplate');
const defaultsReq = require('./defaults');
const defaults = new defaultsReq();
// Module function to create main app menu
module.exports = (appWin) => {
    // Menu template
    let template = menuAudioTemplate;

    // Create Mac app menu
    // 'darwin', 'linux', 'win32', 'win64'
    if (process.platform === 'darwin') template.unshift({ role: 'appMenu' }); // appMenu is a complete role solution, like editMenu, to use OS default menu
    const devMenu = new MenuItem({
        label: 'Developer',
        submenu: [{
            label: 'Reset storage',
            click: () => {
                appWin.send('Reset-storage');
            },
        }, ],
    }); // create new menu item

    if (defaults.devMode) template.push(devMenu);
    // Build menu
    let menu = Menu.buildFromTemplate(template); // use template array

    // Set as main app menu
    Menu.setApplicationMenu(menu);
};