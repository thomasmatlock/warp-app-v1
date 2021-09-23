const { clipboard, ipcRenderer } = require('electron');
const elements = require('./views/elements')

let storage;
(function init() {
    ipcRenderer.on(
        'window-ready',
        (e, storageSentFromMain) => {
            storage = storageSentFromMain;
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
const toggleLoginVisibility = (storageReceived, id) => {
    storage = storageReceived;
    let activeTab = storage.state.activeTab;
    let markup = storage.markups.modals.login
        // console.log(`toggling visibility of ${id}`);
    let modalContainerAudio = elements.modalContainerAudio; // selects target list to add item markup to
    let modalContainerVideo = elements.modalContainerVideo; // selects target list to add item markup to
    let modalContainerWarpstagram = elements.modalContainerWarpstagram; // selects target list to add item markup to
    let markupNodeAudio, markupNodeVideo, markupNodeWarpstagram;
    if (activeTab === 'audio') {
        markupNodeAudio = document.createElement('div'); // Create a new HTML Dom node inside download list
        markupNodeAudio.className = 'contentContainerLogin';
        markupNodeAudio.innerHTML = markup;
        modalContainerAudio.appendChild(markupNodeAudio); // Append item node
        // markupNodeAudio.id = 'modalPrefsID';
    }
    if (activeTab === 'video') {
        markupNodeVideo = document.createElement('div'); // Create a new HTML Dom node inside download list
        markupNodeVideo.className = 'contentContainerLogin';
        markupNodeVideo.innerHTML = markup;
        modalContainerVideo.appendChild(markupNodeVideo); // Append item node
        // markupNodeVideo.id = 'modalPrefsID';
    }
    if (activeTab === 'warpstagram') {
        markupNodeWarpstagram = document.createElement('div'); // Create a new HTML Dom node inside download list
        markupNodeWarpstagram.className = 'contentContainerLogin';
        markupNodeWarpstagram.innerHTML = markup;
        modalContainerWarpstagram.appendChild(markupNodeWarpstagram); // Append item node
        // markupNodeWarpstagram.id = 'modalPrefsID';
    }
}

module.exports = {
    injectModalLoginToCurrentSlide,
    toggleLoginVisibility,
}