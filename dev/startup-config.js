const config = {
    dev: {
        isDevMode: true,
        nav_A_active: 2,
        downloadItems: false,
        URLS: [
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
        ],
        testURLstatic: 'https://www.youtube.com/watch?v=LoD9RlPr51k',
        // testURLrandom: this.dev.URLS[
        //     Math.floor(Math.random() * Math.floor(config.dev.URLS.length - 1))
        // ],
    },
    user: {
        hasAcceptedEULA: false,
        isOnline: true,
        islatestVersion: false,
        hasFFmpeg: false,
        serverCheck: false,
        isUpgradedUser: false,
        readLocalFiles: true,
        updateStateLocalFiles: true,
        updateUILocalFiles: false,
    },
};

module.exports = config;