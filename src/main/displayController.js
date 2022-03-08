/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable one-var */

const { screen } = require('electron');

const discoverDisplay = () => {
    let allScreens = screen.getAllDisplays();
    const screenTotal = allScreens.length;
    // LAPTOP MODE
    // DESKTOP MODE
    if (screenTotal === 1) {
        // console.log('only one display detected');
    }
    height = 900;
    width = 1600;
}


module.exports = { discoverDisplay };