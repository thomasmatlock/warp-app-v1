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

export default async function YoutubeDownload(mWin: BrowserWindow, item: any) {
  // let info = await ytdl.getInfo(item.url);

  let audioPath;
  let tempPath = path.join(app.getPath('temp'), 'Warp Downloader');

  let videoPath;
  if (item.type === 'audio') {
    audioPath = path.join(
      Prefs.getAudioPath(),
      item.titleFS + '.' + item.format.toLowerCase()
    );
    try {
      let progressPercentage;
      let downloadComplete = false;
      let downloadConversionComplete = false;
      const currentDownload = ytdl(item.url, {
        // filter: (format) => (format.itag = item.matchedFormat),
      });
      currentDownload.pipe(fs.createWriteStream(tempPath));
      currentDownload.on('progress', (chunkLength, downloaded, total) => {
        progressPercentage = downloaded / total;
        progressPercentage = Math.round(progressPercentage * 100);
        mWin.webContents.send('item-download-progress', [
          item.id,
          progressPercentage,
        ]);
        if (downloaded === total) {
          downloadComplete = true;
        }
        if (downloadComplete) {
          let conversionPercentage;
          let totalLengthSeconds = convertToSeconds(item.lengthSeconds);
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
              KBconverted = progress.currentKbps + KBconverted;
              let secondsConverted = convertToSeconds(progress.timemark);
              conversionPercentage = (
                (secondsConverted / totalLengthSeconds) *
                100
              ).toFixed(0);
              mWin.webContents.send('item-convert-progress', [
                item.id,
                conversionPercentage,
              ]);
            })
            .on('end', () => {
              unlink(tempPath, (err) => {
                if (err) throw err;
              });
              downloadConversionComplete = true;
              mWin.webContents.send('item-conversion-complete', [item.id]);
              let fileSize = fs.statSync(audioPath).size;
              fileSize = fileSize.toFixed(1);
              // console.log(fileSize + 'mb');
              mWin.webContents.send('item-fileSize-retrieved', [
                item.id,
                fileSize,
              ]);
            })
            .save(audioPath); //path where you want to save your file
        }
      });
    } catch (error) {
      console.log(error);
    }
  } else if (item.type === 'video') {
    videoPath = path.join(
      Prefs.getVideoPath(),
      item.titleFS + '.' + item.format.toLowerCase()
    );
    try {
      let progressPercentage;
      let downloadComplete = false;
      let downloadConversionComplete = false;
      const currentDownload = ytdl(item.url, {
        // filter: (format) => (format.itag = item.matchedFormat),
      });
      currentDownload.pipe(fs.createWriteStream(tempPath));
      currentDownload.on('progress', (chunkLength, downloaded, total) => {
        progressPercentage = downloaded / total;
        progressPercentage = Math.round(progressPercentage * 100);
        mWin.webContents.send('item-download-progress', [
          item.id,
          progressPercentage,
        ]);
        if (downloaded === total) {
          downloadComplete = true;
        }
        if (downloadComplete) {
          let conversionPercentage;
          let totalLengthSeconds = convertToSeconds(item.lengthSeconds);
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
              KBconverted = progress.currentKbps + KBconverted;
              let secondsConverted = convertToSeconds(progress.timemark);
              conversionPercentage = (
                (secondsConverted / totalLengthSeconds) *
                100
              ).toFixed(0);
              mWin.webContents.send('item-convert-progress', [
                item.id,
                conversionPercentage,
              ]);
            })
            .on('end', () => {
              unlink(tempPath, (err) => {
                if (err) throw err;
              });
              downloadConversionComplete = true;
              mWin.webContents.send('item-conversion-complete', [item.id]);
              let fileSize = fs.statSync(videoPath).size;
              fileSize = fileSize.toFixed(1);
              // console.log(fileSize + 'mb');
              mWin.webContents.send('item-fileSize-retrieved', [
                item.id,
                fileSize,
              ]);
            })
            .save(videoPath); //path where you want to save your file
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
