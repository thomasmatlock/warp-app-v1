//  C:\Users\Tommy\AppData\Roaming\starter\settings.json
//  C:\Users\Tommy\AppData\Roaming\starter

const logging = true;
const os = require('os');
const fs = require('fs');
const path = require('path');
const { app } = require('electron');
const storage = require('../storage');
const settings = require('electron-settings');
let startup;
class fileController {
    constructor() {
        this.dirMainName = 'Warp Downloader'; // main download directory
        this.dirSubNames = ['Audio', 'Video', 'Warpstagram']; // sub download directories
        this.documents = 'Documents';
        this.ffmpeg = 'ffmpeg';
        this.dirUser = os.userInfo().homedir; // 'C:\\Users\\Tommy\\'
        this.dirProject = 'Documents\\GitHub\\Warp-App'; // 'C:\\Users\\Tommy\\'
        this.dirProjectPath = path.join(this.dirUser, this.dirProject);
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
    initSettingsFileCreation = (settings) => {
        // console.log('initSettingsFileCreation');
        // console.log(settings);
        try {
            // console.log(systemInfo);
            if (!fs.existsSync(this.settingsFile)) {
                //  fs.mkdirSync(this.dirMainPath);
                fileController.settingsSave('settings', settings);
                // fileController.settingsSave('user', user);

                console.log('created settings file');
            }
        } catch (err) {
            console.error(err);
        }
    };
    deleteSettingsFile = () => {
        console.log(`Checking if settings file exists...`);
        fs.unlink(this.settingsFile, (err) => {
            console.log('Settings file deleted, exiting app...');
            app.quit();
        });
    };
    settingsSave = (name, obj) => {
        console.log('saving settings');
        // console.log(name, obj);
        settings.set(name, obj);
    };
    reset = () => {
        settings.reset();
    };
    readDirFiles = (dir) => {
        // directory path
        //  const dir = this.dirVideoPath;

        // list all files in the directory
        fs.readdir(dir, (err, files) => {
            if (err) {
                throw err;
            }
            // HI
            // files object contains all files names
            // log them on console
            files.forEach((file) => {
                console.log(file);
            });
        });
    };

    init = (startupObj) => {
        // startup = startupObj;
        this.initDirCreation();
        this.initSettingsFileCreation(startupObj.settings);
        // this.deleteSettingsFile();
    };
}

module.exports = fileController;