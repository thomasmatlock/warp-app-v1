import { app, BrowserWindow, BrowserView, globalShortcut } from 'electron';
import Browser from './browserController';
export function addShortcuts(mWin: BrowserWindow, view: BrowserView) {
  // Browser.screenshot(mWin, view);
  // console.log(mWin);

  // console.log('adding shortcuts');

  // globalShortcut.register('Space', () => {
  //   // mWin.webContents.sendInputEvent({
  //   //   type: 'keyDown',
  //   //   keyCode: 'Space',
  //   // });
  //   // Browser.hideBrowser(view);
  //   // setTimeout(() => {
  //   //   Browser.showBrowser(mWin, view);
  //   // }, 1000);
  //   // // console.log('Space is pressed');
  //   // // view.hide();
  //   // // 'search focus';
  //   // mWin.webContents.send('search focus');
  // });
  globalShortcut.register('Alt+Left', () => {
    if (view) view.webContents.goBack();
  });
  globalShortcut.register('Alt+Right', () => {
    if (view) view.webContents.goForward();
  });
}
export function removeShortcuts() {
  // console.log('removing shortcuts');

  globalShortcut.unregisterAll();
}
module.exports = {
  addShortcuts,
  removeShortcuts,
};
// });
// }});
