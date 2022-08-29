import ytdl from 'ytdl-core';
import fs from 'fs';
import path from 'path';
import Prefs from '../../main/prefsController';
import ffmpeg from 'fluent-ffmpeg';
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
import { unlink } from 'node:fs';
// console.log(ffmpeg);

export default async function YoutubeDownload(item: any) {
  let info = await ytdl.getInfo(item.url);
  // let format = ytdl.chooseFormat(info.formats, { quality: '134' });
  // console.log('Format found!', format);

  let audioPath;
  let audioPathTemp;
  let videoPath;
  console.log(item.matchedFormat);
  if (item.type === 'audio') {
    audioPathTemp = path.join(
      Prefs.getAudioPath(),
      // item.titleFS + '.' + item.format.toLowerCase()
      // item.titleFS + '.' + 'mp3'
      item.titleFS + '.temp'
    );
    audioPath = path.join(
      Prefs.getAudioPath(),
      // item.titleFS + '.' + item.format.toLowerCase()
      item.titleFS + '.' + 'mp3'
      // item.titleFS
    );
    try {
      let progressPercentage;
      let downloadComplete = false;
      let downloadConversionComplete = false;
      const currentDownload = ytdl(item.url, {
        filter: (format) => (format.itag = item.matchedFormat),
      }); // downloads video
      currentDownload.pipe(fs.createWriteStream(audioPathTemp)); // downloads video
      currentDownload.on('progress', (chunkLength, downloaded, total) => {
        progressPercentage = downloaded / total;
        progressPercentage = Math.round(progressPercentage * 100) + '%';
        console.log(progressPercentage);
        if (downloaded === total) {
          // if ((percent = '100%')) {
          console.log('complete');
          downloadComplete = true;
        }
        if (downloadComplete) {
          console.log('converting');
          ffmpeg(audioPathTemp)
            .toFormat('mp3')
            .on('error', (err) => {
              console.log('An error occurred: ' + err.message);
            })
            .on('progress', (progress) => {
              // console.log(JSON.stringify(progress));
              console.log(
                'Processing: ' + progress.targetSize + ' KB converted'
              );
            })
            .on('end', () => {
              console.log('Processing finished !');
              unlink(audioPathTemp, (err) => {
                if (err) throw err;
                console.log('temp file was deleted');
              });
            })
            .save(audioPath); //path where you want to save your file
          // downloadConversionComplete = true;
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
