import { Fragment, useState } from 'react';
import './ActionBar.scss';
// import BrowserBar from '../ActionBar/BrowserBar/BrowserBar';
import BrowserBar from './BrowserBar';
import FilterBar from './FilterBar';
import FilterBar_DownloadsAudio from './FilterBar_DownloadsAudio';
import FilterBar_DownloadsVideo from './FilterBar_DownloadsVideo';

const ActionBar = (props) => {
  const [audioMode, setAudioMode] = useState(true);
  const [videoMode, setVideoMode] = useState(false);
  const [warpstagramMode, setWarpstagramMode] = useState(false);
  const [audioDownloadsTotal, setAudioDownloadsTotal] = useState(10);
  const [videoDownloadsTotal, setVideoDownloadsTotal] = useState(12);
  const [warpstagramDownloadsTotal, setWarpstagramDownloadsTotal] =
    useState(13);
  window.electron.ipcRenderer.on('ready-to-show', (arg) => {
    // count audio downloads
    let audioItems = document.querySelectorAll(
      '.content__panel__downloads__list__item__audio'
    );
    setAudioDownloadsTotal(audioItems.length);
    // count video downloads
    let videoItems = document.querySelectorAll(
      '.content__panel__downloads__list__item__video'
    );
    setVideoDownloadsTotal(videoItems.length);
    // count warpstagram downloads
    let warpstagramItems = document.querySelectorAll(
      '.content__panel__warpstagram__account'
    );
    setWarpstagramDownloadsTotal(warpstagramItems.length);
  });
  window.electron.ipcRenderer.on('nav: mode: audio', (arg) => {
    setAudioMode(true);
    setVideoMode(false);
    setWarpstagramMode(false);
  });
  window.electron.ipcRenderer.on('nav: mode: video', (arg) => {
    setVideoMode(true);
    setAudioMode(false);
    setWarpstagramMode(false);
  });
  window.electron.ipcRenderer.on('nav: mode: warpstagram', (arg) => {
    setWarpstagramMode(true);
    setAudioMode(false);
    setVideoMode(false);
  });
  const mouseEnterHandler = () => {
    // console.log('mouse enter');
    // window.electron.ipcRenderer.sendMessage('browserNotHovered');
    window.electron.ipcRenderer.sendMessage('prepareToHideBrowserWindow');
  };
  const mouseLeaveHandler = () => {
    // console.log('mouse leave');
    window.electron.ipcRenderer.sendMessage('showBrowserWindow');
  };
  // window.electron.ipcRenderer.sendMessage('package', ['Nav requesting package.json']); // send message to main process
  return (
    <Fragment>
      <div
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        className="actionBar"
      >
        {audioMode && <BrowserBar audioMode={audioMode} />}
        {videoMode && <BrowserBar videoMode={videoMode} />}
        {audioMode && (
          <FilterBar_DownloadsAudio
            audioMode={audioMode}
            audioDownloadsTotal={audioDownloadsTotal}
          />
        )}
        {videoMode && (
          <FilterBar_DownloadsVideo
            videoMode={videoMode}
            videoDownloadsTotal={videoDownloadsTotal}
          />
        )}
        {warpstagramMode && (
          <FilterBar warpstagramDownloadsTotal={warpstagramDownloadsTotal} />
        )}
      </div>
    </Fragment>
  );
};
export default ActionBar;
