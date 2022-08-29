import React, { useState, useEffect } from 'react';

let downloadsAudio = [];
let downloadsVideo = [];
let downloadsWarpstagram = {
  subscribed: [
    {
      // format: 'mkv',
      // fps: 60,
      id: '3',
      // length: '00:01:32',
      // resolution: '3840p',
      // size: '1.2 MB',
      // source: 'vimeo',
      // thumbnail: 'https://i3.ytimg.com/vi/F02Y3C16Uwg/maxresdefault.jpg',
      title: 'thedreamsetup',
      type: 'warpstagram',
      url: 'https://www.youtube.com/watch?v=uq-_-RJt-E8',
    },
    {
      // format: 'mkv',
      // fps: 60,
      id: '4',
      // length: '00:01:32',
      // resolution: '3840p',
      // size: '1.2 MB',
      // source: 'vimeo',
      // thumbnail: 'https://i3.ytimg.com/vi/F02Y3C16Uwg/maxresdefault.jpg',
      title: 'peakyblindersofficial',
      type: 'warpstagram',
      url: 'https://www.youtube.com/watch?v=uq-_-RJt-E8',
    },
  ],
  pinned: [],
};
const DownloadsContext = React.createContext({
  downloadsAudio: [],
  downloadsVideo: [],
  downloadsAudioState: {},
  downloadsVideoState: {},
  percentUpdateState: {},
  downloadsWarpstagram: {},
  getDownloadID: () => {},
  downloadContextActionHandler: () => {},
});
const getDownloadID = (id) => {
  // console.log(id);
};

let audioDownloadsPushed = false;
let videoDownloadsPushed = false;
let lastDownloadID = 0;
export const DownloadsContextProvider = (props) => {
  const [downloadsAudioState, setDownloadsAudioState] = useState(0);
  const [downloadsVideoState, setDownloadsVideoState] = useState(0);
  const [percentUpdateState, setPercentUpdateState] = useState(0);
  const getMatchingDownload = (downloadID) => {
    for (const download of downloadsAudio) {
      if (download.id === downloadID) {
        return download;
      }
    }
    for (const download of downloadsVideo) {
      if (download.id === downloadID) {
        return download;
      }
    }
  };
  const removeMatchingDownload = (downloadID) => {
    for (const download of downloadsAudio) {
      if (download.id === downloadID) {
        downloadsAudio.splice(downloadsAudio.indexOf(download), 1);
        setDownloadsAudioState(downloadsAudio.length);
        return;
      }
    }
    for (const download of downloadsVideo) {
      if (download.id === downloadID) {
        downloadsVideo.splice(downloadsVideo.indexOf(download), 1);
        setDownloadsVideoState(downloadsVideo.length);
        return;
      }
    }
  };
  const removeAllDownloads = (downloadID) => {
    for (const download of downloadsAudio) {
      if (download.id === downloadID) {
        downloadsAudio = [];
        setDownloadsAudioState(downloadsAudio.length);
        return;
      }
    }
    for (const download of downloadsVideo) {
      if (download.id === downloadID) {
        downloadsVideo = [];
        setDownloadsVideoState(downloadsVideo.length);
        return;
      }
    }
  };
  const downloadContextActionHandler = (contextActionID, downloadID) => {
    let matchingDownload = getMatchingDownload(downloadID);

    if (contextActionID.includes('copy_link_address')) {
      window.electron.ipcRenderer.sendMessage(
        'context: copy_link_address',
        matchingDownload
      );
    }
    if (contextActionID.includes('open_in_browser')) {
      window.electron.ipcRenderer.sendMessage(
        'context: open_in_browser',
        matchingDownload
      );
    }
    if (contextActionID.includes('remove_item')) {
      removeMatchingDownload(downloadID);
      window.electron.ipcRenderer.sendMessage(
        'context: remove_item',
        matchingDownload
      );
    }
    if (contextActionID.includes('remove_all')) {
      removeAllDownloads(downloadID);
      setTimeout(() => {
        window.electron.ipcRenderer.sendMessage(
          'context: remove_all',
          downloadID
        );
      }, 100);
    }
    if (contextActionID.includes('delete_file')) {
      window.electron.ipcRenderer.sendMessage(
        'context: delete_file',
        matchingDownload
      );
    }
  };
  window.electron.ipcRenderer.on('main: item-downloaded', (arg) => {
    let item = arg[0];
    let mode = arg[1];
    // console.log(item, mode);

    if (mode === 'audio' && item.id != lastDownloadID) {
      downloadsAudio.push(item);
      setDownloadsAudioState(downloadsAudio.length);
      lastDownloadID = item.id;
    }
    if (mode === 'video' && item.id != lastDownloadID) {
      downloadsVideo.push(item);
      setDownloadsVideoState(downloadsVideo.length);
      lastDownloadID = item.id;
    }
  });
  window.electron.ipcRenderer.on('main: audioDownloads', (items) => {
    // console.log(items);
    // console.log(items[0].date);
    // items.forEach((item) => downloadsAudio.push(item));
    // downloadsVideo.push(item);
    if (!audioDownloadsPushed) {
      items.forEach((item) => downloadsAudio.push(item));
      setDownloadsAudioState(downloadsAudio.length);
      audioDownloadsPushed = true;
    }
  });
  window.electron.ipcRenderer.on('main: videoDownloads', (items) => {
    // console.log(items);
    if (!videoDownloadsPushed) {
      items.forEach((item) => downloadsVideo.push(item));
      setDownloadsVideoState(downloadsVideo.length);
      videoDownloadsPushed = true;
    }
    // downloadsVideo.push(item);
  });
  window.electron.ipcRenderer.on('main: warpstagramDownloads', (items) => {
    // items.forEach((item) => downloadsWarpstagram.push(item));
    // console.log(items);
    // downloadsVideo.push(item);
  });
  window.electron.ipcRenderer.on('item-download-progress', (arg) => {
    let id = arg[0];
    let progress = arg[1];
    let matchingDownload = getMatchingDownload(id);
    matchingDownload.downloadedPercentage = progress;
    if (matchingDownload.downloadedPercentage === 100) {
      matchingDownload.downloadComplete = true;
    }
    // downloadComplete;
    // console.log(matchingDownload.downloadedPercentage);
    setPercentUpdateState(progress);
  });
  window.electron.ipcRenderer.on('item-convert-progress', (arg) => {
    let id = arg[0];
    let progress = arg[1];
    let matchingDownload = getMatchingDownload(id);
    matchingDownload.conversionPercentage = progress;
    setPercentUpdateState(progress);
  });
  window.electron.ipcRenderer.on('item-conversion-complete', (arg) => {
    let id = arg[0];
    let matchingDownload = getMatchingDownload(id);
    matchingDownload.conversionComplete = true;
    setPercentUpdateState(0);
  });
  window.electron.ipcRenderer.on('item-fileSize-retrieved', (arg) => {
    let id = arg[0];
    let fileSize = arg[1];
    let matchingDownload = getMatchingDownload(id);
    matchingDownload.fileSize = fileSize;
    setPercentUpdateState(fileSize);
  });
  return (
    <DownloadsContext.Provider
      value={{
        downloadsAudio: downloadsAudio,
        downloadsVideo: downloadsVideo,
        downloadsAudioState: downloadsAudioState,
        downloadsVideoState: downloadsVideoState,
        percentUpdateState: percentUpdateState,
        downloadsWarpstagram: downloadsWarpstagram,
        getDownloadID: getDownloadID,
        downloadContextActionHandler: downloadContextActionHandler,
      }}
    >
      {props.children}
    </DownloadsContext.Provider>
  );
};

export default DownloadsContext;
