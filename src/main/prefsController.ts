const Store = require('electron-store');
const settings = new Store();
import { app, BrowserWindow } from 'electron';
import prefsDefault from '../storage/prefsDefaults';
import paths from './paths';
let prefs: any = {};
prefsDefault.audio.folders[0].placeholder = paths.getDefaultAudioPath();
prefsDefault.video.folders[0].placeholder = paths.getDefaultVideoPath();
prefsDefault.warpstagram.folders[0].placeholder =
  paths.getDefaultWarpstagramPath();

// let user = User.getUser();
export function resetPrefs() {
  settings.delete('prefs'); // testing only, REMOVE for production
  return prefsDefault;
}
export function getPrefs() {
  prefs = settings.get('prefs');
  if (prefs === undefined) {
    settings.set('prefs', prefsDefault);
    return prefsDefault;
  } else {
    return prefs;
  }
}
// prefs = getPrefs();
export function setPrefs(prefsObj: any) {
  settings.set('prefs', prefsObj);
}
export function setPrefsMainWinState(mWin: BrowserWindow) {
  if (mWin) {
    let newPrefs = getPrefs();
    let newBounds = mWin.getBounds();
    newPrefs.mWinBounds = newBounds;
    newPrefs.mWinIsMaximized = mWin.isMaximized();
    setPrefs(newPrefs);
    prefs = newPrefs;
  }
}

export function setAudioPath(path: string) {
  let newPrefs = getPrefs();
  newPrefs.audio.folders[0].placeholder = path;
  console.log(newPrefs.audio.folders[0]);

  setPrefs(newPrefs);
}
export function setVideoPath(path: string) {
  let newPrefs = getPrefs();
  prefs.video.folders[0].placeholder = path;
  setPrefs(newPrefs);
}
export function setWarpstagramPath(path: string) {
  let newPrefs = getPrefs();
  prefs.warpstagram.folders[0].placeholder = path;
  setPrefs(newPrefs);
}
module.exports = {
  resetPrefs: resetPrefs,
  getPrefs: getPrefs,
  setPrefs: setPrefs,
  setPrefsMainWinState: setPrefsMainWinState,
  setAudioPath: setAudioPath,
  setVideoPath: setVideoPath,
  setWarpstagramPath: setWarpstagramPath,
};
