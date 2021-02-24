const miscFunctions = require('./miscFunctions');

class startup {
    constructor() {
        this.devMode = true;
        this.nav_A_active = 0;
        this.downloadItems = false;
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
            'https://www.youtube.com/watch?v=gR7HDERBCQE',
            'https://www.youtube.com/watch?v=g2iErckaIl8',
            'https://www.youtube.com/watch?v=GyB6ffmXsZo',
            'https://www.youtube.com/watch?v=WARfyYsb3dw',
            'https://www.youtube.com/watch?v=2IvEDtL27sY',
        ];
        this.testURL = this.URLSyoutube[0];
        this.testURLrandom = miscFunctions.randomFromArray(this.URLSyoutube);
    }

    isDevMode = () => {
        if (this.devMode) {
            this.downloadItems = false;
            // console.log(`Dev mode active, NOT downloading items`);
            // this.updateDevModeActiveTab();
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
    hasFFmpeg = () => {};
    readLocalFiles = () => {};
    updateFilesState = () => {};
    updateFilesUI = () => {};
    init = () => {
        this.isDevMode();
        this.isOnline();
    };
}

module.exports = startup;