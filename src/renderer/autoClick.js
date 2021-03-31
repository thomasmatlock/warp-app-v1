const startupReq = require('../js/system/startup');
const startup = new startupReq();
let elements = require('./views/elements');

exports.testCLick = () => {
    elements.nav_A_warpstagram.click(); // clicks audio tab
};