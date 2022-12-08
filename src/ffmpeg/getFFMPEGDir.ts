import { app } from 'electron';

import path from 'path';

export default function getFFMPEGDir() {
  console.log('getFFMPEGDir, getting ffmpeg dir');

  // const platformFolder =
  //   process.platform === 'win32' ? 'win32-x64' : 'darwin-x64';
  return path.join(app.getPath('appData'), 'ffmpeg');
}
