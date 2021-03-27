const logging = true;
const miscFunctions = require('../../../library/miscArrays');
const fileControllerReq = require('./fileController');
const fileController = new fileControllerReq();
const os = require('os');
const path = require('path');
const fs = require('fs');
const urls = require('./testURLS');
class startup {
    constructor() {
        this.devMode = true;
        this.dev = {
            backendOnly: false,
            downloadSmallestFile: true,
            autoClickPaste: false,
            downloadItemsTesting: true,
            URLS: [
                'https://www.facebook.com/hmtheus/videos/3230852170358533',
                'https://www.instagram.com/p/CFmU6REA5dl/',
                'https://soundcloud.com/themonday-morning-podcast/mmpc-11-16-20',
                'https://www.twitch.tv/videos/805708310',
                'https://twitter.com/LouDobbs/status/1328469195550576645',
                'https://vimeo.com/210599507',
                'https://www.tiktok.com/@foodies/video/6895167017570127109',
            ],
            URLSyoutube: urls,
        };

        this.devModeBackendOnly = false;
        this.downloadSmallestFile = true;
        this.devModeDevTools = !this.devMode ? false : true; // defaults to false, change 2nd option true for devTools
        this.nav_A_active = !this.devMode ? 'audio' : 'audio'; // defaults to audio, change 2nd option to audio, video, or warpstagram
        this.downloadItems = true;
        this.downloadItemsTesting = true;
        this.autoClickPaste = false;
        this.env = {
            downloadItems: true,
            nav_A_active: !this.dev.mode ? 'audio' : 'video', // defaults to audio, change 2nd option to audio, video, or warpstagram
        };

        // this.audioTabActive = false; // set to true to load the audio portion of the content slide
        // this.videoTabActive = false; // set to true to load the video portion of the content slide
        // this.warpstagramTabActive = false; // set to true to load the warpstagram portion of the content slide
    }

    isDevMode = () => {
        if (this.devMode) {
            this.downloadItems = false;
            this.nav_A_active = 'audio'; // sets default to load audio if devmode isnt on
        } else {
            this.downloadItems = true;
            console.log(`Production mode active, downloading items`);
        }
    };

    isOnline = () => {
        // https://stackoverflow.com/questions/15270902/check-for-internet-connectivity-in-nodejs
        if (!this.devMode) {
            require('dns').resolve('www.google.com', function(err) {
                if (err) {
                    console.log('App is OFFLINE');
                } else {
                    console.log('App is online');
                }
            });
        }
    };

    updateDevModeActiveTab = () => {
        console.log(`Updating dev mode active tab`);
    };
    serverConnected = () => {};
    isLatestVersion = () => {};
    isUpgradedUser = () => {};
    acceptedEULA = () => {};
    checkFFmpeg = () => {
        // Windows check
        var driveLetterObj = path.parse(fileController.dirUser); // saves obj containing root, etc from C:\\Users\\Tommy\\'
        var driveLetter = driveLetterObj.root; // saves main drive as string
        var ffmpegPath = path.join(driveLetter, '\\', fileController.ffmpeg); // joins C:\ and ffmpeg
        // check if windows ffmpeg directory exists
        try {
            if (fs.existsSync(ffmpegPath)) {
                // console.log('ffmpeg exists');
                this.hasFFmpeg = true;
            } else if (!fs.existsSync(ffmpegPath)) {
                // console.log('ffmpeg doesnt exist');
                this.hasFFmpeg = false;
            }
        } catch (err) {
            console.error(err);
        }
    };

    readLocalFiles = () => {};
    updateFilesState = () => {};
    updateFilesUI = () => {};
    init = () => {
        this.isDevMode();
        this.isOnline();
        this.checkFFmpeg();
    };
}

module.exports = startup;