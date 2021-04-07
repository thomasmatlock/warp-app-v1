const nav = require('../js/nav');
class state {
    constructor() {
        this.nav = new nav(); // controls active nav
        this.modals = {};
        this.modals.preferences = false;
    }

    stateTest = () => {
        console.log(`state test`);
    };
}
module.exports = state;