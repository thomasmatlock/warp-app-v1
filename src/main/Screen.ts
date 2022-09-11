import { BrowserWindow, screen } from 'electron';
const Store = require('electron-store');
const settings = new Store();
export default class Screen {
  mWin: BrowserWindow;
  defaults: any;
  screenState: any;

  constructor(mWin: BrowserWindow) {
    this.mWin = mWin;
    this.defaults = {
      bounds: {
        x: 0,
        y: 0,
        width: 1600,
        height: 900,
      },
      isMaximized: false,
    };
  }
  setScreenState = (mWin: BrowserWindow) => {
    let newState = this.getScreenState();
    let newBounds = mWin.getBounds();
    newState.bounds = newBounds;
    newState.isMaximized = mWin.isMaximized();
    settings.set('screen', newState);
    this.screenState = newState;
  };
  getScreenState = () => {
    this.screenState = settings.get('screen');
    if (this.screenState === undefined) {
      settings.set('screen', this.defaults);
      return this.defaults;
    } else {
      return this.screenState;
    }
  };
  resetScreenState = () => {
    settings.delete('screenState');
    return this.defaults;
  };
}
