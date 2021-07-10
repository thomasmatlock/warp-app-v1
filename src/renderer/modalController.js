const { app, clipboard, ipcRenderer, shell } = require('electron');
const dialog = require('electron');
let elements = require('./views/elements');
const modalPrefs = require('./modalPrefs');
const prefsView = require('./modalPrefsView');
const theme = require('./themeController');
const prefsStorage = require('./settings');
const defaultsReq = require('../js/defaults');
const global = require('../js/global');
const defaults = new defaultsReq();
const auto = require('./automate');

let storage;
const addIpcRendererListeners = () => {
    ipcRenderer.on('storage-sync-success', (e, storageReceived) => {
        storage = storageReceived;
    });
    ipcRenderer.on('mainWindow-resized', (e, storageReceived) => {
        console.log('mainWindow-resized');
    });
    ipcRenderer.on('nav_A_audio', (e, storageReceived) => {
        storage.state.activeTab = 'audio';
    });
    ipcRenderer.on('nav_A_video', (e, storageReceived) => {
        storage.state.activeTab = 'video';
    });
    ipcRenderer.on('nav_A_warpstagram', (e, storageReceived) => {
        storage.state.activeTab = 'warpstagram';
    });

    ipcRenderer.on('nav_B_button_audio_preferences', (e, storageReceived) => {
        toggleModal('prefs', 'audio');
    });
    ipcRenderer.on('nav_B_button_video_preferences', (e, storageReceived) => {
        toggleModal('prefs', 'video');
    });
    ipcRenderer.on('Warpstagram: Tools: Preferences', (e, storageReceived) => {
        toggleModal('prefs', 'warpstagram');
    });
}

(function init() {
    ipcRenderer.on(
        'window-ready',
        (e, storageSentFromMain, modalPrefsMarkup, markupDownloadItemAudio, markupDownloadItemVideo) => {
            storage = storageSentFromMain;
            storage.state.activeTab = global.discoverStartupTab(storage);
            auto.openModalPrefs(storage);
            refreshModalBackgroundListeners();
        }
    );
    addIpcRendererListeners();
})();


const discoverActiveNavA = (state) => {}
const toggleBackground = (state) => {
    if (state.modals.background) {
        elements.modalBackground.style.display = 'none'; // de-activate modal background
    } else if (!state.modals.background) {
        elements.modalBackground.style.display = 'flex'; // activate modal background
    }
    console.log(state.modals.background);
}
const togglePrefsVisibility = () => {}
const toggleModal = (modal, avType) => {
    // console.log(storage.state);
    if (modal.includes('pref')) {
        // toggleBackground(storage.state);
        prefsView.toggleModalPrefsVisibility(storage.state, avType);
    }

}
const openModalPrefs = () => {}
const refreshModalBackgroundListeners = (type) => {
    document
        .getElementById('modalBackgroundID')
        .addEventListener('click', (e) => {
            prefsView.toggleModalPrefsVisibility(storage.state, 'warpstagram');
            modalPrefs.prefsSettingsSync();
        });
};