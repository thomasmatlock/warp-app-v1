const network = require('./network');
const theme = require('./themeController');
const display = require('./displayController');
const { app } = require('electron/main');
theme.discoverSystemTheme();
network.isOnline();

(function main() {
    // console.log('main');
})();

(function appListeners() {
    app.on('ready', () => {
        display.discoverDisplay();
    })
})();