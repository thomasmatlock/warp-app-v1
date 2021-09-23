const { clipboard, ipcRenderer } = require('electron');

let storage;
(function init() {
    ipcRenderer.on(
        'window-ready',
        (e, storageSentFromMain, modalPrefsMarkup, markupDownloadItemAudio, markupDownloadItemVideo) => {
            storage = storageSentFromMain;
            console.log(storage);
        }
    );
    ipcRenderer.on('storage-sync-success', (e, storageReceived) => {
        storage = storageReceived;
    });
    ipcRenderer.on('mainWindow-resized', (e, storageReceived) => {
        console.log('mainWindow-resized');
    });
})();

const injectModalLoginToCurrentSlide = () => {}
const toggleLoginVisibility = (id) => {
    console.log(`toggling visibility of ${id}`);
}


module.exports = {
    injectModalLoginToCurrentSlide,
    toggleLoginVisibility,
}