/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable one-var */
const { app, clipboard, ipcRenderer, shell } = require('electron');
const nativeImage = require('electron').nativeImage;
let elements = require('./views/elements');
const navPrimaryView = require('./views/navPrimaryView.js');
const navSecondaryView = require('./views/navSecondaryView.js');
const listView = require('./views/listView.js');
const Nav = require('../js/nav.js');
const userInput = require('../js/userInput');
const startupReq = require('../js/startup');
const startup = new startupReq();
const items = require('./items');
const auto = require('./automate');
const modals = require('./modals');
const stateReq = require('./state');
const search = require('./searchLocal');

let state = new stateReq();

(function init() {
    ipcRenderer.on('window-ready', (e, storage) => {
        addEventListeners(); // activates DOM event listeners
        addMenuListeners(); // activates menu event listeners
        setActiveNav_A(startup.env.nav_A_active); // sets active Nav A
        removeNavBActivateBtn(storage);
        setTimeout(() => {
            auto.click_nav_A(startup.env.nav_A_active); // auto clicks active tab if active
            // auto.click_nav_A(startup.env.nav_A_active); // auto clicks active tab if active
        }, 50);
        setTimeout(() => {
            // auto.click_nav_A(startup.env.nav_A_active); // auto clicks active tab if active
            auto.click_nav_A(startup.env.nav_A_active); // auto clicks active tab if active
        }, 300);
        ipcRenderer.send('menu-change', startup.env.nav_A_active);
        if (startup.dev.clearStorage) items.resetStorage(); // clears localStorage if active
        items.startupAddAllItems(storage); // loads items stored in settings to UI
        let pathsObj = storage.user.paths;
        modals.markupPrefs(pathsObj);

        auto.click_nav_B(startup.env.nav_A_active, 'preferences'); // auto clicks paste, smartMode, activate, subscriptions, preferences, help
        addModalEventListeners(); // activates modal event listeners
        // setTimeout(() => {
        modals.toggleComponentsInit('prefs', 'audio');
        // }, 400);
    });

    const setActiveNav_A = (nav_A_active) => {
        if (nav_A_active === 'audio')
            elements.nav_A_active = elements.nav_A_audio;
        if (nav_A_active === 'video')
            elements.nav_A_active = elements.nav_A_video;
        if (nav_A_active === 'warpstagram')
            elements.nav_A_active = elements.nav_A_warpstagram;
    };

    const removeNavBActivateBtn = (storage) => {
        if (storage.user.audio === 'pro')
            elements.nav_B_button_audio_activate.style.display = 'none';
        if (storage.user.video === 'pro')
            elements.nav_B_button_video_activate.style.display = 'none';
    };

    ipcRenderer.on('resize', () => {
        // CLICK ACTIVE NAV A
        var clickDelay = 50;
        if (startup.env.nav_A_active == 'audio') {
            elements.nav_A_active = elements.nav_A_audio; // sets active Nav A
            setTimeout(() => {
                elements.nav_A_audio.click(); // clicks audio tab
            }, clickDelay);
        }
        if (startup.env.nav_A_active == 'video') {
            elements.nav_A_active = elements.nav_A_video; // sets active Nav A
            setTimeout(() => {
                elements.nav_A_video.click(); // clicks video tab
            }, clickDelay);
        }
        if (startup.env.nav_A_active == 'warpstagram') {
            setTimeout(() => {
                elements.nav_A_warpstagram.click(); // clicks warpstagram tab
            }, clickDelay);
        }
    });
    ipcRenderer.on('paste-new-url', (event, itemURL, avType, platform) => {
        items.downloadItem(itemURL, avType, platform);
    });
})();

