/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable one-var */

const { screen } = require('electron');
const startupReq = require('../startup');
const startup = new startupReq();
class displayController {
    constructor() {
        // 34 inch display bounds = 2752 x 1152, workArea = 2752, 1112
        // laptop display bounds = 1536, 864, workArea = 1536, 824
        this.logging = false;
        this.all = screen.getAllDisplays(); // array of available displays
        this.total = this.all.length; // number of displays
        this.useSecondaryDisplay = false;
        this.displayToUse = this.useSecondaryDisplay ?
            this.all[1] // change this, [0, 1, 2] to select dev mode secondary or tertiary display
            :
            this.all[0]; // defaults to using display 0
        this.height;
        this.width;
        this.x;
        this.y;
        this.minWidth = 800;
        this.minHeight = 600;
    }
    discoverDisplay = () => {
        // PRODUCTION MODE
        if (!startup.devMode) {
            this.height = 900;
            this.width = 1600;

            // DEV MODE, LAPTOP
        } else if (
            startup.devMode &&
            this.displayToUse.size.height > 863 &&
            this.displayToUse.size.height < 1151
        ) {
            this.height = 900;
            this.width = 1600;
            this.x = Math.round(this.displayToUse.size.width * 0); // how far to the right app appears
            this.y = Math.round(this.displayToUse.size.height * 0); // how far down the app
            if (this.logging)
                console.log(
                    `Dev mode, laptop, height ${this.height}, width ${this.width}, x ${this.x}, y ${this.y}`
                );

            // DEV MODE, DESKTOP PRIMARY
        } else if (startup.devMode && this.displayToUse.size.height > 1151) {
            this.height = Math.round(this.displayToUse.size.height * 0.6); // app height
            this.width = Math.round(this.displayToUse.size.width * 0.5); // app width
            this.x = Math.round(this.displayToUse.size.width * 0.5); // how far to the right app appears
            this.y = Math.round(this.displayToUse.size.height * 0.2); // how far down the app
            if (this.logging)
                console.log(
                    `Dev mode, desktop primary, height ${this.height}, width ${this.width}, x ${this.x}, y ${this.y}`
                );

            // DEV MODE, DESKTOP SECONDARY
        } else if (
            startup.devMode &&
            this.displayToUse.size.height === 1152 &&
            this.useSecondaryDisplay
        ) {
            if (this.logging)
                console.log(
                    `Dev mode, desktop secondary, height ${this.height}, width ${this.width}, x ${this.x}, y ${this.y}`
                );
        }
    };
}

module.exports = displayController;