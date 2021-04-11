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
exports.downloadItem = (itemURL, avType, platform) => {
    if (startup.dev.getDownloadItemInfo) {
        downloadHandler.all(itemURL, avType); // exports without object
    }
};
exports.addItem = (item, avType) => {
    if (avType === 'audio') {
        this.insertMarkup(item, avType); // splices in item info to markup
        let audioDownloadList = document.querySelector('.download__list_audio'); // selects target list to add item markup to
        let itemNodeAudio = document.createElement('li'); // Create a new HTML Dom node inside download list
        itemNodeAudio.innerHTML = markupAudio; // Insert markup into new DOM node inserted into list
        audioDownloadList.appendChild(itemNodeAudio); // Append item node
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
    // INSERT AUDIO MARKUP
    if (avType === 'audio') {
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
exports.save = (avType) => {
    // console.log('storage-save commencing...');
    // console.log(storage);
    ipcRenderer.send('storage-save', storage, avType);
};
exports.load = () => {
    ipcRenderer.send('load-storage');
};
exports.updateStorage = (item, avType, addRemoveType) => {
    if (addRemoveType === 'add') {
        if (avType === 'audio') {
            // console.log('updateStorage');
            // console.log(storage);
            storage.downloadItems.audioArr.push(item);
            this.save(avType);
            this.load();
        }
        if (avType === 'video') {
            // console.log('updateStorage');
            // console.log(storage);
            storage.downloadItems.videoArr.push(item);
            ipcRenderer.send('storage-save', storage, avType);
            this.save(avType);
            this.load();
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

exports.addItemsFromArray = (arr, avType) => {
    for (let i = 0; i < arr.length; i++) {
        this.addItem(arr[i], avType);
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
exports.removeItem = (index) => {
    console.log(`removing item ${index}`);
};
exports.clickDownloadList = (avType) => {
    if (avType === 'audio') {
        if (elements.dl__item_audio[0])
            auto.clickElement(elements.dl__item_audio[0]); // auto click top audio download item if it exists to ready the itemIndexFinder
    }
    if (avType === 'video') {
        if (elements.dl__item_video[0])
            auto.clickElement(elements.dl__item_video[0]); // auto click top audio download item if it exists to ready the itemIndexFinder
    }
};

////////////////////////////////////////////////////////////////////////////////////
ipcRenderer.on('storage-save-success', (e, storageSentFromMain) => {
    // console.log('storage-save-success');
    // console.log(storageSentFromMain);
    storage = storageSentFromMain;
    // console.log(storage);
});
////////////////////////////////////////////////////////////////////////////////////
// exports.downloadThumbnail = (url) => {
//     options = {
//         url: 'http://someurl.com/image2.jpg',
//         dest: '/path/to/dest/photo.jpg', // will be saved to /path/to/dest/photo.jpg
//     };

//     imageDownloader
//         .image(options)
//         .then(({ filename }) => {
//             console.log('Saved to', filename); // saved to /path/to/dest/photo.jpg
//         })
//         .catch((err) => console.error(err));
// };