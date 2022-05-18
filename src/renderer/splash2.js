const pckg = require('../../package.json');
        // console.log(`versionnnn ${pckg.version}`);

// const version = '1.0.2';
const version = pckg.version;
document.getElementById('version').innerHTML =
						version';