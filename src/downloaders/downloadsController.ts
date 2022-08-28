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
  itemURL: string,
  prefs,
  mode
) {
  //  let item = await Youtube(url, prefs, mode);
  //  // let downloadedItem = await YoutubeDownload(item);
  //  item.id = uuidv4();
  //  // console.log(item.id);
  //  if (mWin && item != undefined)
  //    if (mode === 'audio') {
  //      audioDownloads.push(item);
  //      setAudioDownloads(audioDownloads);
  //      mWin.webContents.send('main: item-downloaded', [item, 'audio']);
  //    }
  //  if (mode === 'video') {
  //    videoDownloads.push(item);
  //    setVideoDownloads(videoDownloads);
  //    // mWin.webContents.send('main: item-downloaded', [item, 'video']);
  //    mWin.webContents.send('main: item-downloaded', [item, 'video']);
  //  }
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

module.exports = {
  downloadItem: downloadItem,
  getAudioDownloads: getAudioDownloads,
  getVideoDownloads: getVideoDownloads,
  getWarpstagramDownloads: getWarpstagramDownloads,
  setAudioDownloads: setAudioDownloads,
  setVideoDownloads: setVideoDownloads,
};
