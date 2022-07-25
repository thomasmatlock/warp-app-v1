const { app, clipboard, ipcRenderer, shell } = require('electron');
const dialog = require('electron');
let elements = require('./views/elements');
const modalPrefs = require('./modalPrefs');
const modalPrefsView = require('./modalPrefsView');
const modalLogin = require('./modalLogin');
const theme = require('./themeController');
const prefsStorage = require('./settings');
const global = require('../js/global');
const auto = require('./automate');

let storage;
const addIpcRendererListeners = () => {
    ipcRenderer.on('storage-sync-success', (e, storageReceived) => {
        storage = storageReceived;
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

///////////////////////////////////////////////////
// prefs
// login
// activation
///////////////////////////////////////////////////

(function init() {
    ipcRenderer.on(
        'window-ready',
        (e, storageSentFromMain, modalPrefsMarkup, markupDownloadItemAudio, markupDownloadItemVideo) => {
            storage = storageSentFromMain;
            storage.state.activeTab = global.discoverStartupTab(storage);
            auto.openModalPrefs(storage);
            refreshModalBackgroundListeners();
            setTimeout(() => {
                addNavAListeners();
            }, 300);
        }
    );
    addIpcRendererListeners();
})();
const addNavAListeners = () => {
    elements.nav_A_audio.addEventListener('click', (e) => {
        modalLogin.injectModalLoginToCurrentSlide()
    });
    elements.nav_A_video.addEventListener('click', (e) => {
        modalLogin.injectModalLoginToCurrentSlide()
    });
    elements.nav_A_warpstagram.addEventListener('click', (e) => {
        modalLogin.injectModalLoginToCurrentSlide()
    });
};
const toggleBackground = (state) => {
    if (state.modals.background) {
        elements.modalBackground.style.display = 'none'; // de-activate modal background
    } else if (!state.modals.background) {
        elements.modalBackground.style.display = 'flex'; // activate modal background
    }
    toggleBackgroundState(state);
}
const toggleBackgroundState = (state) => {
    state.modals.background ? state.modals.background = false : state.modals.background = true;
}
const toggleModal = (modal, avType) => {
    if (modal.includes('pref')) {
        modalPrefsView.toggleModalPrefsVisibility(storage, avType);
    }
}
const refreshModalBackgroundListeners = (type) => {
    document
        .getElementById('modalBackgroundID')
        .addEventListener('click', (e) => {
            modalPrefsView.toggleModalPrefsVisibility(storage, 'warpstagram');
            modalPrefs.prefsSettingsSync();
        });
};
const refreshInjectedModals = () => {
    modalPrefs.tabSwitch();
    modalLogin.injectModalLoginToCurrentSlide()
}
module.exports = {
    toggleBackground,
    refreshInjectedModals,
}