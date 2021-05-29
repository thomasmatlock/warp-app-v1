const { app, clipboard, ipcRenderer, shell } = require('electron');
const dialog = require('electron');
let elements = require('./views/elements');
const prefsView = require('./modalPrefsView');
const prefsStorage = require('./settings');
const defaultsReq = require('../js/defaults');
const defaults = new defaultsReq();
const stateReq = require('./state');
const auto = require('./automate');
const fileControllerReq = require('../js/fileController');
const fileController = new fileControllerReq();

// dialog.showOpenDialog({ properties: ['openDirectory'] });
let state = new stateReq();
let userPrefs, prefsMarkup, prefsMarkupSrc;
let storage;
// console.log(state);
(function init() {
    ipcRenderer.on(
        'window-ready',
        (e, storageSentFromMain, modalPrefsMarkup) => {
            storage = storageSentFromMain;
            // console.log(storage.user.prefs);
            prefsMarkupSrc = modalPrefsMarkup;
            prefsMarkup = modalPrefsMarkup;
            // console.log(prefsMarkup);
            state.activeTab = storage.user.prefs.startupTab;
            windowReady(prefsMarkup);
        }
    );
    ipcRenderer.on('storage-sync-success', (e, storageReceived) => {
        storage = storageReceived;
    });
})();

const windowReady = (prefsMarkup) => {
    prefsView.injectPrefsModalToCurrentSlide(
        prefsMarkup,
        storage.user.prefs.startupTab,
        storage
    );

    addNavBListeners();
    addAppMenuListeners();
    prefsView.showPanelInit('prefs', 'audio');
    setTimeout(() => {
        auto.click_nav_B(defaults.env.nav_A_active, 'preferences'); // auto clicks paste, smartMode, activate, subscriptions, preferences, help
    }, 400);
    refreshModalListeners('refresh'); // THIS IS CHANGING BEHAVIOR OF BACKGROUND
    prefsView.toggleToggleBtn(storage);

    // auto.clickElement(cb);
    setTimeout(() => {
        addNavAListeners();
        prefsView.setDropdown(storage);
    }, 400);
};

const addNavAListeners = () => {
    elements.nav_A_audio.addEventListener('click', (e) => {
        state.activeTab = 'audio';
        prefsView.removeAllInjectedModals();
        // console.log(prefsMarkup);

        setTimeout(() => {
            prefsView.injectPrefsModalToCurrentSlide(
                prefsMarkup,
                state.activeTab,
                storage
            );
        }, 100);

        // removeModalBackgroundListeners();
        prefsView.showPanelInit('prefs', 'audio');
        refreshPrefsNavListeners();
    });
    elements.nav_A_video.addEventListener('click', (e) => {
        state.activeTab = 'video';
        prefsView.removeAllInjectedModals();
        // console.log(prefsMarkup);

        setTimeout(() => {
            prefsView.injectPrefsModalToCurrentSlide(
                prefsMarkup,
                state.activeTab,
                storage
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
                state.activeTab,
                storage
            );
        }, 100);
        // refreshModalListeners('refresh');
        prefsView.showPanelInit('prefs', state.activeTab);
        refreshPrefsNavListeners();
    });
};
const addNavBListeners = () => {
    elements.nav_B_button_audio_preferences.addEventListener('click', (e) => {
        prefsView.toggleModal(state, 'audio');
    });

    elements.nav_B_button_video_preferences.addEventListener('click', (e) => {
        prefsView.toggleModal(state, 'video');
    });
};
const addAppMenuListeners = () => {
    ipcRenderer.on('Audio: Tools: Preferences', () => {
        prefsView.toggleModal(state, 'audio');
    });

    ipcRenderer.on('Video: Tools: Preferences', () => {
        prefsView.toggleModal(state, 'video');
    });

    ipcRenderer.on('Warpstagram: Tools: Preferences', () => {
        prefsView.toggleModal(state, 'warpstagram');
    });
};
const refreshModalListeners = (type) => {
    refreshModalBackgroundListeners(type);
    refreshPrefsNavListeners();
};

