import { app, BrowserWindow } from 'electron';
import Youtube from '../downloaders/youtube/Youtube';
import downloadsAudioDefaults from '../storage/downloadsAudioDefaults';
import downloadsVideoDefaults from '../storage/downloadsVideoDefaults';
import downloadsWarpstagramDefaults from '../storage/downloadsWarpstagramDefaults';
import { v4 as uuidv4 } from 'uuid';
const Store = require('electron-store');

const settings = new Store();
export async function downloadItem(
  mWin: BrowserWindow,
  url: string,
  prefs,
  mode
) {
  let item = await Youtube(url, prefs, mode);
  item.id = uuidv4();
  if (mWin && item != undefined)
    if (mode === 'audio') {
      let audioDownloads = getAudioDownloads();
      audioDownloads.push(item);
      setAudioDownloads(audioDownloads);
      mWin.webContents.send('main: item-downloaded', [item, 'audio']);
    }
  if (mode === 'video') {
    let videoDownloads = getVideoDownloads();
    videoDownloads.push(item);
    setVideoDownloads(videoDownloads);
    mWin.webContents.send('main: item-downloaded', [item, 'video']);
  }
}
export function getAudioDownloads() {
  let audioDownloads = settings.get('audioDownloads');
  if (audioDownloads === undefined) {
    settings.set('audioDownloads', downloadsAudioDefaults);
    return downloadsAudioDefaults;
  } else {
    return audioDownloads;
  }
}
export function getVideoDownloads() {
  let videoDownloads = settings.get('videoDownloads');
  if (videoDownloads === undefined) {
    settings.set('videoDownloads', downloadsVideoDefaults);
    return downloadsVideoDefaults;
  } else {
    return videoDownloads;
  }
}
export function getWarpstagramDownloads() {
  let warpstagramDownloads = settings.get('warpstagramDownloads');
  if (warpstagramDownloads === undefined) {
    settings.set('warpstagramDownloads', downloadsWarpstagramDefaults);
    return downloadsWarpstagramDefaults;
  } else {
    return warpstagramDownloads;
  }
}
export function setAudioDownloads(items) {
  settings.set('audioDownloads', items);
}
export function setVideoDownloads(items) {
  settings.set('videoDownloads', items);
}

export function removeMatchingDownload(downloadID) {
  let audioDownloads = getAudioDownloads();
  let videoDownloads = getVideoDownloads();
  for (const download of audioDownloads) {
    if (download.id === downloadID) {
      audioDownloads.splice(audioDownloads.indexOf(download), 1);
      setAudioDownloads(audioDownloads);
      return;
    }
  }
  for (const download of videoDownloads) {
    if (download.id === downloadID) {
      videoDownloads.splice(videoDownloads.indexOf(download), 1);
      setVideoDownloads(videoDownloads);
      return;
    }
  }
}
export function removeAllDownloads(downloadID) {
  let audioDownloads = getAudioDownloads();
  let videoDownloads = getVideoDownloads();
  for (const download of audioDownloads) {
    if (download.id === downloadID) {
      audioDownloads = [];
      setAudioDownloads(audioDownloads);
      return;
    }
  }
  for (const download of videoDownloads) {
    if (download.id === downloadID) {
      videoDownloads = [];
      setVideoDownloads(videoDownloads);
      return;
    }
  }
}

module.exports = {
  downloadItem: downloadItem,
  getAudioDownloads: getAudioDownloads,
  getVideoDownloads: getVideoDownloads,
  getWarpstagramDownloads: getWarpstagramDownloads,
  setAudioDownloads: setAudioDownloads,
  setVideoDownloads: setVideoDownloads,
  removeMatchingDownload: removeMatchingDownload,
  removeAllDownloads: removeAllDownloads,
};
