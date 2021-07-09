/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable one-var */
const { app, clipboard, ipcRenderer, shell } = require('electron');
const nativeImage = require('electron').nativeImage;
let elements = require('./views/elements');
const nav_A = require('./views/navPrimaryView.js');
const nav_B = require('./views/navSecondaryView.js');
const listView = require('./views/listView.js');
const userInput = require('../js/userInput');
const defaultsReq = require('../js/defaults');
const global = require('../js/global');
const defaults = new defaultsReq();
const items = require('./items');
const auto = require('./automate');
const search = require('./searchLocal');
const theme = require('./themeController');

let storage;
global.testFunctions();
const addIpcListeners = () => {
    ipcRenderer.on('storage-sync-success', (e, storageReceived) => {
        storage = storageReceived;
        // console.log(storage.state);
    });
    ipcRenderer.on('state-sync-success', (e, stateReceived) => {
        console.log('state-sync-success');
    });
    ipcRenderer.on('resize', () => {
        ipcRenderer.send('mainWindow-resized');
        // CLICK ACTIVE NAV A
        var clickDelay = 50;
        if (defaults.env.nav_A_active == 'audio') {
            elements.nav_A_active = elements.nav_A_audio; // sets active Nav A
            setTimeout(() => {
                elements.nav_A_audio.click(); // clicks audio tab
            }, clickDelay);
        }
        if (defaults.env.nav_A_active == 'video') {
            elements.nav_A_active = elements.nav_A_video; // sets active Nav A
            setTimeout(() => {
                elements.nav_A_video.click(); // clicks video tab
            }, clickDelay);
        }
        if (defaults.env.nav_A_active == 'warpstagram') {
            setTimeout(() => {
                elements.nav_A_warpstagram.click(); // clicks warpstagram tab
            }, clickDelay);
        }
    });
    ipcRenderer.on('paste-new-url', (event, itemURL, avType, platform) => {
        items.downloadItem(itemURL, avType, platform);
    });
}

(function init() {
    ipcRenderer.on('window-ready', (e, storage, modalPrefsMarkup, markupDownloadItemAudio, markupDownloadItemVideo, networkSpeed) => {
        addEventListeners(); // activates DOM event listeners
        let startupTab = discoverStartupTab(storage);
        // state.activeTab = startupTab;
        storage.state.activeTab = startupTab;
        // state = storage.state;

        nav_A.setActiveNav_A(storage); // sets active Nav A
        nav_B.removeNavBActivateBtn(storage);
        setTimeout(() => {
            auto.click_nav_A(storage.state.activeTab); // auto clicks active tab if active
        }, 50);
        setTimeout(() => {
            auto.click_nav_A(storage.state.activeTab); // auto clicks active tab if active
        }, 300);
        ipcRenderer.send('menu-change', storage.state.activeTab);
        if (defaults.dev.clearStorage) items.resetStorage(); // clears localStorage if active
        items.defaultsAddAllItems(storage, markupDownloadItemAudio, markupDownloadItemVideo); // loads items stored in settings to UI

        ipcRenderer.send('mainWindow-ready');
        ipcRenderer.on('modal-window-ready', () => {
            console.log('attaching event listeners');
        });
    });


    const discoverStartupTab = function(storage) {
        for (var key in storage.user.prefs) {
            if (storage.user.prefs[key] && key.toLowerCase().includes('startuptab')) {
                let startupTab = key.toLowerCase().slice(19, key.length)
                return startupTab;
            }
        }
    };
    addIpcListeners();

})();

