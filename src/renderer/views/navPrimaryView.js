// import { elements } from './base.js';
const logging = true;
const elements = require('./elements');

exports.clearActive = () => {
    // GET ARRAY OF NAV TABS
    // const tabsArr = Array.from(document.querySelectorAll('.nav_A_tab'));
    // console.log(elements.nav_A_buttonArr);

    // REMOVE ACTIVE CLASS FROM ALL TABS
    elements.nav_A_buttonArr.forEach((el) => {
        el.classList.remove('nav_A_tab--active');
        // console.log('Active class removed from navA tabs');
    });
};

exports.highlightSelected = (id) => {
    // Add active class to selected tabs
    const tab = document.getElementById(`${id}`);
    tab.classList.add('nav_A_tab--active');
    // console.log('Active class added to navA tabs');
};