let showModal = document.getElementById('show-modal'),
    closeModal = document.getElementById('close-modal'),
    modal = document.getElementById('modal'),
    addItem = document.getElementById('add-item'),
    itemURL = document.getElementById('url');
search = document.getElementById('search');

// Open modal from menu
ipcRenderer.on('menu-show-modal', () => {
    showModal.click();
});