const addMenuListeners = () => {
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
    ipcRenderer.on('Audio: Tools: Preferences', () => {
        modals.toggleBackground(state, elements, startup);
        modals.toggleModalState(state);
        modals.togglePreferences(state, elements, 'audio');
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
        modals.toggleBackground(state, elements, startup);
        modals.toggleModalState(state);
        modals.togglePreferences(state, elements, 'video');
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
    ipcRenderer.on('Warpstagram: Tools: Preferences', () => {
        modals.toggleBackground(state, elements, startup);
        modals.toggleModalState(state);
        modals.togglePreferences(state, elements, 'warpstagram');
    });

    // Menu listeners, universal commands
    ipcRenderer.on('Check for update', () => {});
    ipcRenderer.on('Quit', () => {
        if (startup.dev.menuLogging) console.log('you quit');
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
    // Nav A LISTENERS
    elements.nav_A.addEventListener('click', (e) => {
        // GETS CLICK EVENT TARGET
        const target = e.target;
        const id = target.id;
        nav_A_active = id;

        if (id) {
            state.nav.updateActiveNav_A(id);
            // changeNavB_listener(id);
        }

        // 	CLEARS ACTIVE AND ADDS IT TO SELECTED TAB
        navPrimaryView.clearActive();
        navPrimaryView.highlightSelected(id);

        navSecondaryView.clearActive();

        const nav_B_actives = state.nav.nav_B[nav_A_active];

        for (var key in nav_B_actives) {
            if (
                nav_B_actives.hasOwnProperty(key) &&
                nav_B_actives[key] === true
            ) {
                navSecondaryView.highlightSelected('add', key);
            }
        }
    });
    // menu-change
    elements.nav_A_audio.addEventListener('click', (e) => {
        ipcRenderer.send('menu-change', 'audio');
        startup.env.nav_A_active = 'audio';
    });
    elements.nav_A_video.addEventListener('click', (e) => {
        ipcRenderer.send('menu-change', 'video');
        startup.env.nav_A_active = 'video';
    });
    elements.nav_A_warpstagram.addEventListener('click', (e) => {
        ipcRenderer.send('menu-change', 'warpstagram');
        startup.env.nav_A_active = 'warpstagram';
    });
    elements.nav_B_button_audio_paste.addEventListener('click', (e) => {
        userInput.validateURL(clipboard.readText(), startup.env.nav_A_active);
    });
    elements.nav_B_button_audio_activate.addEventListener('click', (e) => {
        if (logging) console.log('clicked activate');
    });
    elements.nav_B_button_audio_preferences.addEventListener('click', (e) => {
        modals.toggleBackground(state, elements, startup);
        modals.toggleModalState(state);
        modals.togglePreferences(state, elements, 'audio');
    });

    // Nav B video LISTENERS
    elements.nav_B_button_video_paste.addEventListener('click', (e) => {
        userInput.validateURL(clipboard.readText(), startup.env.nav_A_active);
    });
    elements.nav_B_button_video_activate.addEventListener('click', (e) => {
        if (logging) console.log('clicked activate');
    });
    elements.nav_B_button_video_subscriptions.addEventListener(
        'click',
        (e) => {}
    );
    elements.nav_B_button_video_preferences.addEventListener('click', (e) => {
        modals.toggleBackground(state, elements, startup);
        modals.toggleModalState(state);
        modals.togglePreferences(state, elements, 'video');
    });
    // Nav B search listeners
    elements.searchAudio.addEventListener('keyup', (e) => {
        search.audioItems();
    });
    elements.searchVideo.addEventListener('keyup', (e) => {
        search.videoItems();
    });
    // Download lists listeners
    elements.download__list_audio_ID.addEventListener('click', (e) => {
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
};
const addModalEventListeners = () => {
    // Modals listeners
    elements.modalBackground.addEventListener('click', (e) => {
        modals.toggleBackground(state, elements, startup);
        modals.toggleModalState(state);
        modals.togglePreferences(state, elements, startup.env.nav_A_active);
    });

    setTimeout(() => {
        document.getElementById('button-1').addEventListener('click', (e) => {
            console.log('hello');
        });
        document
            .getElementById('modalOutputFolderBtn_audio')
            .addEventListener('click', (e) => {
                console.log('hello');
            });
        // NAV LISTENERS
        document
            .getElementById('modalPrefsNav_button_audio_ID')
            .addEventListener('click', (e) => {
                modals.toggleComponents('prefs', 'audio');
            });
        document
            .getElementById('modalPrefsNav_button_video_ID')
            .addEventListener('click', (e) => {
                modals.toggleComponents('prefs', 'video');
            });
        document
            .getElementById('modalPrefsNav_button_warpstagram_ID')
            .addEventListener('click', (e) => {
                modals.toggleComponents('prefs', 'warpstagram');
            });
        document
            .getElementById('modalPrefsNav_button_general_ID')
            .addEventListener('click', (e) => {
                modals.toggleComponents('prefs', 'general');
            });
        document
            .getElementById('modalPrefsNav_button_license_ID')
            .addEventListener('click', (e) => {
                modals.toggleComponents('prefs', 'license');
            });
    }, 100);
};