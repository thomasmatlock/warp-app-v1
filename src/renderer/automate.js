const startupReq = require('../js/system/startup');
const startup = new startupReq();
let elements = require('./views/elements');

exports.click_nav_A = (tab) => {
    if (startup.dev.autoClickNavA_active) {
        if (tab === 'audio') elements.nav_A_audio.click(); // clicks audio tab
        if (tab === 'video') elements.nav_A_video.click(); // clicks audio tab
        if (tab === 'warpstagram') elements.nav_A_warpstagram.click(); // clicks audio tab
    }
};
exports.click_nav_B = (nav_A_active, button) => {
    if (nav_A_active === 'audio') {
        if (startup.dev.autoClickPaste) {
            elements.testClassAudio.click();
        }
    }
    if (nav_A_active === 'video') {
        if (startup.dev.autoClickPaste) {
            elements.testClassVideo.click();
        }
    }
};