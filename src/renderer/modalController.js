const { app, clipboard, ipcRenderer, shell } = require('electron');
const dialog = require('electron');
let elements = require('./views/elements');
const modalPrefs = require('./modalPrefs');
const prefsView = require('./modalPrefsView');
const theme = require('./themeController');
const prefsStorage = require('./settings');
const defaultsReq = require('../js/defaults');
const defaults = new defaultsReq();
const stateReq = require('./state');
const auto = require('./automate');
const fileControllerReq = require('../js/fileController');
const fileController = new fileControllerReq();

let state = new stateReq();
let storage, startupTab;

(function init() {
    ipcRenderer.on(
        'window-ready',
        (e, storageSentFromMain, modalPrefsMarkup, markupDownloadItemAudio, markupDownloadItemVideo) => {
            storage = storageSentFromMain;
            startupTab = modalPrefs.discoverStartupTab(storage);
            state.activeTab = startupTab;
            addEventListeners();
        }
    );
    ipcRenderer.on('storage-sync-success', (e, storageReceived) => {
        storage = storageReceived;
    });
    ipcRenderer.on('mainWindow-resized', (e, storageReceived) => {
        console.log('mainWindow-resized');
    });
})();
const addEventListeners = () => {
    console.log('addEventListeners');
    addNavAListeners();
    addNavBListeners();
    addMenuListeners();
}
const addNavAListeners = () => {}
const addNavBListeners = () => {}
const addMenuListeners = () => {
    ipcRenderer.on('Audio: Tools: Preferences', () => {
        prefsView.toggleModalPrefsVisibility(state, 'audio');
    });

    ipcRenderer.on('Video: Tools: Preferences', () => {
        prefsView.toggleModalPrefsVisibility(state, 'video');
    });

    ipcRenderer.on('Warpstagram: Tools: Preferences', () => {
        prefsView.toggleModalPrefsVisibility(state, 'warpstagram');
    });
}
const toggleBackground = () => {}
const togglePrefsVisibility = () => {}
const closeModalPrefs = () => {}
const openModalPrefs = () => {}