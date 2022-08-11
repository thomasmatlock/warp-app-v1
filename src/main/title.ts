import { app, BrowserWindow } from 'electron';

export default class Title {
  mWin: BrowserWindow;

  constructor(mWin: BrowserWindow) {
    this.mWin = mWin;
  }
  setWindowsTitle():  {
    if (process.platform === 'win32') {
      mWin.setTitle(
        `${app.getName()} | Download Anything | Windows Version ${app.getVersion()} | Professional Audio Edition`
      );
    }
    if (process.platform === 'darwin') {
      mWin.webContents.send('platform', 'darwin');
      mWin.setTitle(
        `${app.getName()} | Download Anything | MacOS Version ${app.getVersion()} | Professional Audio Edition`
      );
    }
    if (process.platform === 'linux') {
      mWin.webContents.send('platform', 'linux');
      mWin.setTitle(
        `${app.getName()} | Download Anything | Linux Version ${app.getVersion()} | Professional Audio Edition`
      );
    }
  
}
};
