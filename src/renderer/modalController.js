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
            addListeners();
        }
    );
    ipcRenderer.on('storage-sync-success', (e, storageReceived) => {
        storage = storageReceived;
    });
    ipcRenderer.on('mainWindow-resized', (e, storageReceived) => {
        console.log('mainWindow-resized');
    });
    ipcRenderer.on('nav_B_button_audio_preferences', (e, storageReceived) => {
        // console.log('nav_B_button_audio_preferences');
        prefsView.toggleModalPrefsVisibility(state, 'audio');
    });
    ipcRenderer.on('nav_B_button_video_preferences', (e, storageReceived) => {
        // console.log('nav_B_button_video_preferences');
        prefsView.toggleModalPrefsVisibility(state, 'video');
    });
})();
const addListeners = () => {
    addNavBListeners()
    addMenuListeners()
    setTimeout(() => {
        addNavAListeners()
    }, 400)
}
const addNavAListeners = () => {}
const addNavBListeners = () => {
    elements.nav_B_button_audio_preferences.addEventListener('click', (e) => {});
    elements.nav_B_button_video_preferences.addEventListener('click', (e) => {});
}
const addMenuListeners = () => {}

const toggleBackground = () => {}
const togglePrefsVisibility = () => {}
const closeModalPrefs = () => {}
const openModalPrefs = () => {}

ipcRenderer.on('nav_B_button_video_subscriptions', (e, storageReceived) => {
    console.log('nav_B_button_video_subscriptions');
    console.log('SUCCESS');
});