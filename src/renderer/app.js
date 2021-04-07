/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable one-var */
const logging = false;
const { app, clipboard, ipcRenderer } = require('electron');
let elements = require('./views/elements');
const navPrimaryView = require('./views/navPrimaryView.js');
const navSecondaryView = require('./views/navSecondaryView.js');
const listView = require('./views/listView.js');
const Nav = require('../js/nav.js');
const userInput = require('../js/userInput');
const startupReq = require('../js/system/startup');
const startup = new startupReq();
const items = require('./items');
const auto = require('./automate');
const modals = require('./modals');
const stateReq = require('./state');
let state = new stateReq();

////////////////////////////////////////////////////////////
// IPCRENDERER LISTENERS
// activates selected nav A tab on window ready
ipcRenderer.on('window-ready', (e, storage) => {
    auto.click_nav_A(startup.env.nav_A_active); // auto clicks active tab if active
    setActiveNav_A(startup.env.nav_A_active); // sets active Nav A
    if (startup.dev.clearStorage) items.resetStorage(); // clears localStorage if active
    items.startupAddAllItems(storage); // loads items stored in settings to UI
    auto.click_nav_B(startup.env.nav_A_active, 'preferences'); // auto clicks paste, smartMode, activate, subscriptions, preferences, help
});

const setActiveNav_A = (nav_A_active) => {
    if (nav_A_active === 'audio') elements.nav_A_active = elements.nav_A_audio;
    if (nav_A_active === 'video') elements.nav_A_active = elements.nav_A_video;
    if (nav_A_active === 'warpstagram')
        elements.nav_A_active = elements.nav_A_warpstagram;
};

// Fire on resize window
ipcRenderer.on('resize', () => {
    var clickDelay = 50;
    if (startup.env.nav_A_active == 'audio') {
        elements.nav_A_active = elements.nav_A_audio; // sets active Nav A
        setTimeout(() => {
            elements.nav_A_audio.click(); // clicks audio tab
        }, clickDelay);
    }
    if (startup.env.nav_A_active == 'video') {
        elements.nav_A_active = elements.nav_A_video; // sets active Nav A
        // console.log(`clicking ${elements.env.nav_A_active}`);
        setTimeout(() => {
            elements.nav_A_video.click(); // clicks video tab
        }, clickDelay);
    }
    if (startup.env.nav_A_active == 'warpstagram') {
        setTimeout(() => {
            elements.nav_A_warpstagram.click(); // clicks warpstagram tab
        }, clickDelay);
    }
});
ipcRenderer.on('paste-new-url', (event, itemURL, avType, platform) => {
    if (logging)
        console.log(`${itemURL}, avType ${avType}, platform ${platform}`);
    items.downloadItem(itemURL, avType, platform);
});

// MENU LISTENERS, AUDIO
// File
ipcRenderer.on('Audio: File: Import Download Links', () => {
    console.log('you want to import audio');
});
ipcRenderer.on('Audio: File: Export Download Links', () => {});
// Downloads
ipcRenderer.on('Audio: Downloads: Paste', () => {
    console.log('you pressed paste');
    elements.nav_B_button_audio_paste.click(); // clicks audio paste
});
ipcRenderer.on('Audio: Downloads: Pause All', () => {});
ipcRenderer.on('Audio: Downloads: Resume All', () => {});
ipcRenderer.on('Audio: Downloads: Remove All', () => {});
ipcRenderer.on('Audio: Tools: Preferences', () => {
    modals.modalPreferencesAdjust(state, elements, startup);
});

// MENU LISTENERS, VIDEO
// File
ipcRenderer.on('Video: File: Import Download Links', () => {});
ipcRenderer.on('Video: File: Export Download Links', () => {});
ipcRenderer.on('Video: File: Import Subscriptions', () => {});
ipcRenderer.on('Video: File: Export Subscriptions', () => {});
// Downloads
ipcRenderer.on('Video: Downloads: Paste', () => {
    console.log('you pressed paste');
    elements.nav_B_button_video_paste.click(); // clicks audio paste
});
ipcRenderer.on('Video: Downloads: Pause All', () => {});
ipcRenderer.on('Video: Downloads: Resume All', () => {});
ipcRenderer.on('Video: Downloads: Remove All', () => {});
// Tools
ipcRenderer.on('Video: Tools: Smart Mode', () => {});
ipcRenderer.on('Video: Tools: Subscriptions', () => {});
ipcRenderer.on('Video: Tools: Check for update', () => {});
ipcRenderer.on('Video: Tools: Preferences', () => {
    // console.log('opening preferences modal');
    modals.modalPreferencesAdjust(state, elements, startup);
});

