// this is started, taken from the electron course
const logging = true;
const fs = require('fs');
const { ipcRenderer } = require('electron');
const imageDownloader = require('image-downloader');
let markup = require('./views/markup');
let downloadHandler = require('../js/downloadHandler');
const startupReq = require('../js/startup');
const elements = require('./views/elements');
const auto = require('./automate');
const startup = new startupReq();

// storage empty template
let storage = {
    audioArr: [],
    videoArr: [],
    warpstagram: {
        subscribed: [],
        pinned: [],
    },
};
let markupAudio = markup.audio;
let markupVideo = markup.video;

exports.startupAddAllItems = (storageSent) => {
    storage = storageSent;
    // console.log(storage);

    this.addItemsFromArray(storage.downloadItems.audioArr, 'audio');
    this.addItemsFromArray(storage.downloadItems.videoArr, 'video');
};
exports.addItem = (item, avType, isStartup) => {
    if (avType === 'audio') {
        this.insertMarkup(item, avType); // splices in item info to markup
        let audioDownloadList = document.querySelector('.download__list_audio'); // selects target list to add item markup to
        let itemNodeAudio = document.createElement('li'); // Create a new HTML Dom node inside download list
        itemNodeAudio.innerHTML = markupAudio; // Insert markup into new DOM node inserted into list
        audioDownloadList.appendChild(itemNodeAudio); // Append item node
        this.resetMarkup();
        // if (isStartup) auto.clickElement(elements.dl__item_audio[0]);
    }
    if (avType === 'video') {
        // console.log(item.title);
        this.insertMarkup(item, avType);
        // console.log(item.finishedFilePath);
        let videoDownloadList = document.querySelector('.download__list_video');
        let itemNodeVideo = document.createElement('li'); // Create a new HTML Dom node

        itemNodeVideo.innerHTML = markupVideo; // Insert markup
        videoDownloadList.appendChild(itemNodeVideo); // Append item node
        this.resetMarkup();
        // if (!isStartup) auto.clickElement(elements.dl__item_video[0]);
    }
};
exports.addItemsFromArray = (arr, avType) => {
    for (let i = 0; i < arr.length; i++) {
        this.addItem(arr[i], avType);
    }
};
exports.downloadItem = (itemURL, avType, platform) => {
    if (startup.dev.getDownloadItemInfo) {
        downloadHandler.all(itemURL, avType); // exports without object
    }
};
exports.selectItem = (e, avType, itemID) => {
    document.getElementById(itemID).remove();
    let itemIndex;

    if (avType === 'audio') {
        let arr = storage.downloadItems.audioArr;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === itemID) {
                // console.log(arr[i].title);
                itemIndex = i;
            }
        }
    }
    if (avType === 'video') {
        let arr = storage.downloadItems.videoArr;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === itemID) {
                // console.log(arr[i].title);
                itemIndex = i;
            }
        }
    }
    this.updateStorage('ignore', avType, 'remove', itemIndex);
};

///////////////////////   MARKUP   ///////////////////////
exports.insertMarkup = (downloadInfo, avType) => {
    // INSERT AUDIO MARKUP
    if (avType === 'audio') {
        markupAudio = markupAudio.replace('%{id}', downloadInfo.id);
        markupAudio = markupAudio.replace('%{title}', downloadInfo.title);
        markupAudio = markupAudio.replace(
            '%{thumbnail}',
            downloadInfo.thumbnailURL
        );
        markupAudio = markupAudio.replace(
            '%{lengthFormatted}',
            downloadInfo.lengthFormatted
        );
        markupAudio = markupAudio.replace('%{fileType}', downloadInfo.fileType);
    }
    // INSERT VIDEO MARKUP
    if (avType === 'video') {
        markupVideo = markupVideo.replace(
            '%{thumbnail}',
            downloadInfo.thumbnailURL
        );
        markupVideo = markupVideo.replace('%{id}', downloadInfo.id);
        markupVideo = markupVideo.replace('%{title}', downloadInfo.title);
        markupVideo = markupVideo.replace('%{fps}', downloadInfo.fps);
        markupVideo = markupVideo.replace('%{height}', downloadInfo.height);
        markupVideo = markupVideo.replace('%{fileType}', downloadInfo.fileType);
        markupVideo = markupVideo.replace(
            '%{lengthFormatted}',
            downloadInfo.lengthFormatted
        );
    }
};
exports.resetMarkup = () => {
    markupAudio = markup.audio;
    markupVideo = markup.video;
};

///////////////////////   STORAGE   ///////////////////////
exports.save = (avType) => {
    ipcRenderer.send('storage-save', storage, avType);
};
exports.load = () => {
    ipcRenderer.send('load-storage');
};
exports.updateStorage = (item, avType, addRemoveType, index) => {
    if (addRemoveType === 'add') {
        if (avType === 'audio') {
            storage.downloadItems.audioArr.push(item);
            this.save(avType);
            this.load();
        }
        if (avType === 'video') {
            storage.downloadItems.videoArr.push(item);
            ipcRenderer.send('storage-save', storage, avType);
            this.save(avType);
            this.load();
        }
    }
    if (addRemoveType === 'remove') {
        if (avType === 'audio') {
            storage.downloadItems.audioArr.splice(index, 1);
            ipcRenderer.send('storage-save', storage, avType);
        }
        if (avType === 'video') {
            storage.downloadItems.videoArr.splice(index, 1);
            ipcRenderer.send('storage-save', storage, avType);
        }
    }
};
exports.resetStorage = () => {
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
////////////////////////////////////////////////////////////////////////////////////
ipcRenderer.on('storage-save-success', (e, storageSentFromMain) => {
    storage = storageSentFromMain;
});