/* eslint-disable no-console */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
import log from 'electron-log';
import { app, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';

log.transports.file.level = 'info';
autoUpdater.autoDownload = false;
autoUpdater.logger = log;
function simulateProgress(mWin: BrowserWindow) {
  // mWin.webContents.send('updater_update_available', 'downloading update...');
  // mWin.webContents.send(
  //   'updater_download_progress',
  //   `Update ${50}% downloaded`
  // );
  // mWin.webContents.send(
  //   'updater_update_downloaded',
  //   ' An updated version of Warp is ready to be installed at the next app launch.'
  // );
}
// let updateChecked = false;
export default function (mWin: BrowserWindow) {
  mWin.webContents.send('updater_update_not_available', '');
  const delay = app.isPackaged ? 1000 : 1000;
  // if (updateChecked) return;
  setTimeout(() => {
    // updateChecked = true;
    // log.info('checking for updates');
    simulateProgress(mWin);
    if (app.isPackaged) {
      // mWin.webContents.send('update-not-available', '');
      autoUpdater.checkForUpdates();
      autoUpdater.on('update-not-available', () => {
        mWin.webContents.send('updater_update_not_available', '');
      });
      autoUpdater.on('update-available', () => {
        // console.log('update available');

        // mWin.webContents.send(
        //   'updater_update_available',
        //   'downloading update...'
        // );
        autoUpdater.downloadUpdate();
      });
      autoUpdater.on('download-progress', (progress) => {
        const string = progress.percent.toFixed(0);
        mWin.webContents.send(
          'updater_download_progress',
          `Update ${string}% downloaded`
        );
      });
      autoUpdater.on('update-downloaded', () => {
        mWin.webContents.send(
          'updater_update_downloaded',
          ' An updated version of Warp is ready to be installed at the next app launch.'
        );
      });
      ipcMain.on('updater_restart_and_update', () => {
        autoUpdater.quitAndInstall(true, true); // arg1 is silent install, arg2 is force run after install
        app.quit();
      });
    }
  }, delay);
}
