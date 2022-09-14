import { autoUpdater } from 'electron-updater';
import { app, BrowserWindow, dialog } from 'electron';
import log from 'electron-log';
log.transports.file.level = 'info';
autoUpdater.autoDownload = false;
autoUpdater.logger = log;
export default function () {
  autoUpdater.checkForUpdates();
  autoUpdater.on('update-available', () => {
    autoUpdater.downloadUpdate();
    dialog
      .showMessageBox({
        type: 'info',
        title: 'Update available',
        message:
          'A new version of Warp is available. Do you want to update now?',
        buttons: ['Update', 'No'],
      })
      .then((result) => {
        let buttonIndex = result.response;
        if (buttonIndex === 0) autoUpdater.downloadUpdate();
      });
  });
  autoUpdater.on('update-downloaded', () => {
    // autoUpdater.quitAndInstall(true, true); // arg1 is silent install, arg2 is force run after install
    // app.quit();
    console.log('update downloaded');
    dialog
      .showMessageBox({
        type: 'info',
        title: 'Install Updates',
        message: 'Updates downloaded, install and restart now?',
        buttons: ['Yes', 'Later'],
      })
      .then((result) => {
        let buttonIndex = result.response;
        if (buttonIndex === 0) {
          autoUpdater.quitAndInstall(true, true); // arg1 is silent install, arg2 is force run after install
          app.quit();
        }
      });
  });
}
