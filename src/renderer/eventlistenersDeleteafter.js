elements.nav_B_button_audio_paste.addEventListener('click', (e) => {
    userInput.validateURL(clipboard.readText(), startup.env.nav_A_active);
});
elements.nav_B_button_audio_activate.addEventListener('click', (e) => {
    console.log('clicked activate');
});
elements.nav_B_button_audio_preferences.addEventListener('click', (e) => {
    if (logging) console.log('clicked preferences');
    modals.modalBackgroundAdjust(state, elements, startup);
});
elements.nav_B_button_audio_help.addEventListener('click', (e) => {
    if (logging) console.log('clicked help');
});
// Nav B video LISTENERS
elements.nav_B_button_video_paste.addEventListener('click', (e) => {
    userInput.validateURL(clipboard.readText(), startup.env.nav_A_active);
});
elements.nav_B_button_video_activate.addEventListener('click', (e) => {
    if (logging) console.log('clicked activate');
});
elements.nav_B_button_video_subscriptions.addEventListener('click', (e) => {
    if (logging) console.log('clicked subscriptions');
});
elements.nav_B_button_video_preferences.addEventListener('click', (e) => {
    if (logging) console.log('clicked preferences');
    modals.modalBackgroundAdjust(state, elements, startup);
});
// Download lists listeners

elements.download__list_audio_ID.addEventListener('click', (e) => {
    console.log(e.target.parentNode);
    console.log(
        e.target.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1]
        .outerText
    );
    let itemTitle;
    if (e.target.parentNode.classList[0] === 'dl__item') {
        itemTitle =
            e.target.parentNode.parentNode.childNodes[0].childNodes[1]
            .childNodes[3].childNodes[1].childNodes[1].outerText;
    }
    // THUMBNAIL
    if (e.target.parentNode.classList[0] === 'dl__item_info-pane') {
        itemTitle =
            e.target.parentNode.parentNode.childNodes[3].childNodes[1]
            .childNodes[1].outerText;
    }
    if (e.target.parentNode.classList[1] === 'dl__item_info-pane_indexMarker') {
        itemTitle =
            e.target.parentNode.parentNode.childNodes[1].childNodes[1]
            .outerText;
        console.log(itemTitle);
    }
    if (e.target.parentNode.parentNode.classList[0] === 'dl__item') {
        itemTitle =
            e.target.parentNode.parentNode.childNodes[1].childNodes[3]
            .childNodes[1].childNodes[1].outerText;
    }
    if (
        e.target.parentNode.parentNode.classList[0] ===
        'dl__item_info-pane__left'
    ) {
        itemTitle =
            e.target.parentNode.parentNode.childNodes[3].childNodes[1]
            .childNodes[1].outerText;
        console.log(itemTitle);
    }

    // right actions panels
    if (
        e.target.parentNode.parentNode.classList[0] ===
        'dl__item_info-pane__right'
    ) {
        itemTitle =
            e.target.parentNode.parentNode.parentNode.childNodes[1]
            .childNodes[3].childNodes[1].childNodes[1].outerText;
    }
    // console.log(itemTitle);
    items.selectItem(elements.download__list_audio_ID, e, 'audio', itemTitle);
});
elements.download__list_video_ID.addEventListener('click', (e) => {
    let itemTitle;
    if (e.target.parentNode.classList[0] === 'dl__item') {
        itemTitle =
            e.target.parentNode.parentNode.childNodes[0].childNodes[1]
            .childNodes[3].childNodes[1].childNodes[1].outerText;
    }
    // THUMBNAIL
    if (e.target.parentNode.classList[0] === 'dl__item_info-pane') {
        itemTitle =
            e.target.parentNode.parentNode.childNodes[3].childNodes[1]
            .childNodes[1].outerText;
    }
    if (e.target.parentNode.classList[1] === 'dl__item_info-pane_indexMarker') {
        itemTitle =
            e.target.parentNode.parentNode.childNodes[1].childNodes[1]
            .outerText;
    }
    if (e.target.parentNode.parentNode.classList[0] === 'dl__item') {
        itemTitle =
            e.target.parentNode.parentNode.childNodes[1].childNodes[3]
            .childNodes[1].childNodes[1].outerText;
    }

    // right actions panels
    if (
        e.target.parentNode.parentNode.classList[0] ===
        'dl__item_info-pane__right'
    ) {
        itemTitle =
            e.target.parentNode.parentNode.parentNode.childNodes[1]
            .childNodes[3].childNodes[1].childNodes[1].outerText;
    }

    items.selectItem(elements.download__list_video_ID, e, 'video', itemTitle);
});