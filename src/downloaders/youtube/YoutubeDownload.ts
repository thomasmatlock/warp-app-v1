import ytdl from 'ytdl-core';
import fs from 'fs';
import path from 'path';
import Prefs from '../../main/prefsController';

export default function YoutubeDownload(item: any) {
  let audioPath;
  let videoPath;
  if (item.type === 'audio') {
    audioPath = path.join(
      Prefs.getAudioPath(),
      item.titleFS + '.' + item.format.toLowerCase()
    );
    try {
      ytdl(item.url).pipe(fs.createWriteStream(audioPath)); // downloads video
    } catch (error) {
      console.log(error);
    }
  } else if (item.type === 'video') {
    videoPath = path.join(
      Prefs.getVideoPath(),
      item.titleFS + '.' + item.format.toLowerCase()
    );
    try {
      ytdl(item.url).pipe(fs.createWriteStream(videoPath)); // downloads video
    } catch (error) {
      console.log(error);
    }
  }
}
