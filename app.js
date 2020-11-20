/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable one-var */

// 1st party (nodejs)
// 2nd party (npm)
const { clipboard, ipcRenderer } = require('electron');
// 3rd party (mine)
const elements = require('./src/js/views/elements');
const navPrimaryView = require('./src/js/views/navPrimaryView.js');
const navSecondaryView = require('./src/js/views/navSecondaryView.js');
const listView = require('./src/js/views/listView.js');
const Nav = require('./src/js/models/Nav.js');
// const navTitles = require('./src/js/models/config.js');

let state = {};
let nav_A_active;
state.nav = new Nav();
state.nav.nav_A = [];
// console.log(nav_A_active);

// STATE CONTROLLER
const init = () => {
    state.nav.nav_A[nav_A_active] = true;
    // elements.nav_A_3.style.classList.add('nav_A-tab--active');
    // console.log(`${nav_A_active} is active: ${state.nav.nav_A[nav_A_active]}`);
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
// elements.nav_B0_0.addEventListener('click', (e) => {
//     console.log('you clicked paste');
// });

elements.testClassAudio.addEventListener('click', (e) => {
    // console.log('You pasted in the audio tab');
    const url = clipboard.readText();
    validateURL(url, 'audio');
});
elements.testClassVideo.addEventListener('click', (e) => {
    // console.log('You pasted in the video tab');
    const url = clipboard.readText();

    validateURL(url, 'video');

    // console.log(text);
});
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
const sampleURLS = [
    'https://www.facebook.com/hmtheus/videos/3230852170358533',
    'https://www.instagram.com/p/CFmU6REA5dl/',
    'https://soundcloud.com/themonday-morning-podcast/mmpc-11-16-20',
    'https://streamable.com/yhl89p',
    'https://www.twitch.tv/videos/805708310',
    'https://twitter.com/LouDobbs/status/1328469195550576645',
    'https://vimeo.com/210599507',
    'https://www.youtube.com/watch?v=TeBSVS3FwRY',
    'https://www.tiktok.com/@foodies/video/6895167017570127109',
];
// https://www.youtube.com/watch?v=TeBSVS3FwRY

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
    // check url against each pattern
    let pattMatchInded = pattArr.forEach(function(item, index) {
        if (url.match(item)) {
            pattMatchIndex = index;

            let type = `${pattArr[pattMatchIndex]}`;
            // console.log(
            //     `${pattArr[pattMatchIndex]} at index ${pattMatchIndex}`
            // );
            mediaController(url, type, format);
            return;
        } else {
            // console.log(`${url} is not a match`);
        }
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
//parse
// download
// update state
// update local user file
// update UI

// Now let’s remove the last character from the string using the substring method in the below example.

// function removeLastCharacter() {
// var str = 'tracedynamics';
// str = str.substring(0,str.length-1);
// console.log(str);
// }

// Output:
// tracedynamic