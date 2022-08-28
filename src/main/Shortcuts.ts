import { app, BrowserView, globalShortcut } from 'electron';
export default function Shortcuts(view) {
  globalShortcut.register('Alt+Left', () => {
    if (view) view.webContents.goBack();
  });
  globalShortcut.register('Alt+Right', () => {
    if (view) view.webContents.goForward();
  });
}
