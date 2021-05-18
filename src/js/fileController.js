//  C:\Users\Tommy\AppData\Roaming\starter\settings.json
//  C:\Users\Tommy\AppData\Roaming\starter
// C:\Users\Tommy\AppData\Roaming\Warp IMPORTANT, this has to MATCH the project name field in package.json

const os = require('os');
const fs = require('fs');
const path = require('path');
const { app, ipcRenderer, ipcMain } = require('electron');
const settings = require('electron-settings');

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
        this.settingsPath = 'AppData\\Roaming\\Warp\\';

        // this.settingsFile = path.join(
        //     this.dirUser,
        //     this.settingsPath,
        //     this.settingsFileName
        // );
        this.settingsFile;
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

    filesInitDirCreation = () => {
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
    // filesLoad = (dir) => {
    //     fs.readdir(dir, (err, files) => {
    //         if (err) {
    //             throw err;
    //         }

    //         files.forEach((file) => {
    //             console.log(file);
    //         });
    //     });
    // };
    settingsInitCreateFile = (settings) => {
        try {
            if (!fs.existsSync(this.settingsFile)) {
                //  fs.mkdirSync(this.dirMainPath);
                this.settingsSave('settings', settings);

                console.log('created settings file');
                console.log(this.settingsFile);
            }
        } catch (err) {
            console.error(err);
        }
    };
    settingsReset = () => {
        this.settingsDeleteFile();
        setTimeout(() => {
            this.settingsInitCreateFile(startupObj.settings);
        }, 2000);
    };
    settingsDeleteFile = () => {
        console.log(`Checking if settings file exists...`);
        fs.unlink(this.settingsFile, (err) => {
            console.log('Settings file deleted, exiting app...');
            app.quit();
        });
    };

    settingsSave = (name, obj) => {
        settings.set(name, obj);
    };
    settingsLoad = async() => {
        // console.log('settingsLoad');
        try {
            const data = await settings.get('settings');
            // console.log('settingsLoad', data);
            return data;
        } catch (e) {
            console.error(e);
        }

        // let promise = new Promise((resolve, reject) => {
        //     (async() => {
        //         resolve(settings.get('settings'));
        //     })();
        // });
        // let result = await promise; // wait until the promise resolves (*)
        // return result;
    };
    // settingsSync = async(name, obj) => {
    //     this.settingsSave(name, obj);
    //     // this.settingsLoad();
    // };
    init = (settingsObj) => {
        this.settingsFile = settings.file();
        this.filesInitDirCreation();

        if (!settingsObj.dev.clearStorage)
            this.settingsInitCreateFile(settingsObj.settings);
        if (settingsObj.dev.clearStorage) this.settingsDeleteFile();
    };
}

module.exports = fileController;