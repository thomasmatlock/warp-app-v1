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
    // check url against each pattern
    pattMatchIndex = pattArr.forEach(function(item, index) {
        if (url.match(item)) {
            pattMatchIndex = index;

            let type = `${pattArr[pattMatchIndex]}`;

            mediaController(url, type, format);
        } else {
            if (startup.devMode) clipboard.writeText(startup.testURLstatic);
        }
    });
};
checkURLforPattern = () => {};

const mediaController = (url, sourceType, format) => {
    let type = sourceType.substring(1, sourceType.length - 2); // removes beginning/end characters: changes "/youtube/i to simply 'youtube'
    console.log(`${url} ${type} ${format} `);
    ipcRenderer.send('new-item', url);
};