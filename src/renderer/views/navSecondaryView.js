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
const getID = (e) => {
    if (e.target.tagName === 'DIV') return e.target.parentElement.id; // returns id if user clicks div element
    if (e.target.tagName === 'A') return e.target.id; // returns id if user clicks anchor element
    if (e.target.tagName === 'P') return e.target.parentNode.parentNode.id; // returns id if user clicks paragraph element
    if (e.target.tagName === 'I') return e.target.parentNode.parentNode.id; // returns id if user clicks icon element
}

const init = (storageReceived) => {
    removeNavBActivateBtn(storageReceived)
}

const router = () => {}
module.exports = {
    clearActive,
    highlightSelected,
    checkForSubstring,
    checkActive,
    removeNavBActivateBtn,
    getID,
    router,
    init,
}