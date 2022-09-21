/* eslint-disable no-console */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
import log from 'electron-log';
import { app, BrowserWindow, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';

// An updated version of Warp is available and will be installed at the next app launch. Restart Warp.

log.transports.file.level = 'info';
autoUpdater.autoDownload = false;
autoUpdater.logger = log;
export default function (mWin: BrowserWindow) {
  mWin.webContents.send('checking-for-update', 'checking for update...');
  autoUpdater.checkForUpdates();
  autoUpdater.on('update-available', () => {
    mWin.webContents.send('update-available', 'update available...');
    //  Event: download-progress

    autoUpdater.downloadUpdate();
    // dialog
    //   .showMessageBox({
    //     type: 'info',
    //     title: 'Update available',
    //     message:
    //       'A new version of Warp is available. Do you want to update now?',
    //     buttons: ['Update', 'No'],
    //   })
    //   .then((result) => {
    //     const buttonIndex = result.response;
    //     if (buttonIndex === 0) autoUpdater.downloadUpdate();
    //   });
  });
  autoUpdater.on('download-progress', (progress) => {
    mWin.webContents.send('download-progress', progress.percent);
  });
  autoUpdater.on('update-downloaded', () => {
    mWin.webContents.send(
      'update-downloaded',
      ' An updated version of Warp is available and will be installed at the next app launch.'
    );
    // try {
    // dialog
    //   .showMessageBox({
    //     type: 'info',
    //     title: 'Install Updates',
    //     message: 'Updates downloaded, install and restart now?',
    //     buttons: ['Yes', 'Later'],
    //   })
    //   .then((result) => {
    //     let buttonIndex = result.response;
    //     if (buttonIndex === 0) {
    //       autoUpdater.quitAndInstall(true, true); // arg1 is silent install, arg2 is force run after install
    //       app.quit();
    //     }
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  });
}
