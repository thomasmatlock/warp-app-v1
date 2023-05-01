/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import { app, BrowserWindow } from 'electron';
import { useState } from 'react';
import Youtube from '../downloaders/youtube/Youtube';
import downloadsAudioDefaults from '../store/downloadsAudioDefaults';
import downloadsVideoDefaults from '../store/downloadsVideoDefaults';
import downloadsWarpstagramDefaults from '../store/downloadsWarpstagramDefaults';
import { v4 as uuidv4 } from 'uuid';
const Store = require('electron-store');
const settings = new Store();
// import ytpl from 'ytpl';
const ytpl = require('ytpl');
const maxSimultaneousDownloads = 3;
let currentSimultaneousDownloads = 0;
// (async () => {
//   // max concurrent downloads
// })();
export function getCurrentSimultaneousDownloads() {
  return currentSimultaneousDownloads;
}
export function increaseCurrentDownloads() {
  currentSimultaneousDownloads++;
}
export function decreaseCurrentDownloads() {
  currentSimultaneousDownloads--;
}
export async function DownloadItems(
  mWin: BrowserWindow,
  items: [],
  prefs: unknown,
  mode: unknown
) {
  items.forEach((item) => {
    downloadItem(mWin, item.url, prefs, mode);
    console.log(item.url);
  });

  // let newURLS = urls.forEach((url) => {
  //   newURLS.push(url);
  //   // url.status = 'pending';
  // });
  // });
}
function getYoutubePlaylistIDFromURL(url) {
  let id = url.split('=')[2];
  // console.log(url, id);
  return id;
}
export async function playlist(
  mWin: BrowserWindow,
  url: string,
  prefs: any,
  mode: any
) {
  let newURLS = [];
  // playlist.items RETURNS AN ARRAY OF OBJECTS
  const playlist = await ytpl(getYoutubePlaylistIDFromURL(url));
  let urls = playlist.items.map((item) => {
    newURLS.push(item.url);
    // console.log(item.url);

    // return item.url;
  });
  // console.log(urls);

  // DownloadItems(mWin, playlist.items, prefs, mode);
}
export async function downloadItem(
  mWin: BrowserWindow,
  url: string,
  prefs,
  mode
) {
  // playlist();
  let item = await Youtube(mWin, url, prefs, mode);
  item.id = uuidv4();

  if (mWin && item != undefined)
    if (mode === 'audio') {
      decreaseCurrentDownloads();
      let audioDownloads = getAudioDownloads();
      audioDownloads.push(item);
      setAudioDownloads(audioDownloads);
      mWin.webContents.send('main: item-downloaded', [item, 'audio']);
    }
  if (mode === 'video') {
    decreaseCurrentDownloads();
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
export function deleteDownload(downloadID: string) {
  let audioDownloads = getAudioDownloads();
  let videoDownloads = getVideoDownloads();
  for (const download of audioDownloads) {
    if (download.id === downloadID) {
      fs.unlink(download.path, (err) => {
        // if (err) throw err;
      });
      removeMatchingDownload(downloadID);
      return;
    }
  }
  for (const download of videoDownloads) {
    if (download.id === downloadID) {
      fs.unlink(download.path, (err) => {
        // if (err) throw err;
      });
      removeMatchingDownload(downloadID);
      return;
    }
  }
}
if (!app.isPackaged) {
  settings.delete('audioDownloads'); // testing only, REMOVE for production
  settings.delete('videoDownloads'); // testing only, REMOVE for production
}
module.exports = {
  DownloadItems,
  downloadItem,
  playlist,
  getAudioDownloads,
  getVideoDownloads,
  getWarpstagramDownloads,
  setAudioDownloads,
  setVideoDownloads,
  removeMatchingDownload,
  removeAllDownloads,
  deleteDownload,
};
