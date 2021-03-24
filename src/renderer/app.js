/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable one-var */

const { app, clipboard, ipcRenderer } = require('electron');
const elements = require('./views/elements');
const navPrimaryView = require('./views/navPrimaryView.js');
const navSecondaryView = require('./views/navSecondaryView.js');
const listView = require('./views/listView.js');
const Nav = require('../js/models/Nav.js');
const userInput = require('../js/userInput');
const startupReq = require('../js/system/startup');
const startup = new startupReq();
const markupAudio = require('./markups/markupAudio');
// console.log(markupAudio);

let state = {};
state.nav = new Nav(); // controls active nav

////////////////////////////////////////////////////////////
// IPCRENDERER LISTENERS
// activates selected nav A tab on window ready
ipcRenderer.on('window-ready', () => {
    if (startup.nav_A_active == 'audio') elements.nav_A_audio.click(); // clicks audio tab
    if (startup.nav_A_active == 'audio' && startup.devModeAutoClickPaste)
        elements.testClassAudio.click(); // clicks audio paste
    if (startup.nav_A_active == 'video') elements.nav_A_video.click();
    if (startup.nav_A_active == 'video' && startup.devModeAutoClickPaste)
        elements.testClassVideo.click(); // clicks video paste
    if (startup.nav_A_active == 'warpstagram')
        elements.nav_A_warpstagram.click(); // clicks warpstagram tab
});
ipcRenderer.on('resize', () => {});

// MENU LISTENERS, AUDIO
// File
ipcRenderer.on('Audio: File: Import Download Links', () => {});
ipcRenderer.on('Audio: File: Export Download Links', () => {});
// Downloads
ipcRenderer.on('Audio: Downloads: Paste', () => {});
ipcRenderer.on('Audio: Downloads: Pause All', () => {});
ipcRenderer.on('Audio: Downloads: Resume All', () => {});
ipcRenderer.on('Audio: Downloads: Remove All', () => {});
ipcRenderer.on('Audio: Tools: Preferences', () => {});

// MENU LISTENERS, VIDEO
// File
ipcRenderer.on('Video: File: Import Download Links', () => {});
ipcRenderer.on('Video: File: Export Download Links', () => {});
ipcRenderer.on('Video: File: Import Subscriptions', () => {});
ipcRenderer.on('Video: File: Export Subscriptions', () => {});
// Downloads
ipcRenderer.on('Video: Downloads: Paste', () => {});
ipcRenderer.on('Video: Downloads: Pause All', () => {});
ipcRenderer.on('Video: Downloads: Resume All', () => {});
ipcRenderer.on('Video: Downloads: Remove All', () => {});
// Tools
ipcRenderer.on('Video: Tools: Smart Mode', () => {});
ipcRenderer.on('Video: Tools: Subscriptions', () => {});
ipcRenderer.on('Video: Tools: Check for update', () => {});
ipcRenderer.on('Video: Tools: Preferences', () => {});

// MENU LISTENERS, WARPSTAGRAM
// File
ipcRenderer.on('Warpstagram: File: Import Subscriptions', () => {});
ipcRenderer.on('Warpstagram: File: Export Subscriptions', () => {});
ipcRenderer.on('Warpstagram: File: Export Posts', () => {});
// Edit
ipcRenderer.on('Warpstagram: Edit: Sub to My Saved Posts', () => {});
ipcRenderer.on('Warpstagram: Edit: Sub to Accts I Follow', () => {});
ipcRenderer.on('Warpstagram: Edit: Sub to Stories Of Accts I Follow', () => {});
ipcRenderer.on('Warpstagram: Edit: Update pinned subscriptions', () => {});
ipcRenderer.on('Warpstagram: Edit: Update all subscriptions', () => {});
ipcRenderer.on('Warpstagram: Edit: Pause all subscriptions', () => {});
ipcRenderer.on('Warpstagram: Edit: Remove all subscriptions', () => {});
// Tools
ipcRenderer.on('Warpstagram: Tools: Login', () => {});
ipcRenderer.on('Warpstagram: Tools: Manage license', () => {});
ipcRenderer.on('Warpstagram: Tools: Preferences', () => {});

// Menu listeners, universal commands
ipcRenderer.on('Check for update', () => {});
ipcRenderer.on('Quit', () => {
    if (startup.menuLogging) console.log('you quit');
    ipcRenderer.send('quit');

    // app.quit();
    // mainWindow = null;
});

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
// menu-change
elements.nav_A_audio.addEventListener('click', (e) => {
    if (startup.menuLogging) console.log(`you clicked audio`);
    ipcRenderer.send('menu-change', 'audio');
});
elements.nav_A_video.addEventListener('click', (e) => {
    if (startup.menuLogging) console.log(`you clicked video`);
    ipcRenderer.send('menu-change', 'video');
});
elements.nav_A_warpstagram.addEventListener('click', (e) => {
    if (startup.menuLogging) console.log(`you clicked warpstagram`);
    ipcRenderer.send('menu-change', 'warpstagram');
});
// Nav B LISTENERS
elements.testClassAudio.addEventListener('click', (e) => {
    userInput.validateURL(clipboard.readText(), 'audio');
});
elements.testClassVideo.addEventListener('click', (e) => {
    userInput.validateURL(clipboard.readText(), 'video');
});