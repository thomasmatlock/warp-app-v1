import { Fragment, useState, useContext } from 'react';
import './BrowserBar.scss';
import backIcon from '../../../assets/BrowserBar/browser/back.svg';
import forwardIcon from '../../../assets/BrowserBar/browser/forward.svg';
import BrowserBarDownloadSource from './BrowserBarDownloadSource';
import ThemeContext from '../../storage/themeContext';
import ActionBarContext from '../../storage/actionBarContext';

// import browserBarDownloadSourceIcon1 from '../../../../assets/3rdparty/fontawesome/svgs/brands/youtube.svg';
// import browserBarDownloadSourceIcon2 from '../../../../assets/3rdparty/fontawesome/svgs/solid/caret-down.svg';
const BrowserBar = (props) => {
  const themeCtx = useContext(ThemeContext);
  const actionBarCtx = useContext(ActionBarContext);
  // const [audioMode, setAudioMode] = useState(true);
  // const [videoMode, setVideoMode] = useState(false);
  let audioMode = props.audioMode;
  let videoMode = props.videoMode;
  // const [warpstagramMode, setWarpstagramMode] = useState(false);

  // window.electron.ipcRenderer.on('nav: mode: audio', (arg) => {
  //   setAudioMode(true);
  //   setVideoMode(false);
  // });
  // window.electron.ipcRenderer.on('nav: mode: video', (arg) => {
  //   setVideoMode(true);
  //   setAudioMode(false);
  // });

  const downloadAudioHandler = () => {
    window.electron.ipcRenderer.sendMessage('screenshotting');
    // window.electron.ipcRenderer.on('nav: mode: warpstagram', (arg) => {
    window.electron.ipcRenderer.sendMessage(
      'BrowserBar: button: downloadAudio',
      [`Download Audio`]
    );
  };

  const downloadVideoHandler = () => {
    window.electron.ipcRenderer.sendMessage(
      'BrowserBar: button: downloadVideo',
      [`Download Video`]
    );
  };

  return (
    <Fragment>
      <div className="browserBar">
        <div className="filterBar__menu filterBar__menu__left">
          <div className="filterBar__menu__item filterBar__menu__item__sort">
            <img
              src={backIcon}
              title="Sort"
              style={
                themeCtx.isDarkTheme
                  ? { filter: 'invert(100%)' }
                  : {
                      filter: 'invert(0%)',
                    }
              }
            />
          </div>{' '}
          <div className="filterBar__menu__item filterBar__menu__item__sort">
            <img
              src={forwardIcon}
              title="Sort"
              style={
                themeCtx.isDarkTheme
                  ? { filter: 'invert(100%)' }
                  : {
                      filter: 'invert(0%)',
                    }
              }
            />
          </div>
        </div>
        {!actionBarCtx.isBrowserPanelCollapsed && <BrowserBarDownloadSource />}
        {audioMode && !actionBarCtx.isBrowserPanelCollapsed && (
          <a
            onClick={downloadAudioHandler}
            className="browserBarDownloadBtn browserBarDownloadBtn__audio"
          >
            Download Audio MP3
          </a>
        )}
        {videoMode && !actionBarCtx.isBrowserPanelCollapsed && (
          <a
            onClick={downloadVideoHandler}
            className="browserBarDownloadBtn browserBarDownloadBtn__video"
          >
            Download Video MP4
          </a>
        )}
      </div>
    </Fragment>
  );
};
export default BrowserBar;
