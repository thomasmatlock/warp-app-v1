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
  if (!app.isPackaged) {
    mWin.webContents.send('update-not-available', '');
  }
  if (app.isPackaged) {
    // mWin.webContents.send('checking-for-update', 'checking for update...');
    autoUpdater.checkForUpdates();
    autoUpdater.on('update-available', () => {
      // mWin.webContents.send('update-available', 'update available...');
      autoUpdater.downloadUpdate();
    });
    autoUpdater.on('update-not-available', () => {
      mWin.webContents.send('update-not-available', '');
    });
    // autoUpdater.on('download-progress', (progress) => {
    //   const string = progress.percent.toFixed(0);
    //   mWin.webContents.send(
    //     'download-progress',
    //     `Update ${string}% downloaded`
    //   );
    // });
    autoUpdater.on('update-downloaded', () => {
      mWin.webContents.send(
        'update-downloaded',
        ' An updated version of Warp is ready to be installed at the next app launch.'
      );
      //       autoUpdater.quitAndInstall(true, true); // arg1 is silent install, arg2 is force run after install
      //       app.quit();
    });
    ipcMain.on('restart_and_update', () => {
      autoUpdater.quitAndInstall(true, true); // arg1 is silent install, arg2 is force run after install
      app.quit();
    });
  }
}
