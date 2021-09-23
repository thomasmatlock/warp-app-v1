const { app, clipboard, ipcRenderer, shell } = require('electron');
let elements = require('./views/elements');
const modalPrefsView = require('./modalPrefsView');
const modalLogin = require('./modalLogin');

const theme = require('./themeController');
const global = require('../js/global');

let storage, prefsMarkup, prefsMarkupSrc;
let collapsibleLicensePanels = [];
let collapsibleLicensePanelsAudio = [];
let collapsibleLicensePanelsVideo = [];
let collapsibleLicensePanelsWarpstagram = [];
let collapsibleLicensePanelsBundle = [];
let collapsibleLicensePanelsHeightMax = '400px';
let collapsibleLicensePanelsHeightMin = '0px';
let panelTransitionSpeed = 'height 1s';

(function init() {
    ipcRenderer.on(
        'window-ready',
        (e, storageSentFromMain) => {
            storage = storageSentFromMain;
            prefsMarkupSrc = storage.markups.modals.prefs;
            prefsMarkup = storage.markups.modals.prefs;
            storage.state.activeTab = global.discoverStartupTab(storage);
            windowReady(prefsMarkup);
        }
    );
    ipcRenderer.on('storage-sync-success', (e, storageReceived) => {
        storage = storageReceived;
    });
    ipcRenderer.on('mainWindow-resized', (e, storageReceived) => {
        console.log('mainWindow-resized');
    });
})();

