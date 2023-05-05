/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useContext, useEffect } from 'react';

import ThemeContext from '../../../store/themeContext';

import StatusText from './NavStatusText';
import StatusIcon from './NavStatusIcon';
import NavStatusServer from './NavStatusServer';
import NavStatusButton from './NavStatusButton';
import iconWindows from '../../Global/platform/windows.svg';
import iconApple from '../../Global/platform/apple.svg';
// import iconApple from '../../Global/map.png';
import iconLinux from '../../Global/platform/linux.svg';
import ProgressIcon from '../../Global/status.svg';
import NewVersionIcon from '../../Global/rocket.svg';
import './NavStatus.scss';
import { log } from 'console';

// let appVersion = '';
// let appRoot = '';
let updaterMessage = '';
let status = {};
const restartBtnMessage = 'Restart now';
type Status = {
  complete: string[];
  inProgress: string[];
  pending: string[];
};
export default function NavStatus() {
  const themeCtx = useContext(ThemeContext);

  const [checkingForUpdate, setCheckingForUpdate] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateUnavailable, setUpdateUnavailable] = useState(true);
  const [updateDownloading, setUpdateDownloading] = useState(false);
  const [updateDownloaded, setUpdateDownloaded] = useState(false);
  const [statusHovered, setStatusHovered] = useState(false);
  const [platformIcon, setPlatformIcon] = useState(iconWindows);
  const [appVersion, setAppVersion] = useState('');
  const [appRoot, setAppRoot] = useState('');

  const disableUpdateStates = () => {
    setCheckingForUpdate(false);
    setUpdateAvailable(false);
    setUpdateUnavailable(false);
    setUpdateDownloading(false);
    setUpdateDownloaded(false);
  };

  window.electron.ipcRenderer.on('global', (arg) => {
    console.log(arg);

    if (arg.platform === 'windows') setPlatformIcon(iconWindows);
    if (arg.platform === 'darwin') setPlatformIcon(iconApple);
    if (arg.platform === 'linux') setPlatformIcon(iconLinux);
    // appVersion = arg.appVersion;
    setAppVersion(arg.appVersion);
    setAppRoot(arg.appRoot);
    // appRoot = arg.appRoot;
    status = arg.status;
  });

  window.electron.ipcRenderer.on('checking-for-update', (arg: string) => {
    disableUpdateStates();
    setCheckingForUpdate(true);
    updaterMessage = arg;
  });
  window.electron.ipcRenderer.on('updater_update_available', (arg: string) => {
    disableUpdateStates();
    setUpdateAvailable(true);
    updaterMessage = arg;
  });
  window.electron.ipcRenderer.on(
    'updater_update_not_available',
    (arg: string) => {
      // console.log(arg);
      // console.log('update-not-available');

      disableUpdateStates();
      setUpdateUnavailable(true);
      updaterMessage = arg;
    }
  );
  window.electron.ipcRenderer.on('updater_download_progress', (arg: string) => {
    disableUpdateStates();
    setUpdateDownloading(true);
    updaterMessage = arg;
  });
  window.electron.ipcRenderer.on('updater_update_downloaded', (arg: string) => {
    disableUpdateStates();
    setUpdateDownloaded(true);
    updaterMessage = arg;
  });
  const mouseEnterStatusHandler = () => {
    // console.log('mouse enter');
    setStatusHovered(true);
  };
  const mouseLeaveStatusHandler = () => {
    // console.log('mouse enter');
    setStatusHovered(false);
  };

  return (
    <div
      className="statusContainer"
      onMouseEnter={mouseEnterStatusHandler}
      onMouseLeave={mouseLeaveStatusHandler}
    >
      {/* PLATFORM ICON */}
      {updateUnavailable && (
        <StatusIcon
          icon={platformIcon}
          animated={false}
          hovered={statusHovered}
        />
      )}
      {/* VERSION TEXT */}
      {updateUnavailable && (
        <StatusText message={appVersion} hovered={statusHovered} />
      )}

      {/* NOT SURE */}
      {/* <StatusIcon icon={ProgressIcon} animated hovered={false} /> */}
      {/* UPDATER  */}
      {checkingForUpdate && (
        <StatusIcon icon={ProgressIcon} animated hovered={false} />
      )}
      {updateAvailable && (
        <StatusIcon icon={ProgressIcon} animated hovered={false} />
      )}
      {updateDownloading && (
        <StatusIcon icon={ProgressIcon} animated hovered={false} />
      )}
      {updateDownloaded && (
        <StatusIcon icon={NewVersionIcon} animated={false} hovered={false} />
      )}
      <StatusText message={updaterMessage} hovered={false} />

      {/* SERVER STATUS */}
      {updateUnavailable && (
        <NavStatusServer status={status} hovered={!statusHovered} />
      )}
      {/* UPDATE & RESTART BUTTON */}
      {updateDownloaded && <NavStatusButton message={restartBtnMessage} />}
    </div>
  );
}
