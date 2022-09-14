const logging = true;
const fs = require('fs');
const path = require('path');
const ytdl = require('ytdl-core');
const fileControllerReq = require('./fileController');
const fileController = new fileControllerReq();
const defaultsReq = require('./defaults');
const defaults = new defaultsReq();
const items = require('../renderer/items');
const { v4: uuidv4 } = require('uuid');

let itemInfo = {
    fileSize: '',
    fileType: '',
    format: '', // which of the 35 formats, from 1080p, 720p60, etc
    fps: '',
    height: '',
    hrs: '',
    id: '',
    itemURL: '',
    lengthFormatted: '',
    secs: '',
    mins: '',
    platform: '',
    selectedFormat: '',
    thumbnail: '',
    type: '', // set to either audio or video
    title: '',
};

let pathAudio;
let pathVideo;
let fileFormat;

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
    if ((itemInfo.minsDigitCount = 1)) itemInfo.minsStr = '0' + itemInfo.minsStr; // adds a zero to the front of the mins string

    if (itemInfo.secsStrLength === 1) {
        itemInfo.secsStr = '0' + itemInfo.secsStr; // adds a zero to the front of the secs string
    }

    itemInfo.lengthFormatted = `${itemInfo.hrs}:${itemInfo.minsStr}:${itemInfo.secsStr}`;
};
const cloneVideoDetails = function(itemURL, info, avType) {
    // console.log(avType);
    defaults.dev.downloadSmallestFile ?
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
    // itemInfo.fileType = avType === 'audio' ? 'MP3' : 'MP4'; // mp4, etc
    itemInfo.fileType = fileFormat.toUpperCase(); // mp4, etc
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

    itemInfo.filepath =
        avType === 'audio' // path.join(fileController.dirAudioPath, `${itemInfo.title}.mp3`) :
        ? // path.join(fileController.dirVideoPath, `${itemInfo.title}.mp4`);
        path.join(pathAudio, `${itemInfo.title}.${fileFormat}`) :
        path.join(pathVideo, `${itemInfo.title}.${fileFormat}`);
    itemInfo.id = uuidv4();
    // console.log(itemInfo.title);
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
    itemInfo.title = itemInfo.title.replace(`*`, '');
    itemInfo.title = itemInfo.title.replace(`#`, ' ');
    // itemInfo.title = itemInfo.title.replace(`:`, ' ');
    // itemInfo.title = itemInfo.title.replace(`,`, '');
    // itemInfo.title = itemInfo.title.replace(`<`, ' ');
    // itemInfo.title = itemInfo.title.replace(`>`, ' ');
};
const downloadAndWrite = function(itemURL) {
    if (defaults.dev.getDownloadItemInfo) {
        (async() => {
            let filepath = createFilePath();
            // console.log(filepath);
            if (defaults.dev.downloadFile) {
                ytdl(this.itemInfo.url).pipe(fs.createWriteStream(filepath)); // downloads video
            }
        })();
    }
};
const getFileSize = function() {};
const createFilePath = function(itemURL, avType, platform, storage) {
    if (itemInfo.type === 'audio') {
        return path.join(
            pathAudio,
            `${itemInfo.title}.${fileFormat}` // fix this, needs to be audio and mp3
        );
    } else if (itemInfo.type === 'video') {
        return path.join(pathVideo, `${itemInfo.title}.${fileFormat}`);
    }
};
const getInfo = async function(itemURL, avType, platform, storage) {
    try {
        await ytdl.getBasicInfo(itemURL).then((info) => {
            this.cloneVideoDetails(itemURL, info, avType);
            this.removeCharactersFromTitle();
            itemInfo.filepath = createFilePath(itemURL, avType, platform, storage);
            // items.insertdownloadedPercentage(this.itemInfo)
            const video = ytdl(this.itemInfo.url, {
                // requestOptions: {
                //     // headers: {
                //     //     cookie: COOKIE,
                //     //     // Optional. If not given, ytdl-core will try to find it.
                //     //     // You can find this by going to a video's watch page, viewing the source,
                //     //     // and searching for "ID_TOKEN".
                //     //     // 'x-youtube-identity-token': 1324,
                //     // },
                // },
            });

            // video.on('info', info => {
            //     console.log('title:', info.videoDetails.title);
            //     console.log('rating:', info.player_response.videoDetails.averageRating);
            //     console.log('uploaded by:', info.videoDetails.author.name);
            // });

            let inserted = false;
            let completed = false;
            let lastDownloaded = 0;
            video.on('progress', (chunkLength, downloaded, total) => {
                const percent = downloaded / total;
                // console.log(downloaded, total);
                lastDownloaded = downloaded;
                if (!inserted) {
                    items.insertdownloadedPercentage(this.itemInfo, percent, 'add');

                    inserted = true;
                }
                if (inserted) {}
                // if (lastDownloaded = downloaded) {
                setTimeout(() => {
                    if ((downloaded = total)) {
                        items.insertdownloadedPercentage(
                            this.itemInfo,
                            percent,
                            'complete'
                        );
                    }
                }, 2000);
            });
            this.downloadAndWrite(itemURL);
            items.addItem(itemInfo, avType);
            items.updateStorage(itemInfo, avType, 'add');
        });
    } catch (error) {
        console.log(error);
    }
};
const getFormat = function(avType, storage) {
    // console.log(avType);
    // console.log(storage.user.prefs);
    for (var key in storage.user.prefs) {
        if (storage.user.prefs.hasOwnProperty(key)) {
            if (key.substr(0, 5) === avType && key.includes('Format')) {
                // console.log(key.length - 3, key.length);
                if (storage.user.prefs[key]) {
                    // console.log(storage.user.prefs[key]);
                    // console.log(key);
                    fileFormat = key.slice(key.length - 3, key.length);
                    fileFormat = fileFormat.toLowerCase();
                    // console.log(fileFormat);
                }
            }
        }
    }
};
const all = function(itemURL, avType, platform, storage) {
    // console.log(avType);
    // console.log(storage.user.prefs);
    pathAudio = storage.user.prefs.pathAudio;
    pathVideo = storage.user.prefs.pathVideo;
    getFormat(avType, storage);
    // console.log(itemURL);
    // console.log(avType);
    itemInfo.type = avType;
    itemInfo.platform = platform;
    this.getInfo(itemURL, avType, platform, storage);
    // itemInfo.getFileSize();
};

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