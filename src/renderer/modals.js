// EULA, modalEULA
//////////////////////////////////////////////////////////////// Activation music/audio
// modalActivationAudio
// modalActivationVideo
// modalActivationWarpstagram
// Video Smart Mode // MODAL
// Video Subscriptions // HTML
//////////////////////////////////////////////////////////////// Preferences
// MODAL
// Preferences modal, 2 tabs, [Downloader, Warpstagram], both have side navs,
// Preferences,  either separate frameless window, or like in that
// Preferences, General
// Preferences, Connection
// Preferences, Notifications
//////////////////////////////////////////////////////////////// Welcome
const fs = require('fs').promises;
let elements = require('./views/elements');

const toggleBackground = (state, elements) => {
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

const togglePreferences = (state, elements, avType) => {
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

async function readMarkup() {
    let modalMarkupPreferences;
    const data = await fs.readFile(
        `${__dirname}/modalMarkupPreferences.html`,
        'binary'
    );
    modalMarkupPreferences = new Buffer(data).toString();
    insertMarkupPrefs(modalMarkupPreferences);
    return modalMarkupPreferences;
}

const insertMarkupPrefs = (markup) => {
    let modalContainerAudio = elements.modalContainerAudio; // selects target list to add item markup to
    let modalContainerVideo = elements.modalContainerVideo; // selects target list to add item markup to
    let modalContainerWarpstagram = elements.modalContainerWarpstagram; // selects target list to add item markup to
    let markupNodeAudio = document.createElement('div'); // Create a new HTML Dom node inside download list
    let markupNodeVideo = document.createElement('div'); // Create a new HTML Dom node inside download list
    let markupNodeWarpstagram = document.createElement('div'); // Create a new HTML Dom node inside download list
    markupNodeAudio.className = 'contentContainer';
    markupNodeVideo.className = 'contentContainer';
    markupNodeWarpstagram.className = 'contentContainer';
    markupNodeAudio.innerHTML = markup;
    markupNodeVideo.innerHTML = markup;
    markupNodeWarpstagram.innerHTML = markup;
    modalContainerAudio.appendChild(markupNodeAudio); // Append item node
    modalContainerVideo.appendChild(markupNodeVideo); // Append item node
    modalContainerWarpstagram.appendChild(markupNodeWarpstagram); // Append item node
};

const toggleComponents = (modalType, avType) => {
    if (avType === 'audio') {
        document.getElementById('modalPrefsContentPanel_audio').style.display =
            'flex';
        document.getElementById('modalPrefsContentPanel_video').style.display =
            'none';
        document.getElementById(
            'modalPrefsContentPanel_warpstagram'
        ).style.display = 'none';
    }
    if (avType === 'video') {
        document.getElementById('modalPrefsContentPanel_audio').style.display =
            'none';
        document.getElementById('modalPrefsContentPanel_video').style.display =
            'flex';
        document.getElementById(
            'modalPrefsContentPanel_warpstagram'
        ).style.display = 'none';
    }

    if (avType === 'warpstagram') {
        document.getElementById('modalPrefsContentPanel_audio').style.display =
            'none';
        document.getElementById('modalPrefsContentPanel_video').style.display =
            'none';
        document.getElementById(
            'modalPrefsContentPanel_warpstagram'
        ).style.display = 'flex';
    }
    toggleActiveModalNavClass(avType);
};
const toggleComponentsInit = (modalType, avType) => {
    setTimeout(() => {
        toggleComponents(modalType, avType);
    }, 200);
};

const insertOutputFolderPaths = (pathsObj) => {
    setTimeout(() => {
        document.getElementById('modalPrefsOutputFolder_audio').placeholder =
            pathsObj.audio;
        document.getElementById('modalPrefsOutputFolder_video').placeholder =
            pathsObj.video;
        document.getElementById(
            'modalPrefsOutputFolder_warpstagram'
        ).placeholder = pathsObj.warpstagram;
    }, 100);
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
    console.log(avType);
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

const markupPrefs = (pathsObj) => {
    readMarkup();
    insertOutputFolderPaths(pathsObj);
};

module.exports = {
    readMarkup: readMarkup,
    toggleBackground: toggleBackground,
    toggleModalState: toggleModalState,
    togglePreferences: togglePreferences,
    insertMarkupPrefs: insertMarkupPrefs,
    markupPrefs: markupPrefs,
    toggleComponents: toggleComponents,
    toggleComponentsInit: toggleComponentsInit,
};