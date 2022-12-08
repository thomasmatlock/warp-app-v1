/* eslint-disable no-nested-ternary */
import { BrowserWindow } from 'electron';

const Downloader = require('nodejs-file-downloader');

let initialized = false;
// let downloadProgress = 0;

const windowsBinaryURL =
  'https://github.com/thomasmatlock/ffmpeg-binaries/raw/main/win32-x64/ffmpeg.exe'; // windows binary URL
const macM1BinaryURL =
  'https://github.com/thomasmatlock/ffmpeg-binaries/raw/main/darwin-arm64/ffmpeg'; // mac arm64 binary URL
const macIntelBinaryURL =
  'https://github.com/thomasmatlock/ffmpeg-binaries/raw/main/darwin-x64/ffmpeg'; // mac x64 binary URL

export default async function downloadFFMPEGbinary(
  mWin: BrowserWindow,
  binaryPath: string
) {
  console.log('downloadFFMPEGbinary, binaryPath: ', binaryPath);

  if (!initialized) {
    initialized = true;
    const downloader = new Downloader({
      url:
        process.platform === 'win32'
          ? windowsBinaryURL
          : process.arch === 'arm64'
          ? macM1BinaryURL
          : macIntelBinaryURL,
      directory: binaryPath,
      // onProgress(percentage, chunk, remainingSize) {
      //   // console.log(percentage, '%'); // user can see download progress
      //   // console.log('Current chunk of data: ', chunk);
      //   // console.log('Remaining bytes: ', remainingSize);
      // },
    });
    try {
      // const { filePath, downloadStatus } = await downloader.download();
      const { downloadStatus } = await downloader.download();
      if (downloadStatus === 'COMPLETE') {
        // mWin.webContents.send('update-not-available', '');
      }
    } catch (error) {
      console.log('Download failed', error);
    }
  }
}
