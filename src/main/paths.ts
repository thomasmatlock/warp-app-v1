import path from 'path';
import fs from 'fs';
import os from 'os';
import { app } from 'electron';
let mainPath = path.join(app.getPath('documents'), 'Warp');
let defaultAudioPath = path.join(mainPath, 'Audio');
let defaultVideoPath = path.join(mainPath, 'Video');
let defaultWarpstagramPath = path.join(mainPath, 'Warpstagram');
if (!fs.existsSync(mainPath)) fs.mkdirSync(mainPath);
if (!fs.existsSync(defaultAudioPath)) fs.mkdirSync(defaultAudioPath);
if (!fs.existsSync(defaultVideoPath)) fs.mkdirSync(defaultVideoPath);
if (!fs.existsSync(defaultWarpstagramPath))
  fs.mkdirSync(defaultWarpstagramPath);

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
  getDefaultAudioPath,
  getDefaultVideoPath,
  getDefaultWarpstagramPath,
};
