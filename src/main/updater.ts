import { autoUpdater } from 'electron-updater';
import { BrowserWindow, dialog } from 'electron';
import log from 'electron-log';
log.transports.file.level = 'info';
autoUpdater.autoDownload = false;
autoUpdater.logger = log;
// autoUpdater.setFeedURL({
//   provider: 'github',
//   owner: 'thomasmatlock',
//   repo: 'warp-app',
//   token: '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',
// });
export default function () {
  console.log('checking for update');
  // mWin.webContents.send('update_available', [item, 'video']);
  // // autoUpdater.checkForUpdatesAndNotify();
  // //   .then((result) => {
  // //     let buttonIndex = result.response;
  // //     if (buttonIndex === 0) autoUpdater.downloadUpdate();
  // //   });
  autoUpdater.checkForUpdates();
  autoUpdater.on('update-available', () => {
    dialog.showMessageBox({
      type: 'info',
      title: 'Update available',
      message: 'A new version of Warp is available. Do you want to update now?',
      buttons: ['Update', 'No'],
    });
    console.log('update available');
  });
  // console.log('update available');
  // console.log('updater');
}
