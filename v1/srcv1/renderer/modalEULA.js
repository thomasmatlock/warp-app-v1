const { app, clipboard, ipcRenderer, shell } = require('electron');
const addModalEULAlisteners = () => {
    document.getElementById('EULAagree').addEventListener('click', () => {
        console.log('you agreed to EULA');
        ipcRenderer.send('eula-agreement-accepted');
    });
};
addModalEULAlisteners();