const logging = true;
const navSecondaryTitles = {};
const elements = require('./elements');

exports.clearActive = () => {
    // GET ARRAY OF NAV TABS
    // const tabsArr = Array.from(document.querySelectorAll('.nav_B_button'));
    // console.log(elements.nav_B_buttonArr);
    // REMOVE ACTIVE CLASS FROM ALL TABS
    elements.nav_B_buttonArr.forEach((el) => {
        el.classList.remove('nav_B_button-slide--active');
    });
};

exports.highlightSelected = (type, tabId) => {
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
exports.checkForSubstring = (target, subString) => {
    const id = target.id;
    const text = target.textContent;
    return text.includes(subString) ?
        (containsSubStr = true) :
        (containsSubStr = false);
};

exports.checkActive = (target, classString) => {
    return target.className.includes(classString) ?
        (isActive = true) :
        (isActive = false);
};

// exports.toggleHighlight = (id) => {
//     console.log(`toggling highlight on ${id}`);
//     let tab = document.getElementById(`${id}`);
//     tab.classList.add('nav_B_button--active');
// };