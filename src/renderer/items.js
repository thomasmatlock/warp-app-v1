// this is started, taken from the electron course
const logging = true;
const fs = require('fs');
const { app, clipboard, electron, ipcRenderer } = require('electron');
const imageDownloader = require('image-downloader');
let markup = require('./views/markup');
const miscArrays = require('../../library/miscArrays');
let downloadHandler = require('../js/downloadHandler-object');
const startupReq = require('../js/system/startup');
const startup = new startupReq();
const settings = require('electron-settings');

let markupAudio = markup.audio;
let markupVideo = markup.video;
let storage = {
    audioArr: [],
    videoArr: [],
    warpstagram: {
        subscribed: [],
        pinned: [],
    },
};
////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
exports.downloadItem = (itemURL, avType, platform) => {
    // DOWNLOAD ITEM
    if (startup.dev.getDownloadItemInfo) {
        // DOWNLOAD ITEM
        downloadHandler.all(itemURL, avType); // exports without object

        // UPDATE UI
        let item = downloadHandler.dlhandler;
        setTimeout(() => {
            this.insertMarkup(item, avType);
            this.addItem(item, avType);
            this.resetMarkup();

            // PERSIST INTO STORAGE
            this.updateStorage(item, avType, 'add');
        }, 1500);
    }
};

// Add new item
exports.addItem = (item, avType) => {
    if (avType === 'audio') {
        // console.log(item);
        this.insertMarkup(item, avType);

        let audioDownloadList = document.querySelector('.download__list_audio');
        let itemNodeAudio = document.createElement('li'); // Create a new HTML Dom node
        itemNodeAudio.innerHTML = markupAudio; // Insert markup
        audioDownloadList.appendChild(itemNodeAudio); // Append item node
        // console.log(itemNodeAudio);
        this.resetMarkup();
    }
    if (avType === 'video') {
        this.insertMarkup(item, avType);
        let videoDownloadList = document.querySelector('.download__list_video');
        let itemNodeVideo = document.createElement('li'); // Create a new HTML Dom node

        itemNodeVideo.innerHTML = markupVideo; // Insert markup
        videoDownloadList.appendChild(itemNodeVideo); // Append item node
        this.resetMarkup();
    }
};
exports.resetMarkup = () => {
    markupAudio = markup.audio;
    markupVideo = markup.video;
};
exports.insertMarkup = (downloadInfo, avType) => {
    // console.log(`avType is ${avType}`);
    // INSERT AUDIO MARKUP
    if (avType === 'audio') {
        // console.log('ITS AUDIO TIME');
        // insert audio info details
        // console.log(downloadInfo.title);
        // markup.audio = markup.audio.replace('%{title}', downloadInfo.title);
        // markup.audio = markup.audio.replace(
        //     '%{lengthFormatted}',
        //     downloadInfo.lengthFormatted
        // );
        markupAudio = markupAudio.replace('%{title}', downloadInfo.title);
        markupAudio = markupAudio.replace(
            '%{lengthFormatted}',
            downloadInfo.lengthFormatted
        );
        // console.log(markup.audio);
        // console.log(markupAudio);
        // console.log(downloadInfo.title, downloadInfo.lengthFormatted);
    }
    // INSERT VIDEO MARKUP
    if (avType === 'video') {
        markupVideo = markupVideo.replace(
            '%{thumbnail}',
            downloadInfo.thumbnailURL
        );
        markupVideo = markupVideo.replace('%{title}', downloadInfo.title);
        markupVideo = markupVideo.replace('%{fps}', downloadInfo.fps);
        markupVideo = markupVideo.replace('%{height}', downloadInfo.height);
        markupVideo = markupVideo.replace('%{fileType}', downloadInfo.fileType);
        markupVideo = markupVideo.replace(
            '%{lengthFormatted}',
            downloadInfo.lengthFormatted
        );
        // console.log(downloadInfo.title, downloadInfo.lengthFormatted);
        // console.log(downloadInfo.thumbnailURL);
    }
};
exports.downloadThumbnail = (url) => {
    options = {
        url: 'http://someurl.com/image2.jpg',
        dest: '/path/to/dest/photo.jpg', // will be saved to /path/to/dest/photo.jpg
    };

    imageDownloader
        .image(options)
        .then(({ filename }) => {
            console.log('Saved to', filename); // saved to /path/to/dest/photo.jpg
        })
        .catch((err) => console.error(err));
};

exports.save = () => {
    window.localStorage.setItem('download-items', JSON.stringify(storage)); // localStorage supports strings only, use Json.stringify
};
exports.load = () => {
    storage = JSON.parse(localStorage.getItem('download-items')); // loads this back into storage from localStorage // also JSON.parse converts strings back to array
};
exports.updateStorage = (item, avType, addRemoveType) => {
    ipcRenderer.send('storage-send', storage);
    if (addRemoveType === 'add') {
        if (avType === 'audio') {
            // console.log(`adding ${item.title}...`);
            storage.audioArr.push(item);
            // console.log(`${storage.audioArr.length} audio items...`);
            this.save();
            this.load();
            console.log(`${storage.audioArr.length} audio items...`);
            // this.loopThroughArrayLog(storage.audioArr);
        }
        if (avType === 'video') {
            console.log(`adding ${item.title}...`);
            storage.videoArr.push(item);
            this.save();
            this.load();
            console.log(`${storage.videoArr.length} video items...`);
            // console.log(`${storage.videoArr.length} video items...`);
            // this.loopThroughArrayLog(storage.videoArr);
        }
    }
    if (addRemoveType === 'remove') {
        if (avType === 'audio') {
            console.log(`removing audio item from storage`);
        }
        if (avType === 'video') {
            console.log(`removing video item from storage`);
        }
    }
};
exports.startupAddAllItems = () => {
    this.load();
    console.log(`${storage.audioArr.length} audio items...`);
    console.log(`${storage.videoArr.length} video items...`);
    // console.log('loading item titles...');
    console.log(`adding ${storage.audioArr.length} audio items...`);
    this.loopThroughArray(storage.audioArr, 'audio');
    this.loopThroughArray(storage.videoArr, 'video');
};

exports.loopThroughArray = (arr, avType) => {
    for (let i = 0; i < arr.length; i++) {
        // console.log(`${avType}, ${arr[i].title}`);
        this.addItem(arr[i], avType);
        // this.addItem('video');
    }
};
exports.clearStorage = () => {
    storage = {
        audioArr: [],
        videoArr: [],
        warpstagram: {
            subscribed: [],
            pinned: [],
        },
    };
    this.save();
    ipcRenderer.send('reset-storage', storage);
};

exports.loopThroughArrayLog = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        console.log(`${arr[i].title}`);
    }
};

// ipcRenderer.on('notSureYet', () => {
//     console.log('saving item');
// });