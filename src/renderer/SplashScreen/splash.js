const global = require('../../js/global.js');
const verbsArr = require('./verbs.js');
const directObjArr = require('./nouns.js');
const adjectiveDescriptiveArr = require('./adjectiveDescriptiveArr.js');
const qualifier = require('./qualifier.js');
const adverbs = require('./adverbs.js');
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
    status1.innerHTML = sentenceGenerator();
    status1.style.color = themes.textColor;
    status1.classList.add('status');
    status1.classList.add('status1');
    document.getElementById('statusContainer').appendChild(status1);
    setTimeout(() => {
        status1.classList.add('becomeStatus2');
        setTimeout(() => {
            status1.style.top = '270px';
            status1.classList.remove('becomeStatus2');
            status1.classList.add('becomeStatus3');
            setTimeout(() => {
                status1.style.top = '250px';
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
const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

const easterEggSentences = [
    'hello world',
    'hmmmm',
    'up up down down left right left right B A',
    `hello ${global.randomFromArray(adjectiveDescriptiveArr)} ${global.randomFromArray(directObjArr)}`,
    `hello ${global.randomFromArray(adjectiveDescriptiveArr)} ${global.randomFromArray(directObjArr)}`,
    `hello ${global.randomFromArray(adjectiveDescriptiveArr)} ${global.randomFromArray(directObjArr)}`,
    `hello ${global.randomFromArray(adjectiveDescriptiveArr)} ${global.randomFromArray(directObjArr)}`,
    `hello ${global.randomFromArray(adjectiveDescriptiveArr)} ${global.randomFromArray(directObjArr)}`,
    `hello ${global.randomFromArray(adjectiveDescriptiveArr)} ${global.randomFromArray(directObjArr)}`,
    `hello ${global.randomFromArray(adjectiveDescriptiveArr)} ${global.randomFromArray(directObjArr)}`,
    `hello ${global.randomFromArray(adjectiveDescriptiveArr)} ${global.randomFromArray(directObjArr)}`,
    `hello ${global.randomFromArray(adjectiveDescriptiveArr)} ${global.randomFromArray(directObjArr)}`,
    `hello ${global.randomFromArray(adjectiveDescriptiveArr)} ${global.randomFromArray(directObjArr)}`,
    `hello ${global.randomFromArray(adjectiveDescriptiveArr)} ${global.randomFromArray(directObjArr)}`,
    `hello ${global.randomFromArray(adjectiveDescriptiveArr)} ${global.randomFromArray(directObjArr)}`,
    `Ctrl Alt ${global.capitalizeFirstLetter(global.randomFromArray(directObjArr))}`,
    `Ctrl Alt ${global.capitalizeFirstLetter(global.randomFromArray(directObjArr))}`,
    `Ctrl Alt ${global.capitalizeFirstLetter(global.randomFromArray(directObjArr))}`,
    `Ctrl Alt ${global.capitalizeFirstLetter(global.randomFromArray(directObjArr))}`,
    `Ctrl Alt ${global.capitalizeFirstLetter(global.randomFromArray(directObjArr))}`,
    `Ctrl Alt ${global.capitalizeFirstLetter(global.randomFromArray(directObjArr))}`,
    `Ctrl Alt ${global.capitalizeFirstLetter(global.randomFromArray(directObjArr))}`,
    `Ctrl Alt ${global.capitalizeFirstLetter(global.randomFromArray(directObjArr))}`,
    `Ctrl Alt ${global.capitalizeFirstLetter(global.randomFromArray(directObjArr))}`,
    `Ctrl Alt ${global.capitalizeFirstLetter(global.randomFromArray(directObjArr))}`,
    `Ctrl Alt ${global.capitalizeFirstLetter(global.randomFromArray(directObjArr))}`,
    `Ctrl Alt ${global.capitalizeFirstLetter(global.randomFromArray(directObjArr))}`,
]

const sentenceGenerator = () => {
    let randomAdj = global.randomFromArray(adjectiveDescriptiveArr);
    let randomAdverb = global.randomFromArray(adverbs);
    // let randomQualifier = global.randomFromArray(qualifier);
    let randomDirObj = global.randomFromArray(directObjArr);
    let randomVerb = global.randomFromArray(verbsArr);
    let sentence = `${randomVerb} ${randomAdverb} ${randomAdj}  ${randomDirObj}`;
    // easter egg
    let easterEggSentence = easterEggSentences[Math.floor(Math.random() * easterEggSentences.length)];
    if (getRandomInt(10) === 0) {
        sentence = easterEggSentence;
    }
    // let sentence = `${randomVerb} ${randomQualifier} ${randomAdverb} ${randomAdj}  ${randomDirObj}`;
    return sentence;
};