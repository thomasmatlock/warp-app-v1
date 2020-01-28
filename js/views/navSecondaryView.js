import {
    elements
} from "./base.js";

import {
    navSecondaryTitles
} from "../models/config.js";

export const clearActive = () => {
    // GET ARRAY OF NAV TABS
    const tabsArr = Array.from(document.querySelectorAll(".nav_B-tab"));

    // REMOVE ACTIVE CLASS FROM ALL TABS
    tabsArr.forEach(el => {
        el.classList.remove("nav_B-tab--active");
    });
}

// REPLACE NAVB TITLES DEPENDING ON WHICH NAV PRIMARY IS CLICKED
export const updateTitles = (navPrimaryId) => {
    // console.log(navPrimaryId);
    if (navPrimaryId === 'nav_A_0') {

        const navSecondaryTitlesArr = Array.from(document.querySelectorAll(".nav_B-tab-0")); // creates array of current tabs to target for title replacement
        const titles = navSecondaryTitles.audio; // saves array of new nav titles
        replaceNavSecondaryTitles(navSecondaryTitlesArr, titles); // replaces old titles with new titles

    } else if (navPrimaryId === 'nav_A_1') {

        const navSecondaryTitlesArr = Array.from(document.querySelectorAll(".nav_B-tab-1")); // creates array of current tabs to target for title replacement
        const titles = navSecondaryTitles.video; // saves array of new nav titles
        replaceNavSecondaryTitles(navSecondaryTitlesArr, titles); // replaces old titles with new titles

    } else if (navPrimaryId === 'nav_A_2') {

        const navSecondaryTitlesArr = Array.from(document.querySelectorAll(".nav_B-tab-2")); // creates array of current tabs to target for title replacement
        const titles = navSecondaryTitles.audioTools; // saves array of new nav titles
        replaceNavSecondaryTitles(navSecondaryTitlesArr, titles); // replaces old titles with new titles

    } else if (navPrimaryId === 'nav_A_3') {

        const navSecondaryTitlesArr = Array.from(document.querySelectorAll(".nav_B-tab-3")); // creates array of current tabs to target for title replacement
        const titles = navSecondaryTitles.placeholder; // saves array of new nav titles
        replaceNavSecondaryTitles(navSecondaryTitlesArr, titles); // replaces old titles with new titles

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


export const toggleHighlightSelected = (type, tabId) => {
    if (type === 'add') {
        let tab = document.getElementById(`${tabId}`);
        tab.classList.add('nav_B-tab--active');
    } else if (type === 'remove') {
        let tab = document.getElementById(`${tabId}`);
        tab.classList.remove('nav_B-tab--active');
    }
}

export const checkForSubstring = (target, subString) => {
    // const id = target.id;
    const text = target.textContent;

    const nav_B_test_placeholder = 'nav_B_1'; //test
    if (text.includes(subString) && target.className.includes('active') === false) {
        toggleHighlightSelected('add', nav_B_test_placeholder);
    } else if (text.includes(subString) && target.className.includes('active') === true) {
        toggleHighlightSelected('remove', nav_B_test_placeholder);
    }
}