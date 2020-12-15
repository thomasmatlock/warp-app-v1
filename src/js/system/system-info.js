const os = require('os');
const path = require('path');

const dirUser = os.userInfo().homedir; // C:\Users\Tommy
const dirMainName = 'Warp Downloader';
const dirMainPath = path.join(dirUser, 'Documents', dirMainName); // C:\Users\Tommy\Documents\Warp Downloader
const dirSubNames = ['Audio', 'Video', 'Warpstagram', 'Postfire'];
const dirMainAudioPath = path.join(
    dirUser,
    'Documents',
    dirMainName,
    dirSubNames[0]
); // C:\Users\Tommy\Documents\Warp Downloader\Audio
const dirMainVideoPath = path.join(
    dirUser,
    'Documents',
    dirMainName,
    dirSubNames[1]
); // C:\Users\Tommy\Documents\Warp Downloader\Video

const systemInfo = {
    dirUser,
    dirMainName,
    dirMainPath,
    dirSubNames,
    dirMainAudioPath,
    dirMainVideoPath,
};
module.exports = systemInfo;