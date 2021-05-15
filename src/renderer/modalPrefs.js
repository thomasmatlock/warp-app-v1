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
// console.log(state);
(function init() {
    ipcRenderer.on(
        'window-ready',
        (e, storageSentFromMain, modalPrefsMarkup) => {
            storage = storageSentFromMain;
            prefsMarkup = modalPrefsMarkup;
            windowReady(prefsMarkup);
        }
    );
})();

const windowReady = (prefsMarkup) => {
    // prefsView.markupPrefs(prefsMarkup, storage.user.prefs.paths);
    // prefsView.turnOffBackground(state);
    state.activeTab = storage.user.prefs.startupTab;
    prefsView.injectPrefsModalToCurrentSlide(
        prefsMarkup,
        storage.user.prefs.paths,
        storage.user.prefs.startupTab
    );

    addNavBListeners();
    addAppMenuListeners();
    prefsView.showPanelInit('prefs', 'audio');
    refreshModalListeners('refresh');
    setTimeout(() => {
        addNavAListeners();
    }, 100);
};

const addNavAListeners = () => {
    elements.nav_A_audio.addEventListener('click', (e) => {
        state.activeTab = 'audio';
        prefsView.removeAllInjectedModals();
        setTimeout(() => {
            prefsView.injectPrefsModalToCurrentSlide(
                prefsMarkup,
                storage.user.prefs.paths,
                state.activeTab
            );
        }, 100);
        // removeModalBackgroundListeners();
        prefsView.showPanelInit('prefs', 'audio');
        refreshPrefsNavListeners();
    });
    elements.nav_A_video.addEventListener('click', (e) => {
        state.activeTab = 'video';
        prefsView.removeAllInjectedModals();
        setTimeout(() => {
            prefsView.injectPrefsModalToCurrentSlide(
                prefsMarkup,
                storage.user.prefs.paths,
                state.activeTab
            );
            // prefsView.togglePreferences(state, 'audio');
        }, 100);
        // refreshModalListeners('refresh');
        prefsView.showPanelInit('prefs', state.activeTab);
        refreshPrefsNavListeners();
    });
    elements.nav_A_warpstagram.addEventListener('click', (e) => {
        state.activeTab = 'warpstagram';
        prefsView.removeAllInjectedModals();
        setTimeout(() => {
            prefsView.injectPrefsModalToCurrentSlide(
                prefsMarkup,
                storage.user.prefs.paths,
                state.activeTab
            );
        }, 100);
        // refreshModalListeners('refresh');
        prefsView.showPanelInit('prefs', state.activeTab);
        refreshPrefsNavListeners();
    });
};
const addNavBListeners = () => {
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
const addAppMenuListeners = () => {
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
const refreshModalListeners = (type) => {
    refreshModalBackgroundListeners(type);
    refreshPrefsNavListeners();
};

const refreshPrefsNavListeners = () => {
    setTimeout(() => {
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
    }, 100);
};

const removeModalBackgroundListeners = (type) => {
    let backgrounds = document.getElementsByClassName('modalBackground');

    for (var key in backgrounds) {
        if (backgrounds.hasOwnProperty(key)) {
            backgrounds[key].remove();
        }
    }
    document
        .getElementById('modalBackgroundID')
        .removeEventListener('click', (e) => {
            console.log('removed');
        });
};
const refreshModalBackgroundListeners = (type) => {
    document
        .getElementById('modalBackgroundID')
        .addEventListener('click', (e) => {
            // console.log('added');
            prefsView.toggleBackground(state);
            prefsView.toggleModalState(state);
            prefsView.togglePreferences(state, 'warpstagram');
        });
};