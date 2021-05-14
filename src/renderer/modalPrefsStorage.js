const { ipcRenderer } = require('electron');
const fs = require('fs').promises;
const { promisify } = require('util');

// async function loadMarkup() {
//     let modalMarkupPreferences;
//     const data = await fs.readFile(
//         `${__dirname}/modalPrefsMarkup.html`,
//         'binary'
//     );
//     modalMarkupPreferences = new Buffer(data).toString();
//     insertMarkupPrefs(modalMarkupPreferences);
//     return modalMarkupPreferences;
// }

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

async function loadMarkup() {
    // // https://puruvj.dev/blog/fs-promises
    try {
        const data = await readFile(
            `${__dirname}/modalPrefsMarkup.html`,
            'binary'
        );
        ipcRenderer.send('prefsMarkup-loaded', data);
        ipcRenderer.send('prefsMarkup-saved', data);
    } catch (e) {
        console.error(e);
    }
}
async function saveMarkup() {
    // // https://puruvj.dev/blog/fs-promises
    try {
        // const data = await readFile(
        //     `${__dirname}/modalPrefsMarkup.html`,
        //     'binary'
        // );
        // ipcRenderer.send('prefsMarkup-loaded', data);
        // ipcRenderer.send('prefsMarkup-saved', data);
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    loadMarkup: loadMarkup,
    saveMarkup: saveMarkup,
    // testing: testing,
};