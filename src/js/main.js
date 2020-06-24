////////////////////////////////////////////////////////////////
// ELECTRON
const { app, BrowserWindow } = require('electron');
// const test = require('./test')
// console.log(test.module.testName);

// const Nav = require('./renderer');
// console.log(Nav.updateActiveNav_A);

// const navController = new Nav();
// console.log(navController);
// navController.updateActiveNav_A(1)

// this checks if its ready after 2 secs
// setTimeout(() => {
//     console.log(`Checking ready: ${app.isReady()}`); // logs whether app is ready or not
// }, 2000);

let mainWindow; // Keep a global reference of the window object, if you don't, the window will be closed automatically when the JavaScript object is garbage collected.

// Create a new BrowserWindow when `app` is ready // nodeIntegration set to true allows us to access nodejs process in renderer
// with node integration, we can also set node js to run in the browser window, through scripts, using nodes require function in the html document
// we require in renderer.js, which allows JS to run in browser window, which is no different from standard JS in a standard browser, except for having access to node.js
function createWindow() {
    // console.log('creating window...again');

    mainWindow = new BrowserWindow({
        width: 1600,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    mainWindow.loadFile('./index.html'); // Load index.html into the new BrowserWindow

    // mainWindow.webContents.openDevTools(); // Open DevTools - Remove for PRODUCTION!

    // Listen for window being closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('before-quit', (event) => {
    console.log('Preventing app from quitting');
    event.preventDefault(); // if you wanna save a users work, check out section 8 of class. this is supposed to make the thing not close but Ctrl Q doesnt seem to work
});

app.on('browser-window-blur', () => {
    console.log('App unfocused');
});

// quits if unfocused
// app.on('browser-window-blur', () => {
//     // console.log('App unfocused');
//     setTimeout(() => {
//         app.quit();
//     }, 500);
// });
app.on('browser-window-focus', () => {
    // console.log('App focused');
});

// Electron `app` is ready
app.on('ready', () => {
    console.log('App is ready');
    // console.log(app.getPath('home')); // https://www.electronjs.org/docs/api/app#appgetpathname for more
    // console.log(app.getPath('userData')); // default storage location for all user stored data, json files, etc. you have a consistent path and wont run into permission issues
    createWindow();
}); // this is app/nodejs main process listening for the app to ready event, then creates a window (renderer) instance

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
    if (mainWindow === null) createWindow();
});

////////////////////////////////////////////////////////////////
// OLD STUFF
////////////////////////////////////////////////////////////////

// // WEB LIVE-SERVER
// import Nav from './models/Nav.js';
// import * as navPrimaryView from './views/navPrimaryView.js';
// import * as navSecondaryView from './views/navSecondaryView.js';
// import * as listView from './views/listView.js';
// import * as navTitles from './models/config.js';
// import {
//     elements
// } from './views/base.js';
// // ELECTRON BRANCH
// // const Nav = require("./models/Nav.js");
// // const navPrimaryView = require("./views/navPrimaryView.js");
// // const navSecondaryView = require("./views/navSecondaryView.js");
// // const listView = require("./views/listView.js");
// // const navTitles = require("./models/config.js");
// // const elements = require("./views/base.js");

// /**
//  * STARTUP INIT
//  */
// const state = {};
// state.nav = new Nav();
// let nav_A_active = 'nav_A_0';

// const init = () => {
//     state.nav.nav_A[nav_A_active] = true;
//     // console.log(`${nav_A_active} is active: ${state.nav.nav_A[nav_A_active]}`);
// };
// init();
// console.log(typeof (elements))
// /**
//  * NAV PRIMARY CONTROLLER
//  */
// elements.nav_A.addEventListener('click', (e) => {
//     // GETS CLICK EVENT TARGET
//     const target = e.target;
//     const id = target.id;
//     nav_A_active = id;
//     // console.log(id);

//     if (id) {
//         state.nav.updateActiveNav_A(id);
//         navSecondaryView.updateTitles(id); // updateTitles NEEDS WORK
//         // changeNavB_listener(id);
//     }

//     // 	CLEARS ACTIVE AND ADDS IT TO SELECTED TAB
//     navPrimaryView.clearActive();
//     navPrimaryView.highlightSelected(id);

//     navSecondaryView.clearActive();

//     const nav_B_actives = state.nav.nav_B[nav_A_active];

//     for (var key in nav_B_actives) {
//         if (nav_B_actives.hasOwnProperty(key) && nav_B_actives[key] === true) {
//             // console.log(key + " is " + nav_B_actives[key]);
//             navSecondaryView.highlightSelected('add', key);
//         }
//     }
// });

// /**
//  * NAV SECONDARY CONTROLLER
//  */

// elements.nav_B0.addEventListener('click', (e) => {
//     nav_B_sequence(e);
// });
// elements.nav_B1.addEventListener('click', (e) => {
//     nav_B_sequence(e);
// });
// elements.nav_B2.addEventListener('click', (e) => {
//     nav_B_sequence(e);
// });
// elements.nav_B3.addEventListener('click', (e) => {
//     nav_B_sequence(e);
// });

// const nav_B_sequence = (e) => {
//     const target = e.target;
//     const id = target.id;
//     const subString = 'mart';
//     const classString = 'active';
//     // console.log(id);
//     // console.log(`${id} is ${state.nav.nav_B[nav_A_active][id]}`);
//     // console.log(state.nav.nav_B);

//     navSecondaryView.clearActive();

//     const containsSubString = navSecondaryView.checkForSubstring(
//         target,
//         subString
//     );
//     const isActive = navSecondaryView.checkActive(target, classString);
//     if (containsSubString) {
//         // console.log(`Contains substring: true`);
//         if (isActive) {
//             // console.log(`ACTIVE`);
//             navSecondaryView.highlightSelected('remove', id);
//             // console.log(`INACTIVE`);
//             state.nav.updateActiveNav_B(nav_A_active, id);
//         } else if (isActive === false) {
//             // console.log(`INACTIVE`);
//             navSecondaryView.highlightSelected('add', id);
//             // console.log(`ACTIVE`);
//             state.nav.updateActiveNav_B(nav_A_active, id);
//         }
//     } else if (containsSubString === false) {
//         navSecondaryView.highlightSelected('remove', id);
//     }
//     console.table(state.nav.nav_B[nav_A_active]);
// };

// /**
//  * LIST CONTROLLER
//  */
// // elements.test_add_item_0_arr[0].addEventListener('click', e => {
// // 	console.log(elements.test_add_item_0_arr.length);
// // 	listItemFunction(e);
// // });
// elements.test_add_item_0.addEventListener('click', (e) => {
//     listItemFunction(e);
// });
// elements.test_add_item_1.addEventListener('click', (e) => {
//     listItemFunction(e);
// });
// elements.test_add_item_2.addEventListener('click', (e) => {
//     listItemFunction(e);
// });
// elements.test_add_item_3.addEventListener('click', (e) => {
//     listItemFunction(e);
// });

// const listItemFunction = (e) => {
//     console.log(e.target);

//     // console.log(nav_A_active);
//     // console.log(elements.test_add_item_0_arr[0]);

//     listView.renderItem(nav_A_active);
// };
