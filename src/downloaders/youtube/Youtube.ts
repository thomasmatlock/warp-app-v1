import ytdl from 'ytdl-core';
let url: string = 'http://www.youtube.com/watch?v=aqz-KE-bpKQ';
import {
  app,
  BrowserView,
  BrowserWindow,
  desktopCapturer,
  dialog,
  globalShortcut,
  nativeTheme,
  shell,
  ipcMain,
  screen,
  Tray,
} from 'electron';
import { getInfo } from './getInfo';
import getFileSize from './getFileSize';
import formatLength from './formatLength';
import formatTitle from './formatTitle';
// ytdl(url, [{ dlChunkSize: 1 }]).pipe(fs.createWriteStream('video2.mp4'));
export default async function Youtube(itemURL, avType, platform, storage) {
  // getFileSize();

  // formatLength();
  // formatTitle();
  let itemDetails = {};
  try {
    await ytdl.getBasicInfo(itemURL).then((info) => {
      // console.log(info.videoDetails.thumbnail);
      itemDetails = info.videoDetails;
      itemDetails.titleFS = formatTitle(itemDetails.title);
      itemDetails.date = new Date();
      // itemDetails.thumbnail = itemDetails.thumbnails[0].url;

      // console.log(itemDetails.title);
      //  return info;
    });
  } catch (error) {
    console.log(itemURL, error);
  }
  return itemDetails;
}
// module.exports = {
//   download,
// };
