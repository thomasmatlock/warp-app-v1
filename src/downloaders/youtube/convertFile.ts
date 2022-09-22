import fs from 'fs';
import path from 'path';
import { app, BrowserWindow, shell } from 'electron';
import convertToSeconds from './convertTimeToSeconds';
import getETA from './getETA';
// import ffmpeg from 'fluent-ffmpeg';
var appRootDir = require('app-root-dir').get();
// console.log(appRootDir);

const ffmpeg = require('fluent-ffmpeg');
// C:\Users\Tommy\AppData\Local\Programs\warp\resources\node_modules\@ffmpeg-installer\win32-x64
// C:\Program Files\Warp\resources\node_modules\@ffmpeg-installer\win32-x64\ffmpeg.exe
let ffmpegPath;
// = require('@ffmpeg-installer/ffmpeg').path;
// console.log(ffmpegPath);
// find js files in all dirs

// console.log(exeArr);

// for (let i = 0; i < exeArr.length; i++) {
//   if (exeArr[i].includes('ffmpeg.exe')) {
//     ffmpegPath = exeArr[i];
//   }
// }
// console.log(ffmpegPath);
// (async () => {
//   try {
//   } catch (error) {
//     console.log('ERROR');
//   }
// })();
function getPackagedPath(targetPath: string) {
  let packagedPathSplit = targetPath.split('\\');
  let joined: string = '';
  for (let i = 0; i < packagedPathSplit.length; i++) {
    if (packagedPathSplit[i] != 'resources') {
      joined = joined + packagedPathSplit[i] + '\\';
    } else if (packagedPathSplit[i] === 'resources') {
      break;
    }
  }
  return joined;
}
// ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
// if (ffmpegPath === undefined) {
// const ffmpeg = require('fluent-ffmpeg');
if (process.platform === 'win32') {
  // IF DEV MODE
  if (!app.isPackaged) {
    // console.log('app.isPackaged', app.isPackaged);
    ffmpegPath = path.join(
      appRootDir,
      'node_modules',
      '@ffmpeg-installer',
      'win32-x64',
      'ffmpeg.exe'
    );
  } else if (app.isPackaged) {
    // let packagedPath = 'C:\\Program Files\\Warp\\resources\\app.asar\\dist';
    // homedir .... C:\Program Files\Warp\resources\app.asar\dist //USE THIS
    //ATTEMPT  --- PROGRAM FILES PATH --- // C:\Program Files\Warp\resources\node_modules\@ffmpeg-installer\win32-x64\ffmpeg.exe
    // console.log('app.isPackaged', app.isPackaged);

    // IF PRODUCTION MODE
    // ffmpegPath = path.join(
    //   appRootDir,
    //   'resources',
    //   'node_modules',
    //   '@ffmpeg-installer',
    //   'win32-x64',
    //   'ffmpeg.exe'
    // );
    ffmpegPath = path.join(
      getPackagedPath(appRootDir),
      'resources',
      'node_modules',
      '@ffmpeg-installer',
      'win32-x64',
      'ffmpeg.exe'
    );
  }
}
// }

// console.log(packagedPath);
// console.log(joined);

// console.log('packagedPathSplit', packagedPathSplit);

// let packagedResourcesPath = 'C:\\Program Files\\Warp\\resources';
// let test = path.dirname(packagedPath);
// console.log(test);

// import scanFolder from 'scan-folder';
// let exeArr = scanFolder(packagedResourcesPath, 'exe', true);
// let exeArr = scanFolder(packagedResourcesPath, 'exe', true);
// console.log(exeArr);
// console.log(ffmpegPath);

ffmpeg.setFfmpegPath(ffmpegPath);
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
