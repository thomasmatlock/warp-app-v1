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
            (this.devScreen = this.displays[1]); // devScreen uses secondary
        this.useLaptop = false;
        this.useDesktopPrimary = false;
        this.useDesktopPrimary = // checks if height is over 1080, then
            this.devScreen.size.height >= 1080 ?
            (this.useLaptop = true) :
            (this.useDesktopPrimary = true);
        this.xAdditive = this.useDesktopPrimary ? 600 : 0; // desktop : laptop, how far to the right app appears
        this.yAdditive = this.useDesktopPrimary ? 250 : 0; // desktop : laptop, how far down app appears
        this.coords = {
            height: this.useDesktopPrimary ?
                Math.round(this.devScreen.bounds.height * 0.6) // desktop
                :
                Math.round(this.devScreen.bounds.height * 0.9), // laptop
            width: this.useDesktopPrimary ?
                Math.round(this.devScreen.bounds.width * 0.75) // desktop
                :
                Math.round(this.devScreen.bounds.width * 0.9),
            x: this.useDesktopPrimary ?
                Math.round(this.devScreen.bounds.width * 0.001) +
                this.xAdditive // desktop
                :
                Math.round(this.devScreen.bounds.width * 0.2) +
                this.xAdditive, // laptop
            y: this.useDesktopPrimary ?
                Math.round(this.devScreen.bounds.height * 0.001) +
                this.yAdditive // desktop
                :
                Math.round(this.devScreen.bounds.height * 0.1) +
                this.yAdditive, // laptop
        };
    }
}

module.exports = displayController;