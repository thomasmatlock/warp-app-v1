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

exports.modalBackgroundAdjust = (state, elements, startup) => {
    // de-activate modal background
    if (state.modals.preferences) {
        elements.modalBackground.style.display = 'none';
        // activate modal background
    } else if (!state.modals.preferences) {
        // if (startup.env.nav_A_active === 'audio')
        //     elements.modalBackgroundContainer.style.top = '0%';
        // if (startup.env.nav_A_active === 'video')
        //     elements.modalBackgroundContainer.style.top = '33.5%';
        // if (startup.env.nav_A_active === 'warpstagram')
        //     elements.modalBackgroundContainer.style.top = '67%';
        elements.modalBackground.style.display = 'flex';
    }
    state.modals.preferences ?
        (state.modals.preferences = false) :
        (state.modals.preferences = true); // toggles modals active or not
};

exports.remove = (state, elements) => {
    // console.log('removing modal');
    elements.modalBackground.style.display = 'none';
    this.toggleModalState(state);
};

exports.toggleModalState = (state) => {
    // console.log('toggling modal state');
    state.modals.preferences ?
        (state.modals.preferences = false) :
        (state.modals.preferences = true); // toggles modals active or not
};