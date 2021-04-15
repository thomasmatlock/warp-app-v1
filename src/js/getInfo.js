const ytdl = require('ytdl-core');
const items = require('../renderer/items');
const { itemInfo } = require("./downloadHandler");

const getInfo = async function(itemURL, avType) {
    await ytdl.getBasicInfo(itemURL).then((info) => {
        this.cloneVideoDetails(itemURL, info, avType);
        this.removeCharactersFromTitle();
        // console.log(itemInfo.filePath);
        items.addItem(itemInfo, avType);
        items.updateStorage(itemInfo, avType, 'add');
        // items.clickDownloadList(avType);
    });
};
exports.getInfo = getInfo;