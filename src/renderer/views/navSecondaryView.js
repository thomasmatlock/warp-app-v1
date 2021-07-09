const elements = require('./elements');

const clearActive = () => {
    elements.nav_B_buttonArr.forEach((el) => {
        el.classList.remove('nav_B_button-slide--active');
    });
};

const highlightSelected = (type, tabId) => {
    if (type === 'add') {
        let tab = document.getElementById(`${tabId}`);
        tab.classList.add('nav_B_button--active');
    } else if (type === 'remove') {
        let tab = document.getElementById(`${tabId}`);
        tab.classList.remove('nav_B_button--active');
    }
};

let containsSubStr;
let isActive;
const checkForSubstring = (target, subString) => {
    const id = target.id;
    const text = target.textContent;
    return text.includes(subString) ?
        (containsSubStr = true) :
        (containsSubStr = false);
};

const checkActive = (target, classString) => {
    return target.className.includes(classString) ?
        (isActive = true) :
        (isActive = false);
};
const removeNavBActivateBtn = (storage) => {
    if (storage.user.audio === 'pro')
        elements.nav_B_button_audio_activate.style.display = 'none';
    if (storage.user.video === 'pro')
        elements.nav_B_button_video_activate.style.display = 'none';
}

module.exports = {
    clearActive: clearActive,
    highlightSelected: highlightSelected,
    checkForSubstring: checkForSubstring,
    checkActive: checkActive,
    removeNavBActivateBtn: removeNavBActivateBtn,
}