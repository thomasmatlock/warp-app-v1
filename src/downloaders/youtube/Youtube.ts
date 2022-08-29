import ytdl from 'ytdl-core';
import moment from 'moment';
import fs from 'fs';
// let url: string = 'http://www.youtube.com/watch?v=aqz-KE-bpKQ';
// import {
//   app,
//   BrowserView,
//   BrowserWindow,
//   desktopCapturer,
//   dialog,
//   globalShortcut,
//   nativeTheme,
//   shell,
//   ipcMain,
//   screen,
//   Tray,
// } from 'electron';
import { getInfo } from './getInfo';
import getFileSize from './getFileSize';
import formatLength from './formatLength';
import formatTitle from './formatTitle';
import YoutubeDownload from './YoutubeDownload';
import getQuality from './getQuality';
export default async function Youtube(itemURL, prefs, mode) {
  let audioFormat = prefs.audio.dropdowns[1].defaultValue.label;
  let videoFormat = prefs.video.dropdowns[1].defaultValue.label;
  let audioQuality = prefs.audio.dropdowns[0].defaultValue.label;
  let videoQuality = prefs.video.dropdowns[0].defaultValue.label;
  let itemDetails = {};
  try {
    await ytdl.getBasicInfo(itemURL).then((info) => {
      // console.log(info);

      let matchedFormat;
      let audioFormats;
      let videoFormats;
      if (mode.includes('audio')) {
        // audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
        // itemDetails.formats = audioFormats;
        // console.log(audioFormats.length);
        matchedFormat = getQuality(mode, audioQuality, info.formats);
      }
      if (mode.includes('video')) {
        // videoFormats = ytdl.filterFormats(info.formats, 'videoandaudio');
        // itemDetails.formats = videoFormats;
        // console.log(videoFormats.length);
        matchedFormat = getQuality(mode, videoQuality, info.formats);
      }
      // itemDetails.info = info;
      itemDetails = info.videoDetails;
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
        itemDetails.ownerChannelName +
        ' ' +
        itemDetails.titleFS +
        ' ' +
        itemDetails.keywords;
      // const video = ytdl(itemURL, {
      //   // requestOptions: {
      //   //     // headers: {
      //   //     //     cookie: COOKIE,
      //   //     //     // Optional. If not given, ytdl-core will try to find it.
      //   //     //     // You can find this by going to a video's watch page, viewing the source,
      //   //     //     // and searching for "ID_TOKEN".
      //   //     //     // 'x-youtube-identity-token': 1324,
      //   //     // },
      //   // },
      // });

      // video.on('info', info => {
      //     console.log('title:', info.videoDetails.title);
      //     console.log('rating:', info.player_response.videoDetails.averageRating);
      //     console.log('uploaded by:', info.videoDetails.author.name);
      // });

      // let inserted = false;
      // let completed = false;
      // let lastDownloaded = 0;
      // video.on('progress', (chunkLength, downloaded, total) => {
      //   let percent = downloaded / total;
      //   percent = Math.round(percent * 100);
      //   console.log(percent);
      //   // console.log(downloaded, total);
      //   // lastDownloaded = downloaded;
      //   // if (!inserted) {
      //   //   items.insertPercentDownloaded(this.itemInfo, percent, 'add');

      //   //   inserted = true;
      //   // }
      //   // if (inserted) {
      //   // }
      //   // if (lastDownloaded = downloaded) {
      //   // setTimeout(() => {
      //   //   if ((downloaded = total)) {
      //   //     items.insertPercentDownloaded(this.itemInfo, percent, 'complete');
      //   //   }
      //   // }, 2000);
      // });
    });
  } catch (error) {
    console.log(itemURL, error);
  }
  YoutubeDownload(itemDetails);
  return itemDetails;
}
