import ytdl from 'ytdl-core';
import fs from 'fs';
import path from 'path';
import Prefs from '../../main/prefsController';
const ffmpeg = require('fluent-ffmpeg');
// console.log(ffmpeg);

export default async function YoutubeDownload(item: any) {
  let info = await ytdl.getInfo(item.url);
  // let format = ytdl.chooseFormat(info.formats, { quality: '134' });
  // console.log('Format found!', format);

  let audioPath;
  let videoPath;
  console.log(item.matchedFormat);
  if (item.type === 'audio') {
    audioPath = path.join(
      Prefs.getAudioPath(),
      // item.titleFS + '.' + item.format.toLowerCase()
      item.titleFS + '.' + 'mp3'
    );
    try {
      let progressPercentage;
      let downloadComplete = false;
      let downloadConversionComplete = false;
      const currentDownload = ytdl(item.url, {
        filter: (format) => (format.itag = item.matchedFormat),
      }); // downloads video
      currentDownload.pipe(fs.createWriteStream(audioPath)); // downloads video
      currentDownload.on('progress', (chunkLength, downloaded, total) => {
        progressPercentage = downloaded / total;
        progressPercentage = Math.round(progressPercentage * 100) + '%';
        console.log(progressPercentage);
        if (downloaded === total) {
          // if ((percent = '100%')) {
          console.log('complete');
          downloadComplete = true;
        }
        // console.log(downloaded, total);
        // lastDownloaded = downloaded;
        // if (!inserted) {
        //   items.insertPercentDownloaded(this.itemInfo, percent, 'add');

        //   inserted = true;
        // }
        // if (inserted) {
        // }
        // if (lastDownloaded = downloaded) {
        // setTimeout(() => {
        //     items.insertPercentDownloaded(this.itemInfo, percent, 'complete');
        // }, 2000);
      });
    } catch (error) {
      console.log(error);
    }
  } else if (item.type === 'video') {
    // let videoFormatsVideoOnly = ytdl.filterFormats(info.formats, 'videoonly');
    // console.log(videoFormatsVideoOnly.length);
    // let audioandvideo = ytdl.filterFormats(info.formats, 'audioandvideo');
    // let videoandaudio = ytdl.filterFormats(info.formats, 'videoandaudio');
    // console.log(audioandvideo.length);
    // console.log(videoandaudio.length);
    videoPath = path.join(
      Prefs.getVideoPath(),
      item.titleFS + '.' + item.format.toLowerCase()
    );
    try {
      let progressPercentage;
      let downloadComplete = false;
      let downloadConversionComplete = false;
      const currentDownload = ytdl(item.url, {
        filter: (format) => (format.itag = item.matchedFormat),
      }); // downloads video
      currentDownload.pipe(fs.createWriteStream(videoPath)); // downloads video
      currentDownload.on('progress', (chunkLength, downloaded, total) => {
        progressPercentage = downloaded / total;
        progressPercentage = Math.round(progressPercentage * 100) + '%';
        console.log(progressPercentage);
        if (downloaded === total) {
          // if ((percent = '100%')) {
          console.log('complete');
          downloadComplete = true;
        }
        // console.log(downloaded, total);
        // lastDownloaded = downloaded;
        // if (!inserted) {
        //   items.insertPercentDownloaded(this.itemInfo, percent, 'add');

        //   inserted = true;
        // }
        // if (inserted) {
        // }
        // if (lastDownloaded = downloaded) {
        // setTimeout(() => {
        //     items.insertPercentDownloaded(this.itemInfo, percent, 'complete');
        // }, 2000);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
