import ytdl from 'ytdl-core';
import fs from 'fs';
import path from 'path';
import Prefs from '../../main/prefsController';

export default async function YoutubeDownload(item: any) {
  let info = await ytdl.getInfo(item.url);
  // let format = ytdl.chooseFormat(info.formats, { quality: '134' });
  // console.log('Format found!', format);

  let audioPath;
  let videoPath;
  if (item.type === 'audio') {
    let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
    audioFormats.forEach((format) => {
      console.log(format);
    });

    // console.log();

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
    // let videoFormatsVideoOnly = ytdl.filterFormats(info.formats, 'videoonly');
    // console.log(videoFormatsVideoOnly.length);
    // let audioandvideo = ytdl.filterFormats(info.formats, 'audioandvideo');
    // let videoandaudio = ytdl.filterFormats(info.formats, 'videoandaudio');
    // console.log(audioandvideo.length);
    // console.log(videoandaudio.length);
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
