import { BrowserWindow } from 'electron';

export function openPrefsGeneral(mWin: BrowserWindow) {
  mWin.webContents.send('modal: preferences: license');
}
export function openPrefsLicense(mWin: BrowserWindow, delay: number) {
  setTimeout(() => {
    mWin.webContents.send('modal: preferences: license');
  }, delay);
}
