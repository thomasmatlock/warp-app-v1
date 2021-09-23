// const modalPrefsView = require('../../src/renderer/modalPrefsView')
// console.log(modalPrefsView);
const discoverStartupTab = (storage) => {
    for (var key in storage.user.prefs) {
        if (storage.user.prefs[key] && key.toLowerCase().includes('startuptab')) {
            let startupTab = key.toLowerCase().slice(19, key.length)
            return startupTab;
        }
    }
}

const randomFromArray = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const getObjLength = (obj) => {
    return Object.keys(obj).length;
}


module.exports = {
    discoverStartupTab,
    randomFromArray,
    getObjLength,
}