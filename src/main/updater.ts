/* eslint-disable no-console */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
import log from 'electron-log';
import { app, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'path';
import fs from 'fs';

log.transports.file.level = 'info';
autoUpdater.autoDownload = false;
autoUpdater.logger = log;
// async function isEmptyDir(path) {
//   try {
//     const directory = await fs.opendir(path);
//     const entry = await directory.read();
//     await directory.close();

//     return entry === null;
//   } catch (error) {
//     return false;
//   }
// }

let updateDownloaded = false;
export default function (mWin: BrowserWindow) {
  if (!app.isPackaged) {
    mWin.webContents.send('update-not-available', '');
  }
  if (app.isPackaged) {
    mWin.webContents.send('update-not-available', '');
    // mWin.webContents.send('checking-for-update', 'checking for update...');
    autoUpdater.checkForUpdates();
    autoUpdater.on('update-not-available', () => {
      mWin.webContents.send('update-not-available', '');
    });
    autoUpdater.on('update-available', () => {
      mWin.webContents.send('update-available', 'downloading update...');
      autoUpdater.downloadUpdate();
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
        'checking-for-update',
        'checking update integrity...'
      );
      setTimeout(() => {
        if (process.platform === 'win32') {
          let binaryDirectory = path.join(
            app.getPath('home'),
            'AppData',
            'Local',
            'warp-updater',
            'pending'
          );
          fs.readdir(binaryDirectory, function (err, files) {
            if (err) {
              throw err;
              // some sort of error
            } else if (!files.length) {
              // directory appears to be empty
              mWin.webContents.send(
                'update-available',
                'Update not saved, trying again...'
              );
              autoUpdater.downloadUpdate();
            } else {
              // directory contains files
              updateDownloaded = true;
              // mWin.webContents.send('update-downloaded', 'Update downloaded');
              mWin.webContents.send(
                'update-downloaded',
                ' An updated version of Warp is ready to be installed at the next app launch.'
              );
              // mWin.webContents.send('update-downloaded', 'Update downloaded');
            }
          });
          // isEmptyDir(binaryDirectory).then((empty) => {
          // if (empty) {

          // } else {

          // mWin.webContents.send(
          //   'update-downloaded',
          //   'Update not saved, trying again...'
          // );
          // mWin.webContents.send('update-not-available', '');

          // });
        } else if (process.platform === 'darwin') {
          // mWin.webContents.send('update-downloaded', 'Update downloaded');
          updateDownloaded = true;
          mWin.webContents.send(
            'update-downloaded',
            ' An updated version of Warp is ready to be installed at the next app launch.'
          );
        }
      }, 15000);
      //       autoUpdater.quitAndInstall(true, true); // arg1 is silent install, arg2 is force run after install
      //       app.quit();
    });
    ipcMain.on('restart_and_update', () => {
      autoUpdater.quitAndInstall(false, true); // arg1 is silent install, arg2 is force run after install
      app.quit();
    });
  }
}
