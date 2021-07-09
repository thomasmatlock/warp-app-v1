const { app, clipboard, ipcRenderer, shell } = require('electron');
const nav = require('../js/nav');
class state {
    constructor() {
        this.nav = new nav(); // controls active nav
        this.modals = {};
        this.modals.preferences = false;
        this.modals.background = false;
        this.activeTab = '';
    }
    sync = () => {
        console.log(this);
        // ipcRenderer.send('state-sync-request', this);
    }
}
module.exports = state;