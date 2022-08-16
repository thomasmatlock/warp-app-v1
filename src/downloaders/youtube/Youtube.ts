import ytdl from 'ytdl-core';
let url: string = 'http://www.youtube.com/watch?v=aqz-KE-bpKQ';
import { getInfo } from './getInfo';
import getFileSize from './getFileSize';
import formatLength from './formatLength';
import formatTitle from './formatTitle';
// ytdl(url, [{ dlChunkSize: 1 }]).pipe(fs.createWriteStream('video2.mp4'));
const download = async function (itemURL, avType, platform, storage) {
  // getFileSize();
  // formatLength();
  // formatTitle();
  let itemDetails = {};
  try {
    await ytdl.getBasicInfo(itemURL).then((info) => {
      // console.log(info.videoDetails.thumbnail);
      itemDetails = info.videoDetails;
      itemDetails.fsTitle = formatTitle(itemDetails.title);

      console.log(itemDetails.title, ' FORMATTED: ', itemDetails.fsTitle);

      //  return info;
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  download,
};
