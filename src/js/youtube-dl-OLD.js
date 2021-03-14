if (startup.downloadItemsTesting) {
    console.log(`Received ${itemURL}`);

    // readItem(itemURL, (item) => {
    // e.sender.send('new-item-success', item);
    // });

    // Will be called when the download starts.
    const video = youtubedl(
        itemURL, [
            // Optional arguments passed to youtube-dl.
            // '--format=302',
            // '--format=249',
        ]
        // Additional options can be given for calling `child_process.execFile()`.
    );
    let videoData = {
        title: '',
        duration: '',
        size: '',
        thumbnailURL: '',
    };

    // Will be called when the download starts.
    video.on('info', function(info) {
        console.log(info);
        console.log(
            `Download of title: "${info._filename}" starting... ${info.formats.length} formats available`
        );
        // videoData = {
        //     title = info.title,
        //     duration = info.duration,
        //     size = info.size,
        //     thumbnailURL = info.thumbnail,
        // }
        videoData.title = info.title;
        videoData.duration = info.duration;
        videoData.size = info.size;
        videoData.thumbnailURL = info.thumbnail;
        return videoData;

        // console.log(
        //     `'${info.title}': ${info.formats.length} formats, ${info.duration} minutes long, is ${info.filesize} large, and the thumbnail URL is '${info.thumbnail}'`
        // );

        // const data = JSON.stringify(info, null, 4);
        // WRITE DATA RETURNED TO FILE
        // fs.writeFile('./downloadInfo.json', data, 'utf8', (err) => {
        //     if (err) {
        //         console.log(`Error writing file: ${err}`);
        //     } else {
        //         console.log(`File is written successfully!`);
        //     }
        // });
    });
    // console.log(video.info);
    // dl.pipe(fs.createWriteStream(filepath));

    setTimeout(() => {
        // console.log(videoData);

        var filepath = path.join(
            fileController.dirVideoPath,
            `${videoData.title}.mp4`
        );
        video.pipe(fs.createWriteStream(filepath));
        console.log('Done!');
    }, 4000);
} else if (!startup.downloadItems) {
    console.log('Dev mode: not currently downloading items');
}