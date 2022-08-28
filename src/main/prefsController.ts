const Store = require('electron-store');
const settings = new Store();
import prefsDefault from '../storage/prefsDefaults';
import paths from './paths';
let prefs: any = {};
prefsDefault.audio.folders[0].placeholder = paths.getDefaultAudioPath();
prefsDefault.video.folders[0].placeholder = paths.getDefaultVideoPath();
prefsDefault.warpstagram.folders[0].placeholder =
  paths.getDefaultWarpstagramPath();

export function resetPrefs() {
  settings.delete('prefs');
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
export function setPrefs(prefsObj: any) {
  settings.set('prefs', prefsObj);
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
  setAudioPath: setAudioPath,
  setVideoPath: setVideoPath,
  setWarpstagramPath: setWarpstagramPath,
};
