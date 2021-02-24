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
const { clipboard, ipcRenderer } = require('electron');
const startupReq = require('./startup');
const startup = new startupReq();
const miscFunctions = require('./miscFunctions');

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

let pattMatchIndex, inputURL, inputType;
exports.validateURL = (url, format) => {
    if (startup.devMode)
        url = miscFunctions.randomFromArray(startup.URLSyoutube); // substitutes a random placeholder URL if dev mode active
    checkURLforPattern(url, format);
    mediaController(url, inputType, format);
};
checkURLforPattern = (url, format) => {
    // check url against each pattern
    pattMatchIndex = pattArr.forEach(function(item, index) {
        if (url.match(item)) {
            pattMatchIndex = index; // saves the index at which the match was found in the pattern array
            let type = `${pattArr[pattMatchIndex]}`; // saves type of source, ie /youtube/i
            inputType = type.substring(1, type.length - 2); // removes beginning/end characters: changes "/youtube/i to simply 'youtube'
        }
    });
};

const mediaController = (url, type, format) => {
    console.log(`${url} ${type} ${format} `);
    ipcRenderer.send('new-item', url);
};