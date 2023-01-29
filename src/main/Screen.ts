import { BrowserWindow } from 'electron';

const Store = require('electron-store');

const settings = new Store();
export default class Screen {
  mWin: BrowserWindow;

  defaults: unknown;

  screenState: unknown;

  newState: unknown;

  constructor(mWin: BrowserWindow) {
    this.mWin = mWin;
    this.defaults = {
      bounds: {
        x: 0,
        y: 0,
        width: 1600,
        height: 900,
      },
      isMaximized: true,
    };
  }

  setScreenState = (mWin: BrowserWindow) => {
    const newState = this.getScreenState();
    const newBounds = mWin.getBounds();
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
    }
    return this.screenState;
  };

  resetScreenState = () => {
    settings.delete('screenState');
    return this.defaults;
  };
}
