import { app, BrowserWindow, BrowserView, globalShortcut } from 'electron';
export function addShortcuts(mWin: BrowserWindow, view: BrowserView) {
  // console.log(mWin);

  // console.log('adding shortcuts');

  globalShortcut.register('Space', () => {
    // console.log('Space is pressed');
    // 'search focus';
    mWin.webContents.send('search focus');
  });
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
  addShortcuts: addShortcuts,
  removeShortcuts: removeShortcuts,
};
// });
// }});
