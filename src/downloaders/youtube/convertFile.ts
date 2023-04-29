/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-plusplus */
import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';

import { app, BrowserWindow, dialog } from 'electron';
import { convertToSeconds } from '../../main/util/time';
import getETA from './getETA';
import generateFFMPEGPath from '../../ffmpeg/generateFFMPEGPath';

const ffmpegPath = generateFFMPEGPath();
// console.log('convertFile', ffmpegPath);

ffmpeg.setFfmpegPath(ffmpegPath);
export default function convertFile(
  mWin: BrowserWindow,
  item: any,
  tempPath: string
) {
  mWin.webContents.send('appRoot', ffmpegPath);
  const conversionBeginTime = Date.now();
  let downloadConversionComplete = false;
  let conversionPercentage: any = 0;
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
    .on('progress', (progress: any) => {
      KBconverted = progress.currentKbps + KBconverted;
      const secondsConverted = convertToSeconds(progress.timemark);
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
