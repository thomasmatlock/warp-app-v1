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

exports.toggleBackground = (state, elements) => {
    if (state.modals.preferences) {
        elements.modalBackground.style.display = 'none'; // de-activate modal background
    } else if (!state.modals.preferences) {
        elements.modalBackground.style.display = 'flex'; // activate modal background
    }
};
exports.togglePreferences = (state, elements, avType) => {
    if (state.modals.preferences) {
        if (avType === 'audio') elements.modalParent.style.display = 'flex'; // de-activate modal background
        elements.modalContainerAudio.style.display = 'flex'; // de-activate modal background
    } else if (!state.modals.preferences) {
        if (avType === 'audio') elements.modalParent.style.display = 'none'; // activate modal background
        elements.modalContainerAudio.style.display = 'none'; // activate modal background
    }
};
exports.toggleModalState = (state) => {
    state.modals.preferences ?
        (state.modals.preferences = false) :
        (state.modals.preferences = true);
};