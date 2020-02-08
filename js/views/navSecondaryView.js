import {
    elements
} from "./base.js";

import {
    navSecondaryTitles
} from "../models/config.js";

export const clearActive = () => {
    // GET ARRAY OF NAV TABS
    const tabsArr = Array.from(document.querySelectorAll(".nav_B-button"));

    // REMOVE ACTIVE CLASS FROM ALL TABS
    tabsArr.forEach(el => {
        el.classList.remove("nav_B-button-slide--active");
    });
}

// REPLACE NAVB TITLES DEPENDING ON WHICH NAV PRIMARY IS CLICKED
export const updateTitles = (nav_A_id) => {
    const nav_B_button_arr = [
        Array.from(document.querySelectorAll(".nav_B-button-slide-0")),
        Array.from(document.querySelectorAll(".nav_B-button-slide-1")),
        Array.from(document.querySelectorAll(".nav_B-button-slide-2")),
        Array.from(document.querySelectorAll(".nav_B-button-slide-3")),
    ]

    const navSecondaryTitlesv2 = [
        navSecondaryTitles.audio,
        navSecondaryTitles.video,
        navSecondaryTitles.audioTools,
        navSecondaryTitles.placeholder,
    ]
    // console.log(navSecondaryTitlesv2[0][0]);

    if (nav_A_id === 'nav_A_0') {
        replaceNavSecondaryTitles(nav_B_button_arr[0], navSecondaryTitlesv2[0]); // replaces old titles with new titles
    } else if (nav_A_id === 'nav_A_1') {
        replaceNavSecondaryTitles(nav_B_button_arr[1], navSecondaryTitlesv2[1]); // replaces old titles with new titles
    } else if (nav_A_id === 'nav_A_2') {
        replaceNavSecondaryTitles(nav_B_button_arr[2], navSecondaryTitlesv2[2]); // replaces old titles with new titles
    } else if (nav_A_id === 'nav_A_3') {
        replaceNavSecondaryTitles(nav_B_button_arr[3], navSecondaryTitlesv2[3]); // replaces old titles with new titles
    }
}

// USED ABOVE IN updateTitles
const replaceNavSecondaryTitles = (targetTabs, newTitles) => {
    let titlesCount = 0; // counter for number of titles

    // replaces old titles with new titles
    targetTabs.forEach(el => {
        el.textContent = `${newTitles[titlesCount]}`;
        titlesCount = titlesCount + 1;
    });
}


export const highlightSelected = (type, tabId) => {
    if (type === 'add') {
        let tab = document.getElementById(`${tabId}`);
        tab.classList.add('nav_B-button--active');
    } else if (type === 'remove') {
        let tab = document.getElementById(`${tabId}`);
        tab.classList.remove('nav_B-button--active');
    }
}

let containsSubStr;
let isActive;
export const checkForSubstring = (target, subString) => {
    const id = target.id;
    const text = target.textContent;
    return (text.includes(subString) ? containsSubStr = true : containsSubStr = false);
}

export const checkActive = (target, classString) => {
    return (target.className.includes(classString) ? isActive = true : isActive = false);
}

// if (text.includes(subString) && target.className.includes('active') === false) {
//     containsSubStr = false;
//     console.log(`contains substring: false`);
//     return containsSubStr;
// } else if (text.includes(subString) && target.className.includes('active') === true) {
//     console.log(`contains substring: true`);
//     containsSubStr = true;
//     return containsSubStr;
// }



// if (target.className.includes('active')) {
//     console.log(`ACTIVE`);
//     containsSubStr = true;
// } else if (target.className.includes(`active`) === false) {
//     console.log(`NOT ACTIVE`);
// }