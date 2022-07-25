// 1) wrap everything in an async function
(async() => {
    storageAwaited = await mainFunctions.load();
    modalPrefsMarkup = await mainFunctions.loadModalPrefsMarkupSource();
})();

// 2) any function you await must be an async await function also
const mainFunctions = {
    load: async function() {
        const result = await fileController.settingsLoad();
        return result;
    },
    loadModalPrefsMarkupSource: async function() {
        const result = await modalPrefsStorage.loadMarkupSource();
        return result;
    },
};

// 3) same thing, nesting async/awaits
async function loadMarkupSource() {
    // // https://puruvj.dev/blog/fs-promises
    try {
        const data = await readFile(
            `${__dirname}/modalPrefsMarkup.html`,
            'binary'
        );
        return data;
    } catch (e) {
        console.error(e);
    }
}

settingsLoad = async() => {
    try {
        const data = await settings.get('settings');
        return data;
    } catch (e) {
        console.error(e);
    }
};