const config = require('../../dev/startup-config');
// const axios = require('axios');
const http = require('http');
class startup {
    constructor() {
        this.isDevMode = true;
        this.nav_A_active = 0;
        this.downloadItems = false;
        this.testURLstatic = 'https://www.youtube.com/watch?v=LoD9RlPr51k';
        this.URLS = [
            'https://www.facebook.com/hmtheus/videos/3230852170358533',
            'https://www.instagram.com/p/CFmU6REA5dl/',
            'https://soundcloud.com/themonday-morning-podcast/mmpc-11-16-20',
            'https://www.twitch.tv/videos/805708310',
            'https://twitter.com/LouDobbs/status/1328469195550576645',
            'https://vimeo.com/210599507',
            'https://www.youtube.com/watch?v=TeBSVS3FwRY',
            'https://www.youtube.com/watch?v=WT3TwF8oVis',
            'https://www.tiktok.com/@foodies/video/6895167017570127109',
            'https://www.youtube.com/watch?v=LoD9RlPr51k',
        ];
    }

    isOnline = () => {
        // https://stackoverflow.com/questions/15270902/check-for-internet-connectivity-in-nodejs
        return 'hello';
    };
    serverConnected = () => {};
    isLatestVersion = () => {};
    isUpgradedUser = () => {};
    acceptedEULA = () => {};
    hasFFmpeg = () => {};
    readLocalFiles = () => {};
    updateFilesState = () => {};
    updateFilesUI = () => {};
}

module.exports = startup;