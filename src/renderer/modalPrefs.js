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
let startupTab, prefsMarkup, prefsMarkupSrc;
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
            startupTab = discoverStartupTab(storage);
            state.activeTab = startupTab;
            // console.log(state.activeTab);
            windowReady(prefsMarkup);
        }
    );
    ipcRenderer.on('storage-sync-success', (e, storageReceived) => {
        storage = storageReceived;
    });
})();

const windowReady = (prefsMarkup) => {
    prefsView.injectPrefsModalToCurrentSlide(prefsMarkup, startupTab, storage);
    addNavBListeners();
    addAppMenuListeners();
    prefsView.showPanelInit('prefs', 'general');
    setTimeout(() => {
        auto.click_nav_B(startupTab, 'preferences'); // auto clicks paste, smartMode, activate, subscriptions, preferences, help
    }, 400);
    refreshModalListeners('refresh'); // THIS IS CHANGING BEHAVIOR OF BACKGROUND
    // prefsView.toggleToggleBtn(storage);
    setTimeout(() => {
        addNavAListeners();
        prefsView.setDropdownsAll(storage);
        prefsView.setCheckboxes(storage);
    }, 400);
};

const addNavAListeners = () => {
    elements.nav_A_audio.addEventListener('click', (e) => {
        state.activeTab = 'audio';
        tabSwitch();
    });
    elements.nav_A_video.addEventListener('click', (e) => {
        state.activeTab = 'video';
        tabSwitch();
    });
    elements.nav_A_warpstagram.addEventListener('click', (e) => {
        state.activeTab = 'warpstagram';
        tabSwitch();
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
                prefsView.setDropdownsAll(storage);
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
        // GENERAL SETTINGS
        document
            .getElementById('modalDropdownList_list_generalSettings_startupTab')
            .addEventListener('change', function() {
                updatePrefsState(this.value);
            });
        document
            .getElementById('modalDropdownList_list_generalSettings_theme')
            .addEventListener('change', function() {
                updatePrefsState(this.value);
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
    console.log(eventTitle);
    // 12, 20 below excludes warpstagram
    if (eventTitle.substr(12, 20) && eventTitle.includes('warpstagram')) {
        // console.log('it includes warpstagram');
        // console.log(eventTitle.substr(12, 20));
        setPrefOptionsToFalseINCLUDES(eventTitle);
        storage.user.prefs[eventTitle] = true;
    }
    var optionSubstring = eventTitle.substr(0, 12);
    // HANDLES non toggle options
    if (
        eventTitle.substr(0, 7) != 'toggle_' &&
        !eventTitle.includes('warpstagram')
    ) {
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
        // prefsView.toggleToggleBtn(storage);
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
const setPrefOptionsToFalseINCLUDES = (optionSubstring) => {
    // console.log(optionSubstring);
    let stringSlice = optionSubstring.substr(12, 7);
    // console.log(stringSlice);
    for (var key in storage.user.prefs) {
        if (storage.user.prefs.hasOwnProperty(key)) {
            if (key.includes(stringSlice)) {
                // console.log(key);
                // console.log(storage.user.prefs[key]);
                storage.user.prefs[key] = false;
            }
        }
    }
};

const discoverStartupTab = function(storage) {
    if (storage.user.prefs.generalSettings_startupTab_audio) {
        // return storage.user.prefs.generalSettings_startupTab_audio;
        return 'audio';
    }
    if (storage.user.prefs.generalSettings_startupTab_video) {
        // return storage.user.prefs.generalSettings_startupTab_video;
        return 'video';
    }
    if (storage.user.prefs.generalSettings_startupTab_warpstagram) {
        // return storage.user.prefs.generalSettings_startupTab_warpstagram;
        return 'warpstagram';
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

const tabSwitch = () => {
    prefsView.removeAllInjectedModals();
    setTimeout(() => {
        prefsView.injectPrefsModalToCurrentSlide(
            prefsMarkup,
            state.activeTab,
            storage
        );
        prefsView.setDropdownsAll(storage);
        prefsView.setCheckboxes(storage);
    }, 100);
    // refreshModalListeners('refresh');
    prefsView.showPanelInit('prefs', state.activeTab);
    refreshPrefsNavListeners();
};