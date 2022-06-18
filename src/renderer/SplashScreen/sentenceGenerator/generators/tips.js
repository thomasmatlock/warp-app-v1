const audioMenu = require('../../../../js/menuAudioTemplate');
const videoMenu = require('../../../../js/menuVideoTemplate');
const warpstagramMenu = require('../../../../js/menuWarpstagramTemplate');
const global = require('../../../../js/global');

const loopThroughObj = (obj) => {
    let itemWithCommands = [];
    for (var key in obj) {
        if (obj[key].accelerator) {
            let object;
            let commandLabel = obj[key].label;
            let accelerator = obj[key].accelerator;
            object = { 'label': commandLabel, 'command': accelerator };
            itemWithCommands.push(object);
        }
    }
    return itemWithCommands;
}

const getRandomPresetTip = () => {
    let presets = [
        'Press Shift + 1 to quickly switch to Audio Mode',
        'Press Shift + 2 to quickly switch to Video Mode',
        'Press Shift + 3 to quickly switch to Warpstagram Mode',
    ];
    let randomTip = global.randomFromArray(presets);
    if (process.platform === 'darwin') {
        randomTip = randomTip.replace('Shift', 'Cmd');
    }
    return randomTip;

}

const formatTip = (tip) => {
    // win32 or darwin
    if (process.platform === 'win32') {
        tip.command = tip.command.replace('Cmd', '');
        tip.command = tip.command.replace('Or', '');
    }
    if (process.platform === 'darwin') {
        tip.command = tip.command.replace('Ctrl', '');
        tip.command = tip.command.replace('Or', '');
    }
    if (tip.label.includes('Preferences')) {
        tip.label = `open Warp ${tip.label.toLowerCase()}`;
        return tip;
    }
    if (tip.label.includes('Quit')) {
        tip.label = `${tip.label.toLowerCase()} Warp`;
        return tip;
    }
    if (tip.label.includes('Restart')) {
        tip.label = `restart Warp`;
        return tip;
    }
    if (tip.label.includes('Paste')) {
        tip.label = `paste links`;
        return tip;
    }
    tip.label = tip.label.toLowerCase();
    return tip;
}
const getRandomMenuItem = (menuArr, type) => {
    let tipGenerated = false;
    while (tipGenerated === false) {
        let menu = global.randomFromArray(menuArr);
        let submenu = menu.submenu;
        let tipsArr = loopThroughObj(submenu);
        if (tipsArr.length > 0) {
            tipGenerated = true;
            let randomTipData = global.randomFromArray(tipsArr);
            formatTip(randomTipData);
            // return `Press ${randomTipData.command} to ${randomTipData.label.toLowerCase()}`;
            return `Press ${randomTipData.command} to ${randomTipData.label}`;

        }
    }
}


const generateTip = () => {
    let dice = global.getRandomInt(4);
    if (dice === 0) {
        return getRandomMenuItem(audioMenu, 'audio');
    } else if (dice === 1) {
        return getRandomMenuItem(videoMenu, 'video');
    } else if (dice === 2) {
        return getRandomMenuItem(warpstagramMenu, 'warpstagram');
    } else if (dice === 3) {
        return getRandomPresetTip();
    }


}
module.exports = { generateTip };