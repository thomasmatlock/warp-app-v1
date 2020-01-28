import {
    elements
} from "./base.js";

import {
    navSecondaryTitles
} from "../models/config.js";

export const updateNavSecondaryTitles = (navPrimaryId) => {
    // console.log(navPrimaryId);
    if (navPrimaryId === 'nav_A_00') {

        const navSecondaryTitlesArr = Array.from(document.querySelectorAll(".nav_B-tab-0")); // creates array of current tabs to target for title replacement
        const titles = navSecondaryTitles.audio; // saves array of new nav titles
        replaceNavSecondaryTitles(navSecondaryTitlesArr, titles); // replaces old titles with new titles

    } else if (navPrimaryId === 'nav_A_01') {

        const navSecondaryTitlesArr = Array.from(document.querySelectorAll(".nav_B-tab-1")); // creates array of current tabs to target for title replacement
        const titles = navSecondaryTitles.video; // saves array of new nav titles
        replaceNavSecondaryTitles(navSecondaryTitlesArr, titles); // replaces old titles with new titles

    } else if (navPrimaryId === 'nav_A_02') {

        const navSecondaryTitlesArr = Array.from(document.querySelectorAll(".nav_B-tab-2")); // creates array of current tabs to target for title replacement
        const titles = navSecondaryTitles.audioTools; // saves array of new nav titles
        replaceNavSecondaryTitles(navSecondaryTitlesArr, titles); // replaces old titles with new titles

    } else if (navPrimaryId === 'nav_A_03') {

        const navSecondaryTitlesArr = Array.from(document.querySelectorAll(".nav_B-tab-3")); // creates array of current tabs to target for title replacement
        const titles = navSecondaryTitles.placeholder; // saves array of new nav titles
        replaceNavSecondaryTitles(navSecondaryTitlesArr, titles); // replaces old titles with new titles

    }
}

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