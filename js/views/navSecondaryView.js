import {
    elements
} from "./base.js";

import {
    navSecondaryTitles
} from "../models/config.js";

export const updateNavSecondaryTitles = (navPrimaryId) => {
    // console.log(navPrimaryId);
    if (navPrimaryId === 'tab-0') {
        // get array of nav secondary tabs
        const navSecondaryTitlesArr = Array.from(document.querySelectorAll(".nav-secondary-tab"));

        // titles and counter to used when we loop through the nav2 elements
        const titles = navSecondaryTitles.audio; // saves array of audio nav titles
        let titlesCount = 0; // counter for number of titles

        //  nav secondary titles

        navSecondaryTitlesArr.forEach(el => {

            el.textContent = `${titles[titlesCount]}`;
            titlesCount = titlesCount + 1;

        });
    } else if (navPrimaryId === 'tab-1') {
        // get array of nav secondary tabs
        const navSecondaryTitlesArr = Array.from(document.querySelectorAll(".nav-secondary-tab"));

        // titles and counter to used when we loop through the nav2 elements
        const titles = navSecondaryTitles.video; // saves array of audio nav titles
        let titlesCount = 0; // counter for number of titles

        //  nav secondary titles
        navSecondaryTitlesArr.forEach(el => {

            el.textContent = `${titles[titlesCount]}`;
            titlesCount = titlesCount + 1;

        });
    } else if (navPrimaryId === 'tab-2') {
        // get array of nav secondary tabs
        const navSecondaryTitlesArr = Array.from(document.querySelectorAll(".nav-secondary-tab"));

        // titles and counter to used when we loop through the nav2 elements
        const titles = navSecondaryTitles.audioTools; // saves array of audio nav titles
        let titlesCount = 0; // counter for number of titles

        //  nav secondary titles
        navSecondaryTitlesArr.forEach(el => {

            el.textContent = `${titles[titlesCount]}`;
            titlesCount = titlesCount + 1;
        });
    }
}


export const highlightSelected = (type, tabId) => {
    if (type === 'add') {
        let tab = document.getElementById(`${tabId}`);
        tab.classList.add('nav-secondary-tab--active');
    } else if (type === 'remove') {
        let tab = document.getElementById(`${tabId}`);
        tab.classList.remove('nav-secondary-tab--active');
    }
}

// export const removeHighlightSelected = () => {
//     let tab = document.getElementById('tab-b');
//     tab.classList.remove('nav-secondary-tab--active');
// }