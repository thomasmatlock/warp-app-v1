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
            startupTab = discoverStartupTab(storage);
            state.activeTab = startupTab;
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
            .getElementById('modalPrefsCheckbox_autostartWarp')
            .addEventListener('click', (e) => {
                updatePrefsState('checkbox_autostartWarp');
            });
        document
            .getElementById('modalPrefsCheckbox_minimizeToTrayOnClose')
            .addEventListener('click', (e) => {
                updatePrefsState('checkbox_minimizeToTrayOnClose');
            });
        // AUDIO QUALITY
        document
            .getElementById('modalDropdown_audioQuality')
            .addEventListener('change', function() {
                updatePrefsState(this.value);
                prefsView.setDropdownsAll(storage);
            });
        // AUDIO FORMAT
        document
            .getElementById('modalDropdown_audioFormat')
            .addEventListener('change', function() {
                updatePrefsState(this.value);
            });
        // VIDEO QUALITY
        document
            .getElementById('modalDropdown_videoQuality')
            .addEventListener('change', function() {
                updatePrefsState(this.value);
            });
        // VIDEO FORMAT
        document
            .getElementById('modalDropdownList_videoFormat')
            .addEventListener('change', function() {
                updatePrefsState(this.value);
            });
        document
            .getElementById('modalDropdown_warpstagram_updateSelected')
            .addEventListener('change', function() {
                updatePrefsState(this.value);
            });
        document
            .getElementById('modalDropdown_warpstagram_autoUpdateFrequency')
            .addEventListener('change', function() {
                updatePrefsState(this.value);
            });
        document
            .getElementById('modalDropdown_warpstagram_postSorting')
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
            .getElementById('modalDropdown_general_startupTab')
            .addEventListener('change', function() {
                updatePrefsState(this.value);
            });
        document
            .getElementById('modalDropdown_general_theme')
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
            prefsSettingsSync();
        });
};

const updatePrefsState = (eventTitle) => {
    let [
        audioQuality,
        audioFormat,
        videoQuality,
        videoFormat,
        warpstagram_updateSelected,
        warpstagram_autoUpdateFrequency,
        warpstagram_postSorting,
        generalSettings_theme,
        generalSettings_startupTab,
    ] = [
        'audioQuality',
        'audioFormat',
        'videoQuality',
        'videoFormat',
        'warpstagram_updateSelected',
        'warpstagram_autoUpdateFrequency',
        'warpstagram_postSorting',
        'generalSettings_theme',
        'generalSettings_startupTab',
    ];
    // TOGGLES CHECKBOXES STATE
    if (eventTitle.includes('checkbox')) {
        console.log(eventTitle);
        storage.user.prefs[eventTitle] = storage.user.prefs[eventTitle] ?
            false :
            true;
    }

    //  AUDIO DROPDOWNS
    else if (eventTitle.includes(audioQuality)) {
        setPrefDropdownsToFalse(audioQuality);
        storage.user.prefs[eventTitle] = true;
    } else if (eventTitle.includes(audioFormat)) {
        setPrefDropdownsToFalse(audioFormat);
        storage.user.prefs[eventTitle] = true;
    }

    //  VIDEO DROPDOWNS
    else if (eventTitle.includes(videoQuality)) {
        setPrefDropdownsToFalse(videoQuality);
        storage.user.prefs[eventTitle] = true;
    } else if (eventTitle.includes(videoFormat)) {
        setPrefDropdownsToFalse(videoFormat);
        storage.user.prefs[eventTitle] = true;
    }

    //  WARPSTAGRAM DROPDOWNS
    else if (eventTitle.includes(warpstagram_updateSelected)) {
        setPrefDropdownsToFalse(warpstagram_updateSelected);
        storage.user.prefs[eventTitle] = true;
    } else if (eventTitle.includes(warpstagram_autoUpdateFrequency)) {
        setPrefDropdownsToFalse(warpstagram_autoUpdateFrequency);
        storage.user.prefs[eventTitle] = true;
    } else if (eventTitle.includes(warpstagram_postSorting)) {
        setPrefDropdownsToFalse(warpstagram_postSorting);
        storage.user.prefs[eventTitle] = true;
    }

    //  GENERAL DROPDOWNS
    else if (eventTitle.includes(generalSettings_theme)) {
        setPrefDropdownsToFalse(generalSettings_theme);
        storage.user.prefs[eventTitle] = true;
    } else if (eventTitle.includes(generalSettings_startupTab)) {
        setPrefDropdownsToFalse(generalSettings_startupTab);
        storage.user.prefs[eventTitle] = true;
    }
};
const setPrefDropdownsToFalse = (optionSubstring) => {
    for (var key in storage.user.prefs) {
        if (storage.user.prefs.hasOwnProperty(key)) {
            if (key.includes(optionSubstring)) {
                storage.user.prefs[key] = false;
            }
        }
    }
};
const prefsSettingsSync = () => {
    ipcRenderer.send('storage-sync-request', storage);
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