const global = require('../../js/global.js');
const verbsArr = require('./verbs.js');
const directObjArr = require('./nouns.js');
const adjectiveDescriptiveArr = require('./adjectiveDescriptiveArr.js');
const qualifier = require('./qualifier.js');
const adverbs = require('./adverbs.js');
const package = require('../../../package.json');
const element = document.getElementById('status1');
const delay = 2000;
window.addEventListener(
    'load',
    function() {
        element.innerHTML = sentenceGenerator();
        document.getElementById('status2').classList.add('hidden');
        document.getElementById('version').innerHTML = `${package.version}`; // display app version
    },
    false
);

window.setInterval(function() {
    element.innerHTML = sentenceGenerator();
}, delay);
const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

const easterEggSentences = [
    'hello world',
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