const windowReady = (prefsMarkup) => {
    theme.setTheme(storage)
        // console.log(storage.state.activeTab);
    modalPrefsView.injectModalPrefsToCurrentSlide(prefsMarkup, storage.state.activeTab, storage);
    modalPrefsView.showPanelInit('prefs', storage.state.activeTab);
    refreshListeners(); // THIS IS CHANGING BEHAVIOR OF BACKGROUND
    setTimeout(() => {
        addNavAListeners();
        modalPrefsView.updateInputOptions(storage);
        setLicenseActivationTransitionsSpeed();
        collapsibleLicensePanels = document.getElementsByClassName('modalActionComponent_panel_collapsible');
        expandLicensePanels(collapsibleLicensePanels, collapsibleLicensePanelsHeightMax);
        collapseLicensePanels(collapsibleLicensePanels, collapsibleLicensePanelsHeightMin);
        createCollapsiblePanelsArray(collapsibleLicensePanels, 'audio', collapsibleLicensePanelsAudio)
        createCollapsiblePanelsArray(collapsibleLicensePanels, 'video', collapsibleLicensePanelsVideo)
        createCollapsiblePanelsArray(collapsibleLicensePanels, 'warpstagram', collapsibleLicensePanelsWarpstagram)
        createCollapsiblePanelsArray(collapsibleLicensePanels, 'bundle', collapsibleLicensePanelsBundle)
    }, 400);
};
const createCollapsiblePanelsArray = (arr, subStr, newArr) => {

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id.includes(subStr)) {
            newArr.push(arr[i]);
        }
    }
}
const addNavAListeners = () => {
    elements.nav_A_audio.addEventListener('click', (e) => {
        storage.state.activeTab = 'audio';
        tabSwitch();
    });
    elements.nav_A_video.addEventListener('click', (e) => {
        storage.state.activeTab = 'video';
        tabSwitch();
    });
    elements.nav_A_warpstagram.addEventListener('click', (e) => {
        storage.state.activeTab = 'warpstagram';
        tabSwitch();
    });
};
const refreshListeners = () => {
    setTimeout(() => {
        // CLOSE MODAL
        document
            .getElementById('closePrefsModal')
            .addEventListener('click', (e) => {
                // console.log(storage.user.prefs);
                console.log('hello');
                modalPrefsView.toggleModalPrefsVisibility(storage, 'warpstagram');

                prefsSettingsSync();
            });
        // NAV LISTENERS
        document
            .getElementById('modalPrefsNav_button_audio_ID')
            .addEventListener('click', (e) => {
                modalPrefsView.showPanel('prefs', 'audio');
            });
        document
            .getElementById('modalPrefsNav_button_video_ID')
            .addEventListener('click', (e) => {
                modalPrefsView.showPanel('prefs', 'video');
            });
        document
            .getElementById('modalPrefsNav_button_warpstagram_ID')
            .addEventListener('click', (e) => {
                modalPrefsView.showPanel('prefs', 'warpstagram');
            });
        document
            .getElementById('modalPrefsNav_button_general_ID')
            .addEventListener('click', (e) => {
                modalPrefsView.showPanel('prefs', 'general');
            });
        document
            .getElementById('modalPrefsNav_button_license_ID')
            .addEventListener('click', (e) => {
                modalPrefsView.showPanel('prefs', 'license');
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
                modalPrefsView.updateInputOptions(storage);
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
            .getElementById('modalDropdown_videoFormat')
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
                theme.setTheme(storage);
            });
        // LICENSE SETTINGS
        document
            .getElementById('modalActionComponent_audio')
            .addEventListener('mouseover', function() {
                setLicenseActivationTransitionsSpeed();
                expandLicensePanels(collapsibleLicensePanelsAudio, collapsibleLicensePanelsHeightMax);
                document.getElementById('modalActionComponent_audio').classList.add('modalActionComponent_active')
            });

        document
            .getElementById('modalActionComponent_audio')
            .addEventListener('mouseout', function() {
                setLicenseActivationTransitionsSpeed();
                collapseLicensePanels(collapsibleLicensePanelsAudio, collapsibleLicensePanelsHeightMin);
            });
        document
            .getElementById('modalActionComponent_video')
            .addEventListener('mouseover', function() {
                setLicenseActivationTransitionsSpeed();
                expandLicensePanels(collapsibleLicensePanelsVideo, collapsibleLicensePanelsHeightMax);
            });
        document
            .getElementById('modalActionComponent_video')
            .addEventListener('mouseout', function() {
                setLicenseActivationTransitionsSpeed();
                collapseLicensePanels(collapsibleLicensePanelsVideo, collapsibleLicensePanelsHeightMin);
            });
        document
            .getElementById('modalActionComponent_warpstagram')
            .addEventListener('mouseover', function() {
                setLicenseActivationTransitionsSpeed();
                expandLicensePanels(collapsibleLicensePanelsWarpstagram, collapsibleLicensePanelsHeightMax);
            });
        document
            .getElementById('modalActionComponent_warpstagram')
            .addEventListener('mouseout', function() {
                setLicenseActivationTransitionsSpeed();
                collapseLicensePanels(collapsibleLicensePanelsWarpstagram, collapsibleLicensePanelsHeightMin);
            });
        document
            .getElementById('modalActionComponent_bundle')
            .addEventListener('mouseover', function() {
                setLicenseActivationTransitionsSpeed();
                expandLicensePanels(collapsibleLicensePanelsBundle, collapsibleLicensePanelsHeightMax);
            });
        document
            .getElementById('modalActionComponent_bundle')
            .addEventListener('mouseout', function() {
                setLicenseActivationTransitionsSpeed();
                collapseLicensePanels(collapsibleLicensePanelsBundle, collapsibleLicensePanelsHeightMin);
            });
        document
            .getElementById('loginInstagramButton')
            .addEventListener('click', function(e) {
                let id;
                if (e.target.tagName === 'P') { id = e.target.parentNode.id; }
                if (e.target.tagName === 'DIV') { id = e.target.id; }
                modalLogin.toggleLoginVisibility(id)
            });
        document
            .getElementById('loginYoutubeButton')
            .addEventListener('click', function(e) {
                let id;
                if (e.target.tagName === 'P') { id = e.target.parentNode.id; }
                if (e.target.tagName === 'DIV') { id = e.target.id; }
                modalLogin.toggleLoginVisibility(id);
            });
    }, 100);
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
        general_theme,
        general_startupTab,
    ] = [
        'audioQuality',
        'audioFormat',
        'videoQuality',
        'videoFormat',
        'warpstagram_updateSelected',
        'warpstagram_autoUpdateFrequency',
        'warpstagram_postSorting',
        'general_theme',
        'general_startupTab',
    ];
    // TOGGLES CHECKBOXES STATE
    if (eventTitle.includes('checkbox')) {
        // console.log(eventTitle);
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
    else if (eventTitle.includes(general_theme)) {
        setPrefDropdownsToFalse(general_theme);
        storage.user.prefs[eventTitle] = true;
    } else if (eventTitle.includes(general_startupTab)) {
        setPrefDropdownsToFalse(general_startupTab);
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
const dialogShowOutputFolder = (outputFolderBtnID) => {
    ipcRenderer.send('dialog-showOutputFolder', outputFolderBtnID, storage);
};
const tabSwitch = () => {
    modalPrefsView.removeAllInjectedModals();
    setTimeout(() => {
        modalPrefsView.injectModalPrefsToCurrentSlide(
            prefsMarkup,
            storage.state.activeTab,
            storage
        );
        modalPrefsView.updateInputOptions(storage);


    }, 100);
    modalPrefsView.showPanelInit('prefs', storage.state.activeTab);
    refreshListeners();
};
const expandLicensePanels = (arr, height) => {
    for (let i = 0; i < arr.length; i++) {
        arr[i].style.height = height;
    }
}
const collapseLicensePanels = (arr, height) => {
    for (let i = 0; i < arr.length; i++) {
        arr[i].style.height = height;
    }
}
const setLicenseActivationTransitionsSpeed = () => {
    document.getElementById('modalActionComponent_audio').style.WebkitTransition = panelTransitionSpeed;
    document.getElementById('modalActionComponent_video').style.WebkitTransition = panelTransitionSpeed;
    document.getElementById('modalActionComponent_warpstagram').style.WebkitTransition = panelTransitionSpeed;
    document.getElementById('modalActionComponent_bundle').style.WebkitTransition = panelTransitionSpeed;
    document.getElementById('modalActionComponent_panel_top_audio').style.WebkitTransition = panelTransitionSpeed;
    document.getElementById('modalActionComponent_panel_middle_audio').style.WebkitTransition = panelTransitionSpeed;
    document.getElementById('modalActionComponent_panel_bottom_audio').style.WebkitTransition = panelTransitionSpeed;
    document.getElementById('modalActionComponent_panel_top_video').style.WebkitTransition = panelTransitionSpeed;
    document.getElementById('modalActionComponent_panel_middle_video').style.WebkitTransition = panelTransitionSpeed;
    document.getElementById('modalActionComponent_panel_bottom_video').style.WebkitTransition = panelTransitionSpeed;
    document.getElementById('modalActionComponent_panel_top_warpstagram').style.WebkitTransition = panelTransitionSpeed;
    document.getElementById('modalActionComponent_panel_middle_warpstagram').style.WebkitTransition = panelTransitionSpeed;
    document.getElementById('modalActionComponent_panel_bottom_warpstagram').style.WebkitTransition = panelTransitionSpeed;
    document.getElementById('modalActionComponent_panel_top_bundle').style.WebkitTransition = panelTransitionSpeed;
    document.getElementById('modalActionComponent_panel_middle_bundle').style.WebkitTransition = panelTransitionSpeed;
    // document.getElementById('modalActionComponent_panel_bottom_bundle').style.WebkitTransition = panelTransitionSpeed;
}
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
                    modalPrefsView.updateInputOptions(storage);
                }
            }
        }
    }
);
module.exports = {
    tabSwitch,
    prefsSettingsSync,
};