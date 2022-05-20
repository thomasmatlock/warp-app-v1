const global = require('../../js/global.js');
const verbsArr = require('./verbs.js');
const directObjArr = require('./nouns.js');
const adjectiveDescriptiveArr = require('./adjectiveDescriptiveArr.js');
const qualifier = require('./qualifier.js');
const adverbs = require('./adverbs.js');
const element = document.getElementById('status');
const delay = 2000;
window.addEventListener(
    'load',
    function() {
        element.innerHTML = sentenceGenerator();
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
    if (getRandomInt(20) === 0) {
        sentence = easterEggSentence;
    }
    // let sentence = `${randomVerb} ${randomQualifier} ${randomAdverb} ${randomAdj}  ${randomDirObj}`;
    return sentence;
};