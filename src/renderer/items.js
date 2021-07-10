// this is started, taken from the electron course
const fs = require('fs');
const { clipboard, ipcRenderer, shell } = require('electron');
// let markup = require('./views/markup');
let downloadHandler = require('../js/downloadHandler');
const defaultsReq = require('../js/defaults');
const defaults = new defaultsReq();
const imageDownloader = require('image-downloader');
const elements = require('./views/elements');
const auto = require('./automate');
const theme = require('./themeController');

// storage empty template
let storage = {
    audioArr: [],
    videoArr: [],
    warpstagram: {
        subscribed: [],
        pinned: [],
    },
};

let markupAudio, markupVideo;

///////////////////////   ADD ITEM(S)   ///////////////////////
exports.defaultsAddAllItems = (storageSent) => {
    storage = storageSent;
    markupAudio = storage.markups.downloadItems.audio;
    markupVideo = storage.markups.downloadItems.video;
    this.addItemsFromArray(storage.downloadItems.audioArr, 'audio');
    this.addItemsFromArray(storage.downloadItems.videoArr, 'video');
};
exports.addItem = (item, avType, isdefaults) => {
    // console.log(item);
    if (avType === 'audio') {
        this.insertMarkup(item, avType); // splices in item info to markup
        // console.log(item.filepath);
        let audioDownloadList = document.querySelector('.download__list_audio'); // selects target list to add item markup to
        let itemNodeAudio = document.createElement('li'); // Create a new HTML Dom node inside download list
        itemNodeAudio.innerHTML = markupAudio; // Insert markup into new DOM node inserted into list
        audioDownloadList.appendChild(itemNodeAudio); // Append item node
        this.resetMarkup();
        theme.setTheme(storage)
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
        theme.setTheme(storage)
    }
};

let percentRounded;
let textnode;
let itemNode;
let node;
exports.insertPercentDownloaded = (item, percent, statusType) => {
    percentRounded = `${(percent * 100).toFixed(0)}%`;
    if (statusType === 'add') {
        node = document.createElement("p"); // Create a <p> node
        textnode = document.createTextNode(`         ${percentRounded} downloaded`); // Create a text node
        node.appendChild(textnode);
        node.className = 'dl__item__data__data'
        node.className = 'dl__item__data__property-file-percentDownloaded'
        lastChildNode = document.getElementById(item.id).childNodes[1].childNodes[3].childNodes[3].childNodes[9]
        itemNode = document.getElementById(item.id).childNodes[1].childNodes[3].childNodes[3]
            // console.log(itemNode);
            // itemNode.appendChild(textnode)
        node.style.color = 'white';
        node.style.marginLeft = '1rem';
        itemNode.appendChild(node)
            // itemNode.insertBefore(node, lastChildNode)
            // textnode.innerHTML = 'hello'
            // node.innerHTML = 'hello'
    }
    if (statusType === 'complete') {
        // this.removePercentDownloaded(item, itemNode, textnode)
        try {
            itemNode.removeChild(node)

        } catch (error) {

        }
    }
}
exports.updatePercentDownloaded = (item, percent) => {}

exports.removePercentDownloaded = (item, itemNode, textnode) => {
    // console.log(`removing percentage from ${item.id}`);
    // let itemNode = document.getElementById(item.id).childNodes[1].childNodes[3].childNodes[3].childNodes[9]
    itemNode.removeChild(textnode)

}
exports.addItemsFromArray = (arr, avType) => {
    for (let i = 0; i < arr.length; i++) {
        this.addItem(arr[i], avType);
    }
};
exports.downloadItem = (itemURL, avType, platform) => {
    if (defaults.dev.getDownloadItemInfo) {
        downloadHandler.all(itemURL, avType, platform, storage); // exports without object
    }
};

