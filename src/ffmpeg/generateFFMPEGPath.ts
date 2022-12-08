/* eslint-disable no-plusplus */
import { app } from 'electron';
import path from 'path';
import getFFMPEGDir from './getFFMPEGDir';
const appRootDir = require('app-root-dir').get();

export default function generateFFMPEGPath() {
  let ffmpegPath;
  // if (!app.isPackaged) {
  // ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
  // } else if (app.isPackaged) {
  if (process.platform === 'win32') {
    return path.join(getFFMPEGDir(), 'ffmpeg.exe');
  }
  if (process.platform === 'darwin') {
    // if (app.isPackaged) {
    // /Users/nikkirincon/Documents/GitHub/warp-app/node_modules/@ffmpeg-installer/darwin-arm64 MAC
    // /Users/nikkirincon/Documents/GitHub/warp-app/node_modules/@ffmpeg-installer/darwin-arm64
    // appRootDir =Applications/Warp.app/Contents/Resources/app.asar.dist
    // ffmpegPath = appRootDir.replace('/app.asar/dist', '');
    // ffmpegPath = path.join(
    //   ffmpegPath,
    //   'node_modules',
    //   '@ffmpeg-installer',
    //   'darwin-arm64',
    //   'ffmpeg'
    // );
    // return path.join(getFFMPEGDir(), 'ffmpeg');
    // THIS WAY WORKS BUT BUNDLE IS BIGGER
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
      // THIS WAY WORKS BUT BUNDLE IS BIGGER
    }
    return ffmpegPath;
  }
  return ffmpegPath;
}
