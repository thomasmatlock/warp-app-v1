const Store = require('electron-store');
const settings = new Store();
import { app, BrowserWindow } from 'electron';
import prefsDefault from '../storage/prefsDefaults';
// import User from './User';
let prefs: any = {};
// let user = User.getUser();
export function resetPrefs() {
  settings.delete('prefs'); // testing only, REMOVE for production
  return prefsDefault;
}
export function getPrefs(mWin: BrowserWindow, mode) {
  prefs = settings.get('prefs');
  if (prefs === undefined) {
    settings.set('prefs', prefsDefault);
    return prefsDefault;
  } else {
    return prefs;
  }
}
export function setPrefs(prefsObj: any) {
  settings.set('prefs', prefsObj);
}
export function setPrefsMainWinBounds(mWin: BrowserWindow) {
  if (mWin) {
    let newBounds = mWin.getBounds();
    let newPrefs = { ...prefs };
    newPrefs.mWinBounds = newBounds;
    setPrefs(newPrefs);
    prefs = newPrefs;
  }
}

module.exports = {
  resetPrefs: resetPrefs,
  getPrefs: getPrefs,
  setPrefs: setPrefs,
  setPrefsMainWinBounds: setPrefsMainWinBounds,
};