///////////////////////   SELECT/IDENTIFY ITEM(S)   ///////////////////////
exports.selectItem = (avType, itemID, action) => {
    let item = this.findItem(itemID);
    let itemIndex = this.findItemIndex(itemID);

    if (action.toLowerCase() === 'show in folder') {
        // console.log('showing in folder');
        // console.log(item.filepath);
        this.showItemInFolder(item.filepath);
    }
    if (action.toLowerCase() === 'copy link') {
        this.copyLink(item.url);
    }
    if (action.toLowerCase() === 'open in browser') {
        shell.openExternal(item.url);
    }
    if (action.toLowerCase() === 'remove') {
        this.removeItem(avType, item.id, itemIndex);
    }
    if (action.toLowerCase() === 'delete file') {
        console.log(item.filepath);
        fs.unlink(item.filepath, (err) => console.log(err));
        this.removeItem(avType, item.id, itemIndex);
    }
    if (action.toLowerCase() === 'remove all') {
        this.removeAllitems(avType);
    }
};
exports.findItem = (itemID) => {
    let arrAudio = storage.downloadItems.audioArr;
    let arrVideo = storage.downloadItems.videoArr;
    // loop audio arr
    for (let i = 0; i < arrAudio.length; i++) {
        if (arrAudio[i].id === itemID) {
            return arrAudio[i];
        }
    }
    // loop video arr
    for (let i = 0; i < arrVideo.length; i++) {
        if (arrVideo[i].id === itemID) {
            return arrVideo[i];
        }
    }
};
exports.findItemIndex = (itemID) => {
    let arrAudio = storage.downloadItems.audioArr;
    let arrVideo = storage.downloadItems.videoArr;
    // loop audio arr
    for (let i = 0; i < arrAudio.length; i++) {
        if (arrAudio[i].id === itemID) {
            return i;
        }
    }
    // loop video arr
    for (let i = 0; i < arrVideo.length; i++) {
        if (arrVideo[i].id === itemID) {
            return i;
        }
    }
};
///////////////////////   MENU ACTIONS   ///////////////////////

exports.showItemInFolder = (fullPath) => {
    shell.showItemInFolder(fullPath);
};
exports.copyLink = (itemURL) => {
    clipboard.writeText(itemURL);
};

///////////////////////   REMOVE ITEM(S)   ///////////////////////
exports.removeItemFromUI = (avType, itemID) => {
    // console.log(itemID);
    document.getElementById(itemID).remove();
};
exports.removeAllItemsFromUI = (avType) => {
    let arr;
    if (avType === 'audio') {
        arr = storage.downloadItems.audioArr;
    } else if (avType === 'video') {
        arr = storage.downloadItems.videoArr;
    }

    for (let i = 0; i < arr.length; i++) {
        // console.log(arr[i].id);
        this.removeItemFromUI(avType, arr[i].id);
    }
};
exports.removeItem = (avType, itemID, itemIndex) => {
    this.removeItemFromUI(avType, itemID);
    this.updateStorage('ignore', avType, 'remove', itemIndex);
};
exports.removeAllitems = (avType) => {
    this.removeAllItemsFromUI(avType);
    this.updateStorage('ignore', avType, 'remove-all', 'ignore');
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
    markupAudio = storage.markups.downloadItems.audio;
    markupVideo = storage.markups.downloadItems.video;
};

///////////////////////   STORAGE   ///////////////////////
exports.save = (avType) => {
    ipcRenderer.send('storage-sync-request', storage, avType);
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
            ipcRenderer.send('storage-sync-request', storage, avType);
            this.save(avType);
            this.load();
        }
    }
    if (addRemoveType === 'remove') {
        if (avType === 'audio') {
            storage.downloadItems.audioArr.splice(index, 1);
            ipcRenderer.send('storage-sync-request', storage, avType);
        }
        if (avType === 'video') {
            storage.downloadItems.videoArr.splice(index, 1);
            ipcRenderer.send('storage-sync-request', storage, avType);
        }
    }
    if (addRemoveType === 'remove-all') {
        if (avType === 'audio') {
            storage.downloadItems.audioArr = [];
            ipcRenderer.send('storage-sync-request', storage, avType);
        }
        if (avType === 'video') {
            storage.downloadItems.videoArr = [];
            ipcRenderer.send('storage-sync-request', storage, avType);
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
exports.removeActionMenus = () => {
        let actionMenus = document.getElementsByClassName("downloadItemMenu_optionsList");
        // console.log(actionMenus.length);
        for (let i = 0; i < actionMenus.length; i++) {
            // actionMenus[i].style.visibility = 'hidden';
        }
    }
    ///////////////////////   IPC LISTENERS   ///////////////////////
ipcRenderer.on('storage-sync-success', (e, storageReceived) => {
    storage = storageReceived;
});