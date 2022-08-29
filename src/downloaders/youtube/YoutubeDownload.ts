import ytdl from 'ytdl-core';
import fs from 'fs';
import path from 'path';
import { app, BrowserWindow } from 'electron';
import Prefs from '../../main/prefsController';
import ffmpeg from 'fluent-ffmpeg';
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
import { unlink } from 'node:fs';
import fs from 'fs';
import convertToSeconds from './convertTimeToSeconds';

// Convert the file size to megabytes (optional)
// var fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
// console.log(ffmpeg);

export default async function YoutubeDownload(mWin: BrowserWindow, item: any) {
  let info = await ytdl.getInfo(item.url);
  // let format = ytdl.chooseFormat(info.formats, { quality: '134' });
  // console.log('Format found!', format);
  // console.log(item.format.toLowerCase());
  console.log(item.fileSize);

  let audioPath;
  let tempPath = path.join(app.getPath('temp'), 'Warp Downloader');

  let videoPath;
  // console.log(item.matchedFormat);
  if (item.type === 'audio') {
    // audioPathTemp = path.join(
    //   Prefs.getAudioPath(),
    //   // item.titleFS + '.' + item.format.toLowerCase()
    //   // item.titleFS + '.' + 'mp3'
    //   item.titleFS + '.temp'
    // );
    audioPath = path.join(
      Prefs.getAudioPath(),
      item.titleFS + '.' + item.format.toLowerCase()
      // item.titleFS + '.' + 'mp3'
      // item.titleFS
    );
    try {
      let progressPercentage;
      let downloadComplete = false;
      let downloadConversionComplete = false;
      const currentDownload = ytdl(item.url, {
        // filter: (format) => (format.itag = item.matchedFormat),
      }); // downloads video
      currentDownload.pipe(fs.createWriteStream(tempPath)); // downloads video
      currentDownload.on('progress', (chunkLength, downloaded, total) => {
        progressPercentage = downloaded / total;
        progressPercentage = Math.round(progressPercentage * 100) + '%';
        // console.log(progressPercentage);
        mWin.webContents.send('item-download-progress', [
          item.id,
          progressPercentage,
        ]);
        if (downloaded === total) {
          // if ((percent = '100%')) {
          // console.log('complete');
          downloadComplete = true;
        }
        if (downloadComplete) {
          let fileSizeInKB = fs.statSync(tempPath).size / 1000;
          let conversionPercentage;
          let totalLengthSeconds = convertToSeconds(item.lengthSeconds);
          // console.log('converting');
          let KBconverted = 0;
          ffmpeg(tempPath)
            // .toFormat('mp3')
            .toFormat(item.format.toLowerCase())
            .on('error', (err) => {
              console.log('An error occurred: ' + err.message);
              unlink(tempPath, (err) => {
                if (err) throw err;
              });
            })
            .on('progress', (progress) => {
              // console.log(totalLengthSeconds, 'lengthSeconds');

              KBconverted = progress.currentKbps + KBconverted;
              // console.log(KBconverted, 'KB converted');
              // console.log(KBconverted, 'KB converted');
              let secondsConverted = convertToSeconds(progress.timemark);
              // console.log(secondsConverted, 'seconds converted');
              // console.log(totalLengthSeconds, 'total seconds to convert');

              // console.log(progress.currentKbps, 'kbps');
              // conversionPercentage = (
              //   (KBconverted / fileSizeInKB) *
              //   400
              // ).toFixed(0);
              conversionPercentage = (
                (secondsConverted / totalLengthSeconds) *
                100
              ).toFixed(0);
              console.log(conversionPercentage + '% converted');
              mWin.webContents.send('item-convert-progress', [
                item.id,
                conversionPercentage,
              ]);
              // progress.frames;
              // progress.currentFps;
              // progress.currentKbps;
              // progress.targetSize;
              // progress.timemark;
              // for (const item in progress) console.log(item);
            })
            .on('end', () => {
              unlink(tempPath, (err) => {
                if (err) throw err;
              });
              downloadConversionComplete = true;
              console.log('conversion complete');
              let fileSize = fs.statSync(audioPath).size / 1000000;
              fileSize = fileSize.toFixed(1);
              console.log(fileSize + 'mb');
            })
            .save(audioPath); //path where you want to save your file

          // downloadConversionComplete = true;
        }
        // if (downloadConversionComplete) {
        //   let fileSizeInMB = fs.statSync(audioPath).size / 1000000;
        //   let fileSizeInKB = fs.statSync(audioPath).size / 1000;
        //   fileSizeInMB = fileSizeInMB.toFixed(1);
        //   fileSizeInKB = fileSizeInKB.toFixed(0);
        //   console.log(fileSizeInMB);
        // }
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
