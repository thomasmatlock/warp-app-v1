const logging = true;
const fs = require('fs');
const path = require('path');
const ytdl = require('ytdl-core');
const fileControllerReq = require('./system/fileController');
const fileController = new fileControllerReq();
const startupReq = require('./system/startup');
const startup = new startupReq();

const dlhandler = {
    itemURL: '',
    type: '', // set to either audio or video
    selectedFormat: '',
    thumbnail: '',
    title: '',
    secs: '',
    mins: '',
    hrs: '',
    lengthFormatted: '',
    fileSize: '',
    height: '',
    fps: '',
    fileType: '',
    format: '', // which of the 35 formats, from 1080p, 720p60, etc
};

exports.getInfo = async function(itemURL) {
    // console.log(itemURL);
    await ytdl.getBasicInfo(itemURL).then((info) => {
        this.cloneVideoDetails(itemURL, info, this.type);
        if (logging)
            console.log(`
                ${dlhandler.title},${dlhandler.lengthFormatted} long,${dlhandler.type} type,${dlhandler.height} pixels tall,${dlhandler.fps} fps`);
    });
};

exports.formatLength = function(approxDurationMs) {
    dlhandler.secs = Math.round(approxDurationMs / 1000); // returns video length in dlhandler.secs, rounded
    dlhandler.mins = (dlhandler.secs / 60).toFixed(1); // returns minutes with one decimal, ie, 3.4 mins long
    dlhandler.lengthFormatted = Math.floor(dlhandler.mins);
    // 1- Convert to dlhandler.secs:
    // var dlhandler.secs = approxDurationMs / 1000;
    // 2- Extract hours:
    dlhandler.hrs = parseInt(dlhandler.secs / 3600); // 3,600 dlhandler.secs in 1 hour
    dlhandler.secs = dlhandler.secs % 3600; // dlhandler.secs remaining after extracting hours
    // 3- Extract minutes:
    dlhandler.mins = parseInt(dlhandler.secs / 60); // 60 dlhandler.secs in 1 minute
    // 4- Keep only dlhandler.secs not extracted to minutes:
    dlhandler.secs = dlhandler.secs % 60;
    // insert double zeros if the actual value is a single digit #FIX dlhandler to get a count on the character https://stackoverflow.com/questions/14879691/get-number-of-digits-with-javascript
    // get digit count for mins, seconds
    dlhandler.minsDigitCount = (dlhandler.mins + '').replace('.', '').length;
    dlhandler.secsDigitCount = (dlhandler.secs + '').replace('.', '').length;
    dlhandler.secsStr = dlhandler.secs.toString();
    dlhandler.minsStr = dlhandler.mins.toString();
    if ((dlhandler.minsDigitCount = 1))
        dlhandler.minsStr = '0' + dlhandler.minsStr; // adds a zero to the front of the mins string
    dlhandler.lengthFormatted = `${dlhandler.hrs}:${dlhandler.minsStr}:${dlhandler.secsStr}`;
};

exports.cloneVideoDetails = function(itemURL, info, type) {
    console.log(itemURL);

    startup.dev.downloadSmallestFile ?
        (dlhandler.selectedFormat = info.formats[0]) // sets to smallest format for easy dev downloading
        :
        (dlhandler.selectedFormat = info.formats[1]);
    dlhandler.url = itemURL;
    dlhandler.itemURL = itemURL;
    dlhandler.title = info.videoDetails.title;
    this.formatLength(dlhandler.selectedFormat.approxDurationMs);
    dlhandler.height = dlhandler.selectedFormat.height;
    // dlhandler.type = type; // audio or video
    dlhandler.thumbnail = info.videoDetails.thumbnails[3]; // (or the last thumbnail) usually seems to be highest res thumbnail. thumbn\ails are in descending order from low res to highest res
    dlhandler.thumbnailURL = info.videoDetails.thumbnails[3].url; // (or the last thumbnail) usually seems to be highest res thumbnail. thumbn\ails are in descending order from low res to highest res
    // dlhandler.fileSize;
    dlhandler.fileType = 'MP4'; // mp4, etc
    dlhandler.itag = dlhandler.selectedFormat.itag;
    dlhandler.mimeType = dlhandler.selectedFormat.mimeType;
    dlhandler.width = dlhandler.selectedFormat.width;
    dlhandler.height = dlhandler.selectedFormat.height;
    dlhandler.contentLength = dlhandler.selectedFormat.contentLength;
    dlhandler.quality = dlhandler.selectedFormat.quality;
    dlhandler.fps = dlhandler.selectedFormat.fps;
    dlhandler.qualityLabel = dlhandler.selectedFormat.qualityLabel;
    dlhandler.audioQuality = dlhandler.selectedFormat.audioQuality;
    dlhandler.approxDurationMs = dlhandler.selectedFormat.approxDurationMs;
    dlhandler.filePath = '';
    dlhandler.finishedFilePath;
    // this.url = this.selectedFormat.url;
    // this.projectionType = this.selectedFormat.projectionType;
    // this.averageBitrate = this.selectedFormat.averageBitrate;
    // this.lastModified = this.selectedFormat.lastModified;
    // this.bitrate = this.selectedFormat.bitrate;
    // this.audioSampleRate = this.selectedFormat.audioSampleRate;
    // this.audioChannels = this.selectedFormat.audioChannels;
};
exports.removeCharactersFromTitle = function() {
    // console.log('removeCharactersFromTitle');
    dlhandler.title = dlhandler.title.replace('/', '');
    dlhandler.title = dlhandler.title.replace('?', '');
    dlhandler.title = dlhandler.title.replace(`\\`, '');
    dlhandler.title = dlhandler.title.replace(':', '');
    dlhandler.title = dlhandler.title.replace('*', '');
    dlhandler.title = dlhandler.title.replace(`"`, '');
    dlhandler.title = dlhandler.title.replace('<', '');
    dlhandler.title = dlhandler.title.replace('>', '');
    dlhandler.title = dlhandler.title.replace(`|`, '');
    // // if (this.logging) console.log('removed characters from title');
};

exports.downloadAndWrite = function(itemURL) {
    setTimeout(() => {
        this.removeCharactersFromTitle();
        var filePath;
        // console.log(this.type);
        if (dlhandler.type === 'audio') {
            // console.log('its audio type');
            filePath = path.join(
                fileController.dirAudioPath,
                `${dlhandler.title}.mp3` // fix this, needs to be audio and mp3
            );
            // this.finishedFilePath = filepath;
            // console.log(this.finishedFilePath);
        } else if (dlhandler.type === 'video') {
            // console.log('its video type');
            filePath = path.join(
                fileController.dirVideoPath,
                `${dlhandler.title}.mp4`
            );
            // this.finishedFilePath = filepath;
            // console.log(this.finishedFilePath);
        }
        if (startup.dev.downloadFile) {
            console.log('item downloaded');
            ytdl(itemURL).pipe(fs.createWriteStream(filePath)); // downloads video
        }
        if (logging && !startup.dev.downloadFile) {
            console.log('item info pulled, but not downloaded');
        }
        // if (logging) console.log(this);
    }, 1000);
};
// // #async
exports.getFileSize = function() {
    // console.log('getFileSize');
};

exports.all = function(itemURL, type) {
    dlhandler.type = type;
    // console.log(type, dlhandler.type);
    this.getInfo(itemURL);
    // console.log(dlhandler);
    this.downloadAndWrite(itemURL);
    // dlhandler.getFileSize();
};

// module.exports = dlhandler;