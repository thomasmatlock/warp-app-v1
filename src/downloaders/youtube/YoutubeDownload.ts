import ytdl from 'ytdl-core';
import fs from 'fs';
import path from 'path';
import { app, BrowserWindow } from 'electron';
import ffmpeg from 'fluent-ffmpeg';
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
import convertToSeconds from './convertTimeToSeconds';
import getETA from './getETA';

export default async function YoutubeDownload(mWin: BrowserWindow, item: any) {
  let randomInt = (Math.floor(Math.random() * 1000000) + 1).toString();

  let tempPath = path.join(app.getPath('temp'), 'Warp Downloader' + randomInt);
  try {
    let progressPercentage;
    let downloadComplete = false;
    let downloadConversionComplete = false;
    const currentDownload = ytdl(item.url, {
      // filter: (format) => (format.itag = item.matchedFormat),
    });
    currentDownload.pipe(fs.createWriteStream(tempPath));
    let downloadBeginTime = Date.now();
    let conversionBeginTime;
    currentDownload.on('progress', (chunkLength, downloaded, total) => {
      // getETA(downloadBeginTime, Date.now(), downloaded / total);
      progressPercentage = downloaded / total;
      // console.log(progressPercentage);
      progressPercentage = Math.round(progressPercentage * 100);

      mWin.webContents.send('item-download-progress', [
        item.id,
        progressPercentage,
      ]);
      mWin.webContents.send('item-download-eta-seconds-remaining', [
        item.id,
        getETA(downloadBeginTime, Date.now(), downloaded / total),
      ]);
      if (downloaded === total) {
        downloadComplete = true;
        conversionBeginTime = Date.now();
      }
      if (downloadComplete) {
        let conversionPercentage;
        let totalLengthSeconds = convertToSeconds(item.lengthSeconds);
        let KBconverted = 0;
        ffmpeg(tempPath)
          .toFormat(item.format.toLowerCase())
          .on('error', (err) => {
            console.log(err);

            fs.unlink(tempPath, (err) => {
              if (err) console.log(err);
            });
          })
          .on('progress', (progress) => {
            // console.log(progress);
            // progress keys
            //            frames: NaN,
            // currentFps: NaN,
            // currentKbps: 128,
            // targetSize: 13607,
            // timemark: '00:14:30.79'

            KBconverted = progress.currentKbps + KBconverted;
            let secondsConverted = convertToSeconds(progress.timemark);
            conversionPercentage = (
              (secondsConverted / totalLengthSeconds) *
              100
            ).toFixed(0);
            // getETA(conversionBeginTime, Date.now(), conversionPercentage / 100);

            mWin.webContents.send('item-convert-progress', [
              item.id,
              conversionPercentage,
            ]);
            mWin.webContents.send('item-conversion-eta-seconds-remaining', [
              item.id,
              getETA(
                conversionBeginTime,
                Date.now(),
                conversionPercentage / 100
              ),
            ]);
          })
          .on('end', () => {
            fs.unlink(tempPath, (err) => {
              // if (err) throw err;
              if (err) console.log(err);
            });
            downloadConversionComplete = true;
            mWin.webContents.send('item-conversion-complete', [item.id]);
            let fileSize = fs.statSync(item.path).size;
            fileSize = fileSize.toFixed(1);
            mWin.webContents.send('item-fileSize-retrieved', [
              item.id,
              fileSize,
            ]);
          })
          .save(item.path);
      }
    });
  } catch (error) {
    console.log(error);
  }
}
