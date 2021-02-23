const os = require('os');
const fs = require('fs');
const path = require('path');

class fileController {
    constructor() {
        this.dirMainName = 'Warp Downloader'; // main download directory
        this.dirSubNames = ['Audio', 'Video', 'Warpstagram']; // sub download directories
        this.documents = '\\Documents\\';
        this.dirUser = os.userInfo().homedir; // 'C:\\Users\\Tommy\\'
        this.userDocumentsPath = path.join(this.dirUser, this.documents);
        this.dirMainPath = path.join(this.userDocumentsPath, this.dirMainName);
        this.dirAudioPath = path.join(
            this.dirUser,
            this.documents,
            this.dirMainName,
            this.dirSubNames[0]
        ); // C:\Users\Tommy\Documents\Warp Downloader\Audio
        this.dirVideoPath = path.join(
            this.dirUser,
            this.documents,
            this.dirMainName,
            this.dirSubNames[1]
        ); // C:\Users\Tommy\Documents\Warp Downloader\Vidio
        this.dirWarpstagramPath = path.join(
            this.dirUser,
            this.documents,
            this.dirMainName,
            this.dirSubNames[2]
        ); // C:\Users\Tommy\Documents\Warp Downloader\Warpstagram
    }

    init = () => {
        // main directory
        try {
            // console.log(systemInfo);
            if (!fs.existsSync(this.dirMainPath)) {
                fs.mkdirSync(this.dirMainPath);
                console.log(`Created main directory`);
            }
        } catch (err) {
            console.error(err);
        }
        // sub directories
        try {
            this.dirSubNames.forEach((el) => {
                if (!fs.existsSync(`${this.dirMainPath}\\${el}`)) {
                    fs.mkdirSync(`${this.dirMainPath}\\${el}`);
                    console.log(`Created ${el} sub directory`);
                }
            });
        } catch (err) {
            console.error(err);
        }
    };

    placeholder = () => {};
    initReadFiles = () => {};
}

module.exports = fileController;