/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable one-var */

// Paste
// parse
// download
// update state
// update local user file
// update UI
const logging = false;
const { clipboard, ipcRenderer } = require('electron');
const startupReq = require('./system/startup');
const startup = new startupReq();
const miscFunctions = require('../../library/js/miscArrays');
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

let pattMatchIndex, platform;
exports.validateURL = (url, avType) => {
    if (startup.dev.useRandomYoutubeURL)
        url = miscFunctions.randomFromArray(startup.dev.URLSyoutube); // substitutes a random placeholder URL if dev mode active
    if (startup.dev.useRandomMiscURL) {
        url = miscFunctions.randomFromArray(startup.dev.URLSmisc); // substitutes a random placeholder URL if dev mode active
    }
    checkURLforPattern(url, avType);
    if (platform === 'youtube') {
        mediaController(url, avType, platform);
    }
};
checkURLforPattern = (url, avType) => {
    // check url against each pattern
    pattMatchIndex = pattArr.forEach(function(item, index) {
        if (url.match(item)) {
            pattMatchIndex = index; // saves the index at which the match was found in the pattern array
            let type = `${pattArr[pattMatchIndex]}`; // saves type of source, ie /youtube/i
            platform = type.substring(1, type.length - 2); // removes beginning/end characters: changes "/youtube/i to simply 'youtube'
        }
    });
    // if (logging) console.log(platform);
};
const mediaController = (url, avType, platform) => {
    if (logging)
        console.log(
            `mediaController: url ${url} platform ${platform} avType ${avType} `
        );
    startup.env.nav_A_active = avType;
    ipcRenderer.send('new-item', url, avType, platform);
};