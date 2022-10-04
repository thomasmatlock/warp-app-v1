/* eslint-disable no-plusplus */
import { app } from 'electron';
import path from 'path';
import fs from 'fs';

import downloadFFMPEGbinary from './downloadFFMPEGbinary';

// downloadFFMPEGbinary();

const appRootDir = require('app-root-dir').get();

function getWindowsPackagedPath(targetPath: string) {
  const packagedPathSplit = targetPath.split('\\');
  let joined = '';
  for (let i = 0; i < packagedPathSplit.length; i++) {
    if (packagedPathSplit[i] !== 'resources') {
      joined = `${joined + packagedPathSplit[i]}\\`;
    } else if (packagedPathSplit[i] === 'resources') {
      break;
    }
  }
  return joined;
}
export default function generateFFMPEGPath() {
  let ffmpegPath;
  if (process.platform === 'win32') {
    if (!app.isPackaged) {
      ffmpegPath = path.join(
        appRootDir,
        'node_modules',
        '@ffmpeg-installer',
        'win32-x64',
        'ffmpeg.exe'
      );
    } else if (app.isPackaged) {
      ffmpegPath = path.join(
        getWindowsPackagedPath(appRootDir),
        'resources',
        'node_modules',
        '@ffmpeg-installer',
        'win32-x64',
        'ffmpeg.exe'
      );
    }
    let testPath = path.join(
      appRootDir,
      'resources',
      'ffmpeg',
      'win32-x64',
      'ffmpeg.exe'
    );
    try {
      if (fs.existsSync(testPath)) {
        // console.log('FFMPEG binary exists');
      } else if (!fs.existsSync(testPath)) {
        console.log('FFMPEG binary does not exist');
        downloadFFMPEGbinary(testPath);
      }
    } catch (err) {
      // console.log('FFMPEG binary does NOT exists');
      console.error(err);
    }
    // check if file exists

    return ffmpegPath;
  }
  if (process.platform === 'darwin') {
    if (!app.isPackaged) {
      ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
    } else if (app.isPackaged) {
      // /Users/nikkirincon/Documents/GitHub/warp-app/node_modules/@ffmpeg-installer/darwin-arm64 MAC
      // /Users/nikkirincon/Documents/GitHub/warp-app/node_modules/@ffmpeg-installer/darwin-arm64
      // appRootDir =Applications/Warp.app/Contents/Resources/app.asar.dist
      ffmpegPath = appRootDir.replace('/app.asar/dist', '');
      ffmpegPath = path.join(
        ffmpegPath,
        'node_modules',
        '@ffmpeg-installer',
        'darwin-arm64',
        'ffmpeg'
      );
    }
    return ffmpegPath;
  }
}
