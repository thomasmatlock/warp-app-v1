const network = require('./network');
const theme = require('./themeController');
const display = require('./displayController');
const { app } = require('electron/main');

(function main() {
    //  MAIN
    //  systemController (system environment, OS and paths, network connectivity)
    //  displayController, detects display count, display resolutions
    //  fileController (downloaded files)
    //  prefsController (user preferences)
    //  devUtilsController (test URLS, automated testing
    //  windowController (window)
    //  menuController (menu toolbar options)

    //  RENDERER
    //  themeController, handles color scheme
    //  itemController, handles displaying downloaded items
    //  userInputController, handles user keyboard input
    //  modalController, handles modal display/hide
    theme.discoverSystemTheme();
    network.isOnline();
})();

(function appListeners() {
    app.on('ready', () =>
    {
        console.log('hello');
        display.discoverDisplay();
    })
})();