import ytdl from 'ytdl-core';
import fs from 'fs';
import path from 'path';
// const { Readable } = require('node:stream');
const stream = require('node:stream');
import got from 'got';
import { app, BrowserWindow, shell } from 'electron';
import ffmpeg from 'fluent-ffmpeg';
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
import convertToSeconds from './convertTimeToSeconds';
import getETA from './getETA';
import convertFile from './convertFile';

export default async function YoutubeDownload(mWin: BrowserWindow, item: any) {
  let randomInt = (Math.floor(Math.random() * 1000000) + 1).toString();
  let randomInt2 = (Math.floor(Math.random() * 1000000) + 1).toString();
  console.log(item.formats.length + ' formats');
  console.log(item.type, item.format, item.path);

  // let tempPath;
  let tempPath = path.join(app.getPath('temp'), 'Warp Downloader' + randomInt);
  let audioTempPath = path.join(
    app.getPath('temp'),
    'Warp Downloader' + randomInt + '.m4a'
    // item.titleFS + '.' + item.format.toLowerCase()
    // item.titleFS + '.m4a'
    // item.titleFS + '.weba'
  );
  let videoTempPath = path.join(
    app.getPath('temp'),
    // item.titleFS + '.' + item.format.toLowerCase()
    'Warp Downloader' + randomInt + '.mp4'
    // item.titleFS + '.mp4'
    // item.titleFS
    // item.titleFS + '.weba'
  );
  if (item.format.type === 'audio') {
    tempPath = audioTempPath;
  } else {
    tempPath = videoTempPath;
  }
  // CUSTOM METHOD
  try {
    let progressPercentage;
    let downloadComplete = false;
    let downloadConversionComplete = false;
    let downloadBeginTime = Date.now();
    let conversionBeginTime;
    // stream.Readable.fromWeb;
    // https://github.com/sindresorhus/got/blob/main/documentation/3-streams.md
    const customStream = got.stream(item.matchedFormat.url, {}); // DEFAULT USE THIS
    console.log(customStream);

    if (item.type === 'video') {
      // shell.openExternal(item.matchedFormat.url);
    }
    // console.log(customStream);

    // const customStream = got.stream(item.formats[0].url); // TESTING ONLY, FOR SMALL FILE
    // customStream.pipe(fs.createWriteStream(item.path));
    customStream.pipe(fs.createWriteStream(tempPath), {
      // chunkSize: 256 * 1024,
      // highWaterMark: 128 * 1024,
      // highWaterMark: 1024 * 1024,
    });
    customStream.on('downloadProgress', (progress) => {
      // let downloaded
      // progress.percent
      // progress.transferred = downloaded;
      // progress.total
      progress.percent = Math.floor(progress.percent * 100);
      progressPercentage = progress.percent;
      mWin.webContents.send('item-download-progress', [
        item.id,
        progressPercentage,
      ]);
      // console.log(progressPercentage);

      mWin.webContents.send('item-download-eta-seconds-remaining', [
        item.id,
        getETA(
          downloadBeginTime,
          Date.now(),
          progress.transferred / progress.total
        ),
      ]);
      if (progress.transferred === progress.total) {
        console.log('download complete');
        // shell.showItemInFolder(tempPath);
        downloadComplete = true;
        conversionBeginTime = Date.now();
        console.log(downloadComplete);
      }
      // FILE CONVERSION
      if (downloadComplete) {
        // console.log(item.format);

        if (item.format != 'MP4') {
          convertFile(mWin, item, tempPath);
        }

        if (item.format === 'MP4') {
          let fileSize = fs.statSync(tempPath).size;
          shell.showItemInFolder(tempPath);
          fileSize = fileSize.toFixed(1);
          mWin.webContents.send('item-fileSize-retrieved', [item.id, fileSize]);
          // fs.rename(tempPath, item.path, function (err) {
          //   // if (err) throw err;
          //   console.log('Successfully - AKA moved!');
          // });
          fs.rename(tempPath, item.path, (err) => {
            if (err) throw err;
            console.log('Move complete!');
          });
          mWin.webContents.send('item-conversion-complete', [item.id]);
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
  // YTDL METHOD
  // try {
  //   let progressPercentage;
  //   let downloadComplete = false;
  //   let downloadConversionComplete = false;
  //   const currentDownload = ytdl(item.url, {
  //     // requestOptions: { agent },
  //     // filter: (format) => (format.itag = item.matchedFormat),
  //     // filter: (format) => (format.itag = 240),
  //   });
  //   currentDownload.pipe(fs.createWriteStream(tempPath));
  //   let downloadBeginTime = Date.now();
  //   let conversionBeginTime;
  //   currentDownload.on('progress', (chunkLength, downloaded, total) => {
  //     // getETA(downloadBeginTime, Date.now(), downloaded / total);
  //     progressPercentage = downloaded / total;
  //     // console.log(progressPercentage);
  //     progressPercentage = Math.round(progressPercentage * 100);

  //     mWin.webContents.send('item-download-progress', [
  //       item.id,
  //       progressPercentage,
  //     ]);
  //     mWin.webContents.send('item-download-eta-seconds-remaining', [
  //       item.id,
  //       getETA(downloadBeginTime, Date.now(), downloaded / total),
  //     ]);
  //     if (downloaded === total) {
  //       downloadComplete = true;
  //       conversionBeginTime = Date.now();
  //     }
  //     if (downloadComplete) {
  //       let conversionPercentage;
  //       let totalLengthSeconds = convertToSeconds(item.lengthSeconds);
  //       let KBconverted = 0;
  //       ffmpeg(tempPath)
  //         .toFormat(item.format.toLowerCase())
  //         .on('error', (err) => {
  //           console.log(err);

  //           fs.unlink(tempPath, (err) => {
  //             if (err) console.log(err);
  //           });
  //         })
  //         .on('progress', (progress) => {
  //           // console.log(progress);
  //           // progress keys
  //           //            frames: NaN,
  //           // currentFps: NaN,
  //           // currentKbps: 128,
  //           // targetSize: 13607,
  //           // timemark: '00:14:30.79'

  //           KBconverted = progress.currentKbps + KBconverted;
  //           let secondsConverted = convertToSeconds(progress.timemark);
  //           conversionPercentage = (
  //             (secondsConverted / totalLengthSeconds) *
  //             100
  //           ).toFixed(0);
  //           // getETA(conversionBeginTime, Date.now(), conversionPercentage / 100);

  //           mWin.webContents.send('item-convert-progress', [
  //             item.id,
  //             conversionPercentage,
  //           ]);
  //           mWin.webContents.send('item-conversion-eta-seconds-remaining', [
  //             item.id,
  //             getETA(
  //               conversionBeginTime,
  //               Date.now(),
  //               conversionPercentage / 100
  //             ),
  //           ]);
  //         })
  //         .on('end', () => {
  //           fs.unlink(tempPath, (err) => {
  //             // if (err) throw err;
  //             if (err) console.log(err);
  //           });
  //           downloadConversionComplete = true;
  //           mWin.webContents.send('item-conversion-complete', [item.id]);
  //           let fileSize = fs.statSync(item.path).size;
  //           fileSize = fileSize.toFixed(1);
  //           mWin.webContents.send('item-fileSize-retrieved', [
  //             item.id,
  //             fileSize,
  //           ]);
  //         })
  //         .save(item.path);
  //     }
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
}
