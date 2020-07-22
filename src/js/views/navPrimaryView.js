// import { elements } from './base.js';

const navSecondaryTitles = require('../models/config');

exports.clearActive = () => {
    // GET ARRAY OF NAV TABS
    const tabsArr = Array.from(document.querySelectorAll('.nav_A-tab'));

    // REMOVE ACTIVE CLASS FROM ALL TABS
    tabsArr.forEach((el) => {
        el.classList.remove('nav_A-tab--active');
    });
};

exports.highlightSelected = (id) => {
    // Add active class to selected tabs
    const tab = document.getElementById(`${id}`);
    tab.classList.add('nav_A-tab--active');
};