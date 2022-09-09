import fs from 'fs';
import path from 'path';
import { app, BrowserWindow, shell } from 'electron';
import convertToSeconds from './convertTimeToSeconds';
import getETA from './getETA';
import ffmpeg from 'fluent-ffmpeg';
// const ffmpeg = require('fluent-ffmpeg');
// C:\Users\Tommy\AppData\Local\Programs\warp\resources\node_modules\@ffmpeg-installer\win32-x64
// C:\Users\Tommy\AppData\Local\Programs\warp\resources\node_modules\@ffmpeg-installer\win32-x64\ffmpeg.exe
let ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
// ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
if (ffmpegPath === undefined) {
  // const ffmpeg = require('fluent-ffmpeg');
  if (process.platform === 'win32') {
    ffmpegPath = path.join(
      app.getPath('home'),
      'AppData',
      'Local',
      'Programs',
      'warp',
      'resources',
      'node_modules',
      '@ffmpeg-installer',
      'win32-x64',
      'ffmpeg.exe'
    );
  }
}

// ffmpegPath = path.join(
//   __dirname,
//   '..',
//   '..',
//   '..',
//   'node_modules',
//   '@ffmpeg-installer',
//   process.platform,
//   process.arch,
//   'ffmpeg'
// );
// }
ffmpeg.setFfmpegPath(ffmpegPath);
// console.log(ffmpegPath);
console.log(ffmpegPath);
// let pathTest = path.join(
//   app.getPath('home'),
//   'AppData',
//   'Local',
//   'warp',
//   'resources',
//   'node_modules',
//   '@ffmpeg-installer',
//   'win32-x64',
//   'ffmpeg.exe'
// );
// console.log(pathTest);
export default function convertFile(
  mWin: BrowserWindow,
  item: any,
  tempPath: string
) {
  // console.log('converting file');
  // console.log(tempPath);
  // // let downloadBeginTime = Date.now();
  let conversionBeginTime = Date.now();
  let downloadConversionComplete = false;
  let conversionPercentage;
  let totalLengthSeconds = convertToSeconds(item.lengthSeconds);
  let KBconverted = 0;
  // // try {
  // // console.log('time to convert: ' + totalLengthSeconds);
  // // shell.showItemInFolder(tempPath);
  // console.log(item.format);
  // ffmpeg(tempPath)
  //   .toFormat(item.format.toLowerCase())
  //   .on('error', (err) => {
  //     console.log(err);
  //     fs.unlink(tempPath, (err) => {
  //       // if (err) console.log(err);
  //     });
  //   })
  //   .on('progress', (progress) => {
  //     // progress keys
  //     //            frames: NaN,
  //     // currentFps: NaN,
  //     // currentKbps: 128,
  //     // targetSize: 13607,
  //     // timemark: '00:14:30.79'
  //     KBconverted = progress.currentKbps + KBconverted;
  //     let secondsConverted = convertToSeconds(progress.timemark);
  //     conversionPercentage = (
  //       (secondsConverted / totalLengthSeconds) *
  //       100
  //     ).toFixed(0);
  //     // console.log(conversionPercentage + '% converted');
  //     mWin.webContents.send('item-convert-progress', [
  //       item.id,
  //       conversionPercentage,
  //     ]);
  //     mWin.webContents.send('item-conversion-eta-seconds-remaining', [
  //       item.id,
  //       getETA(conversionBeginTime, Date.now(), conversionPercentage / 100),
  //     ]);
  //   })
  //   .on('end', () => {
  //     // fs.unlink(tempPath, (err) => {
  //     let fileSize = fs.statSync(tempPath).size;
  //     fileSize = fileSize.toFixed(1);
  //     mWin.webContents.send('item-fileSize-retrieved', [item.id, fileSize]);
  //     mWin.webContents.send('item-conversion-complete', [item.id]);
  //     fs.rename(tempPath, item.path, (err) => {});
  //     downloadConversionComplete = true;
  //   });
  // .save(item.path);
  // } catch (error) {}
  //////////////////////////////////////////////////////
  ffmpeg(tempPath)
    .toFormat(item.format.toLowerCase())
    .on('error', (err) => {
      console.log(err);
      fs.unlink(tempPath, (err) => {
        if (err) console.log(err);
      });
    })
    .on('progress', (progress) => {
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
        getETA(conversionBeginTime, Date.now(), conversionPercentage / 100),
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
      mWin.webContents.send('item-fileSize-retrieved', [item.id, fileSize]);
    })
    .save(item.path);
}
