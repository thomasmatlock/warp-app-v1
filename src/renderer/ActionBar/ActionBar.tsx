/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-pascal-case */
import { useState, useEffect, useContext } from 'react';
import './ActionBar.scss';
// import BrowserBar from '../ActionBar/BrowserBar/BrowserBar';
import BrowserBar from './ActionBarBrowser';
import FilterBar from './ActionBarWarpstagram';
import FilterBar_DownloadsAudio from './ActionBarAudio';
import FilterBar_DownloadsVideo from './ActionBarVideo';
import ThemeContext from '../../store/themeContext';
// import ActionBarContext from '../../storage/actionBarContext';
import NavContext from '../../store/navContext';
import DownloadsContext from '../../store/downloadsContext';
// import DownloadsContext from 'storage/downloadsContext';

const ActionBar = (props) => {
  const themeCtx = useContext(ThemeContext);
  const navCtx = useContext(NavContext);
  const downloadsCtx = useContext(DownloadsContext);
  // const actionBarCtx = useContext(ActionBarContext);

  const [audioDownloadsTotal, setAudioDownloadsTotal] = useState(
    downloadsCtx.downloadsAudioState
  );
  const [videoDownloadsTotal, setVideoDownloadsTotal] = useState(
    downloadsCtx.downloadsVideoState
  );
  useEffect(() => {
    setAudioDownloadsTotal(downloadsCtx.downloadsAudioState);
    setVideoDownloadsTotal(downloadsCtx.downloadsVideoState);
  }, [downloadsCtx.downloadsAudioState, downloadsCtx.downloadsVideoState]);

  useEffect(() => {
    // console.log('ActionBar: useEffect');
    if (navCtx.audioMode) countAudioDownloads();
    if (navCtx.videoMode) countVideoDownloads();
    if (navCtx.warpstagramMode) countWarpstagramDownloads();
  }, [navCtx.audioMode, navCtx.videoMode, navCtx.warpstagramMode]);

  const [warpstagramDownloadsTotal, setWarpstagramDownloadsTotal] = useState(0);
  const [shouldSendScreenshot, setShouldSendScreenshot] = useState(true);
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
  window.addEventListener('keydown', () => {
    // if (event.key === 'Escape') {
    if (navCtx.audioMode) countAudioDownloads();
    if (navCtx.videoMode) countVideoDownloads();
    if (navCtx.warpstagramMode) countWarpstagramDownloads();
    // }
  });
  // if (navCtx.audioMode) countAudioDownloads();
  // if (navCtx.videoMode) countVideoDownloads();
  // if (navCtx.warpstagramMode) countWarpstagramDownloads();
  const mouseEnterHandler = () => {
    if (shouldSendScreenshot) {
      window.electron.ipcRenderer.sendMessage('screenshot', 'from actionBar');
    }
    setShouldSendScreenshot(false);
  };
  const mouseLeaveHandler = () => {
    setShouldSendScreenshot(true);
  };
  return (
    <>
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
        {navCtx.audioMode && <BrowserBar />}
        {navCtx.videoMode && <BrowserBar />}
        {navCtx.audioMode && (
          <FilterBar_DownloadsAudio audioDownloadsTotal={audioDownloadsTotal} />
        )}
        {navCtx.videoMode && (
          <FilterBar_DownloadsVideo videoDownloadsTotal={videoDownloadsTotal} />
        )}
        {navCtx.warpstagramMode && (
          <FilterBar warpstagramDownloadsTotal={warpstagramDownloadsTotal} />
        )}
      </div>
    </>
  );
};
export default ActionBar;
