/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Fragment, useState, useEffect, useContext } from 'react';
import './ActionBarBrowser.scss';
import backIcon from './browser/back.svg';
import forwardIcon from './browser/forward.svg';
import reloadIcon from './browser/reload.svg';
// import playlistVideoIcon from '../../../assets/BrowserBar/browser/playlistVideo.svg';
// import playlistAudioIcon from '../../../assets/BrowserBar/browser/playlistAudio.svg';
import videoIcon from '../Common/video-camera.svg';
import IconFileTypeAudio from '../Common/fileTypeAudio.svg';
// import IconFileTypeVideo from '../Common/fileTypeVideo.svg';
// import channelIcon from '../../../assets/BrowserBar/browser/channel2.svg';
import BrowserBarDownloadSource from './ActionBarBrowserSource';
import ThemeContext from '../../storage/themeContext';
import ActionBarContext from '../../storage/actionBarContext';
import NavContext from '../../storage/navContext';
import PrefsContext from '../../storage/prefsContext';
import SourcesContext from '../../storage/sourcesContext';
import DownloadsContext from '../../storage/downloadsContext';
import Loader from './Loader';
import LoaderPlanets from './LoaderPlanets';

const BrowserBar = () => {
  const [canDownload, setCanDownload] = useState(true);
  const themeCtx = useContext(ThemeContext);
  const actionBarCtx = useContext(ActionBarContext);
  const navCtx = useContext(NavContext);
  const prefsCtx = useContext(PrefsContext);
  const sourcesCtx = useContext(SourcesContext);
  const downloadsCtx = useContext(DownloadsContext);
  // console.log(downloadsCtx);
  useEffect(() => {
    // console.log('BrowserBar useEffect');
    //  setTimeout(() => {
    setCanDownload(true);
    //  }, 1000);
  }, [downloadsCtx.downloadsAudioState, downloadsCtx.downloadsVideoState]);

  // console.log(sourcesCtx);

  const [audioFormat, setAudioFormat] = useState('MP3');
  const [videoFormat, setVideoFormat] = useState('MP4');
  // console.log(prefsCtx.prefs.audio.dropdowns[0].defaultValue);
  // console.log(prefsCtx.prefs.audio.dropdowns[1].defaultValue);
  // console.log(prefsCtx.prefs.video.dropdowns[1].defaultValue);

  useEffect(() => {
    if (prefsCtx.prefs.audio === undefined) {
      // console.log('prefsCtx.prefs is undefined');
    } else if (prefsCtx.prefs.audio) {
      setAudioFormat(prefsCtx.prefs.audio.dropdowns[1].defaultValue.label);
      setVideoFormat(prefsCtx.prefs.video.dropdowns[1].defaultValue.label);
    }
  }, [prefsCtx.prefs]);
  const youtubeParser = (url: string) => {
    // console.log(url);
    if (url.includes('watch')) {
      // console.log('this is a video');
      actionBarCtx.setVideoExists(true);
      actionBarCtx.setSourceWidth('calc(100% - 510px)');
    }
    if (url.includes('featured')) {
      // console.log('this is a featured video');
      actionBarCtx.setVideoExists(true);
    }
    if (url.includes('watch') && url.includes('&list=')) {
      // console.log('this is a video in a playlist');
      // actionBarCtx.setVideoExists(true);
      actionBarCtx.setSinglePlaylistExists(true);
    }

    if (
      url.includes('/c/') ||
      url.includes('/channel/') ||
      (url.includes('/user/') && !url.includes('/channels'))
    ) {
      actionBarCtx.setChannelExists(true);
      // console.log('this is a channel');
    }
    if (url.includes('channel')) {
      // console.log('this is your channel');
    }
    if (url.includes('playlist')) {
      actionBarCtx.setMultiplePlaylistsExist(false);
      actionBarCtx.setSinglePlaylistExists(true);
      // console.log(' a playlist exists');
      if (url.includes('+playlist')) {
        actionBarCtx.setMultiplePlaylistsExist(false);
        actionBarCtx.setSinglePlaylistExists(false);
        // console.log(' a playlist exists');
      }
    }
    if (url.includes('playlists')) {
      console.log('this channel has multiple playlists');
      actionBarCtx.setSinglePlaylistExists(false);
      actionBarCtx.setMultiplePlaylistsExist(true);
    }
  };
  const getURLpageType = (url: string) => {
    actionBarCtx.disableAllStates();
    if (url.includes('youtube')) {
      youtubeParser(url);
    }
  };
  window.electron.ipcRenderer.on('bView ready-to-show', (url) => {
    getURLpageType(url);
  });
  useEffect(() => {
    getURLpageType(sourcesCtx.currentURL);
  }, [sourcesCtx.currentURL]);
  const downloadAudioHandler = () => {
    // setTimeout(() => {
    //   setCanDownload(true);
    // }, 1000);
    if (canDownload) {
      // window.electron.ipcRenderer.sendMessage('screenshotting');
      window.electron.ipcRenderer.sendMessage(
        'BrowserBar: button: downloadAudio',
        [`Download Audio`]
      );
    }
    setCanDownload(false);
  };
  const downloadAudioPlaylistHandler = () => {
    // setTimeout(() => {
    //   setCanDownload(true);
    // }, 1000);
    if (canDownload) {
      // window.electron.ipcRenderer.sendMessage('screenshotting');
      window.electron.ipcRenderer.sendMessage(
        'BrowserBar: button: downloadAudioPlaylist',
        [`Download Audio`]
      );
    }
    setCanDownload(false);
  };

  const downloadVideoHandler = () => {
    // setTimeout(() => {
    //   setCanDownload(true);
    // }, 1000);
    if (canDownload) {
      window.electron.ipcRenderer.sendMessage(
        'BrowserBar: button: downloadVideo',
        [`Download Video`]
      );
      setCanDownload(false);
    }
  };
  const browserGoBackHandler = () => {
    window.electron.ipcRenderer.sendMessage('BrowserBar: button: goBack');
  };
  const browserGoForwardHandler = () => {
    window.electron.ipcRenderer.sendMessage('BrowserBar: button: goForward');
  };
  const browserReloadHandler = () => {
    window.electron.ipcRenderer.sendMessage('BrowserBar: button: reload');
  };
  let highlight = {
    boxShadow: '-0px 0px 25px #fff ',
    animation: 'highlight infinite',
    animationDuration: '1.5s',
    animationTimingFunction: 'ease-in-out',
  };
  let noHighlight = {
    boxShadow: 'none',
    animation: 'none',
  };
  return (
    <>
      <div className="browserBar">
        <div className="filterBar__menu filterBar__menu__left">
          {!actionBarCtx.isBrowserPanelCollapsed && (
            <div
              onClick={browserGoBackHandler}
              className="filterBar__menu__item filterBar__menu__item__sort"
            >
              <img
                src={backIcon}
                title="Go Back"
                style={
                  themeCtx.isDarkTheme
                    ? { filter: 'invert(100%)' }
                    : {
                        filter: 'invert(0%)',
                      }
                }
              />
            </div>
          )}
          {!actionBarCtx.isBrowserPanelCollapsed && (
            <div
              onClick={browserGoForwardHandler}
              className="filterBar__menu__item filterBar__menu__item__sort"
            >
              <img
                src={forwardIcon}
                title="Go Forward"
                style={
                  themeCtx.isDarkTheme
                    ? { filter: 'invert(100%)' }
                    : {
                        filter: 'invert(0%)',
                      }
                }
              />
            </div>
          )}
          {!actionBarCtx.isBrowserPanelCollapsed && (
            <div
              onClick={browserReloadHandler}
              className="filterBar__menu__item filterBar__menu__item__sort"
            >
              <img
                src={reloadIcon}
                title="Reload"
                style={
                  themeCtx.isDarkTheme
                    ? { filter: 'invert(100%)' }
                    : {
                        filter: 'invert(0%)',
                      }
                }
              />
            </div>
          )}
        </div>
        {!actionBarCtx.isBrowserPanelCollapsed && <BrowserBarDownloadSource />}
        {/* {navCtx.audioMode &&
          !actionBarCtx.isBrowserPanelCollapsed &&
          actionBarCtx.channelExists && (
            <div
              onClick={downloadAudioHandler}
              className="browserBarDownloadBtn browserBarDownloadBtn__audio"
            >
              <img src={channelIcon} alt="playlistVideoIcon" />
              {actionBarCtx.channelExists && <p> Download Channel Audio</p>}
            </div>
          )} */}
        {/* {navCtx.audioMode &&
          !actionBarCtx.isBrowserPanelCollapsed &&
          actionBarCtx.singlePlaylistExists && (
            <div
              // onClick={downloadAudioHandler}
              onClick={downloadAudioPlaylistHandler}
              className="browserBarDownloadBtn browserBarDownloadBtn__audio"
            >
              <img src={playlistVideoIcon} alt="playlistVideoIcon" />
              {actionBarCtx.singlePlaylistExists && (
                <p> Download Audio Playlist</p>
              )}
            </div>
          )} */}
        {/* {navCtx.audioMode &&
          !actionBarCtx.isBrowserPanelCollapsed &&
          actionBarCtx.multiplePlaylistsExist && (
            <div
              onClick={downloadAudioPlaylistHandler}
              className="browserBarDownloadBtn browserBarDownloadBtn__audio"
            >
              <img src={playlistVideoIcon} alt="playlistVideoIcon" />
              {actionBarCtx.multiplePlaylistsExist && (
                <p> Download Audio Playlists</p>
              )}
            </div>
          )} */}
        {navCtx.audioMode &&
          !actionBarCtx.isBrowserPanelCollapsed &&
          actionBarCtx.videoExists && (
            <div
              onClick={downloadAudioHandler}
              // className="browserBarDownloadBtn browserBarDownloadBtn__audio"
              className={
                downloadsCtx.downloadsAudio.length === 0
                  ? 'browserBarDownloadBtn browserBarDownloadBtn__audio highlight'
                  : 'browserBarDownloadBtn browserBarDownloadBtn__audio'
              }
            >
              {!canDownload && <Loader />}
              {/* {!canDownload && <LoaderPlanets />} */}
              {canDownload && (
                <img src={IconFileTypeAudio} alt="playlistVideoIcon" />
              )}
              {actionBarCtx.videoExists && canDownload && (
                <p> Download Audio {audioFormat}</p>
              )}
            </div>
          )}{' '}
        {/* {navCtx.videoMode &&
          !actionBarCtx.isBrowserPanelCollapsed &&
          actionBarCtx.channelExists && (
            <div
              onClick={downloadVideoHandler}
              className="browserBarDownloadBtn browserBarDownloadBtn__video"
            >
              <img src={channelIcon} alt="playlistVideoIcon" />
              {actionBarCtx.channelExists && <p> Download Channel Videos</p>}
            </div>
          )} */}
        {/* {navCtx.videoMode &&
          !actionBarCtx.isBrowserPanelCollapsed &&
          actionBarCtx.singlePlaylistExists && (
            <div
              onClick={downloadVideoHandler}
              className="browserBarDownloadBtn browserBarDownloadBtn__video"
            >
              <img src={playlistVideoIcon} alt="playlistVideoIcon" />
              {actionBarCtx.singlePlaylistExists && (
                <p> Download Video Playlist</p>
              )}
            </div>
          )} */}
        {/* {navCtx.videoMode &&
          !actionBarCtx.isBrowserPanelCollapsed &&
          actionBarCtx.multiplePlaylistsExist && (
            <div
              onClick={downloadVideoHandler}
              className="browserBarDownloadBtn browserBarDownloadBtn__video"
            >
              <img src={playlistVideoIcon} alt="playlistVideoIcon" />
              {actionBarCtx.multiplePlaylistsExist && (
                <p> Download Video Playlists</p>
              )}
            </div>
          )} */}
        {navCtx.videoMode &&
          !actionBarCtx.isBrowserPanelCollapsed &&
          actionBarCtx.videoExists && (
            <div
              onClick={downloadVideoHandler}
              className={
                downloadsCtx.downloadsVideo.length === 0
                  ? 'browserBarDownloadBtn browserBarDownloadBtn__video highlight'
                  : 'browserBarDownloadBtn browserBarDownloadBtn__video'
              }
            >
              {!canDownload && <Loader />}
              {canDownload && (
                <img
                  src={videoIcon}
                  // style={
                  //   themeCtx.isDarkTheme
                  //     ? { filter: 'grayscale(100%) invert(100%)' }
                  //     : {
                  //         filter: 'invert(100%)',
                  //       }
                  // }
                  alt="playlistVideoIcon"
                />
              )}
              {actionBarCtx.videoExists && canDownload && (
                <p> Download Video {videoFormat}</p>
              )}
            </div>
          )}
      </div>
    </>
  );
};
export default BrowserBar;
