const logging = true;
const fs = require('fs');
const path = require('path');
const ytdl = require('ytdl-core');
const fileControllerReq = require('./system/fileController');
const fileController = new fileControllerReq();
const startupReq = require('./system/startup');
const startup = new startupReq();

const dlhandler = {
    itemURL: 'this is the dlhandler',
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
    // await ytdl.getBasicInfo(itemURL).then((info) => {
    //     this.cloneVideoDetails(info, this.type);
    //     if (logging)
    //         console.log(`
    //             ${dlhandler.title},${dlhandler.lengthFormatted} long,${dlhandler.type} type,${dlhandler.height} pixels tall,${dlhandler.fps} fps`);
    // });
};

exports.formatLength = function(approxDurationMs) {
    // console.log('formatLength');
    // this.secs = Math.round(approxDurationMs / 1000); // returns video length in this.secs, rounded
    // this.mins = (this.secs / 60).toFixed(1); // returns minutes with one decimal, ie, 3.4 mins long
    // this.lengthFormatted = Math.floor(this.mins);
    // // 1- Convert to this.secs:
    // // var this.secs = approxDurationMs / 1000;
    // // 2- Extract hours:
    // this.hrs = parseInt(this.secs / 3600); // 3,600 this.secs in 1 hour
    // this.secs = this.secs % 3600; // this.secs remaining after extracting hours
    // // 3- Extract minutes:
    // this.mins = parseInt(this.secs / 60); // 60 this.secs in 1 minute
    // // 4- Keep only this.secs not extracted to minutes:
    // this.secs = this.secs % 60;
    // // insert double zeros if the actual value is a single digit #FIX this to get a count on the character https://stackoverflow.com/questions/14879691/get-number-of-digits-with-javascript
    // // get digit count for mins, seconds
    // this.minsDigitCount = (this.mins + '').replace('.', '').length;
    // this.secsDigitCount = (this.secs + '').replace('.', '').length;
    // this.secsStr = this.secs.toString();
    // this.minsStr = this.mins.toString();
    // if ((this.minsDigitCount = 1)) this.minsStr = '0' + this.minsStr; // adds a zero to the front of the mins string
    // this.lengthFormatted = `${this.hrs}:${this.minsStr}:${this.secsStr}`;
};

exports.cloneVideoDetails = function(info, type) {
    // console.log('cloneVideoDetails');
    // startup.dev.downloadSmallestFile ?
    //     (this.selectedFormat = info.formats[0]) // sets to smallest format for easy dev downloading
    //     :
    //     (this.selectedFormat = info.formats[1]);
    // this.title = info.videoDetails.title;
    // this.formatLength(this.selectedFormat.approxDurationMs);
    // this.height = this.selectedFormat.height;
    // // this.type = type; // audio or video
    // this.thumbnail = info.videoDetails.thumbnails[3]; // (or the last thumbnail) usually seems to be highest res thumbnail. thumbn\ails are in descending order from low res to highest res
    // this.thumbnailURL = info.videoDetails.thumbnails[3].url; // (or the last thumbnail) usually seems to be highest res thumbnail. thumbn\ails are in descending order from low res to highest res
    // // this.fileSize;
    // this.fileType = 'MP4'; // mp4, etc
    // this.itag = this.selectedFormat.itag;
    // this.mimeType = this.selectedFormat.mimeType;
    // this.width = this.selectedFormat.width;
    // this.height = this.selectedFormat.height;
    // this.contentLength = this.selectedFormat.contentLength;
    // this.quality = this.selectedFormat.quality;
    // this.fps = this.selectedFormat.fps;
    // this.qualityLabel = this.selectedFormat.qualityLabel;
    // this.audioQuality = this.selectedFormat.audioQuality;
    // this.approxDurationMs = this.selectedFormat.approxDurationMs;
    // this.filePath = '';
    // this.finishedFilePath;
    // // this.url = this.selectedFormat.url;
    // // this.projectionType = this.selectedFormat.projectionType;
    // // this.averageBitrate = this.selectedFormat.averageBitrate;
    // // this.lastModified = this.selectedFormat.lastModified;
    // // this.bitrate = this.selectedFormat.bitrate;
    // // this.audioSampleRate = this.selectedFormat.audioSampleRate;
    // // this.audioChannels = this.selectedFormat.audioChannels;
};
exports.removeCharactersFromTitle = function() {
    // console.log('removeCharactersFromTitle');
    // this.title = this.title.replace('/', '');
    // this.title = this.title.replace('?', '');
    // this.title = this.title.replace(`\\`, '');
    // this.title = this.title.replace(':', '');
    // this.title = this.title.replace('*', '');
    // this.title = this.title.replace(`"`, '');
    // this.title = this.title.replace('<', '');
    // this.title = this.title.replace('>', '');
    // this.title = this.title.replace(`|`, '');
    // // if (this.logging) console.log('removed characters from title');
};

exports.downloadAndWrite = function(itemURL) {
    // console.log('downloadAndWrite');
    // setTimeout(() => {
    //     this.removeCharactersFromTitle();
    //     var filePath;
    //     // console.log(this.type);
    //     if (this.type === 'audio') {
    //         // console.log('its audio type');
    //         filePath = path.join(
    //             fileController.dirAudioPath,
    //             `${this.title}.mp3` // fix this, needs to be audio and mp3
    //         );
    //         // this.finishedFilePath = filepath;
    //         // console.log(this.finishedFilePath);
    //     } else if (this.type === 'video') {
    //         // console.log('its video type');
    //         filePath = path.join(
    //             fileController.dirVideoPath,
    //             `${this.title}.mp4`
    //         );
    //         // this.finishedFilePath = filepath;
    //         // console.log(this.finishedFilePath);
    //     }
    //     if (startup.dev.downloadFile) {
    //         console.log('item downloaded');
    //         ytdl(itemURL).pipe(fs.createWriteStream(filePath)); // downloads video
    //     }
    //     if (logging && !startup.dev.downloadFile) {
    //         console.log('item info pulled, but not downloaded');
    //     }
    //     // if (logging) console.log(this);
    // }, 1000);
};
// // #async
exports.getFileSize = function() {
    // console.log('getFileSize');
};

exports.all = function(itemURL, type) {
    // console.log('all');
    // this.type = type;
    // // console.log(type, this.type);
    // this.getInfo(itemURL);
    // this.downloadAndWrite(itemURL);
    // this.getFileSize();
};

// module.exports = dlhandler;