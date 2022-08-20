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
export default async function Youtube(itemURL, prefs, storage) {
  // getFileSize();
  console.log(prefs);

  // formatLength();
  // formatTitle();
  let itemDetails = {};
  try {
    await ytdl.getBasicInfo(itemURL).then((info) => {
      // console.log(info.videoDetails);
      // console.log(info.formats);
      itemDetails = info.videoDetails;
      itemDetails.background =
        info.videoDetails.thumbnail.thumbnails[
          info.videoDetails.thumbnail.thumbnails.length - 1
        ];
      // console.log(itemDetails.background);

      itemDetails.titleFS = formatTitle(itemDetails.title);
      itemDetails.fps = info.formats[0].fps;
      // itemDetails.resolution =
      //   info.formats[0].width + 'x' + info.formats[0].height;
      itemDetails.resolution = info.formats[0].qualityLabel;
      itemDetails.width = info.formats[0].width;
      itemDetails.height = info.formats[0].height;
      itemDetails.date = new Date();
      itemDetails.timestamp = moment().format('MMM Do YYYY, dddd, h:mm:ss a');
      // console.log(itemDetails.timestamp);

      // console.log(test);

      // console.log(itemDetails.date);

      itemDetails.lengthDisplay = formatLength(itemDetails.lengthSeconds);
      // console.log(itemDetails.lengthDisplay);
      // itemDetails.videoId = itemDetails.videoId;
      itemDetails.source = 'youtube';
      itemDetails.url = itemURL;
      itemDetails.format = 'mp4';
      itemDetails.thumbnailDisplay = itemDetails.thumbnails[1].url;
      itemDetails.type = mode;
      // itemDetails.author = itemDetails.ownerChannelName;
      itemDetails.searchTags =
        itemDetails.ownerChannelName + ' ' + itemDetails.titleFS;
      // itemDetails.type = 'audio';

      // console.log(itemDetails.thumbnails);
      //  return info;
      // ytdl(url, [{ dlChunkSize: 1 }]).pipe(fs.createWriteStream('video2.mp4'));
    });
  } catch (error) {
    console.log(itemURL, error);
  }
  return itemDetails;
}
// module.exports = {
//   download,
// };
