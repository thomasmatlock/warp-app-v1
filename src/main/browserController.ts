import { app, BrowserView, BrowserWindow } from 'electron';
let viewBounds = {
  x: 0,
  y: 130,
};
export function hideBrowser(view) {
  if (view) view.setBounds({ x: 0, y: 0, width: 0, height: 0 });
}
export function showBrowser(mWin: BrowserWindow, view: BrowserView) {
  if (view && mWin)
    view.setBounds({
      x: viewBounds.x,
      y: viewBounds.y,
      width: mWin.getContentBounds().width / 2,
      height: mWin.getContentBounds().height - 192,
    });
}
export async function resize() {}
export async function screenshot(mWin, view) {
  if (view)
    if (view)
      view.webContents
        .capturePage({
          x: 0,
          y: 0,
          width: mWin ? mWin.getContentBounds().width / 2 : 100,
          height: mWin ? mWin.getContentBounds().height - 192 : 100,
        })
        .then((img) => {
          if (mWin) mWin.webContents.send('capturePage', [img.toDataURL()]);
        })
        .catch((err) => {
          console.log(err);
        });
}
module.exports = {
  hideBrowser: hideBrowser,
  showBrowser: showBrowser,
  resize: resize,
  screenshot: screenshot,
};
