const logging = true;
const fs = require('fs');
const path = require('path');
const ytdl = require('ytdl-core');
const fileControllerReq = require('./fileController');
const fileController = new fileControllerReq();
const startupReq = require('./startup');
const startup = new startupReq();
const items = require('../renderer/items');

let itemInfo = {
    fileSize: '',
    fileType: '',
    format: '', // which of the 35 formats, from 1080p, 720p60, etc
    fps: '',
    height: '',
    hrs: '',
    itemURL: '',
    lengthFormatted: '',
    secs: '',
    mins: '',
    selectedFormat: '',
    thumbnail: '',
    type: '', // set to either audio or video
    title: '',
};

const formatLength = function(approxDurationMs) {
    itemInfo.secs = Math.round(approxDurationMs / 1000); // returns video length in itemInfo.secs, rounded
    itemInfo.mins = (itemInfo.secs / 60).toFixed(1); // returns minutes with one decimal, ie, 3.4 mins long
    itemInfo.lengthFormatted = Math.floor(itemInfo.mins);
    // 1- Convert to itemInfo.secs:
    // var itemInfo.secs = approxDurationMs / 1000;
    // 2- Extract hours:
    itemInfo.hrs = parseInt(itemInfo.secs / 3600); // 3,600 itemInfo.secs in 1 hour
    itemInfo.secs = itemInfo.secs % 3600; // itemInfo.secs remaining after extracting hours
    // 3- Extract minutes:
    itemInfo.mins = parseInt(itemInfo.secs / 60); // 60 itemInfo.secs in 1 minute
    // 4- Keep only itemInfo.secs not extracted to minutes:
    itemInfo.secs = itemInfo.secs % 60;
    // insert double zeros if the actual value is a single digit #FIX itemInfo to get a count on the character https://stackoverflow.com/questions/14879691/get-number-of-digits-with-javascript
    // get digit count for mins, seconds
    itemInfo.minsDigitCount = (itemInfo.mins + '').replace('.', '').length;
    itemInfo.secsDigitCount = (itemInfo.secs + '').replace('.', '').length;
    itemInfo.secsStr = itemInfo.secs.toString();
    itemInfo.minsStr = itemInfo.mins.toString();
    itemInfo.secsStrLength = itemInfo.secsStr.length;
    if ((itemInfo.minsDigitCount = 1))
        itemInfo.minsStr = '0' + itemInfo.minsStr; // adds a zero to the front of the mins string

    if (itemInfo.secsStrLength === 1) {
        // console.log(`old: ${itemInfo.secsStr}`);
        itemInfo.secsStr = '0' + itemInfo.secsStr; // adds a zero to the front of the secs string
        // console.log(`new: ${itemInfo.secsStr}`);
        // console.log(typeof itemInfo.secsStr);
    }
    // console.log(
    //     `There are ${itemInfo.secsDigitCount} digits in the seconds part`
    // );
    // console.log(`string is ${itemInfo.secsStr.length} characters long`);
    itemInfo.lengthFormatted = `${itemInfo.hrs}:${itemInfo.minsStr}:${itemInfo.secsStr}`;
};

const cloneVideoDetails = function(itemURL, info, avType) {
    // console.log(type);

    startup.dev.downloadSmallestFile ?
        (itemInfo.selectedFormat = info.formats[0]) // sets to smallest format for easy dev downloading
        :
        (itemInfo.selectedFormat = info.formats[1]);
    itemInfo.url = itemURL;
    itemInfo.itemURL = itemURL;
    itemInfo.title = info.videoDetails.title;
    this.formatLength(itemInfo.selectedFormat.approxDurationMs);
    itemInfo.height = itemInfo.selectedFormat.height;
    // itemInfo.type = type; // audio or video
    itemInfo.thumbnail = info.videoDetails.thumbnails[0]; // (or the last thumbnail) usually seems to be highest res thumbnail. thumbn\ails are in descending order from low res to highest res
    itemInfo.thumbnailURL = info.videoDetails.thumbnails[0].url; // (or the last thumbnail) usually seems to be highest res thumbnail. thumbn\ails are in descending order from low res to highest res
    // itemInfo.fileSize;
    itemInfo.fileType = avType === 'audio' ? 'MP3' : 'MP4'; // mp4, etc
    itemInfo.itag = itemInfo.selectedFormat.itag;
    itemInfo.mimeType = itemInfo.selectedFormat.mimeType;
    itemInfo.width = itemInfo.selectedFormat.width;
    itemInfo.height = itemInfo.selectedFormat.height;
    itemInfo.contentLength = itemInfo.selectedFormat.contentLength;
    itemInfo.quality = itemInfo.selectedFormat.quality;
    itemInfo.fps = itemInfo.selectedFormat.fps;
    itemInfo.qualityLabel = itemInfo.selectedFormat.qualityLabel;
    itemInfo.audioQuality = itemInfo.selectedFormat.audioQuality;
    itemInfo.approxDurationMs = itemInfo.selectedFormat.approxDurationMs;
    // itemInfo.filePath = '';
    itemInfo.filePath =
        avType === 'audio' ?
        path.join(fileController.dirAudioPath, `${itemInfo.title}.mp3`) :
        path.join(fileController.dirVideoPath, `${itemInfo.title}.mp4`);
    // this.url = this.selectedFormat.url;
    // this.projectionType = this.selectedFormat.projectionType;
    // this.averageBitrate = this.selectedFormat.averageBitrate;
    // this.lastModified = this.selectedFormat.lastModified;
    // this.bitrate = this.selectedFormat.bitrate;
    // this.audioSampleRate = this.selectedFormat.audioSampleRate;
    // this.audioChannels = this.selectedFormat.audioChannels;
};

