/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useContext } from 'react';
import Logo from '../components/Logo/Logo';

// NAV BUTTON ICONS
import iconAudio from '../Global/audio.svg';
import iconVideo from '../Global/video.svg';
import iconWarpstagram from '../Global/warpstagram.svg';
import ProgressIcon from '../Global/status.svg';
import NewVersionIcon from '../Global/rocket.svg';
// PLATFORM ICONS
import iconWindows from '../Global/platform/windows.svg';
import iconApple from '../Global/platform/apple.svg';
import iconLinux from '../Global/platform/linux.svg';
import ThemeContext from '../../store/themeContext';
import NavContext from '../../store/navContext';
import './Nav.scss';
import StatusText from './StatusText';
import StatusIcon from './StatusIcon';
import NavButtons from './NavButtons';
// console.log(typeof ProgressIcon);

let appVersion = '1.0.0';
let appRoot = '1.0.0';
let updateMessage = '';
// console.log('appVersion', appVersion);

const Nav = (props) => {
  const themeCtx = useContext(ThemeContext);
  const navCtx = useContext(NavContext);

  const [isWindows, setIsWindows] = useState(false);
  const [isApple, setIsApple] = useState(false);
  const [isLinux, setIsLinux] = useState(false);
  const [checkingForUpdate, setCheckingForUpdate] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateUnavailable, setUpdateUnavailable] = useState(true);
  const [updateDownloading, setUpdateDownloading] = useState(false);
  const [updateDownloaded, setUpdateDownloaded] = useState(false);
  const [featureCompleteStatus, setFeatureCompleteStatus] = useState('');
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
  window.electron.ipcRenderer.on('status', (arg) => {
    // console.log(typeof arg);
    // const { complete, inProgress, pending } = arg;
    // console.log(complete[0]);
    // setFeatureCompleteStatus(complete[0]);
    // console.log(featureCompleteStatus);
    // console.log(featureCompleteStatus);
    // setStatus(arg);
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

  // const mouseEnterHandler = () => {};
  // const mouseLeaveHandler = () => {};
  const restartHandler = () => {
    window.electron.ipcRenderer.sendMessage('restart_and_update', []);
  };
  return (
    <>
      <div
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
          <Logo />
        </div>
        <NavButtons />
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
          {updateUnavailable && <StatusText message={appVersion} />}
          <StatusText message={featureCompleteStatus} />
          <StatusIcon icon={ProgressIcon} />
          {checkingForUpdate && <StatusIcon icon={ProgressIcon} />}
          {updateAvailable && <StatusIcon icon={ProgressIcon} />}
          {updateDownloading && <StatusIcon icon={ProgressIcon} />}
          <a className="navLogo">
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
