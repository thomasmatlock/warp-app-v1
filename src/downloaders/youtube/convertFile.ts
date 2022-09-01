import fs from 'fs';
import path from 'path';
import { app, BrowserWindow, shell } from 'electron';
import convertToSeconds from './convertTimeToSeconds';
import getETA from './getETA';
import ffmpeg from 'fluent-ffmpeg';
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
export default function convertFile(
  mWin: BrowserWindow,
  item: any,
  tempPath: string
) {
  // let downloadBeginTime = Date.now();
  let conversionBeginTime = Date.now();
  let downloadConversionComplete = false;
  try {
    let conversionPercentage;
    let totalLengthSeconds = convertToSeconds(item.lengthSeconds);
    let KBconverted = 0;
    ffmpeg(tempPath)
      .toFormat(item.format.toLowerCase())
      .on('error', (err) => {
        // console.log(err);
        fs.unlink(tempPath, (err) => {
          if (err) console.log(err);
        });
      })
      .on('progress', (progress) => {
        // progress keys
        //            frames: NaN,
        // currentFps: NaN,
        // currentKbps: 128,
        // targetSize: 13607,
        // timemark: '00:14:30.79'

        KBconverted = progress.currentKbps + KBconverted;
        let secondsConverted = convertToSeconds(progress.timemark);
        conversionPercentage = (
          (secondsConverted / totalLengthSeconds) *
          100
        ).toFixed(0);
        console.log(conversionPercentage + '% converted');
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
          // if (err) throw err;
          if (err) console.log(err);
        });
        downloadConversionComplete = true;
        mWin.webContents.send('item-conversion-complete', [item.id]);
        let fileSize = fs.statSync(item.path).size;
        fileSize = fileSize.toFixed(1);
        mWin.webContents.send('item-fileSize-retrieved', [item.id, fileSize]);
      })
      .save(item.path);
    shell.showItemInFolder(item.path);
  } catch (error) {}
}
