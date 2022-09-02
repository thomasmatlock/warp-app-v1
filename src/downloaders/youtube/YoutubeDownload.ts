import ytdl from 'ytdl-core';
import fs from 'fs';
import https from 'https';
import path from 'path';
// const { Readable } = require('node:stream');
const stream = require('node:stream');
import got from 'got';
import { app, BrowserWindow, shell } from 'electron';
import ffmpeg from 'fluent-ffmpeg';
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const request = require('request');
import convertToSeconds from './convertTimeToSeconds';
import getETA from './getETA';
import convertFile from './convertFile';
const Downloader = require('nodejs-file-downloader');

export default async function YoutubeDownload(mWin: BrowserWindow, item: any) {
  let randomInt = (Math.floor(Math.random() * 1000000) + 1).toString();
  // console.log(item.formats.length + ' formats');
  // console.log(item.type, item.format, item.path);

  let tempPath =
    item.type === 'audio'
      ? path.join(
          app.getPath('temp'),
          'Warp Downloader' + randomInt + '.m4a'
          // item.titleFS + '.m4a'
        )
      : path.join(app.getPath('temp'), 'Warp Downloader' + randomInt + '.mp4');
  let highWaterMark = Math.pow(4, 16);

  let dlChunkSize = 20;
  console.log(highWaterMark);

  console.log(dlChunkSize);

  try {
    let progressPercentage;
    let downloadComplete = false;
    let downloadConversionComplete = false;
    const currentDownload = ytdl(item.url, {
      // https://github.com/fent/node-ytdl-core
      // quality: 'highest',
      // dlChunkSize: dlChunkSize,
      highWaterMark: highWaterMark,
      // requestOptions: { agent },
      // filter: (format) => (format.itag = item.matchedFormat),
      // filter: (format) => (format.itag = 240),
    });
    currentDownload.pipe(fs.createWriteStream(tempPath));
    let downloadBeginTime = Date.now();
    let endTime;
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
        let downloadTime = ((Date.now() - downloadBeginTime) / 1000).toFixed(1);
        let marker =
          '/////////////////////////////////////////////////////////////////////////////////';
        console.log(marker);
        console.log('DOWNLOAD TIME ELAPSED', downloadTime, 'seconds');
        console.log(marker);
      }
      if (downloadComplete) {
        let conversionPercentage;
        let totalLengthSeconds = convertToSeconds(item.lengthSeconds);
        let KBconverted = 0;
        ffmpeg(tempPath)
          .toFormat(item.format.toLowerCase())
          .on('error', (err) => {
            console.log(err);

            // fs.unlink(tempPath, (err) => {
            //   if (err) console.log(err);
            // });
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
