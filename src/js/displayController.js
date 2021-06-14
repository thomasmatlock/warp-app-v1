/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable one-var */

const { screen } = require('electron');
const defaultsReq = require('./defaults');
const defaults = new defaultsReq();
class displayController {
    constructor() {
        // 34 inch display bounds = 2752 x 1152, workArea = 2752, 1112
        // laptop display bounds = 1536, 864, workArea = 1536, 824

        this.all = screen.getAllDisplays(); // array of available displays
        this.total = this.all.length; // number of displays
        this.useSecondaryDisplay = false;
        this.displayToUse = this.useSecondaryDisplay ?
            this.all // change this, [0, 1, 2] to select dev mode secondary or tertiary display
            :
            this.all[0]; // defaults to using display 0
        this.height;
        this.width;
        this.x;
        this.y;
        this.minWidth = 800;
        this.minHeight = 600;
        this.useDesktopPrimary = true;
        this.useLaptop;
        this.desktopSecondaryWidth = 1096;
        this.desktopSecondaryHeight = 2536;
        this.desktopSecondaryX = 3432;
        this.desktopSecondaryY = -337;
        this.useSecondaryDisplayPortraitMode = true;
        // this.useDesktopSecondary = this.useDesktopPrimary ? false : true;
    }
    discoverDisplay = () => {
        // PRODUCTION MODE
        if (!defaults.devMode) {
            this.height = 900;
            this.width = 1600;

            // DEV MODE, LAPTOP
        } else if (
            defaults.devMode &&
            this.displayToUse.size.height > 863 &&
            this.displayToUse.size.height < 1151
        ) {
            this.height = 900;
            this.width = 1600;
            this.useLaptop = true;
            this.x = Math.round(this.displayToUse.size.width * 0); // how far to the right app appears
            this.y = Math.round(this.displayToUse.size.height * 0); // how far down the app

            console.log(
                `Dev mode, laptop, height ${this.height}, width ${this.width}, x ${this.x}, y ${this.y}`
            );

            // DEV MODE, DESKTOP PRIMARY
        } else if (
            defaults.devMode &&
            this.useDesktopPrimary
        ) {
            this.height = 1440; // app height
            this.width = 3440; // app width
            this.x = 0; // how far to the right app appears
            this.y = -0; // how far down the app
        }

        // DEV MODE, DESKTOP SECONDARY
        else if (
            defaults.devMode &&
            // this.displayToUse.size.height === 1152 &&
            this.useSecondaryDisplayPortraitMode
        ) {
            this.height = 2536; // app height
            this.width = 1096; // app width
            this.x = 3432; // how far to the right app appears
            this.y = -337; // how far down the app
        }
    };
}

module.exports = displayController;