import path from 'path';
import fs from 'fs';
// import os from 'os';
import { app } from 'electron';

const mainPath = path.join(app.getPath('documents'), 'Warp');
const defaultAudioPath = path.join(mainPath, 'Audio');
const defaultVideoPath = path.join(mainPath, 'Video');
const defaultWarpstagramPath = path.join(mainPath, 'Warpstagram');
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
