import { app, BrowserWindow } from 'electron';
import User from './User';

let user;
(async function () {
  // user = await User.getUser();
  // console.log(user);
})();
const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export function setTitle(mWin: BrowserWindow, mode, user) {
  console.log(user);

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
    ? '- Not Activated'
    : '';
  mWin.setTitle(
    `${baseTitleString} ${versionString} ${modeString} Edition ${activatedString}`
  );
}

module.exports = {
  setTitle: setTitle,
};
