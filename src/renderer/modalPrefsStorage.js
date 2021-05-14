const fs = require('fs').promises;
let elements = require('./views/elements');

async function readMarkup() {
    let modalMarkupPreferences;
    const data = await fs.readFile(
        `${__dirname}/modalPrefsMarkup.html`,
        'binary'
    );
    modalMarkupPreferences = new Buffer(data).toString();
    insertMarkupPrefs(modalMarkupPreferences);
    return modalMarkupPreferences;
}

module.exports = {
    readMarkup: readMarkup,
};