import { app, BrowserWindow } from 'electron';
import User from './User';
// export default class Title {
//   mWin: BrowserWindow;

//   constructor(mWin: BrowserWindow) {
//     this.mWin = mWin;
//   }
//   setWindowsTitle():  {
//     if (process.platform === 'win32') {
//       mWin.setTitle(
//         `${app.getName()} | Download Anything | Windows Version ${app.getVersion()} | Professional Audio Edition`
//       );
//     }
//     if (process.platform === 'darwin') {
//       mWin.webContents.send('platform', 'darwin');
//       mWin.setTitle(
//         `${app.getName()} | Download Anything | MacOS Version ${app.getVersion()} | Professional Audio Edition`
//       );
//     }
//     if (process.platform === 'linux') {
//       mWin.webContents.send('platform', 'linux');
//       mWin.setTitle(
//         `${app.getName()} | Download Anything | Linux Version ${app.getVersion()} | Professional Audio Edition`
//       );
//     }

//   }
// };

let user = User.getUser();
const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export function setTitle(mWin: BrowserWindow, mode) {
  // console.log(user);

  let baseTitleString = `${app.getName()} | Download Anything |`;
  let versionString;
  let activatedString;
  let modeString = capitalizeFirstLetter(mode);
  if (mode === 'audio') {
    versionString = capitalizeFirstLetter(user[mode]);
  }
  if (mode === 'video') {
    versionString = capitalizeFirstLetter(user[mode]);
  }
  if (mode === 'warpstagram') {
    versionString = capitalizeFirstLetter(user[mode]);
  }
  activatedString = versionString.toLowerCase().includes('free')
    ? 'Not Activated'
    : '';
  mWin.setTitle(
    `${baseTitleString} ${versionString} ${modeString} Edition - ${activatedString}`
  );
}

module.exports = {
  setTitle: setTitle,
};
