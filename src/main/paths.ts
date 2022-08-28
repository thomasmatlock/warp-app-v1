import path from 'path';
import fs from 'fs';
import os from 'os';
let mainPath = path.join(os.homedir(), 'Documents', 'Warp Downloader');
let audioPath = path.join(mainPath, 'Audio');
let videoPath = path.join(mainPath, 'Video');
let warpstagramPath = path.join(mainPath, 'Warpstagram');
if (!fs.existsSync(mainPath)) {
  fs.mkdirSync(mainPath);
  fs.mkdirSync(audioPath);
  fs.mkdirSync(videoPath);
  fs.mkdirSync(warpstagramPath);
}

export function getAudioPath() {
  return audioPath;
}

export function getVideoPath() {
  return videoPath;
}
export function getWarpstagramPath() {
  return warpstagramPath;
}
module.exports = {
  getAudioPath: getAudioPath,
  getVideoPath: getVideoPath,
  getWarpstagramPath: getWarpstagramPath,
};
