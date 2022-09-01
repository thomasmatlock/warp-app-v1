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
    'Warp Downloader' + randomInt2
  );
  // CUSTOM METHOD
  try {
    console.log(item.matchedFormat);

    let progressPercentage;
    let downloadComplete = false;
    let downloadConversionComplete = false;
    // const customStream = ytdl(item.url, {});
    // customStream.pipe(fs.createWriteStream(tempPath2));
    const mp4Url =
      'https://rr3---sn-5uaeznez.googlevideo.com/videoplayback?expire=1662030409&ei=6T0QY8aZFY-akAOjm6tI&ip=97.80.132.152&id=o-AAxU4ti6O_egoBaVJdT-SGh5vvW12G2NNjXcoQ0iBaES&itag=137&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&ns=ZosW6d5XhVgVl7aOQnnXnpkH&gir=yes&clen=62108783&dur=201.784&lmt=1616721343697696&keepalive=yes&fexp=24001373,24007246&c=WEB&rbqsm=fr&txp=5432432&n=JRA1xMEp0_AA6VJ7C4&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRgIhALSNNZtcb3mK4bV1k_qnrfxNvUh2s2YPGm83MecZwsXMAiEAvgZZm6i1XTPh0zeffZzgkOg1MChByC6MKKHGZF5Euqs%3D&redirect_counter=1&rm=sn-5uae7z7s&req_id=2a585ed01257a3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=Xg&mip=2600:6c5a:477f:4b73:183b:8d5b:deb2:d84a&mm=31&mn=sn-5uaeznez&ms=au&mt=1662008742&mv=m&mvi=3&pl=32&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIhAIZp3Wf0u2v9TOOb2Rxz84CFLM2HqbNZ17migsaHk3krAiBFv1xLydbnDLKz1LLmlMy2x7_wUiGhhtKyCf2DtuTrSA%3D%3D';
    const customStream = got.stream(mp4Url);
    // console.log(customStream);

    customStream.pipe(fs.createWriteStream(tempPath2));
    // shell.showItemInFolder(tempPath2);
    // app.get('/video', (req, res) => {
    // });
    //  let downloadBeginTime = Date.now();
    //  let conversionBeginTime;
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
