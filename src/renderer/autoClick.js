const startupReq = require('../js/system/startup');
const startup = new startupReq();
let elements = require('./views/elements');

exports.nav_A = (tab) => {
    if (tab === 'audio') elements.nav_A_audio.click(); // clicks audio tab
    if (tab === 'video') elements.nav_A_video.click(); // clicks audio tab
    if (tab === 'warpstagram') elements.nav_A_warpstagram.click(); // clicks audio tab
};
exports.nav_B = (nav_A_active, button) => {
    if (nav_A_active === 'audio') {
        elements.testClassAudio.click();
        console.log('audio paste clicked');
    }
    if (nav_A_active === 'video') {
        elements.testClassVideo.click();
        console.log('video paste clicked');
    }
};