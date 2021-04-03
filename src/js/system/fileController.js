const logging = true;
const os = require('os');
const fs = require('fs');
const path = require('path');
const storage = require('../storage');

class fileController {
    constructor() {
        this.dirMainName = 'Warp Downloader'; // main download directory
        this.dirSubNames = ['Audio', 'Video', 'Warpstagram']; // sub download directories
        this.documents = 'Documents';
        this.ffmpeg = 'ffmpeg';
        this.dirUser = os.userInfo().homedir; // 'C:\\Users\\Tommy\\'
        this.userDocumentsPath = path.join(this.dirUser, this.documents); // 'C:\\Users\\Tommy\\Documents'
        this.settingsFileName = 'settings.json';
        this.settingsPath = 'AppData\\Roaming\\starter\\';

        this.settingsFile = path.join(
            this.dirUser,
            this.settingsPath,
            this.settingsFileName
        );
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

    initDirCreation = () => {
        // create main directory
        try {
            // console.log(systemInfo);
            if (!fs.existsSync(this.dirMainPath)) {
                fs.mkdirSync(this.dirMainPath);
                console.log(`Created main directory`);
            }
        } catch (err) {
            console.error(err);
        }
        // create sub directories
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
    initSettingsFileCreation = () => {
        let storageObj = {
            audioArr: [],
            videoArr: [],
            warpstagram: {
                subscribed: [],
                pinned: [],
            },
        };
        console.log(`${this.settingsFile}`);
        // console.log('checking for settings file...');
        // create settings file
        try {
            // console.log(systemInfo);
            if (!fs.existsSync(this.settingsFile)) {
                //  fs.mkdirSync(this.dirMainPath);
                storage.save('download-items', storageObj);

                console.log('created settings file');
            }
        } catch (err) {
            console.error(err);
        }
    };
    deleteSettingsFile = () => {
        console.log(`deleting settings file if it exists`);

        try {
            // Check if settings file exists
            if (fs.existsSync(this.settingsFile)) {
                console.log(`settings file exists...`);
                fs.unlink(this.settingsFile, (err) => {
                    if (err) {
                        console.log(`no settings file exists`);
                        // throw err;
                    }

                    console.log('settings file deleted.');
                });
            }
        } catch (err) {
            // console.error(err);
        }

        fs.unlink(this.settingsFile, (err) => {
            if (err) {
                throw err;
            }

            console.log('File is deleted.');
        });
    };
    initReadFiles = () => {};
    readDirFiles = (dir) => {
        // directory path
        //  const dir = this.dirVideoPath;

        // list all files in the directory
        fs.readdir(dir, (err, files) => {
            if (err) {
                throw err;
            }

            // files object contains all files names
            // log them on console
            files.forEach((file) => {
                console.log(file);
            });
        });
    };
    readFilesAudio = () => {
        this.readDirFiles(this.dirAudioPath);
    };
    readFilesVideo = () => {
        this.readDirFiles(this.dirVideoPath);
    };
    readFilesWarpstagram = () => {};
    init = () => {
        this.initDirCreation();
        this.initSettingsFileCreation();
        // this.deleteSettingsFile();
        // this.readFilesAudio();
        // this.readFilesVideo();
    };
}

module.exports = fileController;