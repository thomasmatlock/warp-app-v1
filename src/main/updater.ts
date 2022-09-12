import { autoUpdater } from 'electron-updater';
import { BrowserWindow, dialog } from 'electron';
import log from 'electron-log';
log.transports.file.level = 'info';
autoUpdater.autoDownload = false;
autoUpdater.logger = log;
export default function (mWin: BrowserWindow) {
  console.log('checking for update');
  // mWin.webContents.send('update_available', [item, 'video']);
  // // autoUpdater.checkForUpdatesAndNotify();
  // // dialog
  // //   .showMessageBox({
  // //     type: 'info',
  // //     title: 'Update available',
  // //     message: 'A new version of Warp is available. Do you want to update now?',
  // //     buttons: ['Update', 'No'],
  // //   })
  // //   .then((result) => {
  // //     let buttonIndex = result.response;
  // //     if (buttonIndex === 0) autoUpdater.downloadUpdate();
  // //   });
  autoUpdater.on('update-available', () => {
    console.log('update available');
  });
  // console.log('update available');
  // autoUpdater.checkForUpdatesAndNotify();
  // console.log('updater');
}
