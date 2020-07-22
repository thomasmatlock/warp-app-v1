const mainMenu = require('./mainMenu');

class ElectronController {
    constructor() {
        this.testProperty = 'this is a test property';
        this.mainMenu = mainMenu;
    }
}
module.exports = ElectronController;