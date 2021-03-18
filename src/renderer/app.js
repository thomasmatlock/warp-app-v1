/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable one-var */

const { clipboard, ipcRenderer } = require('electron');
const elements = require('./views/elements');
const navPrimaryView = require('./views/navPrimaryView.js');
const navSecondaryView = require('./views/navSecondaryView.js');
const listView = require('./views/listView.js');
const Nav = require('../js/models/Nav.js');
const userInput = require('../js/userInput');
const startupReq = require('../js/startup');
const startup = new startupReq();

let state = {};
state.nav = new Nav(); // controls active nav
////////////////////////////////////////////////////////////
// IPCRENDERER LISTENERS
ipcRenderer.on('new-item-success', (e, newItem) => {
    // console.log(newItem);
    // add new item to "items" node
    items.addItem(newItem, true);
});
// Menu listeners, audio
ipcRenderer.on('Audio: File: Import Download Links', () => {
    if (startup.menuLogging) console.log('you imported audio');
});
ipcRenderer.on('Audio: File: Export Download Links', () => {
    if (startup.menuLogging) console.log('you exported audio');
});
ipcRenderer.on('Audio: Downloads: Paste', () => {
    if (startup.menuLogging) console.log('you pasted audio');
});

// Menu listeners, video
ipcRenderer.on('Video: File: Import Download Links', () => {
    if (startup.menuLogging) console.log('you pasted video');
});
ipcRenderer.on('Video: File: Export Download Links', () => {
    if (startup.menuLogging) console.log('you pasted video');
});
ipcRenderer.on('Video: File: Import Subscriptions', () => {
    if (startup.menuLogging) console.log('you pasted video');
});
ipcRenderer.on('Video: File: Export Subscriptions', () => {
    if (startup.menuLogging) console.log('you pasted video');
});
ipcRenderer.on('Video: Downloads: Paste', () => {
    if (startup.menuLogging) console.log('you pasted video');
    elements.testClassVideo.click();
});
ipcRenderer.on('Video: Tools: Smart Mode', () => {
    if (startup.menuLogging) console.log('you pasted video');
});
ipcRenderer.on('Video: Tools: Subscriptions', () => {
    if (startup.menuLogging) console.log('you pasted video');
});
ipcRenderer.on('Video: Tools: Check for update', () => {
    if (startup.menuLogging) console.log('you pasted video');
});
ipcRenderer.on('Video: Tools: Preferences', () => {
    if (startup.menuLogging) console.log('you pasted video');
    elements.nav_A_video.click();
});

// Menu listeners, universal commands
ipcRenderer.on('Quit', () => {
    if (startup.menuLogging) console.log('you quit');
});
// Open modal from menu
// ipcRenderer.on('menu-show-modal', () => {
// elements.nav_A_video.click();
// });

////////////////////////////////////////////////////////////
// DOM EVENT LISTENERS
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
elements.nav_A_audio.addEventListener('click', (e) => {
    console.log(`you clicked audio`);
});
elements.nav_A_video.addEventListener('click', (e) => {
    console.log(`you clicked video`);
});
elements.nav_A_warpstagram.addEventListener('click', (e) => {
    console.log(`you clicked warpstagram`);
});
// Nav B LISTENERS
elements.testClassAudio.addEventListener('click', (e) => {
    userInput.validateURL(clipboard.readText(), 'audio');
});
elements.testClassVideo.addEventListener('click', (e) => {
    userInput.validateURL(clipboard.readText(), 'video');
});