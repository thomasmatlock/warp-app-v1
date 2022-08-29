import path from 'path';
import fs from 'fs';
import os from 'os';
import { app } from 'electron';
// let mainPath = path.join(os.homedir(), 'Documents', 'Warp Downloader');
let mainPath = path.join(app.getPath('documents'), 'Warp Downloader');
let defaultAudioPath = path.join(mainPath, 'Audio');
let defaultVideoPath = path.join(mainPath, 'Video');
let defaultWarpstagramPath = path.join(mainPath, 'Warpstagram');
if (!fs.existsSync(mainPath)) {
  fs.mkdirSync(mainPath);
  fs.mkdirSync(defaultAudioPath);
  fs.mkdirSync(defaultVideoPath);
  fs.mkdirSync(defaultWarpstagramPath);
}

export function getDefaultAudioPath() {
  return defaultAudioPath;
}

export function getDefaultVideoPath() {
  return defaultVideoPath;
}
export function getDefaultWarpstagramPath() {
  return defaultWarpstagramPath;
}

module.exports = {
  getDefaultAudioPath: getDefaultAudioPath,
  getDefaultVideoPath: getDefaultVideoPath,
  getDefaultWarpstagramPath: getDefaultWarpstagramPath,
};
