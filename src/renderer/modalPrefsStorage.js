const fs = require('fs').promises;
let elements = require('./views/elements');

async function loadMarkup() {
    let modalMarkupPreferences;
    const data = await fs.readFile(
        `${__dirname}/modalPrefsMarkup.html`,
        'binary'
    );
    modalMarkupPreferences = new Buffer(data).toString();
    insertMarkupPrefs(modalMarkupPreferences);
    return modalMarkupPreferences;
}

async function saveMarkup() {}

module.exports = {
    loadMarkup: loadMarkup,
    saveMarkup: saveMarkup,
};