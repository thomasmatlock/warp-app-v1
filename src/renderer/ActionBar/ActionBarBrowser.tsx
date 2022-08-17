import { Fragment, useState, useContext } from 'react';
import './ActionBarBrowser.scss';
import backIcon from '../../../assets/BrowserBar/browser/back.svg';
import forwardIcon from '../../../assets/BrowserBar/browser/forward.svg';
import reloadIcon from '../../../assets/BrowserBar/browser/reload.svg';
import playlistVideoIcon from '../../../assets/BrowserBar/browser/playlistVideo.svg';
import playlistAudioIcon from '../../../assets/BrowserBar/browser/playlistAudio.svg';
import videoIcon from '../../../assets/BrowserBar/browser/video.svg';
import IconFileTypeAudio from '../../../assets/Downloads/fileTypeAudio.svg';
import IconFileTypeVideo from '../../../assets/Downloads/fileTypeVideo.svg';
import channelIcon from '../../../assets/BrowserBar/browser/channel2.svg';
import BrowserBarDownloadSource from './ActionBarBrowserSource';
import ThemeContext from '../../storage/themeContext';
import ActionBarContext from '../../storage/actionBarContext';
import NavContext from '../../storage/navContext';
import PrefsContext from '../../storage/prefsContext';

const BrowserBar = () => {
  const themeCtx = useContext(ThemeContext);
  const actionBarCtx = useContext(ActionBarContext);
  const navCtx = useContext(NavContext);
  const prefsCtx = useContext(PrefsContext);
  console.log(prefsCtx.prefs.audio.dropdowns[0].defaultValue);
  console.log(prefsCtx.prefs.audio.dropdowns[1].defaultValue);
  // console.log(prefsCtx.prefs.audio.dropdowns[1]);

  // console.log(actionBarCtx);

  const youtubeParser = (url: string) => {
    // console.log(url);
    if (url.includes('watch')) {
      // console.log('this is a video');
      actionBarCtx.setVideoExists(true);
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
  window.electron.ipcRenderer.on('did-navigate-in-page', (arg) => {
    getURLpageType(arg);
  });
  const downloadAudioHandler = () => {
    window.electron.ipcRenderer.sendMessage('screenshotting');
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
  const browserGoBackHandler = () => {
    window.electron.ipcRenderer.sendMessage('BrowserBar: button: goBack');
  };
  const browserGoForwardHandler = () => {
    window.electron.ipcRenderer.sendMessage('BrowserBar: button: goForward');
  };
  const browserReloadHandler = () => {
    window.electron.ipcRenderer.sendMessage('BrowserBar: button: reload');
  };

  return (
    <Fragment>
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
        {navCtx.audioMode &&
          !actionBarCtx.isBrowserPanelCollapsed &&
          actionBarCtx.channelExists && (
            <div
              onClick={downloadAudioHandler}
              className="browserBarDownloadBtn browserBarDownloadBtn__audio"
            >
              <img src={channelIcon} alt="playlistVideoIcon" />
              {actionBarCtx.channelExists && <p> Download Channel Audio</p>}
            </div>
          )}
        {navCtx.audioMode &&
          !actionBarCtx.isBrowserPanelCollapsed &&
          actionBarCtx.singlePlaylistExists && (
            <div
              onClick={downloadAudioHandler}
              className="browserBarDownloadBtn browserBarDownloadBtn__audio"
            >
              <img src={playlistVideoIcon} alt="playlistVideoIcon" />
              {actionBarCtx.singlePlaylistExists && (
                <p> Download Audio Playlist</p>
              )}
            </div>
          )}
        {navCtx.audioMode &&
          !actionBarCtx.isBrowserPanelCollapsed &&
          actionBarCtx.multiplePlaylistsExist && (
            <div
              onClick={downloadAudioHandler}
              className="browserBarDownloadBtn browserBarDownloadBtn__audio"
            >
              <img src={playlistVideoIcon} alt="playlistVideoIcon" />
              {actionBarCtx.multiplePlaylistsExist && (
                <p> Download Audio Playlists</p>
              )}
            </div>
          )}
        {navCtx.audioMode &&
          !actionBarCtx.isBrowserPanelCollapsed &&
          actionBarCtx.videoExists && (
            <div
              onClick={downloadAudioHandler}
              className="browserBarDownloadBtn browserBarDownloadBtn__audio"
            >
              <img src={IconFileTypeAudio} alt="playlistVideoIcon" />
              {actionBarCtx.videoExists && <p> Download Audio MP3</p>}
            </div>
          )}{' '}
        {navCtx.videoMode &&
          !actionBarCtx.isBrowserPanelCollapsed &&
          actionBarCtx.channelExists && (
            <div
              onClick={downloadVideoHandler}
              className="browserBarDownloadBtn browserBarDownloadBtn__video"
            >
              <img src={channelIcon} alt="playlistVideoIcon" />
              {actionBarCtx.channelExists && <p> Download Channel Videos</p>}
            </div>
          )}
        {navCtx.videoMode &&
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
          )}
        {navCtx.videoMode &&
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
          )}
        {navCtx.videoMode &&
          !actionBarCtx.isBrowserPanelCollapsed &&
          actionBarCtx.videoExists && (
            <div
              onClick={downloadVideoHandler}
              className="browserBarDownloadBtn browserBarDownloadBtn__video"
            >
              <img src={videoIcon} alt="playlistVideoIcon" />
              {actionBarCtx.videoExists && <p> Download Video MP4</p>}
            </div>
          )}
      </div>
    </Fragment>
  );
};
export default BrowserBar;