// MENU LISTENERS, WARPSTAGRAM
// File
ipcRenderer.on('Warpstagram: File: Import Subscriptions', () => {});
ipcRenderer.on('Warpstagram: File: Export Subscriptions', () => {});
ipcRenderer.on('Warpstagram: File: Export Posts', () => {});
// Edit
ipcRenderer.on('Warpstagram: Edit: Sub to My Saved Posts', () => {});
ipcRenderer.on('Warpstagram: Edit: Sub to PAccts I Follow', () => {});
ipcRenderer.on('Warpstagram: Edit: Sub to Stories Of Accts I Follow', () => {});
ipcRenderer.on('Warpstagram: Edit: Update pinned subscriptions', () => {});
ipcRenderer.on('Warpstagram: Edit: Update all subscriptions', () => {});
ipcRenderer.on('Warpstagram: Edit: Pause all subscriptions', () => {});
ipcRenderer.on('Warpstagram: Edit: Remove all subscriptions', () => {});
// Tools
ipcRenderer.on('Warpstagram: Tools: Login', () => {});
ipcRenderer.on('Warpstagram: Tools: Manage license', () => {});
ipcRenderer.on('Warpstagram: Tools: Preferences', () => {
    modals.modalPreferencesAdjust(state, elements, startup);
});

// Menu listeners, universal commands
ipcRenderer.on('Check for update', () => {});
ipcRenderer.on('Quit', () => {
    if (startup.dev.menuLogging) console.log('you quit');
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
            navSecondaryView.highlightSelected('add', key);
        }
    }
});
// menu-change
elements.nav_A_audio.addEventListener('click', (e) => {
    ipcRenderer.send('menu-change', 'audio');
    startup.env.nav_A_active = 'audio';
    if (logging)
        console.log(`env.nav_A_active is now ${startup.env.nav_A_active}`);
});
elements.nav_A_video.addEventListener('click', (e) => {
    ipcRenderer.send('menu-change', 'video');
    startup.env.nav_A_active = 'video';
});
elements.nav_A_warpstagram.addEventListener('click', (e) => {
    ipcRenderer.send('menu-change', 'warpstagram');
    startup.env.nav_A_active = 'warpstagram';
    if (logging)
        console.log(`env.nav_A_active is now ${startup.env.nav_A_active}`);
});
elements.nav_B_button_audio_paste.addEventListener('click', (e) => {
    userInput.validateURL(clipboard.readText(), startup.env.nav_A_active);
});
elements.nav_B_button_audio_activate.addEventListener('click', (e) => {
    if (logging) console.log('clicked activate');
});
elements.nav_B_button_audio_preferences.addEventListener('click', (e) => {
    if (logging) console.log('clicked preferences');
    modals.modalPreferencesAdjust(state, elements, startup);
});
elements.nav_B_button_audio_help.addEventListener('click', (e) => {
    if (logging) console.log('clicked help');
});
// Nav B video LISTENERS
elements.nav_B_button_video_paste.addEventListener('click', (e) => {
    userInput.validateURL(clipboard.readText(), startup.env.nav_A_active);
});
elements.nav_B_button_video_smartMode.addEventListener('click', (e) => {
    if (logging) console.log('clicked smart mode');
    elements.nav_B_button_video_smartMode.classList.add('nav_B_button--active');
});
elements.nav_B_button_video_activate.addEventListener('click', (e) => {
    if (logging) console.log('clicked activate');
});
elements.nav_B_button_video_subscriptions.addEventListener('click', (e) => {
    if (logging) console.log('clicked subscriptions');
});
elements.nav_B_button_video_preferences.addEventListener('click', (e) => {
    if (logging) console.log('clicked preferences');
    modals.modalPreferencesAdjust(state, elements, startup);
});
elements.nav_B_button_video_help.addEventListener('click', (e) => {
    if (logging) console.log('clicked help');
});