let elements = require('./views/elements');
exports.audioItems = () => {
    // console.log('hello');
    Array.from(document.getElementsByClassName('dl__item_audio')).forEach(
        (item) => {
            // console.log(item);
            // Hide items that dont match the search value
            let hasMatch = item.innerText
                .toLowerCase()
                .includes(elements.searchAudio.value); // hasMatch will now hold a boolean value based on whether the item text matches the search text
            item.style.display = hasMatch ? 'flex' : 'none'; // if item text matches search text, display, else set display to none
        }
    );
};
exports.videoItems = () => {
    Array.from(document.getElementsByClassName('dl__item_video')).forEach(
        (item) => {
            // console.log(item);
            // Hide items that dont match the search value
            let hasMatch = item.innerText
                .toLowerCase()
                .includes(elements.searchVideo.value); // hasMatch will now hold a boolean value based on whether the item text matches the search text
            item.style.display = hasMatch ? 'flex' : 'none'; // if item text matches search text, display, else set display to none
        }
    );
};