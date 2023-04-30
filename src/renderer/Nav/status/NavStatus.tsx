/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useContext, useEffect } from 'react';

import ThemeContext from '../../../store/themeContext';

import StatusText from './NavStatusText';
import StatusIcon from './NavStatusIcon';
import NavStatusButton from './NavStatusButton';
import iconWindows from '../../Global/platform/windows.svg';
import iconApple from '../../Global/platform/apple.svg';
import iconLinux from '../../Global/platform/linux.svg';
import ProgressIcon from '../../Global/status.svg';
import NewVersionIcon from '../../Global/rocket.svg';
import './NavStatus.scss';

let appVersion = '1.0.0';
// let appRoot = '';
let updaterMessage = '';
const restartBtnMessage = 'Restart now';
type Status = {
  complete: string[];
  inProgress: string[];
  pending: string[];
};
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
  const [featurePendingStatus, setFeaturePendingStatus] = useState('');
  const [featureInProgressStatus, setFeatureInProgressStatus] = useState('');

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
  window.electron.ipcRenderer.on('status', (arg: Status) => {
    // console.log(arg);

    let { complete, inProgress, pending } = arg;
    complete = complete[0];
    inProgress = inProgress[0];
    pending = pending[0];
    console.log(complete);
    console.log(inProgress);
    console.log(pending);

    // console.log(complete[0]);
    setFeatureCompleteStatus(complete);
    setFeatureInProgressStatus(inProgress);
    setFeaturePendingStatus(pending);
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
      {/* API STATUS TEXT */}
      {/* <StatusText message={featureCompleteStatus} /> */}

      {/* <StatusIcon icon={ProgressIcon} animated /> */}

      {/* UPDATER  */}
      {checkingForUpdate && <StatusIcon icon={ProgressIcon} animated />}
      {updateAvailable && <StatusIcon icon={ProgressIcon} animated />}
      {updateDownloading && <StatusIcon icon={ProgressIcon} animated />}
      {updateDownloaded && (
        <StatusIcon icon={NewVersionIcon} animated={false} />
      )}
      <StatusText message={updaterMessage} />

      {/* UPDATE & RESTART BUTTON */}
      {updateDownloaded && <NavStatusButton message={restartBtnMessage} />}
    </div>
  );
}
