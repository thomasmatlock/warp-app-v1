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

const logging = false;

exports.modalPreferencesAdjust = (state, elements, startup) => {
    if (state.modals.preferences) {
        elements.modalPreferences.style.display = 'none';
    } else if (!state.modals.preferences) {
        if (startup.env.nav_A_active === 'audio')
            elements.modalPreferencesContainer.style.top = '0%';
        if (startup.env.nav_A_active === 'video')
            elements.modalPreferencesContainer.style.top = '33.5%';
        if (startup.env.nav_A_active === 'warpstagram')
            elements.modalPreferencesContainer.style.top = '67%';
        elements.modalPreferences.style.display = 'flex';
    }
    state.modals.preferences ?
        (state.modals.preferences = false) :
        (state.modals.preferences = true); // toggles modals active or not
};