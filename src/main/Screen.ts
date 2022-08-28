import { screen } from 'electron';
const Store = require('electron-store');
const settings = new Store();
let screenState;
const screenDefaults = {
  bounds: {
    x: 0,
    y: 0,
    width: 1600,
    height: 900,
  },
  isMaximized: false,
};
export function resetScreenState() {
  settings.delete('screenState');
  return screenDefaults;
}
export function getScreenState() {
  screenState = settings.get('screen');
  if (screenState === undefined) {
    settings.set('screen', screenDefaults);
    return screenDefaults;
  } else {
    // console.log(screenState);

    return screenState;
    // return screenDefaults;
  }
}
export function setScreenState(mWin: BrowserWindow) {
  // settings.set('screen', screenState);
  let newState = getScreenState();
  let newBounds = mWin.getBounds();
  // newState.mWinBounds = newBounds;
  newState.bounds = newBounds;
  // newState.mWinIsMaximized = mWin.isMaximized();
  newState.isMaximized = mWin.isMaximized();
  settings.set('screen', newState);
  screenState = newState;
}
module.exports = {
  setScreenState: setScreenState,
  getScreenState: getScreenState,
  resetScreenState: resetScreenState,
};
