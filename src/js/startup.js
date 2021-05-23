const fileControllerReq = require('./fileController');
const fileController = new fileControllerReq();
const path = require('path');
const fs = require('fs');
const urls = require('./testURLS');
class startup {
    constructor() {
        this.devMode = true;
        this.testingYoutubeURLS = true; // true will use youtube URLS, false will use misc non youtube URLS
        this.env = {
            nav_A_active: !this.devMode ? 'audio' : 'audio', //   audio, video, or warpstagram, defaults to audio
            user: 'dev', // can be dev, free, or paid
            modalBrowserWindow: false, // opens youtube modal window yes
            theme: true, // true = 'light', false = 'dark'
            // hasFFmpeg: this.checkFFmpeg(),
            // this.loadAudioSlide = false; // set to true to load the audio portion of the content slide
            // this.loadVideoSlide = false; // set to true to load the video portion of the content slide
            // this.loadWarpstagramSlide = false; // set to true to load the warpstagram portion of the content slide
        };
        this.dev = {
            autoClick: true, // clicks nav B button
            getDownloadItemInfo: true, //
            clearStorage: false, // USE THIS TO RESET STORAGE
            devTools: !this.devMode ? false : true, // false, true, devTools off/on
            backendOnly: false, // hides window
            downloadFile: true, //
            splashScreen: true, //
            downloadSmallestFile: true,
            autoClickNavA_active: true, // clicks nav A tab on load
            useRandomYoutubeURL: this.testingYoutubeURLS ? true : false, // uses YT URLS if testingYoutubeURLS is true
            useRandomMiscURL: !this.testingYoutubeURLS ? true : false, // uses misc URLS if testingYoutubeURLS is false
            URLSyoutube: urls,
            URLSmisc: [
                'https://www.facebook.com/hmtheus/videos/3230852170358533',
                'https://www.instagram.com/p/CFmU6REA5dl/',
                'https://soundcloud.com/themonday-morning-podcast/mmpc-11-16-20',
                'https://www.twitch.tv/videos/805708310',
                'https://twitter.com/LouDobbs/status/1328469195550576645',
                'https://vimeo.com/210599507',
                'https://www.tiktok.com/@foodies/video/6895167017570127109',
            ],
        };
        this.settings = {
            user: {
                audio: 'free',
                video: 'free',
                warpstagram: 'free',
                acceptedEULA: false,
                prefs: {
                    pathMain: fileController.dirMainPath,
                    pathAudio: fileController.dirAudioPath,
                    pathVideo: fileController.dirVideoPath,
                    pathWarpstagram: fileController.dirWarpstagramPath,
                    autostartWarp: false,
                    minimizeToTrayOnClose: false,
                    startupTab: 'audio', //   audio, video, or warpstagram, defaults to audio
                    prefsMarkup: '',
                    audioQuality_best: true,
                    audioQuality_high: false,
                    audioQuality_medium: false,
                    audioQuality_low: false,
                    audioFormat_MP3: true,
                    audioFormat_M4A: false,
                    audioFormat_OGG: false,
                    videoQuality_best: true,
                    videoQuality_8k_60fps: false,
                    videoQuality_8k: false,
                    videoQuality_4k_60fps: false,
                    videoQuality_4k: false,
                    videoQuality_1080p_60fps: false,
                    videoQuality_1080p: false,
                    videoQuality_720p_60fps: false,
                    videoQuality_720p: false,
                    videoQuality_480p: false,
                    videoQuality_360p: false,
                    videoQuality_240p: false,
                    videoFormat_MP4: false,
                    videoFormat_MKV: false,
                    warpstagram_update_all: true,
                    warpstagram_update_pinned: false,
                    warpstagram_update_disabled: false,
                    warpstagram_autoUpdateFreq_24: true,
                    warpstagram_autoUpdateFreq_12: false,
                    warpstagram_autoUpdateFreq_6: false,
                    warpstagram_postSorting_default: true,
                    warpstagram_postSorting_new_to_old: false,
                    warpstagram_postSorting_old_to_new: false,
                    warpstagram_postSorting_AZ: false,
                    warpstagram_postSorting_ZA: false,
                },
            },

            downloadItems: {
                audioArr: [],
                videoArr: [],
                warpstagram: {
                    subscribed: [],
                    pinned: [],
                },
            },
        };
    }

    isDevMode = () => {
        if (!this.devMode) {
            this.devTools = false;
            this.backendOnly = false;
            this.downloadFile = true;
            this.downloadSmallestFile = false;
            this.autoClick = false;
            this.useRandomMiscURL = false;
            this.useRandomYoutubeURL = false;
            this.env.nav_A_active = 'audio';
        }
        if (this.devMode) {
            this.settings.user.audio = 'pro';
            this.settings.user.video = 'pro';
            this.settings.user.warpstagram = 'pro';
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

    updateActiveTab = (avType) => {
        // console.log(`Updating dev mode active tab`);
        this.env.nav_A_active = avType;
        // console.log(this.env.nav_A_active);
    };

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
                console.log('ffmpeg doesnt exist');
                this.hasFFmpeg = false;
            }
        } catch (err) {
            console.error(err);
        }
    };

    init = () => {
        this.isDevMode();
        this.isOnline();
        // this.checkFFmpeg();
        // delete this comment
    };
    // readLocalFiles = () => {};
    // updateFilesState = () => {};
    // updateFilesUI = () => {};
    // serverConnected = () => {};
    // isLatestVersion = () => {};
    // isUpgradedUser = () => {};
    // acceptedEULA = () => {};
}

module.exports = startup;