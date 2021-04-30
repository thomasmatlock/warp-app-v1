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
// const fs = require('fs');
const fs = require('fs').promises;

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
    // console.log(avType);
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
        // if (avType === 'audio')
        elements.modalParentAudio.style.display = 'none'; // activate modal background
        elements.modalContainerAudio.style.display = 'none';
        // if (avType === 'video')
        elements.modalParentVideo.style.display = 'none';
        elements.modalContainerVideo.style.display = 'none';
        // if (avType === 'warpstagram')
        elements.modalParentWarpstagram.style.display = 'none';
        elements.modalContainerWarpstagram.style.display = 'none';
    }
};

let modalMarkupPreferences;

async function readMarkup() {
    const data = await fs.readFile(
        `${__dirname}/modalMarkupPreferences.html`,
        'binary'
    );
    modalMarkupPreferences = new Buffer(data).toString();
    // console.log(modalMarkupPreferences);
    return new Buffer(data);
}

// module.exports.modals = readMarkup;
module.exports = {
    readMarkup: readMarkup,
    toggleBackground: toggleBackground,
    toggleModalState: toggleModalState,
    togglePreferences: togglePreferences,
};