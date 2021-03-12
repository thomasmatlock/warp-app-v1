/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable one-var */

const { screen } = require('electron');
class displayController {
    constructor() {
        // 34 inch display bounds = 2752 x 1152, workArea = 2752, 1112
        // laptop display bounds = 1536, 864, workArea = 1536, 824
        this.displays = screen.getAllDisplays(); // array of available displays
        this.count = this.displays.length; // number of displays
        this.devScreen =
            this.count == 1 ?
            (this.devScreen = this.displays[0]) // devScreen is uses only available screen
            :
            (this.devScreen = this.displays[1]); // devScreen uses secondary screen
        this.useDesktopPrimary = // checks if height is over 1080, then 
            if (this.count)
                this.devScreen.size.height >= 1080 ?
                (this.useDesktopPrimary = false) :
                (this.useDesktopPrimary = true);
        this.xAdditive = this.useDesktopPrimary ? 0 : 0; // how far to the right app appears
        this.yAdditive = this.useDesktopPrimary ? 0 : 0; // how far down app appears
        this.coords = {
            height: this.useDesktopPrimary ?
                // Math.round(this.devScreen.bounds.height * 1) :
                // Math.round(this.devScreen.bounds.height * 0.9),
                width : this.useDesktopPrimary ?
                // Math.round(this.devScreen.bounds.width) :
                // Math.round(this.devScreen.bounds.width * 0.9),
                x : this.useDesktopPrimary ?
                // Math.round(this.devScreen.bounds.width * 0.001) +
                // this.xAdditive :
                // Math.round(this.devScreen.bounds.width * 0.2) +
                // this.xAdditive,
                y : this.useDesktopPrimary ?
                // Math.round(this.devScreen.bounds.height * 0.001) +
                // this.yAdditive :
                // Math.round(this.devScreen.bounds.height * 0.1) +
                // this.yAdditive,
        };
    }
}

module.exports = displayController;