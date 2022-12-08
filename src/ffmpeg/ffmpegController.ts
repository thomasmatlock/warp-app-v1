import path from 'path';
import fs from 'fs';
import { app, BrowserWindow } from 'electron';
import downloadFFMPEGbinary from './downloadFFMPEGbinary';
import getFFMPEGDir from './getFFMPEGDir';
import generateFFMPEGPath from './generateFFMPEGPath';

let initialized = false;

export default function ffmpegInit(mWin: BrowserWindow) {
  // let binaryDir: string;
  // let binaryPath: string;
  const platformSnippet = process.platform === 'win32' ? 'Windows' : 'Apple';
  // console.log(appRootDir);
  if (!initialized) {
    initialized = true;
    setTimeout(() => {
      mWin.webContents.send(
        'download-progress',
        `ffmpegController, downloading ffmpeg to path: ${generateFFMPEGPath()}`
        // `verifying ${platformSnippet} binaries integrity..`
      );
      try {
        if (fs.existsSync(generateFFMPEGPath())) {
          console.log(
            'ffmpegController, ffmpeg exists, path: ',
            generateFFMPEGPath()
          );
          // mWin.webContents.send('update-not-available', '');
        } else if (!fs.existsSync(generateFFMPEGPath())) {
          console.log(
            'ffmpegController, ffmpeg DOES NOT exist, path: ',
            generateFFMPEGPath()
          );
          mWin.webContents.send(
            'download-progress',
            // `installing FFMPEG to ${generateFFMPEGPath()}...`
            `installing FFMPEG...`
            // `verifying ${platformSnippet} binaries integrity..`
          );
          downloadFFMPEGbinary(mWin, getFFMPEGDir());
          // console.log(getFFMPEGDir());
        }
      } catch (err) {
        console.error(err);
      }
    }, 2500);
  }
}
