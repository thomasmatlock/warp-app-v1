const os = require('os');
const fs = require('fs');
const path = require('path');
const systemInfo = require('./system-info');

class fileController {
    constructor() {
        this.userDocumentsPath = 'C:\\Users\\Tommy\\Documents\\';
        this.dirMainName = 'Warp Downloader';
        this.dirMainPath = `${this.userDocumentsPath}${this.systemInfo}.${this.dirMainName}`;
        this.dirSubNames = ['Audio', 'Video', 'Warpstagram'];
    }

    init = () => {
        try {
            if (!fs.existsSync(this.dirMainPath)) {
                fs.mkdirSync(this.dirMainPath);
                console.log(`Created main directory`);
            }
        } catch (err) {
            console.error(err);
        }
        // sub directories
        try {
            this.dirSubNames.forEach((el) => {
                if (!fs.existsSync(`${this.dirMainPath}\\${el}`)) {
                    fs.mkdirSync(`${this.dirMainPath}\\${el}`);
                    console.log(`Created ${el} sub directory`);
                }
            });
        } catch (err) {
            console.error(err);
        }
    };
}

module.exports = fileController;