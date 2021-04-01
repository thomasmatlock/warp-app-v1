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

// REPLACE NAVB TITLES DEPENDING ON WHICH NAV PRIMARY IS CLICKED
exports.updateTitles = (nav_A_id) => {
    const nav_B_button_arr = [
        Array.from(document.querySelectorAll('.nav_B_button-slide-audio')),
        Array.from(document.querySelectorAll('.nav_B_button-slide-video')),
        Array.from(document.querySelectorAll('.nav_B_button-slide-2')),
        Array.from(
            document.querySelectorAll('.nav_B_button-slide-warpstagram')
        ),
    ];

    const navSecondaryTitlesv2 = [
        navSecondaryTitles.audio,
        navSecondaryTitles.video,
        navSecondaryTitles.audioTools,
        navSecondaryTitles.placeholder,
    ];
    // console.log(navSecondaryTitlesv2[0][0]);

    if (nav_A_id === 'nav_A_audio') {
        replaceNavSecondaryTitles(nav_B_button_arr[0], navSecondaryTitlesv2[0]); // replaces old titles with new titles
    } else if (nav_A_id === 'nav_A_video') {
        replaceNavSecondaryTitles(nav_B_button_arr[1], navSecondaryTitlesv2[1]); // replaces old titles with new titles
    } else if (nav_A_id === 'nav_A_warpstagram') {
        replaceNavSecondaryTitles(nav_B_button_arr[2], navSecondaryTitlesv2[2]); // replaces old titles with new titles
    } else if (nav_A_id === 'nav_A_3') {
        replaceNavSecondaryTitles(nav_B_button_arr[3], navSecondaryTitlesv2[3]); // replaces old titles with new titles
    }
};

// USED ABOVE IN updateTitles
const replaceNavSecondaryTitles = (targetTabs, newTitles) => {
    let titlesCount = 0; // counter for number of titles

    // replaces old titles with new titles
    targetTabs.forEach((el) => {
        // el.textContent = `${newTitles[titlesCount]}`;
        titlesCount = titlesCount + 1;
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