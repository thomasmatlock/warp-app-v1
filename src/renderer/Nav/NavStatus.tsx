import { useState } from 'react';
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
let updateMessage = '';
const iconAnimated = true;
const iconNotAnimated = true;

export default function NavStatus() {
  const [isWindows, setIsWindows] = useState(false);
  const [isApple, setIsApple] = useState(false);
  const [isLinux, setIsLinux] = useState(false);
  const [checkingForUpdate, setCheckingForUpdate] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateUnavailable, setUpdateUnavailable] = useState(true);
  const [updateDownloading, setUpdateDownloading] = useState(false);
  const [updateDownloaded, setUpdateDownloaded] = useState(false);
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

  const restartHandler = () => {
    window.electron.ipcRenderer.sendMessage('restart_and_update', []);
  };
  return (
    <div className="statusContainer">
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
      <StatusIcon icon={ProgressIcon} animated />
      {checkingForUpdate && <StatusIcon icon={ProgressIcon} animated />}
      {updateAvailable && <StatusIcon icon={ProgressIcon} animated />}
      {updateDownloading && <StatusIcon icon={ProgressIcon} animated />}
      <StatusText message={updateMessage} />
    </div>
  );
}
