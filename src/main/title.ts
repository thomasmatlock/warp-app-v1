import { app, BrowserWindow } from 'electron';

export default class Title {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }
  setWindowsTitle():  {
    if (process.platform === 'win32') {
      mainWindow.setTitle(
        `${app.getName()} | Download Anything | Windows Version ${app.getVersion()} | Professional Audio Edition`
      );
    }
    if (process.platform === 'darwin') {
      mainWindow.webContents.send('platform', 'darwin');
      mainWindow.setTitle(
        `${app.getName()} | Download Anything | MacOS Version ${app.getVersion()} | Professional Audio Edition`
      );
    }
    if (process.platform === 'linux') {
      mainWindow.webContents.send('platform', 'linux');
      mainWindow.setTitle(
        `${app.getName()} | Download Anything | Linux Version ${app.getVersion()} | Professional Audio Edition`
      );
    }
  
}
};
