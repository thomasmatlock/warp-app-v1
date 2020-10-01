/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const { clipboard, ipcRenderer } = require('electron');
const elements = require('./src/js/views/base');
const validate = require;

elements.nav_A_0.addEventListener('click', () => {
    console.log('You clicked');
});
elements.nav_B0.addEventListener('click', () => {
    validateURL(clipboard.readText());
});

const validateURL = (url) => {
    // Regex pattern
    const pattArr = [
        /facebook/i,
        /instagram/i,
        /soundcloud/i,
        /twitch/i,
        /twitter/i,
        /vimeo/i,
        /youtube/i,
    ];
    let pattMatchIndex;
    // check url against each pattern
    let pattMatchInded = pattArr.forEach(function(item, index) {
        if (url.match(item)) {
            pattMatchIndex = index;
            return;
        } else {
            // console.log(`${item} is not a match`);
        }
    });

    console.log(pattArr[pattMatchIndex]);
};

const audioController = (audio, sourceType) => {};
const videoController = (video, sourceType) => {};