const refreshPrefsNavListeners = () => {
    setTimeout(() => {
        // CLOSE MODAL
        document
            .getElementById('closePrefsModal')
            .addEventListener('click', (e) => {
                // console.log(storage.user.prefs);
                prefsView.toggleModal(state, 'warpstagram');
                prefsSettingsSync();
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
        document
            .getElementById('modalPrefsToggleButton_autostartWarp')
            .addEventListener('click', (e) => {
                updatePrefsState('toggle_autostartWarp');
            });
        document
            .getElementById('modalPrefsToggleButton_minimizeToTrayOnClose')
            .addEventListener('click', (e) => {
                updatePrefsState('toggle_minimizeToTrayOnClose');
            });
        // AUDIO QUALITY
        document
            .getElementById('modalDropdownList_list_audio_Quality')
            .addEventListener('change', function() {
                updatePrefsState(this.value);
                prefsView.setDropdown(storage);
            });
        // AUDIO FORMAT
        document
            .getElementById('modalDropdownList_list_audio_Format')
            .addEventListener('change', function() {
                updatePrefsState(this.value);
            });
        // VIDEO QUALITY
        document
            .getElementById('modalDropdownList_list_video_quality')
            .addEventListener('change', function() {
                updatePrefsState(this.value);
            });
        // VIDEO FORMAT
        document
            .getElementById('modalDropdownList_list_video_Format')
            .addEventListener('change', function() {
                console.log(this.value);
                updatePrefsState(this.value);
            });
        document
            .getElementById('modalDropdownList_list_warpstagram_updateSelected')
            .addEventListener('change', function() {
                updatePrefsState(this.value);
            });
        document
            .getElementById(
                'modalDropdownList_list_warpstagram_autoUpdateFrequency'
            )
            .addEventListener('change', function() {
                updatePrefsState(this.value);
            });
        document
            .getElementById('modalDropdownList_list_warpstagram_postSorting')
            .addEventListener('change', function() {
                updatePrefsState(this.value);
            });
        // OUTPUT FOLDERS
        document
            .getElementById('modalOutputFolderBtn_audio')
            .addEventListener('click', (e) => {
                dialogShowOutputFolder('modalOutputFolderBtn_audio');
            });
        document
            .getElementById('modalOutputFolderBtn_video')
            .addEventListener('click', (e) => {
                dialogShowOutputFolder('modalOutputFolderBtn_video');
            });
        document
            .getElementById('modalOutputFolderBtn_warpstagram')
            .addEventListener('click', (e) => {
                dialogShowOutputFolder('modalOutputFolderBtn_warpstagram');
            });
    }, 100);
};

const refreshModalBackgroundListeners = (type) => {
    document
        .getElementById('modalBackgroundID')
        .addEventListener('click', (e) => {
            prefsView.toggleModal(state, 'warpstagram');
            // console.log(storage.user.prefs);
            prefsSettingsSync();
        });
};

const updatePrefsState = (eventTitle) => {
    // console.log(eventTitle);
    var optionSubstring = eventTitle.substr(0, 12);
    // HANDLES non toggle options
    if (eventTitle.substr(0, 7) != 'toggle_') {
        setPrefOptionsToFalse(optionSubstring);
        storage.user.prefs[eventTitle] = storage.user.prefs[eventTitle] ?
            false :
            true;
    }
    // HANDLES TOGGLE BUTTONS
    if (eventTitle.substr(0, 7) === 'toggle_') {
        storage.user.prefs[eventTitle] = storage.user.prefs[eventTitle] ?
            false :
            true;
        prefsView.toggleToggleBtn(storage);
    }
    // console.log(storage.user.prefs[eventTitle]);
};
const prefsSettingsSync = () => {
    ipcRenderer.send('storage-sync-request', storage);
};
const setPrefOptionsToFalse = (optionSubstring) => {
    for (var key in storage.user.prefs) {
        if (storage.user.prefs.hasOwnProperty(key)) {
            if (key.substr(0, 12) === optionSubstring) {
                storage.user.prefs[key] = false;
            }
        }
    }
};

const dialogShowOutputFolder = (outputFolderBtnID) => {
    ipcRenderer.send('dialog-showOutputFolder', outputFolderBtnID, storage);
};

ipcRenderer.on(
    'dialog-outputFolderSelected',
    (e, outputFolderSelected, outputFolderSelectedType) => {
        outputFolderSelectedType = outputFolderSelectedType.replace(
            /^\w/,
            (c) => c.toUpperCase()
        );

        for (var key in storage.user.prefs) {
            if (storage.user.prefs.hasOwnProperty(key)) {
                let joined = `path${outputFolderSelectedType}`;

                if (key === joined) {
                    storage.user.prefs[key] = outputFolderSelected;

                    storage.user.prefs[key] = storage.user.prefs[key][0];

                    prefsView.insertOutputFolderPaths(storage);
                }
            }
        }
    }
);