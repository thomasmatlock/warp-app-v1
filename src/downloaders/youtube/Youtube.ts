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
import path from 'path';
import YoutubeDownload from './YoutubeDownload';
import getQuality from './getQuality';
import Prefs from '../../main/prefsController';
export default async function Youtube(mWin, itemURL, prefs, mode) {
  let audioFormat = prefs.audio.dropdowns[1].defaultValue.label;
  let videoFormat = prefs.video.dropdowns[1].defaultValue.label;
  let audioQuality = prefs.audio.dropdowns[0].defaultValue.label;
  let videoQuality = prefs.video.dropdowns[0].defaultValue.label;
  let itemDetails = {};
  itemDetails.audioQuality = audioQuality;
  itemDetails.videoQuality = videoQuality;
  try {
    await ytdl.getBasicInfo(itemURL).then((info) => {
      console.log(info.formats[0]);

      itemDetails = info.videoDetails;
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
      itemDetails.matchedFormat = matchedFormat;
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
      itemDetails.fileSize = undefined;
      // itemDetails.fileSize = null;
      // itemDetails.fileSize = 100;
      itemDetails.type = mode;
      itemDetails.format = mode === 'audio' ? audioFormat : videoFormat;
      itemDetails.thumbnailDisplay = itemDetails.thumbnails[1].url;
      itemDetails.searchTags =
        itemDetails.ownerChannelName +
        ' ' +
        itemDetails.titleFS +
        ' ' +
        itemDetails.keywords;
      itemDetails.path = '';
      if (mode.includes('audio')) {
        itemDetails.path = path.join(
          Prefs.getAudioPath(),
          itemDetails.titleFS + '.' + itemDetails.format.toLowerCase()
        );
      }
      if (mode.includes('video')) {
        itemDetails.path = path.join(
          Prefs.getVideoPath(),
          itemDetails.titleFS + '.' + itemDetails.format.toLowerCase()
        );
      }

      itemDetails.downloadedPercentage = 0;
      itemDetails.downloadSecondsRemaining = 1;
      itemDetails.downloadComplete = false;
      itemDetails.conversionPercentage = 0;
      itemDetails.conversionSecondsRemaining = 1;
      itemDetails.conversionComplete = false;
    });
  } catch (error) {
    console.log(itemURL, error);
  }
  YoutubeDownload(mWin, itemDetails);
  return itemDetails;
}
