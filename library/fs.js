// write object to file
let objConvertedToJSON = JSON.stringify(objectToBeConverted);
fs.writeFile('./src/js/ytdl-video-info.json', objConvertedToJSON, (err) objectToBeConverted {
    if (err) console.log(err);
    else {
        console.log('File written successfully\n');
    }
});