const { app, clipboard, ipcRenderer, shell } = require('electron');
let elements = require('./views/elements');
const view = require('./modalPrefsView');
const prefsStorage = require('./modalPrefsStorage');
const startupReq = require('../js/startup');
const startup = new startupReq();
const stateReq = require('./state');

let state = new stateReq();

(function init() {
    ipcRenderer.on('prefsMarkup-loaded', (e, data) => {
        console.log('prefsMarkup loaded');
    });
    ipcRenderer.on('prefsMarkup-saved', (e, data) => {
        console.log('prefsMarkup saved');
    });
    // try {
    //     prefsStorage.loadMarkup();
    // } catch (e) {
    //     console.error(e);
    // }
    prefsStorage.loadMarkup();
    ipcRenderer.on('window-ready', (e, storage) => {
        addNavEventListeners();
        addMenuListeners();
        addModalEventListeners();
        view.showPanelInit('prefs', 'audio');
    });
})();

const addNavEventListeners = () => {
    elements.nav_B_button_audio_preferences.addEventListener('click', (e) => {
        view.toggleBackground(state);
        view.toggleModalState(state);
        view.togglePreferences(state, 'audio');
    });
    elements.nav_B_button_video_preferences.addEventListener('click', (e) => {
        view.toggleBackground(state);
        view.toggleModalState(state);
        view.togglePreferences(state, 'video');
    });
};
const addModalEventListeners = () => {
    // view listeners
    elements.modalBackground.addEventListener('click', (e) => {
        view.toggleBackground(state);
        view.toggleModalState(state);
        view.togglePreferences(state, 'warpstagram');
    });

    setTimeout(() => {
        document
            .getElementById('modalPrefsToggleButton_autostartWarp')
            .addEventListener('click', (e) => {
                console.log('hello');
            });
        document
            .getElementById('modalPrefsToggleButton_minimizeToTrayOnClose')
            .addEventListener('click', (e) => {
                console.log('hello');
            });
        document
            .getElementById('modalOutputFolderBtn_audio')
            .addEventListener('click', (e) => {
                console.log('hello');
            });
        // NAV LISTENERS
        document
            .getElementById('modalPrefsNav_button_audio_ID')
            .addEventListener('click', (e) => {
                view.showPanel('prefs', 'audio');
            });
        document
            .getElementById('modalPrefsNav_button_video_ID')
            .addEventListener('click', (e) => {
                view.showPanel('prefs', 'video');
            });
        document
            .getElementById('modalPrefsNav_button_warpstagram_ID')
            .addEventListener('click', (e) => {
                view.showPanel('prefs', 'warpstagram');
            });
        document
            .getElementById('modalPrefsNav_button_general_ID')
            .addEventListener('click', (e) => {
                view.showPanel('prefs', 'general');
            });
        document
            .getElementById('modalPrefsNav_button_license_ID')
            .addEventListener('click', (e) => {
                view.showPanel('prefs', 'license');
            });
    }, 100);
};
const addMenuListeners = () => {
    ipcRenderer.on('Audio: Tools: Preferences', () => {
        view.toggleBackground(state);
        view.toggleModalState(state);
        view.togglePreferences(state, 'audio');
    });

    ipcRenderer.on('Video: Tools: Preferences', () => {
        view.toggleBackground(state);
        view.toggleModalState(state);
        view.togglePreferences(state, 'video');
    });

    ipcRenderer.on('Warpstagram: Tools: Preferences', () => {
        view.toggleBackground(state);
        view.toggleModalState(state);
        view.togglePreferences(state, 'warpstagram');
    });
};