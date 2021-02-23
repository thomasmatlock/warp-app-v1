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
const Nav = require('./models/Nav.js');
const userInput = require('./userInput');
const userInputController = new userInput();
const startupReq = require('./startup');
const startup = new startupReq();
// console.log(elements.nav_A_audio);
// console.log(userInputController);
// console.log(elements);
// const navTitles = require('./src/js/models/config.js');

// activate dev mode active tab
// console.log(startup);
// startup.updateDevModeActiveTab();

nav_A_video = document.getElementById('.nav_A_video');
// elements.nav_A_video.click();
// console.log(nav_A_video);
// console.log(elements);
// nav_A_video.click();

let state = {};
// let nav_A_active = config.dev.nav_A_active;
state.nav = new Nav();

ipcRenderer.on('new-item-success', (e, newItem) => {
    // console.log(newItem);
    // add new item to "items" node
    items.addItem(newItem, true);

    // Enable buttons
    // toggleModalButtons();

    // Hide modal and clear input value
    // modal.style.display = 'none';
    // itemURL.value = '';
});

ipcRenderer.on('app-ready', (e) => {});

// Open modal from menu
ipcRenderer.on('menu-show-modal', () => {
    elements.nav_A_video.click();
});

// STATE CONTROLLER
const init = () => {
    if (startup.devMode) {
        // console.log(`nav_A_active is ${nav_A_active}`);
    }
};
init();

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
elements.testClassAudio.addEventListener('click', (e) => {
    // console.log('You pasted in the audio tab');
    const url = clipboard.readText();
    // console.log(url);
    validateURL(url, 'audio');
    // userInputController.validateURL(url, 'audio');
});
elements.testClassVideo.addEventListener('click', (e) => {
    // console.log('You pasted in the video tab');
    const url = clipboard.readText();

    validateURL(url, 'video');

    // console.log(text);
});

const pattArr = [
    /facebook/i,
    /instagram/i,
    /soundcloud/i,
    /streamable/i,
    /twitch/i,
    /twitter/i,
    /vimeo/i,
    /youtube/i,
    /tiktok/i,
];
const validateURL = (url, format) => {
    let pattMatchIndex;
    console.log(url);
    // check url against each pattern
    pattMatchIndex = pattArr.forEach(function(item, index) {
        if (url.match(item)) {
            pattMatchIndex = index;

            let type = `${pattArr[pattMatchIndex]}`;
            console.log(type);
            // console.log(
            //     `${pattArr[pattMatchIndex]} at index ${pattMatchIndex}`
            // );
            mediaController(url, type, format);
            return;
        } else {}
    });

    // console.log(pattArr[pattMatchIndex]);
};

// const audioController = (url, sourceType) => {};
// const videoController = (url, sourceType) => {};
const mediaController = (url, sourceType, format) => {
    // str = str.substring(0,str.length-1);
    let type = sourceType.substring(1, sourceType.length - 2);
    console.log(`Ready: ${url} from ${type} in ${format} format...`);
    // ipcRenderer.send('new-item', itemURL.value);
    ipcRenderer.send('new-item', url);
    // console.log(`Detected ${} in ${format} format`);
};

// Paste
// parse
// download
// update state
// update local user file
// update UI

/////////////////////////////