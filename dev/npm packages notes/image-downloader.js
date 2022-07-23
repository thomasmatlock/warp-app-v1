// IMAGE-DOWNLOADER (for thumbnails)
// https://www.npmjs.com/package/image-downloader

const download = require('image-downloader');

// DOWNLOAD TO A DIRECTORY AND SAVE WITH THE ORIGINAL FILENAME
const options = {
    url: 'http://someurl.com/image.jpg',
    dest: '/path/to/dest', // will be saved to /path/to/dest/image.jpg
};

download
    .image(options)
    .then(({ filename }) => {
        console.log('Saved to', filename); // saved to /path/to/dest/image.jpg
    })
    .catch((err) => console.error(err));

// DOWNLOAD TO A DIRECTORY AND SAVE WITH AN ANOTHER FILENAME
options = {
    url: 'http://someurl.com/image2.jpg',
    dest: '/path/to/dest/photo.jpg', // will be saved to /path/to/dest/photo.jpg
};

download
    .image(options)
    .then(({ filename }) => {
        console.log('Saved to', filename); // saved to /path/to/dest/photo.jpg
    })
    .catch((err) => console.error(err));

// DOWNLOAD WITH ANOTHER FILENAME WITHOUT EXTENSION
options = {
    url: 'http://someurl.com/image3.jpg',
    dest: '/path/to/dest/photo', // will be saved to /path/to/dest/photo
    extractFilename: false,
};

download
    .image(options)
    .then(({ filename }) => {
        console.log('Saved to', filename); // saved to /path/to/dest/photo
    })
    .catch((err) => console.error(err));