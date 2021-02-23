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
exports.validateURL = (url, format) => {
    let pattMatchIndex;
    // console.log(url);
    // check url against each pattern
    pattMatchIndex = pattArr.forEach(function(item, index) {
        if (url.match(item)) {
            pattMatchIndex = index;

            let type = `${pattArr[pattMatchIndex]}`;

            mediaController(url, type, format);
            return;
        } else {
            if (startup.devMode) clipboard.writeText(startup.testURLstatic);
        }
    });
};

const mediaController = (url, sourceType, format) => {
    // str = str.substring(0,str.length-1);
    let type = sourceType.substring(1, sourceType.length - 2);
    console.log(`${url} from ${type} in ${format} format...`);
    ipcRenderer.send('new-item', url);
};