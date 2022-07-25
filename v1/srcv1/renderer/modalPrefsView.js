//////////////////////////////////////////////////////////////// Activation music/audio
// modalActivationAudio
// modalActivationVideo
// modalActivationWarpstagram
// Video Subscriptions // HTML
//////////////////////////////////////////////////////////////// Preferences
//////////////////////////////////////////////////////////////// Welcome
// const fs = require('fs').promises;
let elements = require('./views/elements');

const toggleBackground = (state) => {
    // console.log(state.modals);
    if (state.modals.background) {
        elements.modalBackground.style.display = 'none'; // de-activate modal background
    } else if (!state.modals.background) {
        elements.modalBackground.style.display = 'flex'; // activate modal background
    }
};
const toggleState = (state) => {
    state.modals.preferences ?
        (state.modals.preferences = false) :
        (state.modals.preferences = true);
    state.modals.background ?
        (state.modals.background = false) :
        (state.modals.background = true);
};
const toggleVisibility = (state, avType) => {
    if (state.modals.preferences) {
        if (avType === 'audio')
            elements.modalParentAudio.style.display = 'flex'; // de-activate modal background
        elements.modalContainerAudio.style.display = 'flex';
        if (avType === 'video')
            elements.modalParentVideo.style.display = 'flex';
        elements.modalContainerVideo.style.display = 'flex';
        if (avType === 'warpstagram')
            elements.modalParentWarpstagram.style.display = 'flex';
        elements.modalContainerWarpstagram.style.display = 'flex';
    } else if (!state.modals.preferences) {
        elements.modalParentAudio.style.display = 'none'; // activate modal background
        elements.modalContainerAudio.style.display = 'none';
        elements.modalParentVideo.style.display = 'none';
        elements.modalContainerVideo.style.display = 'none';
        elements.modalParentWarpstagram.style.display = 'none';
        elements.modalContainerWarpstagram.style.display = 'none';
    }
};
const injectPrefsMarkup = (markup, activeTab) => {
    let modalContainerAudio = elements.modalContainerAudio; // selects target list to add item markup to
    let modalContainerVideo = elements.modalContainerVideo; // selects target list to add item markup to
    let modalContainerWarpstagram = elements.modalContainerWarpstagram; // selects target list to add item markup to
    let markupNodeAudio, markupNodeVideo, markupNodeWarpstagram;
    if (activeTab === 'audio') {
        markupNodeAudio = document.createElement('div'); // Create a new HTML Dom node inside download list
        markupNodeAudio.className = 'contentContainer';
        markupNodeAudio.innerHTML = markup;
        modalContainerAudio.appendChild(markupNodeAudio); // Append item node
        // markupNodeAudio.id = 'modalPrefsID';
    }
    if (activeTab === 'video') {
        markupNodeVideo = document.createElement('div'); // Create a new HTML Dom node inside download list
        markupNodeVideo.className = 'contentContainer';
        markupNodeVideo.innerHTML = markup;
        modalContainerVideo.appendChild(markupNodeVideo); // Append item node
        // markupNodeVideo.id = 'modalPrefsID';
    }
    if (activeTab === 'warpstagram') {
        markupNodeWarpstagram = document.createElement('div'); // Create a new HTML Dom node inside download list
        markupNodeWarpstagram.className = 'contentContainer';
        markupNodeWarpstagram.innerHTML = markup;
        modalContainerWarpstagram.appendChild(markupNodeWarpstagram); // Append item node
        // markupNodeWarpstagram.id = 'modalPrefsID';
    }
};
const showPanel = (modalType, avType) => {
    // console.log('hello');
    let modalPrefsContentPanel_audio = document.getElementById(
        'modalPrefsContentPanel_audio'
    );
    let modalPrefsContentPanel_video = document.getElementById(
        'modalPrefsContentPanel_video'
    );
    let modalPrefsContentPanel_warpstagram = document.getElementById(
        'modalPrefsContentPanel_warpstagram'
    );
    let modalPrefsContentPanel_general = document.getElementById(
        'modalPrefsContentPanel_general'
    );
    let modalPrefsContentPanel_license = document.getElementById(
        'modalPrefsContentPanel_license'
    );
    let modalPrefsContentPanel_ALL = [
        modalPrefsContentPanel_audio,
        modalPrefsContentPanel_video,
        modalPrefsContentPanel_warpstagram,
        modalPrefsContentPanel_general,
        modalPrefsContentPanel_license,
    ];
    if (avType === 'audio') {
        toggleAllPrefsPanels(
            modalPrefsContentPanel_ALL,
            modalPrefsContentPanel_audio
        );
    }
    if (avType === 'video') {
        toggleAllPrefsPanels(
            modalPrefsContentPanel_ALL,
            modalPrefsContentPanel_video
        );
    }
    if (avType === 'warpstagram') {
        toggleAllPrefsPanels(
            modalPrefsContentPanel_ALL,
            modalPrefsContentPanel_warpstagram
        );
    }
    if (avType === 'general') {
        toggleAllPrefsPanels(
            modalPrefsContentPanel_ALL,
            modalPrefsContentPanel_general
        );
    }
    if (avType === 'license') {
        toggleAllPrefsPanels(
            modalPrefsContentPanel_ALL,
            modalPrefsContentPanel_license
        );
    }
    toggleActiveModalNavClass(avType);
};
const showPanelInit = (modalType, avType) => {
    // console.log(avType);
    setTimeout(() => {
        showPanel(modalType, avType);
    }, 200);
};
const toggleAllPrefsPanels = (arr, panelToShow) => {
    for (i = 0; i < arr.length; i++) {
        arr[i].style.display = 'none';
    }
    panelToShow.style.display = 'flex';
};
const insertOutputFolderPaths = (storage) => {
    // console.log(storage.user.prefs);
    let outputPaths = {
        audio: storage.user.prefs.pathAudio,
        video: storage.user.prefs.pathVideo,
        warpstagram: storage.user.prefs.pathWarpstagram,
    };
    setTimeout(() => {
        document.getElementById('modalPrefsOutputFolder_audio').placeholder =
            outputPaths.audio;
        document.getElementById('modalPrefsOutputFolder_video').placeholder =
            outputPaths.video;
        document.getElementById(
            'modalPrefsOutputFolder_warpstagram'
        ).placeholder = outputPaths.warpstagram;
    }, 100);
};
const injectModalPrefsToCurrentSlide = (prefsMarkup, activeTab, storage) => {
    insertOutputFolderPaths(storage);
    injectPrefsMarkup(prefsMarkup, activeTab);
};
const removeActiveModalNavClass = () => {
    document
        .getElementById('modalPrefsNav_button_audio_ID')
        .classList.remove('modalPrefsNav_button_active');
    document
        .getElementById('modalPrefsNav_button_video_ID')
        .classList.remove('modalPrefsNav_button_active');
    document
        .getElementById('modalPrefsNav_button_warpstagram_ID')
        .classList.remove('modalPrefsNav_button_active');
    document
        .getElementById('modalPrefsNav_button_general_ID')
        .classList.remove('modalPrefsNav_button_active');
    document
        .getElementById('modalPrefsNav_button_license_ID')
        .classList.remove('modalPrefsNav_button_active');
};
const addActiveModalNavClass = (avType) => {
    if (avType === 'audio') {
        document
            .getElementById('modalPrefsNav_button_audio_ID')
            .classList.add('modalPrefsNav_button_active');
    }
    if (avType === 'video') {
        document
            .getElementById('modalPrefsNav_button_video_ID')
            .classList.add('modalPrefsNav_button_active');
    }
    if (avType === 'warpstagram') {
        document
            .getElementById('modalPrefsNav_button_warpstagram_ID')
            .classList.add('modalPrefsNav_button_active');
    }
    if (avType === 'general') {
        document
            .getElementById('modalPrefsNav_button_general_ID')
            .classList.add('modalPrefsNav_button_active');
    }
    if (avType === 'license') {
        document
            .getElementById('modalPrefsNav_button_license_ID')
            .classList.add('modalPrefsNav_button_active');
    }
};
const toggleActiveModalNavClass = (avType) => {
    removeActiveModalNavClass();
    addActiveModalNavClass(avType);
};
const removeAllInjectedModals = () => {
    let modals = document.getElementsByClassName('contentContainer');
    for (var key in modals) {
        if (modals.hasOwnProperty(key)) {
            modals[key].remove();
        }
    }
};
const setDropdown = (storage, dropdownID, startingSubstr) => {
    let i = -1;
    let index;
    for (var key in storage.user.prefs) {
        if (storage.user.prefs.hasOwnProperty(key)) {
            if (key.substr(0, startingSubstr.length) === startingSubstr) {
                i++;
                // console.log(key);
                if (storage.user.prefs[key]) {
                    // console.log(`${key} is ${storage.user.prefs[key]}`);
                    index = i;
                }
            }
        }
    }
    if (dropdownID.options[index]) {
        dropdownID.options[index].selected = true;
    }
};
const setDropdownsAll = (storage) => {
    const dropdownsObj = {
        audioQuality: document.getElementById('modalDropdown_audioQuality'),
        audioFormat: document.getElementById('modalDropdown_audioFormat'),
        videoQuality: document.getElementById('modalDropdown_videoQuality'),
        videoFormat: document.getElementById('modalDropdown_videoFormat'),
        warpstagram_update: document.getElementById(
            'modalDropdown_warpstagram_updateSelected'
        ),
        warpstagram_autoUpdateFreq: document.getElementById(
            'modalDropdown_warpstagram_autoUpdateFrequency'
        ),
        warpstagram_postSorting: document.getElementById(
            'modalDropdown_warpstagram_postSorting'
        ),
        general_theme: document.getElementById(
            'modalDropdown_general_theme'
        ),
        general_startupTab: document.getElementById(
            'modalDropdown_general_startupTab'
        ),
    };

    for (var key in dropdownsObj) {
        setDropdown(storage, dropdownsObj[key], key);
    }
};
const setCheckboxes = (storage) => {
    const checkboxObj = {
        checkbox_autostartWarp: document.getElementById(
            'modalPrefsCheckbox_autostartWarp_checkbox'
        ),
        checkbox_minimizeToTrayOnClose: document.getElementById(
            'modalPrefsCheckbox_minimizeToTrayOnClose_checkbox'
        ),
    };
    for (var key in checkboxObj) {
        if (storage.user.prefs[key]) {
            checkboxObj[key].checked = true;
        }
    }
};
const toggleModalPrefsVisibility = (storage, avType) => {
    let state = storage.state
    toggleBackground(state);
    toggleState(state);
    toggleVisibility(state, avType);
};
const updateInputOptions = (storage) => {
    setDropdownsAll(storage);
    setCheckboxes(storage);
    insertOutputFolderPaths(storage);
}
module.exports = {
    showPanel,
    showPanelInit,
    removeAllInjectedModals,
    injectModalPrefsToCurrentSlide,
    toggleModalPrefsVisibility,
    updateInputOptions,
};