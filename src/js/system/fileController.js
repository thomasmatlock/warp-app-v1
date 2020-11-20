const os = require('os');
const fs = require('fs');
const path = require('path');

const userDocumentsPath = 'C:\\Users\\Tommy\\Documents\\';
const dirMainName = 'Warp Downloader';
const dirMainPath = `${userDocumentsPath}${dirMainName}`;
const dirSubNames = ['Audio', 'Video', 'Warpstagram', 'Postfire'];

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