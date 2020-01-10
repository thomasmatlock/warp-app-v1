document.querySelector('.test_add_item').addEventListener('click', e => { // PRODUCTION MODE
    // e.preventDefault(); // prevents page from reloading on click submit button
    console.log('Hi there');
    listView.renderItem();
});

// document.querySelector('.test_remove_item').addEventListener('click', e => { // PRODUCTION MODE
//     // e.preventDefault(); // prevents page from reloading on click submit button
//     // console.log('Hi there');
//     listView.deleteItem();
// });


import * as navPrimaryView from './views/navPrimaryView.js';
import * as navSecondaryView from './views/navSecondaryView.js';
import * as listView from './views/listView.js';
import * as navTitles from './models/config.js';

console.log(navTitles.navSecondaryTitles.audio[0]); // TEST

import {
    elements
} from './views/base.js';

/** 
 * NAV PRIMARY CONTROLLER
 */
elements.primaryNavTabs.addEventListener('click', e => { // PRODUCTION MODE
    // GETS CLICK EVENT TARGET
    const target = e.target;

    // while(target && !target.id) target = target.parentNode;


    if (target) {
        console.log("You clicked element #" + target.id);
    }

    const id = target.id;

    highlightSelected(id);
});

const highlightSelected = id => {
    // GET ARRAY OF NAV TABS
    const tabsArr = Array.from(document.querySelectorAll('.primary-nav-tab'));

    // REMOVE ACTIVE CLASS FROM ALL TABS
    tabsArr.forEach(el => {
        el.classList.remove('primary-nav-tab--active');
    });

    // Add active class to selected tabs
    document.querySelector(`.primary-nav-tab[href*="${id}"]`).classList.add('primary-nav-tab--active');
};

/** 
 * NAV SECONDARY CONTROLLER
 */

/** 
 * LIST CONTROLLER
 */