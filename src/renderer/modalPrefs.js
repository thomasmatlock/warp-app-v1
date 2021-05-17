const { app, clipboard, ipcRenderer, shell } = require('electron');
const dialog = require('electron');
let elements = require('./views/elements');
const prefsView = require('./modalPrefsView');
const prefsStorage = require('./modalPrefsStorage');
const startupReq = require('../js/startup');
const startup = new startupReq();
const stateReq = require('./state');
const auto = require('./automate');

// dialog.showOpenDialog({ properties: ['openDirectory'] });
let state = new stateReq();
let userPrefs, prefsMarkup;
let storage;
// console.log(state);
(function init() {
    ipcRenderer.on(
        'window-ready',
        (e, storageSentFromMain, modalPrefsMarkup) => {
            storage = storageSentFromMain;
            // console.log(storage);
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
    setTimeout(() => {
        auto.click_nav_B(startup.env.nav_A_active, 'preferences'); // auto clicks paste, smartMode, activate, subscriptions, preferences, help
    }, 400);
    refreshModalListeners('refresh'); // THIS IS CHANGING BEHAVIOR OF BACKGROUND
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
        // CLOSE MODAL
        document
            .getElementById('closePrefsModal')
            .addEventListener('click', (e) => {
                console.log('closing modal');
                prefsView.toggleBackground(state);
                prefsView.toggleModalState(state);
                prefsView.togglePreferences(state, 'warpstagram');
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
                // console.log('this is it');
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
                console.log('autostartWarp');
            });
        document
            .getElementById('modalPrefsToggleButton_minimizeToTrayOnClose')
            .addEventListener('click', (e) => {
                console.log('minimizeToTrayOnClose');
            });
        // AUDIO QUALITY
        document
            .getElementById('modalDropdownList_list_audio_Quality')
            .addEventListener('change', function() {
                if (this.value == 'best') {
                    console.log('you selected best audio quality');
                }
                if (this.value == 'high') {
                    console.log('you selected high audio quality');
                }
                if (this.value == 'medium') {
                    console.log('you selected medium audio quality');
                }
                if (this.value == 'low') {
                    console.log('you selected low audio quality');
                }
            });
        // AUDIO FORMAT
        document
            .getElementById('modalDropdownList_list_audio_Format')
            .addEventListener('change', function() {
                if (this.value == 'MP3') {
                    console.log('you selected MP3 audio format');
                }
                if (this.value == 'M4A') {
                    console.log('you selected M4A audio format');
                }
                if (this.value == 'OGG') {
                    console.log('you selected OGG audio format');
                }
            });
        // VIDEO QUALITY
        document
            .getElementById('modalDropdownList_list_video_quality')
            .addEventListener('change', function() {
                if (this.value == 'best') {
                    console.log('you selected best video quality');
                }
                if (this.value == 'high') {
                    console.log('you selected high video quality');
                }
                if (this.value == 'medium') {
                    console.log('you selected medium video quality');
                }
                if (this.value == 'low') {
                    console.log('you selected low video quality');
                }
            });
        // VIDEO FORMAT
        document
            .getElementById('modalDropdownList_list_video_Format')
            .addEventListener('change', function() {
                if (this.value == 'MP4') {
                    console.log('you selected MP4 video format');
                }
                if (this.value == 'MKV') {
                    console.log('you selected MKV video format');
                }
            });
        document
            .getElementById('modalDropdownList_list_warpstagram_updateSelected')
            .addEventListener('change', function() {
                if (this.value == 'update-all') {
                    console.log('warpstagram update-all');
                }
                if (this.value == 'update-pinned') {
                    console.log('warpstagram update-pinned');
                }
                if (this.value == 'update-disabled') {
                    console.log('warpstagram update-disabled');
                }
            });
        document
            .getElementById(
                'modalDropdownList_list_warpstagram_autoUpdateFrequency'
            )
            .addEventListener('change', function() {
                if (this.value == '6') {
                    console.log('warpstagram autoUpdateFrequency every 6 hrs');
                }
                if (this.value == '12') {
                    console.log('warpstagram autoUpdateFrequency every 12 hrs');
                }
                if (this.value == '24') {
                    console.log('warpstagram autoUpdateFrequency every 24 hrs');
                }
            });
        document
            .getElementById('modalDropdownList_list_warpstagram_postSorting')
            .addEventListener('change', function() {
                if (this.value == 'default') {
                    console.log('warpstagram default post sorting');
                }
                if (this.value == 'new-to-old') {
                    console.log('warpstagram new-to-old post sorting');
                }
                if (this.value == 'old-to-new') {
                    console.log('warpstagram old-to-new post sorting');
                }
                if (this.value == 'a-z') {
                    console.log('warpstagram a-z post sorting');
                }
                if (this.value == 'z-a') {
                    console.log('warpstagram z-a post sorting');
                }
            });
        // OUTPUT FOLDERS
        document
            .getElementById('modalOutputFolderBtn_audio')
            .addEventListener('click', (e) => {
                console.log('You want to change the audio output folder');
            });
        document
            .getElementById('modalOutputFolderBtn_video')
            .addEventListener('click', (e) => {
                console.log('You want to change the video output folder');
            });
        document
            .getElementById('modalOutputFolderBtn_warpstagram')
            .addEventListener('click', (e) => {
                console.log('You want to change the warpstagram output folder');
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
            prefsView.toggleBackground(state);
            prefsView.toggleModalState(state);
            prefsView.togglePreferences(state, 'warpstagram');
        });
    // CLOSE MODAL
    document
        .getElementById('closePrefsModal')
        .addEventListener('click', (e) => {
            console.log('closing modal');
            prefsView.toggleBackground(state);
            prefsView.toggleModalState(state);
            prefsView.togglePreferences(state, 'warpstagram');
        });
};