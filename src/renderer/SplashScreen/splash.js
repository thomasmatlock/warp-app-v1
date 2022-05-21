const global = require('../../js/global.js');
const verbsArr = require('./verbs.js');
const directObjArr = require('./nouns.js');
const adjectiveDescriptiveArr = require('./adjectiveDescriptiveArr.js');
const qualifier = require('./qualifier.js');
const adverbs = require('./adverbs.js');
const themeObj = require('./theme.js');
const package = require('../../../package.json');
const element = document.getElementById('status1');
const delay = 1000;
let status1, status2, status3;
window.addEventListener(
    'load',
    function() {

        status1 = document.createElement("h1");
        status1.innerHTML = sentenceGenerator();
        // status1.style.color = themeObj.textColor;
        status1.classList.add('status');
        status1.classList.add('status1');
        // status1.classList.add('status1animation');
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
                        status1 = null;
                        // status1.classList.remove('becomeStatus2');
                        // status1.style.top = '240px';
                    }, 1000);
                }, 1000);
            }, 1000)
        }, 2000)

    },
    false
);
let statusCounter = 0;
window.setInterval(function() {
    // element.innerHTML = sentenceGenerator();
    // document.getElementById('status2').classList.add('status2');
    // document.getElementById('status3').classList.add('status3');
    // const status1 = document.createElement("h1");
    // status1.innerHTML = sentenceGenerator();
    // status1.style.color = 'purple';
    // status1.classList.add('status');
    // status1.classList.add('status1');
    // document.getElementById('statusContainer').appendChild(status1);
    // status1.classList.add('becomeStatus2');
    // setTimeout(() => {

    //     status1.classList.add('becomeStatus2');
    // }, 1000)

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