import { Fragment, useState, useContext } from 'react';
import './ActionBar.scss';
// import BrowserBar from '../ActionBar/BrowserBar/BrowserBar';
import BrowserBar from './ActionBarBrowser';
import FilterBar from './ActionBarWarpstagram';
import FilterBar_DownloadsAudio from './ActionBarAudio';
import FilterBar_DownloadsVideo from './ActionBarVideo';
import ThemeContext from '../../storage/themeContext';
import ActionBarContext from '../../storage/actionBarContext';
import NavContext from '../../storage/navContext';

const ActionBar = (props) => {
  const themeCtx = useContext(ThemeContext);
  const navCtx = useContext(NavContext);
  const actionBarCtx = useContext(ActionBarContext);

  const [audioDownloadsTotal, setAudioDownloadsTotal] = useState(0);
  const [videoDownloadsTotal, setVideoDownloadsTotal] = useState(0);
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
  window.electron.ipcRenderer.on('ready-to-show', (arg) => {
    countAudioDownloads();
    countVideoDownloads();
    countWarpstagramDownloads();
  });
  if (navCtx.audioMode) countAudioDownloads();
  if (navCtx.videoMode) countVideoDownloads();
  if (navCtx.warpstagramMode) countWarpstagramDownloads();
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
        {navCtx.audioMode && <BrowserBar audioMode={navCtx.audioMode} />}
        {navCtx.videoMode && <BrowserBar videoMode={navCtx.videoMode} />}
        {navCtx.audioMode && (
          <FilterBar_DownloadsAudio
            audioMode={navCtx.audioMode}
            audioDownloadsTotal={audioDownloadsTotal}
          />
        )}
        {navCtx.videoMode && (
          <FilterBar_DownloadsVideo
            videoMode={navCtx.videoMode}
            videoDownloadsTotal={videoDownloadsTotal}
          />
        )}
        {navCtx.warpstagramMode && (
          <FilterBar warpstagramDownloadsTotal={warpstagramDownloadsTotal} />
        )}
      </div>
    </Fragment>
  );
};
export default ActionBar;
