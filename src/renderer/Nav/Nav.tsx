/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useContext } from 'react';
// LOGO ICONS
import NavLogoImg from './logo/blackhole.svg';
import navLogoText from './logo/logo.svg';
// NAV BUTTON ICONS
import iconAudio from './audio.svg';
import iconVideo from './video4.svg';
import iconWarpstagram from './warpstagram3.svg';
import ProgressIcon from '../Common/status.svg';
import NewVersionIcon from './new3.svg';
// PLATFORM ICONS
import iconWindows from './platform/windows.svg';
import iconApple from './platform/apple.svg';
import iconLinux from './platform/linux.svg';
import ThemeContext from '../../storage/themeContext';
import NavContext from '../../storage/navContext';
import './Nav.scss';

let appVersion = '';
let appRoot = '1.0.0';
let updateMessage = '';

const Nav = (props) => {
  const themeCtx = useContext(ThemeContext);
  const navCtx = useContext(NavContext);

  const [isWindows, setIsWindows] = useState(false);
  const [isApple, setIsApple] = useState(false);
  const [isLinux, setIsLinux] = useState(false);
  const [checkingForUpdate, setCheckingForUpdate] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateUnavailable, setUpdateUnavailable] = useState(false);
  const [updateDownloading, setUpdateDownloading] = useState(false);
  const [updateDownloaded, setUpdateDownloaded] = useState(false);
  window.electron.ipcRenderer.on('platform', (arg) => {
    window.electron.ipcRenderer.sendMessage('package', []);
    if (arg === 'windows') setIsWindows(true);
    if (arg === 'darwin') setIsApple(true);
    if (arg === 'linux') setIsLinux(true);
  });

  window.electron.ipcRenderer.on('appVersion', (arg: string) => {
    appVersion = arg;
  });
  window.electron.ipcRenderer.on('appRoot', (arg: string) => {
    appRoot = arg;
  });
  const disableUpdateStates = () => {
    setCheckingForUpdate(false);
    setUpdateAvailable(false);
    setUpdateUnavailable(false);
    setUpdateDownloading(false);
    setUpdateDownloaded(false);
  };
  window.electron.ipcRenderer.on('checking-for-update', (arg: string) => {
    disableUpdateStates();
    setCheckingForUpdate(true);
    updateMessage = arg;
  });
  window.electron.ipcRenderer.on('update-available', (arg: string) => {
    disableUpdateStates();
    setUpdateAvailable(true);
    updateMessage = arg;
  });
  window.electron.ipcRenderer.on('update-not-available', (arg: string) => {
    disableUpdateStates();
    setUpdateUnavailable(true);
    updateMessage = arg;
  });
  window.electron.ipcRenderer.on('download-progress', (arg: string) => {
    disableUpdateStates();
    setUpdateDownloading(true);
    updateMessage = arg;
  });
  window.electron.ipcRenderer.on('update-downloaded', (arg: string) => {
    disableUpdateStates();
    setUpdateDownloaded(true);
    updateMessage = arg;
  });

  const mouseEnterHandler = () => {};
  const mouseLeaveHandler = () => {};
  const restartHandler = () => {
    window.electron.ipcRenderer.sendMessage('restart_and_update', []);
  };
  return (
    <>
      <div
        // onMouseEnter={mouseEnterHandler}
        // onMouseLeave={mouseLeaveHandler}
        className="navMain"
        style={
          themeCtx.isDarkTheme
            ? { backgroundColor: themeCtx.nav.dark.backgroundColor }
            : {
                backgroundColor: themeCtx.nav.light.backgroundColor,
              }
        }
      >
        <div className="logoContainer">
          <a className="navLogo">
            <img
              className="navLogoImg"
              style={
                themeCtx.isDarkTheme
                  ? { filter: 'invert(0%)' }
                  : {
                      filter: 'invert(100%)',
                    }
              }
              alt="icon"
              src={NavLogoImg}
            />
            <img
              className="navLogoText"
              style={
                themeCtx.isDarkTheme
                  ? { filter: 'invert(0%)' }
                  : {
                      filter: 'invert(100%)',
                    }
              }
              alt="icon"
              src={navLogoText}
            />
          </a>
        </div>
        <div className="buttonContainer">
          <div
            onClick={navCtx.audioModeHandler}
            id="navMainBtnAudio"
            className={navCtx.audioMode ? 'navMainBtnActive' : 'navMainBtn'}
          >
            <img
              className={
                navCtx.audioMode ? 'navMainBtn__icon' : 'navMainBtn__icon'
              }
              src={iconAudio}
            />
            <p>Audio</p>
          </div>
          <div
            onClick={navCtx.videoModeHandler}
            id="navMainBtnVideo"
            className={navCtx.videoMode ? 'navMainBtnActive' : 'navMainBtn'}
          >
            <img
              className={
                navCtx.videoMode ? 'navMainBtn__icon' : 'navMainBtn__icon'
              }
              src={iconVideo}
            />
            <p>Video</p>
          </div>
          <div
            onClick={navCtx.warpstagramModeHandler}
            id="navMainBtnWarpstagram"
            className={
              navCtx.warpstagramMode ? 'navMainBtnActive' : 'navMainBtn'
            }
          >
            <img
              className={
                navCtx.warpstagramMode ? 'navMainBtn__icon' : 'navMainBtn__icon'
              }
              src={iconWarpstagram}
            />
            <p>Warpstagram</p>
          </div>
        </div>
        <div className="logoContainer">
          {/* VERSION ICON */}
          {updateUnavailable && (
            <a className="navLogo">
              {isWindows && (
                <img
                  className="platformIcon"
                  src={iconWindows}
                  style={
                    themeCtx.isDarkTheme
                      ? { filter: 'invert(0%)' }
                      : {
                          filter: 'invert(100%)',
                        }
                  }
                  alt="icon"
                />
              )}
              {isApple && (
                <img
                  className="platformIcon"
                  src={iconApple}
                  style={
                    themeCtx.isDarkTheme
                      ? { filter: 'invert(0%)' }
                      : {
                          filter: 'invert(100%)',
                        }
                  }
                  alt="icon"
                />
              )}
              {isLinux && (
                <img
                  className="platformIcon"
                  src={iconLinux}
                  style={
                    themeCtx.isDarkTheme
                      ? { filter: 'invert(0%)' }
                      : {
                          filter: 'invert(100%)',
                        }
                  }
                  alt="icon"
                />
              )}
            </a>
          )}
          {/* VERSION TEXT */}
          {updateUnavailable && (
            <a className="navLogo">
              <p
                className="navVersion"
                style={
                  themeCtx.isDarkTheme
                    ? { color: themeCtx.nav.dark.color }
                    : {
                        color: themeCtx.nav.light.color,
                      }
                }
              >
                {`${appVersion}`}
                {appRoot}
              </p>
            </a>
          )}
          <a className="navLogo">
            {checkingForUpdate && (
              <img
                className="platformIcon update_icon"
                src={ProgressIcon}
                style={
                  themeCtx.isDarkTheme
                    ? { filter: 'invert(100%)' }
                    : {
                        filter: 'invert(0%)',
                      }
                }
                alt="icon"
              />
            )}
            {updateAvailable && (
              <img
                className="platformIcon update_icon"
                src={ProgressIcon}
                style={
                  themeCtx.isDarkTheme
                    ? { filter: 'invert(100%)' }
                    : {
                        filter: 'invert(0%)',
                      }
                }
                alt="icon"
              />
            )}
            {updateDownloading && (
              <img
                className="platformIcon update_icon"
                src={ProgressIcon}
                style={
                  themeCtx.isDarkTheme
                    ? { filter: 'invert(100%)' }
                    : {
                        filter: 'invert(0%)',
                      }
                }
                alt="icon"
              />
            )}
            {updateDownloaded && (
              <img
                className="installNewVersion"
                src={NewVersionIcon}
                // style={
                //   themeCtx.isDarkTheme
                //     ? { filter: 'invert(100%)' }
                //     : {
                //         filter: 'invert(0%)',
                //       }
                // }
                alt="icon"
              />
            )}
            <p
              className="updateMessages"
              style={
                themeCtx.isDarkTheme
                  ? { filter: 'invert(0%)' }
                  : {
                      filter: 'invert(100%)',
                    }
              }
            >
              {updateMessage}
            </p>
            {updateDownloaded && (
              <div
                className="restartBtn"
                onClick={restartHandler}
                style={
                  themeCtx.isDarkTheme
                    ? { filter: 'invert(0%)' }
                    : {
                        filter: 'invert(100%)',
                      }
                }
              >
                Restart now
              </div>
            )}
          </a>
        </div>
      </div>
    </>
  );
};
export default Nav;
