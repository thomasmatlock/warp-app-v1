const { app, clipboard, ipcRenderer, shell } = require('electron');
let elements = require('./views/elements');
const prefsView = require('./modalPrefsView');
const prefsStorage = require('./modalPrefsStorage');
const startupReq = require('../js/startup');
const startup = new startupReq();
const stateReq = require('./state');

let state = new stateReq();
let userPrefs, prefsMarkup;
let storage;
prefsStorage.loadMarkupSource();
(function init() {
    ipcRenderer.on(
        'window-ready',
        (e, storageSentFromMain, modalPrefsMarkup) => {
            storage = storageSentFromMain;
            prefsMarkup = modalPrefsMarkup;
            // console.log(prefsMarkup);
            windowReady();
        }
    );
})();

const windowReady = () => {
    prefsView.markupPrefs(storage.user);
    // console.log('marking prefs');
    prefsView.injectPrefsModalToCurrentSlide(); // RUNS FIRST

    addNavEventListeners();
    addMenuListeners();
    addModalEventListeners();
    prefsView.showPanelInit('prefs', 'audio');
    setTimeout(() => {
        addNavAListeners();
    }, 500);
};

const addNavAListeners = () => {
    elements.nav_A_audio.addEventListener('click', (e) => {
        prefsView.removeAllAndInjectToActiveSlide();
    });
    elements.nav_A_video.addEventListener('click', (e) => {
        prefsView.removeAllAndInjectToActiveSlide();
    });
    elements.nav_A_warpstagram.addEventListener('click', (e) => {
        prefsView.removeAllAndInjectToActiveSlide();
    });
};
const addNavEventListeners = () => {
    elements.nav_B_button_audio_preferences.addEventListener('click', (e) => {
        prefsView.toggleBackground(state);
        prefsView.toggleModalState(state);
        prefsView.togglePreferences(state, 'audio');
    });
    elements.nav_B_button_video_preferences.addEventListener('click', (e) => {
        prefsView.toggleBackground(state);
        prefsView.toggleModalState(state);
        prefsView.togglePreferences(state, 'video');
    });
};
const addMenuListeners = () => {
    ipcRenderer.on('Audio: Tools: Preferences', () => {
        prefsView.toggleBackground(state);
        prefsView.toggleModalState(state);
        prefsView.togglePreferences(state, 'audio');
    });

    ipcRenderer.on('Video: Tools: Preferences', () => {
        prefsView.toggleBackground(state);
        prefsView.toggleModalState(state);
        prefsView.togglePreferences(state, 'video');
    });

    ipcRenderer.on('Warpstagram: Tools: Preferences', () => {
        prefsView.toggleBackground(state);
        prefsView.toggleModalState(state);
        prefsView.togglePreferences(state, 'warpstagram');
    });
};
const addModalEventListeners = () => {
    // prefsView listeners
    elements.modalBackground.addEventListener('click', (e) => {
        prefsView.toggleBackground(state);
        prefsView.toggleModalState(state);
        prefsView.togglePreferences(state, 'warpstagram');
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
                prefsView.showPanel('prefs', 'audio');
            });
        document
            .getElementById('modalPrefsNav_button_video_ID')
            .addEventListener('click', (e) => {
                prefsView.showPanel('prefs', 'video');
            });
        document
            .getElementById('modalPrefsNav_button_warpstagram_ID')
            .addEventListener('click', (e) => {
                prefsView.showPanel('prefs', 'warpstagram');
            });
        document
            .getElementById('modalPrefsNav_button_general_ID')
            .addEventListener('click', (e) => {
                prefsView.showPanel('prefs', 'general');
            });
        document
            .getElementById('modalPrefsNav_button_license_ID')
            .addEventListener('click', (e) => {
                prefsView.showPanel('prefs', 'license');
            });
    }, 100);
};