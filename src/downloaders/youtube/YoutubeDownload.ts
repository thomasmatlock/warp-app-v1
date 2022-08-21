import ytdl from 'ytdl-core';
import fs from 'fs';
export default function YoutubeDownload(item: Object) {
  let url = item.url;
  //   console.log(url);
  try {
    ytdl(url).pipe(fs.createWriteStream(`${item.titleFS}.mp4`)); // downloads video
    // ytdl(url).pipe(fs.createWriteStream('video.mp4'));
  } catch (error) {
    console.log(error);
  }
}
