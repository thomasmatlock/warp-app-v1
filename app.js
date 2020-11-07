/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const { clipboard, ipcRenderer } = require('electron');
const elements = require('./src/js/views/base');
// import * as navPrimaryView from './views/navPrimaryView.js';
const navPrimaryView = require('./src/js/views/navPrimaryView.js');
const navSecondaryView = require('./src/js/views/navSecondaryView.js');
const listView = require('./src/js/views/listView.js');
// const navTitles = require('./src/js/models/config.js');
const Nav = require('./src/js/models/Nav.js');
// const validate = require;

let state = {};
let nav_A_active;
state.nav = new Nav();
state.nav.nav_A = [];
console.log(nav_A_active);

// STATE CONTROLLER
const init = () => {
    state.nav.nav_A[nav_A_active] = true;
    // elements.nav_A_3.style.classList.add('nav_A-tab--active');
    console.log(`${nav_A_active} is active: ${state.nav.nav_A[nav_A_active]}`);
};
init();
// console.log(typeof elements);

// elements.nav_A_0.addEventListener('click', (e) => {
//     console.log(e);
//     // console.log('You clicked');
// });

// Nav A LISTENERS
elements.nav_A.addEventListener('click', (e) => {
    // GETS CLICK EVENT TARGET
    const target = e.target;
    const id = target.id;
    nav_A_active = id;
    // console.log(id);

    if (id) {
        state.nav.updateActiveNav_A(id);
        navSecondaryView.updateTitles(id); // updateTitles NEEDS WORK
        // changeNavB_listener(id);
    }

    // 	CLEARS ACTIVE AND ADDS IT TO SELECTED TAB
    navPrimaryView.clearActive();
    navPrimaryView.highlightSelected(id);

    navSecondaryView.clearActive();

    const nav_B_actives = state.nav.nav_B[nav_A_active];

    for (var key in nav_B_actives) {
        if (nav_B_actives.hasOwnProperty(key) && nav_B_actives[key] === true) {
            // console.log(key + " is " + nav_B_actives[key]);
            navSecondaryView.highlightSelected('add', key);
        }
    }
});

// elements.nav_B0.addEventListener('click', (e) => {
//     // nav_B_sequence(e);
//     console.log('You clicked');
// });
// elements.nav_B1.addEventListener('click', (e) => {
//     // nav_B_sequence(e);
//     console.log('You clicked');
// });
// elements.nav_B2.addEventListener('click', (e) => {
//     // nav_B_sequence(e);
//     console.log('You clicked');
// });
// elements.nav_B3.addEventListener('click', (e) => {
//     // nav_B_sequence(e);
//     console.log('You clicked');
// });

const validateURL = (url) => {
    // Regex pattern
    const pattArr = [
        /facebook/i,
        /instagram/i,
        /soundcloud/i,
        /twitch/i,
        /twitter/i,
        /vimeo/i,
        /youtube/i,
    ];
    let pattMatchIndex;
    // check url against each pattern
    let pattMatchInded = pattArr.forEach(function(item, index) {
        if (url.match(item)) {
            pattMatchIndex = index;
            return;
        } else {
            // console.log(`${item} is not a match`);
        }
    });

    console.log(pattArr[pattMatchIndex]);
};

const audioController = (audio, sourceType) => {};
const videoController = (video, sourceType) => {};