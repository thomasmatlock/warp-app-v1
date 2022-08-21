import ytdl from 'ytdl-core';
import moment from 'moment';
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
import getQuality from './getQuality';
export default async function Youtube(itemURL, prefs, mode) {
  // console.log(prefs.video);
  // console.log(prefs.audio.dropdowns[0].defaultValue);
  // console.log(prefs.audio.dropdowns[1].defaultValue);
  let audioFormat = prefs.audio.dropdowns[1].defaultValue.label;
  let videoFormat = prefs.video.dropdowns[1].defaultValue.label;
  let audioQuality = prefs.audio.dropdowns[0].defaultValue.label;
  let videoQuality = prefs.video.dropdowns[0].defaultValue.label;
  // console.log(audioQuality, videoQuality);

  // console.log(videoFormat);

  let itemDetails = {};
  try {
    await ytdl.getBasicInfo(itemURL).then((info) => {
      // console.log(info.videoDetails);
      let matchedFormat;
      if (mode.includes('audio')) {
        matchedFormat = getQuality(mode, audioQuality, info.formats);
      }
      if (mode.includes('video')) {
        matchedFormat = getQuality(mode, videoQuality, info.formats);
      }
      // console.log(info.formats);
      console.log('YOUTUBE.TS', matchedFormat);

      itemDetails = info.videoDetails;
      // itemDetails.background =
      //   info.videoDetails.thumbnail.thumbnails[
      //     info.videoDetails.thumbnail.thumbnails.length - 1
      //   ];
      // console.log(matchedFormat.fps);

      itemDetails.titleFS = formatTitle(itemDetails.title);
      itemDetails.fps = mode === 'video' ? matchedFormat.fps : '';
      itemDetails.resolution =
        mode === 'video' ? matchedFormat.qualityLabel : '';
      itemDetails.width = mode === 'video' ? matchedFormat.width : '';
      itemDetails.height = mode === 'video' ? matchedFormat.height : '';
      itemDetails.date = new Date();
      itemDetails.timestamp = moment().format('MMM Do YYYY, dddd, h:mm:ss a');
      itemDetails.lengthDisplay = formatLength(itemDetails.lengthSeconds);
      itemDetails.source = 'youtube';
      itemDetails.url = itemURL;
      itemDetails.type = mode;
      itemDetails.format = mode === 'audio' ? audioFormat : videoFormat;
      itemDetails.thumbnailDisplay = itemDetails.thumbnails[1].url;
      itemDetails.searchTags =
        itemDetails.ownerChannelName + ' ' + itemDetails.titleFS;
    });
  } catch (error) {
    console.log(itemURL, error);
  }
  return itemDetails;
}
// module.exports = {
//   download,
// };
