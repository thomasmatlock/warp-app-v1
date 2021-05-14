const { app, clipboard, ipcRenderer, shell } = require('electron');
let elements = require('./views/elements');
const view = require('./modalPrefsView');
const prefsStorage = require('./modalPrefsStorage');
const startupReq = require('../js/startup');
const startup = new startupReq();
const stateReq = require('./state');

let state = new stateReq();

(function init() {
    ipcRenderer.on('window-ready', (e, storage) => {
        addNavEventListeners();
        addMenuListeners();
        addModalEventListeners();
        view.showPanelInit('prefs', 'audio');
        // https://puruvj.dev/blog/fs-promises
    });
})();

const addNavEventListeners = () => {
    elements.nav_B_button_audio_preferences.addEventListener('click', (e) => {
        view.toggleBackground(state, elements, startup);
        view.toggleModalState(state);
        view.togglePreferences(state, elements, 'audio');
    });
    elements.nav_B_button_video_preferences.addEventListener('click', (e) => {
        view.toggleBackground(state, elements, startup);
        view.toggleModalState(state);
        view.togglePreferences(state, elements, 'video');
    });
};
const addModalEventListeners = () => {
    // view listeners
    elements.modalBackground.addEventListener('click', (e) => {
        view.toggleBackground(state, elements, startup);
        view.toggleModalState(state);
        view.togglePreferences(state, elements, startup.env.nav_A_active);
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
        view.toggleBackground(state, elements, startup);
        view.toggleModalState(state);
        view.togglePreferences(state, elements, 'audio');
    });

    ipcRenderer.on('Video: Tools: Preferences', () => {
        view.toggleBackground(state, elements, startup);
        view.toggleModalState(state);
        view.togglePreferences(state, elements, 'video');
    });

    ipcRenderer.on('Warpstagram: Tools: Preferences', () => {
        view.toggleBackground(state, elements, startup);
        view.toggleModalState(state);
        view.togglePreferences(state, elements, 'warpstagram');
    });
};