/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-plusplus */
import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import { app, BrowserWindow, dialog } from 'electron';
import convertToSeconds from './convertTimeToSeconds';
import getETA from './getETA';
import generateFFMPEGPath from './generateFFMPEGPath';

const ffmpegPath = generateFFMPEGPath();
// generateFFMPEGPath();

// const appRootDir = require('app-root-dir').get();

// function getWindowsPackagedPath(targetPath: string) {
//   const packagedPathSplit = targetPath.split('\\');
//   let joined = '';
//   for (let i = 0; i < packagedPathSplit.length; i++) {
//     if (packagedPathSplit[i] != 'resources') {
//       joined = `${joined + packagedPathSplit[i]}\\`;
//     } else if (packagedPathSplit[i] === 'resources') {
//       break;
//     }
//   }
//   return joined;
// }
// if (process.platform === 'win32') {
//   if (!app.isPackaged) {
//     ffmpegPath = path.join(
//       appRootDir,
//       'node_modules',
//       '@ffmpeg-installer',
//       'win32-x64',
//       'ffmpeg.exe'
//     );
//   } else if (app.isPackaged) {
//     ffmpegPath = path.join(
//       getWindowsPackagedPath(appRootDir),
//       'resources',
//       'node_modules',
//       '@ffmpeg-installer',
//       'win32-x64',
//       'ffmpeg.exe'
//     );
//     // ffmpegPath = path.join(
//     //   getWindowsPackagedPath(appRootDir),
//     //   'resources',
//     //   'ffmpeg',
//     //   'ffmpeg.exe'
//     // );
//   }
// } else if (process.platform === 'darwin') {
//   if (!app.isPackaged) {
//     console.log(appRootDir);
//     // /Users/nikkirincon/Documents/GitHub/warp-app

//     ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

//     // console.log('packagedPath', getWindowsPackagedPath(appRootDir));
//     // console.log('ffmpegPath', ffmpegPath);
//   } else if (app.isPackaged) {
//     // /Users/nikkirincon/Documents/GitHub/warp-app/node_modules/@ffmpeg-installer/darwin-arm64 MAC
//     // /Users/nikkirincon/Documents/GitHub/warp-app/node_modules/@ffmpeg-installer/darwin-arm64
//     // appRootDir =Applications/Warp.app/Contents/Resources/app.asar.dist
//     ffmpegPath = appRootDir.replace('/app.asar/dist', '');
//     ffmpegPath = path.join(
//       ffmpegPath,
//       'node_modules',
//       '@ffmpeg-installer',
//       'darwin-arm64',
//       'ffmpeg'
//     );
//     // console.log('ffmpegPath', ffmpegPath);
//   }
// }
ffmpeg.setFfmpegPath(ffmpegPath);
export default function convertFile(
  mWin: BrowserWindow,
  item: any,
  tempPath: string
) {
  mWin.webContents.send('appRoot', ffmpegPath);
  const conversionBeginTime = Date.now();
  let downloadConversionComplete = false;
  let conversionPercentage;
  const totalLengthSeconds = convertToSeconds(item.lengthSeconds);
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
