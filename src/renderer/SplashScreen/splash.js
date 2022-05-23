const global = require('../../js/global.js');
const easterEggs = require('./sentenceGenerator/generators/easterEggs.js');
const randomSentences = require('./sentenceGenerator/generators/randomSentences.js');
const tips = require('./sentenceGenerator/generators/tips.js');
const package = require('../../../package.json');
const themes = require('./theme.js');
const delay = 2000;

window.addEventListener(
    'load',
    function() {
        setTimeout(function() {
            document.getElementById('version').innerHTML = package.version;
            statusController();
        }, 50)
    },
    false
);
const statusController = (statusNumber) => {
    let status1 = document.createElement("h1");
    status1.innerHTML = statusGenerator();
    status1.style.color = themes.textColor;
    status1.classList.add('status');
    status1.classList.add('status1');
    document.getElementById('statusContainer').appendChild(status1);
    setTimeout(() => {
        status1.classList.add('becomeStatus2');
        setTimeout(() => {
            status1.style.top = '260px';
            status1.classList.remove('becomeStatus2');
            status1.classList.add('becomeStatus3');
            setTimeout(() => {
                status1.style.top = '240px';
                status1.classList.remove('becomeStatus3');
                status1.classList.add('fadeOut');
                setTimeout(() => {
                    document.getElementById('statusContainer').removeChild(status1);
                    status1 = null;
                }, delay);
            }, delay);
        }, delay)
    }, 1050)
}

window.setInterval(function() {
    statusController();
}, delay);

const statusGenerator = () => {
    // 20% chance comment/saying
    let odds = global.getRandomInt(10); // testing set to 1 for easter eggs; 
    if (odds === 0) return easterEggs.generate();
    if (odds === 1) return tips.generateTip();
    if (odds >= 2 && odds <= 10) return randomSentences.generate();
};