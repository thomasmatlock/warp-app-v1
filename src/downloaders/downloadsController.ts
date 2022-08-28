import { app, BrowserWindow } from 'electron';
// export default  DownloadsController {}
import { app, BrowserWindow } from 'electron';
// import User from './User';

// let user = User.getUser();
export function DownloadsController(mWin: BrowserWindow, url: string) {}

module.exports = {
  DownloadsController: DownloadsController,
};
