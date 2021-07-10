const defaultsReq = require('../js/defaults');
const defaults = new defaultsReq();
let elements = require('./views/elements');

const click_nav_A = (tab) => {
    if (defaults.dev.autoClickNavA_active) {
        if (tab === 'audio') elements.nav_A_audio.click(); // clicks audio tab
        if (tab === 'video') elements.nav_A_video.click(); // clicks audio tab
        if (tab === 'warpstagram') elements.nav_A_warpstagram.click(); // clicks audio tab
    }
};
const clickElement = (element) => {
    element.click();
};
const openModalPrefs = (storage) => {
    setTimeout(() => {
        if (!defaults.dev.autoOpenModalPrefs) {
            prefsView.toggleModalPrefsVisibility(storage.state, 'warpstagram');
            click_nav_B(storage.state.activeTab, 'preferences');
        }
        if (defaults.dev.autoOpenModalPrefs)
            click_nav_B(storage.state.activeTab, 'preferences');
    }, 100);
};
const click_nav_B = (nav_A_active, button) => {
    if (nav_A_active === 'audio') {
        if (defaults.dev.autoClick) {
            if (button === 'paste') {
                elements.nav_B_button_audio_paste.click();
            }
            if (button === 'showModal') {
                elements.nav_B_button_audio_showModal.click();
            }
            if (button === 'closeModal') {
                elements.nav_B_button_audio_closeModal.click();
            }
            if (button === 'activate') {
                elements.nav_B_button_audio_activate.click();
            }
            if (button === 'preferences') {
                elements.nav_B_button_audio_preferences.click();
            }
            if (button === 'help') {
                elements.nav_B_button_audio_help.click();
            }
        }
    }
    if (nav_A_active === 'video') {
        if (defaults.dev.autoClick) {
            if (button === 'paste') {
                elements.nav_B_button_video_paste.click();
            }
            if (button === 'smartMode') {
                elements.nav_B_button_video_smartMode.click();
            }
            if (button === 'activate') {
                elements.nav_B_button_video_activate.click();
            }
            if (button === 'subscriptions') {
                elements.nav_B_button_video_subscriptions.click();
            }
            if (button === 'preferences') {
                elements.nav_B_button_video_preferences.click();
            }
            if (button === 'help') {
                elements.nav_B_button_video_help.click();
            }
        }
    }
};
module.exports = {
    click_nav_A,
    click_nav_B,
    clickElement,
    openModalPrefs,
}