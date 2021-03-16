// YOUTUBEDL
const youtubedl = require('youtube-dl-exec');
youtubedl(itemURL, {
    // dumpJson: true,
    noWarnings: true,
    noCallHome: true,
    noCheckCertificate: true,
    preferFreeFormats: true,
    youtubeSkipDashManifest: true,
    referer: itemURL,
}).then((output) => console.log(output));