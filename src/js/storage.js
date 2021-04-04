const settings = require('electron-settings');

// const save = (name, obj) => {
//     // console.log(name, obj);
//     settings.set(name, obj);
// };
// async function load() {
//     // settings.get('color.name');
//     // settings.get('color.code.rgb[1]');
//     let promise = new Promise((resolve, reject) => {
//         // setTimeout(() => resolve('done!'), 2000);
//         // setTimeout(() => resolve(settings.get('color.name')), 500);
//         // setTimeout(() => resolve(settings.get('color.code.rgb[1')), 500);
//         setTimeout(() => resolve(settings.get('settings')), 2000);
//     });

//     let result = await promise; // wait until the promise resolves (*)
//     // console.log(`logging storage...`);
//     // console.log(result);
//     return result;
// }

module.exports = {
    // save: save,
    // load: load,
};