const removeVideoDetails = function() {
    itemInfo = {};
};
const removeCharactersFromTitle = function() {
    itemInfo.title = itemInfo.title.replace(`|`, '');
    itemInfo.title = itemInfo.title.replace(`|`, '');
    itemInfo.title = itemInfo.title.replace(`"`, '');
    itemInfo.title = itemInfo.title.replace(`"`, '');
    itemInfo.title = itemInfo.title.replace(`'`, '');
    itemInfo.title = itemInfo.title.replace(`?`, '');
    itemInfo.title = itemInfo.title.replace(`!`, '');
    itemInfo.title = itemInfo.title.replace(`\\`, '');
    itemInfo.title = itemInfo.title.replace(`/`, ' ');
    // itemInfo.title = itemInfo.title.replace(`:`, ' ');
    itemInfo.title = itemInfo.title.replace(`*`, '');
    // itemInfo.title = itemInfo.title.replace(`,`, '');
    // itemInfo.title = itemInfo.title.replace(`<`, ' ');
    // itemInfo.title = itemInfo.title.replace(`>`, ' ');
    itemInfo.title = itemInfo.title.replace(`#`, ' ');
    // console.log(itemInfo.title);
};

const downloadAndWrite = function(itemURL) {
    if (startup.dev.getDownloadItemInfo) {
        setTimeout(() => {
            // this.removeCharactersFromTitle();
            var filePath;
            if (itemInfo.type === 'audio') {
                filePath = path.join(
                    fileController.dirAudioPath,
                    `${itemInfo.title}.mp3` // fix this, needs to be audio and mp3
                );
            } else if (itemInfo.type === 'video') {
                // console.log('its video type');
                filePath = path.join(
                    fileController.dirVideoPath,
                    `${itemInfo.title}.mp4`
                );
                this.finishedFilePath = filePath;
            }
            if (startup.dev.downloadFile) {
                ytdl(itemURL).pipe(fs.createWriteStream(filePath)); // downloads video
            }
        }, 1000);
    }
};
// // #async
const getFileSize = function() {
    // console.log('getFileSize');
};

const getInfo = async function(itemURL, avType) {
    await ytdl.getBasicInfo(itemURL).then((info) => {
        this.cloneVideoDetails(itemURL, info, avType);
        this.removeCharactersFromTitle();
        // console.log(itemInfo.filePath);
        items.addItem(itemInfo, avType);
        items.updateStorage(itemInfo, avType, 'add');
        // items.clickDownloadList(avType);
    });
};

const all = function(itemURL, avType) {
    // console.log(itemURL);
    itemInfo.type = avType;
    this.getInfo(itemURL, avType);

    this.downloadAndWrite(itemURL);
    // console.log(itemInfo.url);
    // itemInfo.getFileSize();
};

// module.exports = itemInfo;

module.exports = {
    itemInfo: itemInfo,
    getInfo: getInfo,
    formatLength: formatLength,
    cloneVideoDetails: cloneVideoDetails,
    removeVideoDetails: removeVideoDetails,
    removeCharactersFromTitle: removeCharactersFromTitle,
    downloadAndWrite: downloadAndWrite,
    getFileSize: getFileSize,
    all: all,
};