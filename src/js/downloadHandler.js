class downloadHandler {
    constructor() {
        this.type; // set to either audio or video
        this.thumbnail;
        this.title;
        this.lengthSecs;
        this.lengthMins;
        this.lengthHours;
        this.lengthFormatted;
        this.fileSize;
        this.height;
        this.fps;
        this.fileType;
        this.format; // which of the 35 formats, from 1080p, 720p60, etc
    }

    formatLength = (approxDurationMs) => {
        this.lengthSecs = Math.round(approxDurationMs / 1000); // returns video length in this.lengthSecs, rounded
        this.lengthMins = (this.lengthSecs / 60).toFixed(1); // returns minutes with one decimal, ie, 3.4 mins long
        this.lengthFormatted = Math.floor(this.lengthMins);
        // 1- Convert to this.lengthSecs:
        // var this.lengthSecs = approxDurationMs / 1000;
        // 2- Extract hours:
        this.lengthHours = parseInt(this.lengthSecs / 3600); // 3,600 this.lengthSecs in 1 hour
        this.lengthSecs = this.lengthSecs % 3600; // this.lengthSecs remaining after extracting hours
        // 3- Extract minutes:
        this.lengthMins = parseInt(this.lengthSecs / 60); // 60 this.lengthSecs in 1 minute
        // 4- Keep only this.lengthSecs not extracted to minutes:
        this.lengthSecs = this.lengthSecs % 60;
        // insert double zeros if the actual value is a single digit #FIX this to get a count on the character https://stackoverflow.com/questions/14879691/get-number-of-digits-with-javascript
        // this.lengthSecsString = 0 ? this.lengthSecs === '00' : '00';
        // this.lengthMinsString = 0 ? this.lengthMins === '00' : '00';
        this.lengthFormatted = `${this.lengthHours}:${this.lengthMins}:${this.lengthSecs}`;
    };
}

module.exports = downloadHandler;