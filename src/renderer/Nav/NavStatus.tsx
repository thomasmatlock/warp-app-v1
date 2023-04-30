/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useContext } from 'react';

import ThemeContext from '../../store/themeContext';

import StatusText from './NavStatusText';
import StatusIcon from './NavStatusIcon';
import iconWindows from '../Global/platform/windows.svg';
import iconApple from '../Global/platform/apple.svg';
import iconLinux from '../Global/platform/linux.svg';
import ProgressIcon from '../Global/status.svg';
import NewVersionIcon from '../Global/rocket.svg';
import './NavStatus.scss';

let appVersion = '1.0.0';
let appRoot = '';
let updaterMessage = '';

export default function NavStatus() {
  const themeCtx = useContext(ThemeContext);

  const [isWindows, setIsWindows] = useState(false);
  const [isApple, setIsApple] = useState(false);
  const [isLinux, setIsLinux] = useState(false);
  const [checkingForUpdate, setCheckingForUpdate] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateUnavailable, setUpdateUnavailable] = useState(true);
  const [updateDownloading, setUpdateDownloading] = useState(false);
  const [updateDownloaded, setUpdateDownloaded] = useState(false);
  const [featureCompleteStatus, setFeatureCompleteStatus] = useState('');

  const disableUpdateStates = () => {
    setCheckingForUpdate(false);
    setUpdateAvailable(false);
    setUpdateUnavailable(false);
    setUpdateDownloading(false);
    setUpdateDownloaded(false);
  };
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
  window.electron.ipcRenderer.on('checking-for-update', (arg: string) => {
    disableUpdateStates();
    setCheckingForUpdate(true);
    updaterMessage = arg;
  });
  window.electron.ipcRenderer.on('update-available', (arg: string) => {
    disableUpdateStates();
    setUpdateAvailable(true);
    updaterMessage = arg;
  });
  window.electron.ipcRenderer.on('update-not-available', (arg: string) => {
    disableUpdateStates();
    setUpdateUnavailable(true);
    updaterMessage = arg;
  });
  window.electron.ipcRenderer.on('download-progress', (arg: string) => {
    disableUpdateStates();
    setUpdateDownloading(true);
    updaterMessage = arg;
  });
  window.electron.ipcRenderer.on('update-downloaded', (arg: string) => {
    disableUpdateStates();
    setUpdateDownloaded(true);
    updaterMessage = arg;
  });

  const restartHandler = () => {
    window.electron.ipcRenderer.sendMessage('restart_and_update', []);
  };
  return (
    <div className="statusContainer">
      {/* PLATFORM ICON */}
      {updateUnavailable && isApple && (
        <StatusIcon icon={iconApple} animated={false} />
      )}
      {updateUnavailable && isWindows && (
        <StatusIcon icon={iconWindows} animated={false} />
      )}
      {updateUnavailable && isLinux && (
        <StatusIcon icon={iconLinux} animated={false} />
      )}
      {/* VERSION TEXT */}
      {updateUnavailable && <StatusText message={appVersion} />}
      {/* <StatusText message={featureCompleteStatus} /> */}
      {/* <StatusIcon icon={ProgressIcon} animated /> */}
      {checkingForUpdate && <StatusIcon icon={ProgressIcon} animated />}
      {updateAvailable && <StatusIcon icon={ProgressIcon} animated />}
      {updateDownloading && <StatusIcon icon={ProgressIcon} animated />}
      {updateDownloaded && (
        <StatusIcon icon={NewVersionIcon} animated={false} />
      )}
      <StatusText message={updaterMessage} />
      {/* RESTART BUTTON */}
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
    </div>
  );
}
