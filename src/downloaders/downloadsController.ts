import { app, BrowserWindow } from 'electron';
import { app, BrowserWindow } from 'electron';
import downloadsAudioDefaults from '../storage/downloadsAudioDefaults';
import downloadsVideoDefaults from '../storage/downloadsVideoDefaults';
import downloadsWarpstagramDefaults from '../storage/downloadsWarpstagramDefaults';

// let user = User.getUser();
export function downloadItem(mWin: BrowserWindow, url: string) {
  console.log(downloadsAudioDefaults);
}

module.exports = {
  downloadItem: downloadItem,
};
