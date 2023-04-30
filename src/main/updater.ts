/* eslint-disable no-console */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
import log from 'electron-log';
import { app, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';

log.transports.file.level = 'info';
autoUpdater.autoDownload = false;
autoUpdater.logger = log;

export default function (mWin: BrowserWindow) {
  // mWin.webContents.send('updater_update_not_available', '');
  if (!app.isPackaged) {
    mWin.webContents.send('updater_update_not_available', 'hello');
  }
  if (app.isPackaged) {
    mWin.webContents.send('updater_update_not_available', '');
    // mWin.webContents.send('checking-for-update', 'checking for update...');
    // autoUpdater.on('updater_update_available', () => {
    //   mWin.webContents.send('updater_update_available', 'downloading update...');
    //   //  autoUpdater.downloadUpdate();
    // });
  }
  setTimeout(() => {
    if (app.isPackaged) {
      // mWin.webContents.send('updater_update_not_available', '');
      autoUpdater.checkForUpdates();
      autoUpdater.on('updater_update_not_available', () => {
        mWin.webContents.send('updater_update_not_available', '');
      });
      autoUpdater.on('updater_update_available', () => {
        // mWin.webContents.send('updater_update_available', 'downloading update...');
        autoUpdater.downloadUpdate();
      });
      autoUpdater.on('updater_download_progress', (progress) => {
        const string = progress.percent.toFixed(0);
        // mWin.webContents.send(
        //   'updater_download_progress',
        //   `Update ${string}% downloaded`
        // );
      });
      autoUpdater.on('updater_update_downloaded', () => {
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
  }, 3000);
}
