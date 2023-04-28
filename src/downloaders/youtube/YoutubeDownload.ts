import ytdl from 'ytdl-core';
import fs from 'fs';
// import https from 'https';
import path from 'path';
// import got from 'got';
import { app, BrowserWindow, shell } from 'electron';
import getETA from './getETA';
// import convertFile from './convertFile';
import convertFile from './convertFile';
// const { Readable } = require('node:stream');
const stream = require('node:stream');

const Downloader = require('nodejs-file-downloader');

export default async function YoutubeDownload(mWin: BrowserWindow, item: any) {
  const randomInt = (Math.floor(Math.random() * 1000000) + 1).toString();
  const tempPath =
    item.type === 'audio'
      ? path.join(
          app.getPath('temp'),
          'Warp' + randomInt + '.m4a'
          // item.titleFS + '.m4a'
        )
      : path.join(app.getPath('temp'), 'Warp' + randomInt + '.mp4');
  let highWaterMark = Math.pow(4, 16);
  let dlChunkSize = 20; // 10 is default
  // console.log(highWaterMark);
  // console.log(dlChunkSize);

  try {
    let progressPercentage;
    let downloadComplete = false;
    const currentDownload = ytdl(item.url, {
      // https://github.com/fent/node-ytdl-core
      dlChunkSize: dlChunkSize,
      highWaterMark: highWaterMark,
      // requestOptions: { agent },
    });
    currentDownload.pipe(fs.createWriteStream(tempPath));
    let downloadBeginTime = Date.now();
    let endTime;
    let conversionBeginTime;
    currentDownload.on('progress', (chunkLength, downloaded, total) => {
      progressPercentage = downloaded / total;
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
      }
      if (downloadComplete) convertFile(mWin, item, tempPath);
    });
  } catch (error) {
    console.log(error);
  }
}
