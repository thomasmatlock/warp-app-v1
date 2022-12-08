import { app } from 'electron';

import path from 'path';
const appRootDir = require('app-root-dir').get();

export default function getFFMPEGDir() {
  // const platformFolder =
  // process.platform === 'win32' ? 'win32-x64' : 'darwin-x64';
  if (process.platform === 'win32') {
    return path.join(app.getPath('appData'), 'ffmpeg');
  } else if (process.platform === 'darwin') {
    let ffmpegPath = appRootDir.replace('/app.asar/dist', '');
    ffmpegPath = path.join(
      ffmpegPath,
      'node_modules',
      '@ffmpeg-installer',
      'darwin-arm64'
    );
    console.log('getFFMPEGDir, getting ffmpeg dir', ffmpegPath);
    return ffmpegPath;
    // return path.join(app.getPath('home'), 'ffmpeg');
  }
}
