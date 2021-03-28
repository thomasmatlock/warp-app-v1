// write object to file
let objConvertedToJSON = JSON.stringify(objectToBeConverted);
fs.writeFile('./src/js/ytdl-video-info.json', objConvertedToJSON, (err) objectToBeConverted {
    if (err) console.log(err);
    else {
        console.log('File written successfully\n');
    }
});

// Read file stats
fs.stat('file.txt', (err, stats) => {
    if (err) {
        console.log(`File doesn't exist.`);
    } else {
        console.log(stats);
    }
});
// details fs.stat returns
// Stats {
//   dev: 16777221,
//   mode: 33279,
//   nlink: 1,
//   uid: 501,
//   gid: 20,
//   rdev: 0,
//   blksize: 4096,
//   ino: 5172976,
//   size: 290,
//   blocks: 8,
//   atimeMs: 1606143471354.2327,
//   mtimeMs: 1599218860000,
//   ctimeMs: 1606074010041.4927,
//   birthtimeMs: 1605423684000,
//   atime: 2020-11-23T14:57:51.354Z,
//   mtime: 2020-09-04T11:27:40.000Z,
//   ctime: 2020-11-22T19:40:10.041Z,
//   birthtime: 2020-11-15T07:01:24.000Z
// }