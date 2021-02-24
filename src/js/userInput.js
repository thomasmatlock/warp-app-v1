// Paste
// parse
// download
// update state
// update local user file
// update UI
const { clipboard, ipcRenderer } = require('electron');
const startupReq = require('./startup');
const startup = new startupReq();

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
let pattMatchIndex;
exports.validateURL = (url, format) => {
    // let type;
    checkURLforPattern(url, format);
};
checkURLforPattern = (url, format) => {
    // check url against each pattern
    pattMatchIndex = pattArr.forEach(function(item, index) {
        if (url.match(item)) {
            pattMatchIndex = index;

            let type = `${pattArr[pattMatchIndex]}`;
            type = type.substring(1, type.length - 2); // removes beginning/end characters: changes "/youtube/i to simply 'youtube'

            mediaController(url, type, format);
            // console.log(url, type, format);
        } else {
            if (startup.devMode) url = startup.testURLstatic; // automatically substitutes a sample URL to test pasting with if devMode is active
        }
    });
};

const mediaController = (url, type, format) => {
    console.log(`${url} ${type} ${format} `);
    ipcRenderer.send('new-item', url);
};