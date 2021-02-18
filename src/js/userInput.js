class input {
    constructor() {
        this.pattArr = [
            /facebook/i,
            /instagram/i,
            /soundcloud/i,
            /streamable/i,
            /twitch/i,
            /twitter/i,
            /vimeo/i,
            /youtube/i,
            /tiktok/i,
        ];
    }

    validateURL = (url, format) => {
        let pattMatchIndex;
        console.log(url);
        // console.log(this.pattMatchIndex);
        // check url against each pattern
        pattMatchIndex = this.pattArr.forEach(function(item, index) {
            console.log(this.pattArr);
            if (url.match(item)) {
                pattMatchIndex = index;

                let type = `${this.pattArr[pattMatchIndex]}`;

                this.mediaController(url, type, format);
                return;
            } else {
                console.log(`${url} is not a match`);
            }
        });
    };

    mediaController = (url, sourceType, format) => {
        // str = str.substring(0,str.length-1);
        let type = sourceType.substring(1, sourceType.length - 2);
        console.log(`Ready: ${url} from ${type} in ${format} format...`);
        // ipcRenderer.send('new-item', itemURL.value);
        ipcRenderer.send('new-item', url);
        // console.log(`Detected ${} in ${format} format`);
    };
}

module.exports = input;