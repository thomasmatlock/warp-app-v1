// import { elements } from './base.js';

const elements = require('./base');

exports.clearActive = () => {
    // GET ARRAY OF NAV TABS
    // const tabsArr = Array.from(document.querySelectorAll('.nav_A-tab'));
    // console.log(elements.nav_A_tabArr);

    // REMOVE ACTIVE CLASS FROM ALL TABS
    elements.nav_A_tabArr.forEach((el) => {
        el.classList.remove('nav_A-tab--active');
        // console.log('Active class removed from navA tabs');
    });
};

exports.highlightSelected = (id) => {
    // Add active class to selected tabs
    const tab = document.getElementById(`${id}`);
    tab.classList.add('nav_A-tab--active');
    // console.log('Active class added to navA tabs');
};