const addMenuListeners = () => {
    // MENU LISTENERS, AUDIO
    ipcRenderer.on('Audio: File: Import Download Links', () => {
        console.log('you want to import audio');
    });
    ipcRenderer.on('Audio: File: Export Download Links', () => {});
    // Downloads
    ipcRenderer.on('Audio: Downloads: Paste', () => {
        elements.nav_B_button_audio_paste.click(); // clicks audio paste
    });
    ipcRenderer.on('Audio: Downloads: Pause All', () => {});
    ipcRenderer.on('Audio: Downloads: Resume All', () => {});
    ipcRenderer.on('Audio: Downloads: Remove All', () => {
        items.removeAllitems('audio');
    });
    // Tools
    ipcRenderer.on('Audio: Tools: Preferences', () => {
        ipcRenderer.send('nav_B_button_audio_preferences');
    });

    // MENU LISTENERS, VIDEO
    // File
    ipcRenderer.on('Video: File: Import Download Links', () => {});
    ipcRenderer.on('Video: File: Export Download Links', () => {});
    ipcRenderer.on('Video: File: Import Subscriptions', () => {});
    ipcRenderer.on('Video: File: Export Subscriptions', () => {});
    // Downloads
    ipcRenderer.on('Video: Downloads: Paste', () => {
        elements.nav_B_button_video_paste.click(); // clicks audio paste
    });
    ipcRenderer.on('Video: Downloads: Pause All', () => {});
    ipcRenderer.on('Video: Downloads: Resume All', () => {});
    ipcRenderer.on('Video: Downloads: Remove All', () => {
        items.removeAllitems('video');
    });
    // Tools
    ipcRenderer.on('Video: Tools: Smart Mode', () => {});
    ipcRenderer.on('Video: Tools: Subscriptions', () => {});
    ipcRenderer.on('Video: Tools: Check for update', () => {});
    ipcRenderer.on('Video: Tools: Preferences', () => {
        ipcRenderer.send('nav_B_button_video_preferences');
    });

    // MENU LISTENERS, WARPSTAGRAM
    // File
    ipcRenderer.on('Warpstagram: File: Import Subscriptions', () => {});
    ipcRenderer.on('Warpstagram: File: Export Subscriptions', () => {});
    ipcRenderer.on('Warpstagram: File: Export Posts', () => {});
    // Edit
    ipcRenderer.on('Warpstagram: Edit: Sub to My Saved Posts', () => {});
    ipcRenderer.on('Warpstagram: Edit: Sub to PAccts I Follow', () => {});
    ipcRenderer.on(
        'Warpstagram: Edit: Sub to Stories Of Accts I Follow',
        () => {}
    );
    ipcRenderer.on('Warpstagram: Edit: Update pinned subscriptions', () => {});
    ipcRenderer.on('Warpstagram: Edit: Update all subscriptions', () => {});
    ipcRenderer.on('Warpstagram: Edit: Pause all subscriptions', () => {});
    ipcRenderer.on('Warpstagram: Edit: Remove all subscriptions', () => {});
    // Tools
    ipcRenderer.on('Warpstagram: Tools: Login', () => {});
    ipcRenderer.on('Warpstagram: Tools: Manage license', () => {});
    ipcRenderer.on('Warpstagram: Tools: Check for update', () => {});
    ipcRenderer.on('Warpstagram: Tools: Preferences', () => {
        ipcRenderer.send('Warpstagram: Tools: Preferences');
    });

    // Menu listeners, universal commands
    ipcRenderer.on('Check for update', () => {});
    ipcRenderer.on('Quit', () => {
        if (defaults.dev.menuLogging) console.log('you quit');
        ipcRenderer.send('quit');
    });
    // Menu listeners, developer commands
    ipcRenderer.on('Reset-storage', () => {
        console.log('reset');
        ipcRenderer.send('reset-storage');
    });
    ipcRenderer.on('Restart', () => {
        ipcRenderer.send('restart-app');
        console.log('restarting...');
    });
};
const addEventListeners = () => {
    addMenuListeners();
    addNavAListeners();
    addNavBListeners();
    addNavBSearchListeners();
    addAudioDownloadListListeners();
    addVideoDownloadListListeners();
};
const addNavAListeners = () => {
    // Nav A LISTENERS
    elements.nav_A.addEventListener('click', (e) => {
        // GETS CLICK EVENT TARGET
        const target = e.target;
        const id = target.id;
        nav_A_active = id;
        nav_A.clearActive();
        nav_A.highlightSelected(id);
        nav_B.clearActive();
    });
    let orangeGradient = 'linear-gradient(268deg, #da2c4d, #f8ab37)';
    let blueGradient = 'linear-gradient( to left, #0463db 0%, #0b88e6 33%, #13aff2 66%, #19d2fc 100%)';
    // menu-change
    elements.nav_A_audio.addEventListener('click', (e) => {
        ipcRenderer.send('menu-change', 'audio');
        ipcRenderer.send('nav_A_audio');
        defaults.env.nav_A_active = 'audio';
        elements.nav_A_audio.style.backgroundImage = blueGradient;
        items.removeActionMenus();

    });
    elements.nav_A_audio.addEventListener('mouseenter', (e) => {
        elements.nav_A_audio.style.backgroundImage = orangeGradient;

    });
    elements.nav_A_audio.addEventListener('mouseleave', (e) => {
        theme.setTheme(storage);
        // defaults.env.nav_A_active = 'audio';
    });
    elements.nav_A_video.addEventListener('click', (e) => {
        ipcRenderer.send('menu-change', 'video');
        ipcRenderer.send('nav_A_video');
        defaults.env.nav_A_active = 'video';
        elements.nav_A_video.style.backgroundImage = blueGradient;
        items.removeActionMenus();

    });
    elements.nav_A_video.addEventListener('mouseenter', (e) => {
        elements.nav_A_video.style.backgroundImage = orangeGradient;

    });
    elements.nav_A_video.addEventListener('mouseleave', (e) => {
        theme.setTheme(storage);
    });
    elements.nav_A_warpstagram.addEventListener('click', (e) => {
        ipcRenderer.send('menu-change', 'warpstagram');
        ipcRenderer.send('nav_A_warpstagram');
        defaults.env.nav_A_active = 'warpstagram';
        elements.nav_A_warpstagram.style.backgroundImage = blueGradient;
        items.removeActionMenus();

    });
    elements.nav_A_warpstagram.addEventListener('mouseenter', (e) => {
        elements.nav_A_warpstagram.style.backgroundImage = orangeGradient;

    });
    elements.nav_A_warpstagram.addEventListener('mouseleave', (e) => {
        theme.setTheme(storage);
    });
}
const addNavBListeners = () => {
    elements.nav_B_button_audio_paste.addEventListener('click', (e) => {
        userInput.validateURL(clipboard.readText(), defaults.env.nav_A_active);
        ipcRenderer.send('nav_B_button_audio_paste');
    });
    elements.nav_B_button_audio_activate.addEventListener('click', (e) => {
        ipcRenderer.send('nav_B_button_audio_activate');
    });
    elements.nav_B_button_audio_preferences.addEventListener(
        'click',
        (e) => {
            ipcRenderer.send('nav_B_button_audio_preferences');
        }
    );

    // Nav B video LISTENERS
    elements.nav_B_button_video_paste.addEventListener('click', (e) => {
        userInput.validateURL(clipboard.readText(), defaults.env.nav_A_active);
        ipcRenderer.send('nav_B_button_video_paste');
    });
    elements.nav_B_button_video_activate.addEventListener('click', (e) => {
        ipcRenderer.send('nav_B_button_video_activate');
    });
    elements.nav_B_button_video_subscriptions.addEventListener(
        'click',
        (e) => {
            ipcRenderer.send('nav_B_button_video_subscriptions');
        }
    );
    elements.nav_B_button_video_preferences.addEventListener(
        'click',
        (e) => {
            ipcRenderer.send('nav_B_button_video_preferences');
        }
    );

}
const addNavBSearchListeners = () => {
    elements.searchAudio.addEventListener('keyup', (e) => {
        search.audioItems();
    });
    elements.searchVideo.addEventListener('keyup', (e) => {
        search.videoItems();
    });
}
const addAudioDownloadListListeners = () => {
    // Download lists listeners
    elements.download__list_audio_ID.addEventListener('click', (e) => {
        let itemID, action;
        let actionMenuContainer;
        const iconGearClassName = 'fas fa-cog';
        const iconFolderClassName = 'far fa-folder-open';

        // OPEN CONTAINER FOLDER
        if (e.target.parentNode.parentNode.parentNode.id.length === 36) {
            if (e.target.className === iconFolderClassName) {
                itemID = e.target.parentNode.parentNode.parentNode.id;
                items.selectItem('audio', itemID, 'show in folder');
            }
        }
        // OPEN MORE ACTIONS MENU
        else if (
            e.target.parentNode.parentNode.parentNode.parentNode.id.length ===
            36
        ) {
            if (e.target.className === iconGearClassName) {
                itemID =
                    e.target.parentNode.parentNode.parentNode.parentNode.id;
                actionMenuContainer =
                    e.target.parentNode.parentNode.parentNode.parentNode
                    .childNodes[3].childNodes[3].childNodes[1]
                    .childNodes[3];
                actionMenuContainer.style.visibility = 'visible';
                Array.from(
                    actionMenuContainer.getElementsByClassName(
                        'downloadItemMenu_option'
                    )
                ).forEach((item) => {
                    item.addEventListener('click', (e) => {
                        if (
                            e.target.className === 'downloadItemMenu_optionText'
                        ) {
                            action = e.target.outerText;
                            actionMenuContainer.style.visibility = 'hidden';
                            // console.log(itemID, action);
                            items.selectItem('audio', itemID, action);
                        } else if (e.target.tagName.toLowerCase() === 'li') {
                            action = e.target.childNodes[1].outerText;

                            actionMenuContainer.style.visibility = 'hidden';
                            // console.log(itemID, action);
                            items.selectItem('audio', itemID, action);
                        }
                    });
                });
                Array.from(
                    actionMenuContainer.getElementsByClassName(
                        'downloadItemMenu_option'
                    )
                ).forEach((item) => {
                    item.removeEventListener('click', (e) => {});
                });
            }
        }
    });

}
const addVideoDownloadListListeners = () => {
    elements.download__list_video_ID.addEventListener('click', (e) => {
        let itemID, action;
        let actionMenuContainer;
        const iconGearClassName = 'fas fa-cog';
        const iconFolderClassName = 'far fa-folder-open';

        // OPEN CONTAINER FOLDER
        if (e.target.parentNode.parentNode.parentNode.id.length === 36) {
            // console.log(e.target.className);
            if (e.target.className === iconFolderClassName) {
                itemID = e.target.parentNode.parentNode.parentNode.id;
                // console.log(itemID);
                items.selectItem('video', itemID, 'show in folder');
            }
        }
        // OPEN MORE ACTIONS MENU
        else if (
            e.target.parentNode.parentNode.parentNode.parentNode.id.length ===
            36
        ) {
            if (e.target.className === iconGearClassName) {
                itemID =
                    e.target.parentNode.parentNode.parentNode.parentNode.id;
                actionMenuContainer =
                    e.target.parentNode.parentNode.parentNode.parentNode
                    .childNodes[3].childNodes[3].childNodes[1]
                    .childNodes[3];
                actionMenuContainer.style.visibility = 'visible';
                Array.from(
                    actionMenuContainer.getElementsByClassName(
                        'downloadItemMenu_option'
                    )
                ).forEach((item) => {
                    item.addEventListener('click', (e) => {
                        if (
                            e.target.className === 'downloadItemMenu_optionText'
                        ) {
                            action = e.target.outerText;
                            actionMenuContainer.style.visibility = 'hidden';
                            // console.log(itemID, action);
                            items.selectItem('video', itemID, action);
                        } else if (e.target.tagName.toLowerCase() === 'li') {
                            action = e.target.childNodes[1].outerText;

                            actionMenuContainer.style.visibility = 'hidden';
                            // console.log(itemID, action);
                            items.selectItem('video', itemID, action);
                        }
                    });
                });
                Array.from(
                    actionMenuContainer.getElementsByClassName(
                        'downloadItemMenu_option'
                    )
                ).forEach((item) => {
                    item.removeEventListener('click', (e) => {});
                });
            }
        }
    });
}