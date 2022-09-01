import ytdl from 'ytdl-core';
import fs from 'fs';
import path from 'path';
import got from 'got';
import { app, BrowserWindow, shell } from 'electron';
import ffmpeg from 'fluent-ffmpeg';
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
import convertToSeconds from './convertTimeToSeconds';
import getETA from './getETA';
import progress from 'progress-stream';
// import HttpsProxyAgent from 'https-proxy-agent';

// Remove 'user:pass@' if you don't need to authenticate to your proxy.
// const proxy = 'http://45.95.99.52:7612';
// const proxy = 'http://vrgjdbqk-US-rotate:7qkamjuzmjns@154.13.90.91:80';
// // const proxy = 'http://149.6.162.2:9999';
// const agent = HttpsProxyAgent(proxy);
// const proxyArray = [
//   //   45.95.99.52:7612
//   // 45.95.99.98:7658
//   // 185.199.229.156:7492
//   // 185.199.228.220:7300
//   // 185.199.231.45:8382
//   // 188.74.210.3:6082
//   // 188.74.183.126:8395
//   // 188.74.210.207:6286
//   // 188.74.210.21:6100
//   // 45.155.68.129:8133
// ];

export default async function YoutubeDownload(mWin: BrowserWindow, item: any) {
  let randomInt = (Math.floor(Math.random() * 1000000) + 1).toString();
  let randomInt2 = (Math.floor(Math.random() * 1000000) + 1).toString();

  let tempPath = path.join(app.getPath('temp'), 'Warp Downloader' + randomInt);
  let tempPath2 = path.join(
    app.getPath('desktop'),
    item.titleFS + '.' + item.format.toLowerCase()
  );
  // CUSTOM METHOD
  try {
    // console.log(item);

    let progressPercentage;
    let downloadComplete = false;
    let downloadConversionComplete = false;
    let downloadBeginTime = Date.now();
    let conversionBeginTime;
    const customStream = got.stream(item.matchedFormat.url);
    customStream.pipe(fs.createWriteStream(item.path));

    // fs.createReadStream(filename).pipe(str).pipe(fs.createWriteStream(output));
    // customStream.on('progress', (chunkLength, downloaded, total) => {
    //   progressPercentage = downloaded / total;
    //   // console.log(progressPercentage);
    //   // console.log('progress');
    // });
    customStream.on('finish', function () {
      console.log('finish');
    });
    // customStream.on('progress', (chunkLength, downloaded, total) => {
    //   progressPercentage = downloaded / total;
    //   console.log(progressPercentage);
    //   // mWin.webContents.send('download-progress', progressPercentage);
    // });
    //  currentDownload.on('progress', (chunkLength, downloaded, total) => {
    //    // getETA(downloadBeginTime, Date.now(), downloaded / total);
    //    progressPercentage = downloaded / total;
    //    // console.log(progressPercentage);
    //    progressPercentage = Math.round(progressPercentage * 100);

    //    mWin.webContents.send('item-download-progress', [
    //      item.id,
    //      progressPercentage,
    //    ]);
    //    mWin.webContents.send('item-download-eta-seconds-remaining', [
    //      item.id,
    //      getETA(downloadBeginTime, Date.now(), downloaded / total),
    //    ]);
    //    if (downloaded === total) {
    //      downloadComplete = true;
    //      conversionBeginTime = Date.now();
    //    }
    //    if (downloadComplete) {
    //      let conversionPercentage;
    //      let totalLengthSeconds = convertToSeconds(item.lengthSeconds);
    //      let KBconverted = 0;
    //      ffmpeg(tempPath)
    //        .toFormat(item.format.toLowerCase())
    //        .on('error', (err) => {
    //          console.log(err);

    //          fs.unlink(tempPath, (err) => {
    //            if (err) console.log(err);
    //          });
    //        })
    //        .on('progress', (progress) => {
    //          // console.log(progress);
    //          // progress keys
    //          //            frames: NaN,
    //          // currentFps: NaN,
    //          // currentKbps: 128,
    //          // targetSize: 13607,
    //          // timemark: '00:14:30.79'

    //          KBconverted = progress.currentKbps + KBconverted;
    //          let secondsConverted = convertToSeconds(progress.timemark);
    //          conversionPercentage = (
    //            (secondsConverted / totalLengthSeconds) *
    //            100
    //          ).toFixed(0);
    //          // getETA(conversionBeginTime, Date.now(), conversionPercentage / 100);

    //          mWin.webContents.send('item-convert-progress', [
    //            item.id,
    //            conversionPercentage,
    //          ]);
    //          mWin.webContents.send('item-conversion-eta-seconds-remaining', [
    //            item.id,
    //            getETA(
    //              conversionBeginTime,
    //              Date.now(),
    //              conversionPercentage / 100
    //            ),
    //          ]);
    //        })
    //        .on('end', () => {
    //          fs.unlink(tempPath, (err) => {
    //            // if (err) throw err;
    //            if (err) console.log(err);
    //          });
    //          downloadConversionComplete = true;
    //          mWin.webContents.send('item-conversion-complete', [item.id]);
    //          let fileSize = fs.statSync(item.path).size;
    //          fileSize = fileSize.toFixed(1);
    //          mWin.webContents.send('item-fileSize-retrieved', [
    //            item.id,
    //            fileSize,
    //          ]);
    //        })
    //        .save(item.path);
    //    }
    //  });
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
