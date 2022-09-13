import path from 'path';
import { app, BrowserWindow, Menu, Tray } from 'electron';
export default function createTray(mainWindow: BrowserWindow) {
  // const iconName = process.platform === 'win32' ? 'icon.png' : 'icon.png';
  // const iconPath = path.join(__dirname, '..', 'assets', iconName
  // let tray;
  let trayIconPath = path.join(
    app.getAppPath(),
    'assets',
    'Tray',
    'icon_tray.png'
  );
  let tray = new Tray(trayIconPath);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open Warp',
      enabled: true,
      // accelerator: 'CmdOrCtrl+Shift+O',
      click: () => {
        mainWindow.maximize();
        // appWin.send('Audio: File: Import Download Links');
      },
    },
    {
      label: 'Quit Warp',
      enabled: true,
      // accelerator: 'CmdOrCtrl+Shift+O',
      click: () => {
        // appWin.send('Audio: File: Import Download Links');
      },
    },
  ]);
  tray.setToolTip('Warp Downloader');
  tray.setContextMenu(contextMenu);
}
