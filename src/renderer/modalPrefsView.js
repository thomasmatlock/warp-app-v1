// EULA, modalEULA
//////////////////////////////////////////////////////////////// Activation music/audio
// modalActivationAudio
// modalActivationVideo
// modalActivationWarpstagram
// Video Smart Mode // MODAL
// Video Subscriptions // HTML
//////////////////////////////////////////////////////////////// Preferences
//////////////////////////////////////////////////////////////// Welcome
const fs = require('fs').promises;
let elements = require('./views/elements');

const toggleBackground = (state) => {
    if (state.modals.preferences) {
        elements.modalBackground.style.display = 'none'; // de-activate modal background
    } else if (!state.modals.preferences) {
        elements.modalBackground.style.display = 'flex'; // activate modal background
    }
};
const toggleModalState = (state) => {
    state.modals.preferences ?
        (state.modals.preferences = false) :
        (state.modals.preferences = true);
};
const togglePreferences = (state, avType) => {
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
async function readMarkup(avType) {
    let modalMarkupPreferences;
    const data = await fs.readFile(
        `${__dirname}/modalPrefsMarkup.html`,
        'binary'
    );
    modalMarkupPreferences = new Buffer(data).toString();
    injectPrefsMarkup(modalMarkupPreferences, avType);
    // console.log(modalMarkupPreferences);
    return modalMarkupPreferences;
}
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
const injectPrefsModalToCurrentSlide = (prefsMarkup, activeTab, storage) => {
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
// WWW.JAVASCRIPTTUTORIAL.NET/JAVASCRIPT-DOM/JAVASCRIPT-CHECKBOX/
const toggleToggleBtn = (storage) => {
    for (var key in storage.user.prefs) {
        if (storage.user.prefs.hasOwnProperty(key)) {
            if (key.substr(0, 7) === 'toggle_') {
                if (storage.user.prefs[key]) {
                    console.log(`${key} is ${storage.user.prefs[key]}`);
                }
            }
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
                    // console.log(i);
                }
            }
        }
    }
    // console.log(dropdownID);
    console.log(dropdownID.options[index]);
    // console.log(dropdownID.options);
    if (dropdownID.options[index]) {
        dropdownID.options[index].selected = true;
    }
};
const setDropdownsAll = (storage) => {
    const dropdownsObj = {
        audioQuality: document.getElementById(
            'modalDropdownList_list_audio_Quality'
        ),
        audioFormat: document.getElementById(
            'modalDropdownList_list_audio_Format'
        ),
        videoQuality: document.getElementById(
            'modalDropdownList_list_video_quality'
        ),
        videoFormat: document.getElementById(
            'modalDropdownList_list_videoFormat'
        ),
        warpstagram_update: document.getElementById(
            'modalDropdownList_list_warpstagram_updateSelected'
        ),
        warpstagram_autoUpdateFreq: document.getElementById(
            'modalDropdownList_list_warpstagram_autoUpdateFrequency'
        ),
        warpstagram_postSorting: document.getElementById(
            'modalDropdownList_list_warpstagram_postSorting'
        ),
        generalSettings_theme: document.getElementById(
            'modalDropdownList_list_generalSettings_theme'
        ),
        generalSettings_startupTab: document.getElementById(
            'modalDropdownList_list_generalSettings_startupTab'
        ),
    };

    for (var key in dropdownsObj) {
        // console.log(key);
        setDropdown(storage, dropdownsObj[key], key);
    }
};

const setCheckboxes = (storage) => {
    const checkboxObj = {
        toggle_autostartWarp: document.getElementById(
            'modalPrefsToggleButton_autostartWarp_checkbox'
        ),
        toggle_minimizeToTrayOnClose: document.getElementById(
            'modalPrefsToggleButton_minimizeToTrayOnClose_checkbox'
        ),
        // toggle_themeDark: document.getElementById(
        //     'modalPrefsToggleButton_themeDark_checkbox'
        // ),
    };
    for (var key in checkboxObj) {
        // console.log(key);
        if (storage.user.prefs[key]) {
            // console.log(storage.user.prefs[key]);
            checkboxObj[key].checked = true;
        }
    }
};

const toggleModal = (state, avType) => {
    toggleBackground(state);
    toggleModalState(state);
    togglePreferences(state, avType);
};
module.exports = {
    readMarkup: readMarkup,
    toggleBackground: toggleBackground,
    toggleModalState: toggleModalState,
    togglePreferences: togglePreferences,
    injectPrefsMarkup: injectPrefsMarkup,
    insertOutputFolderPaths: insertOutputFolderPaths,
    showPanel: showPanel,
    showPanelInit: showPanelInit,
    removeAllInjectedModals: removeAllInjectedModals,
    injectPrefsModalToCurrentSlide: injectPrefsModalToCurrentSlide,
    toggleModal: toggleModal,
    toggleToggleBtn: toggleToggleBtn,
    setDropdown: setDropdown,
    setDropdownsAll: setDropdownsAll,
    setCheckboxes: setCheckboxes,
};