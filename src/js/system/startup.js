const miscFunctions = require('../../../library/miscArrays');
const fileControllerReq = require('./fileController');
const fileController = new fileControllerReq();
const os = require('os');
const path = require('path');
const fs = require('fs');
class startup {
    constructor() {
        this.devMode = true;
        this.devModeBackendOnly = false;
        this.nav_A_active = 'warpstagram'; // can be, audio, video, or warpstagram
        this.downloadItems = true;
        this.downloadItemsTesting = true;
        this.menuLogging = false;
        this.hasFFmpeg = false;
        this.URLS = [
            'https://www.facebook.com/hmtheus/videos/3230852170358533',
            'https://www.instagram.com/p/CFmU6REA5dl/',
            'https://soundcloud.com/themonday-morning-podcast/mmpc-11-16-20',
            'https://www.twitch.tv/videos/805708310',
            'https://twitter.com/LouDobbs/status/1328469195550576645',
            'https://vimeo.com/210599507',
            'https://www.tiktok.com/@foodies/video/6895167017570127109',
        ];
        this.URLSyoutube = [
            'https://www.youtube.com/watch?v=TeBSVS3FwRY',
            'https://www.youtube.com/watch?v=WT3TwF8oVis',
            'https://www.youtube.com/watch?v=LoD9RlPr51k',
            'https://www.youtube.com/watch?v=LOPsIByPn48',
            'https://www.youtube.com/watch?v=YExiDiVPbzw',
            'https://www.youtube.com/watch?v=GyB6ffmXsZo',
            'https://www.youtube.com/watch?v=WARfyYsb3dw',
            'https://www.youtube.com/watch?v=Bgmdw4E7gE4',
            'https://www.youtube.com/watch?v=JvvqKKcd4vQ',
            'https://www.youtube.com/watch?v=kfUROAaKaxc',
            'https://www.youtube.com/watch?v=9NtiT1Fnrjs',
            'https://www.youtube.com/watch?v=DyQuSuyCuLg',
            'https://www.youtube.com/watch?v=TVyPF9STsHU',
            'https://www.youtube.com/watch?v=51HjuUDK-5w',
            'https://www.youtube.com/watch?v=fZR_MVDldxU',
            'https://www.youtube.com/watch?v=Af7Pv86RR0Y',
            'https://www.youtube.com/watch?v=GAxWyaSWwcg',
            'https://www.youtube.com/watch?v=AbiTODVXMro',
            'https://www.youtube.com/watch?v=VpPyytsTxkU',
            'https://www.youtube.com/watch?v=FuxoqOkjiBo',
        ];
        this.testURL = this.URLSyoutube[0];
        this.testURLrandom = miscFunctions.randomFromArray(this.URLSyoutube);
    }

    isDevMode = () => {
        if (this.devMode) {
            this.downloadItems = false;
            // console.log(`Dev mode active, NOT downloading items`);
            // this.updateDevModeActiveTab();
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