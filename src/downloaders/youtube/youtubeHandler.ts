import ytdl from 'ytdl-core';
let url: string = 'http://www.youtube.com/watch?v=aqz-KE-bpKQ';
// ytdl(url, [{ dlChunkSize: 1 }]).pipe(fs.createWriteStream('video2.mp4'));
const getInfo = async function (itemURL, avType, platform, storage) {
  //   console.log('getting info');

  try {
    await ytdl.getBasicInfo(itemURL).then((info) => {
      // for (const key in info) {
      //   console.log(key);
      // }
      // info.page; // RETURNS PAGE TYPE, LIKE "watch", USEABLE
      // info.formats; // USEABLE
      // info.videoDetails; // USEABLE
      // info.player_response;
      // info.response;
      // info.html5player;
      // info.related_videos;
      // console.log(info.page);
      // console.log(info.formats);
      // this.cloneVideoDetails(itemURL, info, avType);
      // this.removeCharactersFromTitle();
      // itemInfo.filepath = createFilePath(itemURL, avType, platform, storage);
      // // items.insertPercentDownloaded(this.itemInfo)
      // const video = ytdl(itemURL {
      // // const video = ytdl(this.itemInfo.url, {
      //   requestOptions: {
      //       headers: {
      //           cookie: COOKIE,
      //           // Optional. If not given, ytdl-core will try to find it.
      //           // You can find this by going to a video's watch page, viewing the source,
      //           // and searching for "ID_TOKEN".
      //           // 'x-youtube-identity-token': 1324,
      //       },
      //   },
      // });
      // video.on('info', info => {
      //     console.log('title:', info.videoDetails.title);
      //     console.log('rating:', info.player_response.videoDetails.averageRating);
      //     console.log('uploaded by:', info.videoDetails.author.name);
      // });
      // let inserted = false;
      // let completed = false;
      // let lastDownloaded = 0;
      // video.on('progress', (chunkLength, downloaded, total) => {
      //   const percent = downloaded / total;
      //   // console.log(downloaded, total);
      //   lastDownloaded = downloaded;
      //   if (!inserted) {
      //     items.insertPercentDownloaded(this.itemInfo, percent, 'add');
      //     inserted = true;
      //   }
      //   if (inserted) {
      //   }
      //   // if (lastDownloaded = downloaded) {
      //   setTimeout(() => {
      //     if ((downloaded = total)) {
      //       items.insertPercentDownloaded(this.itemInfo, percent, 'complete');
      //     }
      //   }, 2000);
      // });
      // this.downloadAndWrite(itemURL);
      // items.addItem(itemInfo, avType);
      // items.updateStorage(itemInfo, avType, 'add');
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getInfo,
};
