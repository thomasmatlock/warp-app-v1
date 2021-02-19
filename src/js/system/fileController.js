const os = require('os');
const fs = require('fs');
const path = require('path');
const systemInfo = require('./system-info');

const userDocumentsPath = 'C:\\Users\\Tommy\\Documents\\';
const dirMainName = 'Warp Downloader';
const dirMainPath = `${userDocumentsPath}${systemInfo.dirMainName}`;
const dirSubNames = ['Audio', 'Video', 'Warpstagram'];

// Check for and create main/sub directory
exports.init = () => {
    try {
        if (!fs.existsSync(dirMainPath)) {
            fs.mkdirSync(dirMainPath);
            console.log(`Created main directory`);
        }
    } catch (err) {
        console.error(err);
    }
    // sub directories
    try {
        dirSubNames.forEach((el) => {
            if (!fs.existsSync(`${dirMainPath}\\${el}`)) {
                fs.mkdirSync(`${dirMainPath}\\${el}`);
                console.log(`Created ${el} sub directory`);
            }
        });
    } catch (err) {
        console.error(err);
    }
};