/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable one-var */

const { screen } = require('electron');
class displayController {
    constructor() {
        this.displays = screen.getAllDisplays();
        this.devScreen =
            this.displays.length == 1 ?
            (this.devScreen = this.displays[0]) :
            (this.devScreen = this.displays[1]);
        this.usePrimaryMonitor =
            this.devScreen.size.height >= 1080 ?
            (this.usePrimaryMonitor = false) :
            (this.usePrimaryMonitor = true);
        this.xAdditive = this.usePrimaryMonitor ? 0 : 2500; // how far to the right app appears
        this.yAdditive = this.usePrimaryMonitor ? 0 : 200; // how far down app appears
        this.coords = {
            height: this.usePrimaryMonitor ?
                Math.round(this.devScreen.bounds.height * 0.8) :
                Math.round(this.devScreen.bounds.height * 0.9),
            width: this.usePrimaryMonitor ?
                Math.round(this.devScreen.bounds.width * 0.7) :
                Math.round(this.devScreen.bounds.width * 0.9),
            x: this.usePrimaryMonitor ?
                Math.round(this.devScreen.bounds.width * 0.3) + this.xAdditive :
                Math.round(this.devScreen.bounds.width * 0.2) +
                this.xAdditive,
            y: Math.round(this.devScreen.bounds.height * 0.1) + this.yAdditive,
        };
    }
}

module.exports = displayController;