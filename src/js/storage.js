// C: \Users\Users\Tommy\Users\Tommy\AppData\Users\Tommy\AppData\Roaming\Users\Tommy\AppData\Roaming\starter\Users\Tommy\AppData\Roaming\starter\settings.json;
const settings = require('electron-settings');

const save = (name, obj) => {
    settings.set(name, obj);
};
async function load() {
    // settings.get('color.name');
    // settings.get('color.code.rgb[1]');
    let promise = new Promise((resolve, reject) => {
        // setTimeout(() => resolve('done!'), 2000);
        // setTimeout(() => resolve(settings.get('color.name')), 500);
        // setTimeout(() => resolve(settings.get('color.code.rgb[1')), 500);
        setTimeout(() => resolve(settings.get('idkWhattocallthis')), 500);
    });

    let result = await promise; // wait until the promise resolves (*)

    console.log(result);
}
const reset = () => {
    settings.reset();
};
const settingsPath = () => {
    console.log(settings.file());
};

module.exports = {
    save: save,
    load: load,
    reset: reset,
    settingsPath: settingsPath,
};