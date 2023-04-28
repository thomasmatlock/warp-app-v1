import { app, BrowserWindow } from 'electron';

// let user;
const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export default function setTitle(
  mWin: BrowserWindow,
  mode: string,
  user: object
) {
  const baseTitleString = `${capitalizeFirstLetter(
    app.getName()
  )} | Download Anything |`;
  let versionString = '';
  let activatedString = '';
  const modeString = capitalizeFirstLetter(mode);
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
