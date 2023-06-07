import * as paths from './paths';

import prefsDefault from '../store/prefsDefaults';

const Store = require('electron-store');

const settings = new Store();

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
  }
  return prefs;
}
export function setPrefs(prefsObj: any) {
  settings.set('prefs', prefsObj);
}

export function setAudioPath(path: string) {
  const newPrefs = getPrefs();
  newPrefs.audio.folders[0].placeholder = path;
  setPrefs(newPrefs);
}
export function setVideoPath(path: string) {
  const newPrefs = getPrefs();
  prefs.video.folders[0].placeholder = path;
  setPrefs(newPrefs);
}
export function setWarpstagramPath(path: string) {
  const newPrefs = getPrefs();
  prefs.warpstagram.folders[0].placeholder = path;
  setPrefs(newPrefs);
}
export function getAudioPath() {
  return getPrefs().audio.folders[0].placeholder;
}
export function getVideoPath() {
  return getPrefs().video.folders[0].placeholder;
}
export function getWarpstagramPath() {
  return getPrefs().warpstagram.folders[0].placeholder;
}
module.exports = {
  resetPrefs,
  getPrefs,
  setPrefs,
  setAudioPath,
  setVideoPath,
  setWarpstagramPath,
  getAudioPath,
  getVideoPath,
  getWarpstagramPath,
};
