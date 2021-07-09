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

// let state = new stateReq();
let storage, startupTab;
const addIpcRendererListeners = () => {
    ipcRenderer.on('storage-sync-success', (e, storageReceived) => {
        storage = storageReceived;
    });
    ipcRenderer.on('mainWindow-resized', (e, storageReceived) => {
        console.log('mainWindow-resized');
    });
    ipcRenderer.on('nav_A_audio', (e, storageReceived) => {
        storage.state.activeTab = 'audio';
        console.log(storage.state);
    });
    ipcRenderer.on('nav_A_video', (e, storageReceived) => {
        storage.state.activeTab = 'video';
        console.log(storage.state);
    });
    ipcRenderer.on('nav_A_warpstagram', (e, storageReceived) => {
        storage.state.activeTab = 'warpstagram';
        console.log(storage.state);
    });

    ipcRenderer.on('nav_B_button_audio_preferences', (e, storageReceived) => {
        prefsView.toggleModalPrefsVisibility(storage.state, 'audio');
    });
    ipcRenderer.on('nav_B_button_video_preferences', (e, storageReceived) => {
        prefsView.toggleModalPrefsVisibility(storage.state, 'video');
    });
    ipcRenderer.on('Warpstagram: Tools: Preferences', (e, storageReceived) => {
        // prefsView.toggleModalPrefsVisibility(storage.state, 'warpstagram');
    });
}

(function init() {
    ipcRenderer.on(
        'window-ready',
        (e, storageSentFromMain, modalPrefsMarkup, markupDownloadItemAudio, markupDownloadItemVideo) => {
            storage = storageSentFromMain;
            console.log(storage);
            startupTab = modalPrefs.discoverStartupTab(storage);
            storage.state.activeTab = startupTab;
            setTimeout(() => {
                if (!defaults.dev.autoOpenModalPrefs) {
                    prefsView.toggleModalPrefsVisibility(storage.state, 'warpstagram');
                    auto.click_nav_B(startupTab, 'preferences');
                }
                if (defaults.dev.autoOpenModalPrefs)
                    auto.click_nav_B(startupTab, 'preferences');
            }, 100);
        }
    );
    addIpcRendererListeners();
})();

const discoverActiveNavA = (state) => {}
const toggleBackground = () => {}
const togglePrefsVisibility = () => {}
const closeModalPrefs = () => {}
const openModalPrefs = () => {}