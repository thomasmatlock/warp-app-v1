import { Fragment, useState, useContext } from 'react';
import './ActionBar.scss';
// import BrowserBar from '../ActionBar/BrowserBar/BrowserBar';
import BrowserBar from './ActionBarBrowser';
import FilterBar from './ActionBarWarpstagram';
import FilterBar_DownloadsAudio from './ActionBarAudio';
import FilterBar_DownloadsVideo from './ActionBarVideo';
import ThemeContext from '../../storage/themeContext';
import ActionBarContext from '../../storage/actionBarContext';

const ActionBar = (props) => {
  const themeCtx = useContext(ThemeContext);
  const actionBarCtx = useContext(ActionBarContext);
  // console.log(actionBarCtx);

  const [audioMode, setAudioMode] = useState(true);
  const [videoMode, setVideoMode] = useState(false);
  const [warpstagramMode, setWarpstagramMode] = useState(false);
  const [audioDownloadsTotal, setAudioDownloadsTotal] = useState(0);
  const [videoDownloadsTotal, setVideoDownloadsTotal] = useState(0);
  const [warpstagramDownloadsTotal, setWarpstagramDownloadsTotal] = useState(0);
  const countAudioDownloads = () => {
    setTimeout(() => {
      let audioItems = document.querySelectorAll(
        '.content__panel__downloads__list__item__audio'
      );
      setAudioDownloadsTotal(audioItems.length);
    }, 50);
  };
  const countVideoDownloads = () => {
    setTimeout(() => {
      let videoItems = document.querySelectorAll(
        '.content__panel__downloads__list__item__video'
      );
      setVideoDownloadsTotal(videoItems.length);
    }, 50);
  };
  const countWarpstagramDownloads = () => {
    setTimeout(() => {
      let warpstagramItems = document.querySelectorAll(
        '.content__panel__warpstagram__account'
      );
      setWarpstagramDownloadsTotal(warpstagramItems.length);
    }, 50);
  };
  window.electron.ipcRenderer.on('ready-to-show', (arg) => {
    countAudioDownloads();
    countVideoDownloads();
    countWarpstagramDownloads();
  });
  window.electron.ipcRenderer.on('nav: mode: audio', (arg) => {
    setAudioMode(true);
    setVideoMode(false);
    setWarpstagramMode(false);
    countAudioDownloads();
  });
  window.electron.ipcRenderer.on('nav: mode: video', (arg) => {
    setVideoMode(true);
    setAudioMode(false);
    setWarpstagramMode(false);
    countVideoDownloads();
  });
  window.electron.ipcRenderer.on('nav: mode: warpstagram', (arg) => {
    setWarpstagramMode(true);
    setAudioMode(false);
    setVideoMode(false);
    countWarpstagramDownloads();
  });
  const mouseEnterHandler = () => {
    // console.log('mouse enter');
    // window.electron.ipcRenderer.sendMessage('browserNotHovered');
    window.electron.ipcRenderer.sendMessage('prepareTobWin');
  };
  const mouseLeaveHandler = () => {
    // console.log('mouse leave');
    window.electron.ipcRenderer.sendMessage('showbWin');
  };
  // window.electron.ipcRenderer.sendMessage('package', ['Nav requesting package.json']); // send message to main process
  return (
    <Fragment>
      <div
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        className="actionBar"
        style={
          themeCtx.isDarkTheme
            ? { backgroundColor: themeCtx.actionBar.dark.backgroundColor }
            : {
                backgroundColor: themeCtx.actionBar.light.backgroundColor,
              }
        }
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
