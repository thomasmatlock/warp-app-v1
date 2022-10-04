import { BrowserView, BrowserWindow } from 'electron';

const viewBounds = {
  x: 0,
  y: 130,
};
export function hideBrowser(view) {
  if (view) view.setBounds({ x: 0, y: 0, width: 0, height: 0 });
}
export function showBrowser(mWin: BrowserWindow, view: BrowserView) {
  try {
    if (view && mWin)
      view.setBounds({
        x: viewBounds.x,
        y: viewBounds.y,
        width: mWin.getContentBounds().width / 2,
        height: mWin.getContentBounds().height - 192,
      });
  } catch (error) {}
}
export async function resize(
  browserWidth: string | undefined,
  mWin: BrowserWindow,
  view: BrowserView
) {
  const defaultWidthDifference = Math.round(mWin.getContentBounds().width / 2);
  const collapsedWidthDifference = 72;
  const expandedWidthDifference = Math.round(
    mWin.getContentBounds().width - 72
  );
  // COLLAPSED VIEW
  if (browserWidth === 'collapse') {
    if (view && mWin)
      view.setBounds({
        x: viewBounds.x,
        y: viewBounds.y,
        width: collapsedWidthDifference,
        height: mWin.getContentBounds().height - 192,
      });
  }
  // HIDDEN VIEW
  if (browserWidth === 'hidden') {
    // hideBrowser();
  }
  // EXPANDED VIEW
  if (browserWidth === 'expand') {
    if (view && mWin)
      view.setBounds({
        x: viewBounds.x,
        y: viewBounds.y,
        width: expandedWidthDifference,
        height: mWin.getContentBounds().height - 192,
      });
  }
  // DEFAULT SPLIT VIEW
  if (browserWidth === 'default' || browserWidth === undefined) {
    if (view && mWin)
      view.setBounds({
        x: viewBounds.x,
        y: viewBounds.y,
        width: defaultWidthDifference,
        height: mWin.getContentBounds().height - 192,
      });
  }

  setTimeout(() => {
    screenshot(mWin, view);
  }, 1000);
}
export async function screenshot(mWin: BrowserWindow, view: BrowserView) {
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
  hideBrowser,
  showBrowser,
  resize,
  screenshot,
};
