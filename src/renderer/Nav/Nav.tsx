/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Fragment, useState, useContext } from 'react';
// LOGO ICONS
import NavLogoImg from '../../../assets/Nav/logo/blackhole.svg';
import navLogoText from '../../../assets/Nav/logo/logo.svg';
// NAV BUTTON ICONS
import iconAudio from '../../../assets/Modals/settings/audio.svg';
import iconVideo from '../../../assets/Modals/settings/video3.svg';
import iconWarpstagram from '../../../assets/Modals/settings/warpstagram.svg';
import ProgressIcon from './downloading.svg';
import NewVersionIcon from './new.svg';
// PLATFORM ICONS
import iconWindows from '../../../assets/Nav/platform/windows.svg';
import iconApple from '../../../assets/Nav/platform/apple.svg';
import iconLinux from '../../../assets/Nav/platform/linux.svg';
import ThemeContext from '../../storage/themeContext';
import NavContext from '../../storage/navContext';
import './Nav.scss';
let appVersion: string = '1.0.0';
let appRoot: string = '1.0.0';
let updateMessage = ' No update available';

const Nav = (props) => {
  const themeCtx = useContext(ThemeContext);
  const navCtx = useContext(NavContext);

  const [isWindows, setIsWindows] = useState(false);
  const [isApple, setIsApple] = useState(false);
  const [isLinux, setIsLinux] = useState(false);
  const [checkingForUpdate, setCheckingForUpdate] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
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
  window.electron.ipcRenderer.on('checking-for-update', (arg) => {
    console.log('checking-for-update');
    setUpdateAvailable(true);
    updateMessage = arg;
  });
  window.electron.ipcRenderer.on('update-available', (arg: string) => {
    updateMessage = arg;
  });
  window.electron.ipcRenderer.on('download-progress', (arg: string) => {
    updateMessage = arg;
  });
  window.electron.ipcRenderer.on('update-downloaded', (arg: string) => {
    updateMessage = arg;
    setUpdateAvailable(false);
    setUpdateDownloaded(true);
  });

  const mouseEnterHandler = () => {};
  const mouseLeaveHandler = () => {};
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
          <a className="navLogo">
            {isWindows && (
              <img
                className="platformImg"
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
                className="platformImg"
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
                className="platformImg"
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
            {/* <img className="navLogoText" alt="icon" src={navLogoText} /> */}
          </a>
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
              {`Version ${appVersion}`}
              {/* {updateMessage} */}

              {/* {` Project root: ` + appRoot} */}
            </p>
            {updateAvailable && (
              <img
                className="platformImg update_icon"
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
                className="platformImgLarge"
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
              className="navVersion"
              style={
                themeCtx.isDarkTheme
                  ? { filter: 'invert(0%)' }
                  : {
                      filter: 'invert(100%)',
                    }
              }
            >
              {/* {`Version ${appVersion}`} */}
              {updateMessage}

              {/* {` Project root: ` + appRoot} */}
            </p>
          </a>
        </div>
      </div>
    </>
  );
};
export default Nav;
